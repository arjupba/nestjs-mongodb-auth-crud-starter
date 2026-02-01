import { registerAs } from '@nestjs/config';
export interface DatabaseConfig {
  host?: string;
  port: number;
}
export interface AppConfig {
  port: number;
  development: boolean;
  jwtSecret: string;
  database: DatabaseConfig;
}

export default registerAs(
  'app',
  (): AppConfig => ({
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '', 10) || 5432,
    },
    development: process.env.NODE_ENV !== 'production',
    jwtSecret: process.env.JWT_SECRET || 'test',
    port: parseInt(process.env.PORT || '', 10) || 3000,
  }),
);
