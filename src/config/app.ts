export default {
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  development: process.env.NODE_ENV !== 'production',
  jwtSecret: process.env.JWT_SECRET || 'test',
};
