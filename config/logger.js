const winston = require('winston');
const config = require('./config');
const path = require('path');


const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    return { ...info, message: info.stack };
  }
  return info;
});

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// Create logger instance
const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    new winston.transports.File({
      filename: path.join(__dirname,"..", 'logs', 'error.log'),
      level: 'error', 
    }),
    new winston.transports.File({
      filename: path.join(__dirname,"..",'logs', 'combined.log'),
    }),
  ],
});

module.exports = logger;
