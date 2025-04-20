# Discord Admin Message Bot

A Discord.js v14 bot that lets server Administrators send custom text or embeds via slash commands **or** modal‑powered forms.

## 📦 Project Structure

```
discord-admin-bot/
├── commands/
│   ├── say.js          # /say implementation
│   ├── embed.js        # /embed implementation
│   ├── saymodal.js     # /saymodal (Modal) implementation
│   └── embedmodal.js   # /embedmodal (Modal) implementation
├── deploy-commands.js  # Script to register slash commands
├── index.js            # Bot entrypoint and interaction handler
├── .env.example        # Environment variables template
├── package.json        # npm metadata & dependencies
└── README.md           # You are here!
```

## 🔧 Requirements

- Node.js v16.9 or higher  
- npm  
- A Discord Bot application (token, client ID)  
- A guild (server) ID for development/testing

## ⚙️ Setup

1. **Clone & install**  
   ```bash
   git clone <your-repo-url>
   cd discord-admin-bot
   npm install
   ```

2. **Configure**  
   Copy and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env`:
   ```
   DISCORD_TOKEN=your_bot_token
   CLIENT_ID=your_app_id
   GUILD_ID=your_test_guild_id
   ```

3. **Deploy slash commands**  
   ```bash
   npm run deploy
   ```

4. **Run the bot**  
   ```bash
   npm start
   ```

## 📝 Available Commands

- `/say`  
- `/embed`  
- `/saymodal`  
- `/embedmodal`  

See the in-code comments for usage examples.

## 📜 License

This project is licensed under the GNU GPL v3.0. See [LICENSE](./LICENSE) for details.
