import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('say')
  .setDescription('Send a custom message to a channel')
  .addChannelOption(opt =>
    opt
      .setName('channel')
      .setDescription('Where to send the message')
      .setRequired(true)
  )
  .addStringOption(opt =>
    opt
      .setName('message')
      .setDescription('Content to send')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  const channel = interaction.options.getChannel('channel');
  const content = interaction.options.getString('message');

  if (!channel.isTextBased()) {
    return interaction.reply({ content: '🚫 That\'s not a text channel!', ephemeral: true });
  }

  await channel.send({ content });
  await interaction.reply({ content: '✅ Message sent!', ephemeral: true });
}
