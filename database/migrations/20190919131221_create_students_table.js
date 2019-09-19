exports.up = function (knex) {
        return knex.schema.createTable('users', (tbl) => {
            tbl.increments()// creates id
            tbl.string('username', 100)
                .notNullable()
                .unique()
            tbl.string('password', 50)
                .notNullable()
    
        }).createTable('students', (tbl) => {
            tbl.increments()// creates id
            tbl.string('subject', 128)
    
        })
    };
    
    exports.down = function (knex) {
        return knex.schema.dropTableIfExists('students').dropTableIfExists('users');
    };
    