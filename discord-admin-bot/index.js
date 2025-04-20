import { Client, Collection, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of fs.readdirSync('./commands').filter(f => f.endsWith('.js'))) {
  const cmd = await import(`./commands/${file}`);
  client.commands.set(cmd.data.name, cmd);
}

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (command) {
      return command.execute(interaction);
    }
  }

  if (interaction.isModalSubmit()) {
    const [modalType, channelId] = interaction.customId.split('|');
    const channel = await interaction.guild.channels.fetch(channelId);
    if (!channel?.isTextBased()) {
      return interaction.reply({ content: '🚫 Invalid channel!', ephemeral: true });
    }

    if (modalType === 'sayModal') {
      const message = interaction.fields.getTextInputValue('messageInput');
      await channel.send({ content: message });
      return interaction.reply({ content: '✅ Message sent!', ephemeral: true });
    }

    if (modalType === 'embedModal') {
      const title = interaction.fields.getTextInputValue('titleInput');
      const desc  = interaction.fields.getTextInputValue('descInput');
      const color = interaction.fields.getTextInputValue('colorInput') || '0099ff';
      const footer = interaction.fields.getTextInputValue('footerInput');
      const image = interaction.fields.getTextInputValue('imageInput');

      const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(desc)
        .setColor(`#${color}`)
        .setTimestamp();

      if (footer) embed.setFooter({ text: footer });
      if (image)  embed.setImage(image);

      await channel.send({ embeds: [embed] });
      return interaction.reply({ content: '📬 Embed sent!', ephemeral: true });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
