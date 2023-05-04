module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      max_memory_restart: "200M",
      error_file: "./logs/err.log",
      instances: 3,
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
