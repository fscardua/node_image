import express from 'express';
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
import mysql from 'mysql2'
import { faker } from '@faker-js/faker'

const connection = mysql.createConnection(config)

const createTable = `CREATE TABLE IF NOT EXISTS  people(id int auto_increment, name varchar(255), PRIMARY KEY (id))`
connection.query(createTable)

app.get('/', (req,res) => {
    const sql = `INSERT INTO people(name) values(${mysql.escape(faker.name.firstName())})`
    connection.query(sql)
    connection.query('select * from people', (err, results) => {
        if(err) {
            res.send(`<h1>Full Cycle... we have a problem!</h1>${JSON.stringify(err)}`)
            throw err
        }
        let html = '<h1>Full Cycle Rocks!</h1>'
        results.forEach(result => {
            html += `<p>${result.name}</p>`
        })
        res.send(`${html}`)
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
