const pg = require("pg");

class PostgresService{
    constructor(){
        this.connectionString = "postgresql://postgres:Camila@localhost:5432/universidad";
        this.pool = new pg.Pool({connectionString:this.connectionString});
    }
 
    async executeSql(sql){
        let result = await this.pool.query(sql);
        return result;
    }

    async executeSql2(sql, datos){
        let result = await this.pool.query(sql, datos);
        return result;
    }
}   

module.exports = PostgresService;