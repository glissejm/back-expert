export const config = {
  secrets: {
    jwt: "learneverything" || process.env.JWT_SECRET, // second option must be deleted
  },
  dbUrl: "mongodb://localhost:27017/api-test",
};
