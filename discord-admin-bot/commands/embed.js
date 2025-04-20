import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('embed')
  .setDescription('Send a custom embed to a channel')
  .addChannelOption(opt =>
    opt
      .setName('channel')
      .setDescription('Where to send the embed')
      .setRequired(true)
  )
  .addStringOption(opt =>
    opt
      .setName('title')
      .setDescription('Embed title')
      .setRequired(true)
  )
  .addStringOption(opt =>
    opt
      .setName('description')
      .setDescription('Embed description')
      .setRequired(true)
  )
  .addStringOption(opt =>
    opt
      .setName('color')
      .setDescription('Embed color (hex without #, e.g. FF0000)')
      .setRequired(false)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  const channel = interaction.options.getChannel('channel');
  const title = interaction.options.getString('title');
  const description = interaction.options.getString('description');
  const color = interaction.options.getString('color') || '0099ff';

  if (!channel.isTextBased()) {
    return interaction.reply({ content: '🚫 That\'s not a text channel!', ephemeral: true });
  }

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(`#${color}`)
    .setTimestamp();

  await channel.send({ embeds: [embed] });
  await interaction.reply({ content: '📬 Embed sent!', ephemeral: true });
}
