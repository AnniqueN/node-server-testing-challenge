exports.seed = function(knex) {
  return knex('users').del()// Deletes ALL existing entries
    .then(function () {
      return knex('users').insert([
        { username:'BellaBella', password:'Beauty1' },
        { username: 'NylaGiselle', password:'SuperStar' },
        { username: 'GWagon', password:'BestCar'}
        
      ]);
    });
};