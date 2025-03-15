module.exports = {
  apps: [{
    name: "backend_assignment",
    script: "index.js",
    exec_mode: "cluster", // Enable cluster mode
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
    error_file: "logs/err.log",
    out_file: "logs/out.log",
    log_file: "logs/combined.log",
    time: true
  }]
};
