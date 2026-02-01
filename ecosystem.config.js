module.exports = {
  apps: [
    {
      name: "mes-ws-ssh",
      script: "dist/server/ws/ssh-terminal.js",
      env: {
        NODE_ENV: "production"
      },
      env_file: ".env.ws.production",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M"
    }
  ]
};