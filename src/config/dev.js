export const config = {
  secrets: {
    jwt: process.env.JWT_SECRET, // second option must be deleted
  },
  dbUrl: process.env.dev_database,
};
