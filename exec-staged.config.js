module.exports = [
  {
    regex: /\.(ts|tsx)$/,
    commands: ['eslint', 'prettier --write', 'git add']
  }
];
