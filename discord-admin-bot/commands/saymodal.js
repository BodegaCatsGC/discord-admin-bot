import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('saymodal')
  .setDescription('Send a custom message via a form')
  .addChannelOption(opt =>
    opt.setName('channel')
       .setDescription('Where to send the message')
       .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  const channel = interaction.options.getChannel('channel');
  const modal = new ModalBuilder()
    .setCustomId(`sayModal|${channel.id}`)
    .setTitle('Send Custom Message');

  const messageInput = new TextInputBuilder()
    .setCustomId('messageInput')
    .setLabel('Message')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true);

  const row = new ActionRowBuilder().addComponents(messageInput);
  modal.addComponents(row);

  await interaction.showModal(modal);
}
