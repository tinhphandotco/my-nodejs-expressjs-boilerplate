module.exports = {
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_BASE_URL: process.env.DATABASE_BASE_URL,
    DATABASE_URL: `${process.env.DATABASE_BASE_URL}/${process.env.DATABASE_NAME}`
}