const express = require('express')
const app = express()
const db = require('sqlite')
const PORT = 8080


//CREATE TABLE TODOS / USERS
db.open('todolist.db').then(() => {
  return Promise.all([
    db.run("CREATE TABLE IF NOT EXISTS TODOS (message, completion, createdAt, updatedAt, userId)"),
    db.run("CREATE TABLE IF NOT EXISTS USERS (firstname, lastname, username, password, email, createdAt, updatedAt)")
  ])
})
.then(() => {
  console.log('Database ready')
})
.catch((err) => console.log('une erreur est survenue', err))


app.use(express.json())
app.use(express.urlencoded({
 extended: true
}))

app.set('views', './views')
app.set('view engine', 'pug')




app.use('/todos', require('./routes/todos'))
app.use('/users', require('./routes/users'))

app.use((req, res, next) => {
 res.status(404)
 res.send('Not Found')
 next()
})


app.listen(PORT, () => {
 console.log('Serveur sur port : ', PORT)
})
