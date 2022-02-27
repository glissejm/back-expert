export const config = {
  secrets: {
    jwt: process.env.JWT_SECRET,
  },
  dbUrl: process.env.test_database,
};
