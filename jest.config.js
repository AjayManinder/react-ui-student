module.exports = {
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
  };