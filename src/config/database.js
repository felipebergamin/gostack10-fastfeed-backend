module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  passord: 'docker',
  database: 'fastfeed',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
