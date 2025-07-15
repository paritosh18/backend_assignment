module.exports = {
  apps: [{
    name: "backend_assignment",
    script: "index.js",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
    time: true
  }]
};
