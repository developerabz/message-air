module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  roots: [
    "./backend-tests/",
    "./actions-runner/_work/message-air/message-air/backend-tests/"
  ]
};

