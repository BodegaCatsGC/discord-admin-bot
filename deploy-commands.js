import { REST, Routes } from 'discord.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const commands = [];
for (const file of fs.readdirSync('./commands').filter(f => f.endsWith('.js'))) {
  const cmd = await import(`./commands/${file}`);
  commands.push(cmd.data.toJSON());
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);
await rest.put(
  Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
  { body: commands }
);

console.log('✅ Slash commands deployed');
