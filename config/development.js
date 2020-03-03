import 'dotenv/config';

export default {
    DATABASE_URL : process.env.POSTGRES_URL,
    JWT_SECRET: process.env.SECRET
}