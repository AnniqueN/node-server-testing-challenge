exports.seed = function (knex) {
  return knex('students').del()// Deletes ALL existing entries
    .then(function () {
      return knex('Students').insert([
        { subject: 'Node.js' },
        { subject: 'Java'},
        { subject: 'Data Science'},
      ]);
    });
};