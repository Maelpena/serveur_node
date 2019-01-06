const router = require('express').Router()
const db = require('sqlite');
let override = require('method-override');
let dateTime = require('node-datetime');
let dt = dateTime.create();
let time = dt.format('m/d/Y');
//
const bcrypt = require('bcryptjs');
const saltRounds = 10;


router.use(override('_override'))






//GET ALL USERS
router.get('/', (req, res, next) => {
  db.all('SELECT *, ROWID as id FROM USERS;').then((users) => {
    res.format ({

      'text/html': function(){
        res.render('./users/main', {
          users: users
        })
      },
      'application/json': function(){
        console.log(users)
        res.json(users)
      }
    })

  }).catch((errget) => {
      res.send(errget)
  })
})


//GET ADD
router.get('/add', (req, res) => {
  res.render('./users/add')
})


//GET (id) USERS
router.get('/:ROWID', (req, res, next) => {
  db.get(`SELECT *, ROWID as id FROM USERS WHERE id=${req.params.ROWID}`).then((show) => {

    res.render('./users/show', {
      show: show
    })

    console.log(show)
    res.json(show)
  }).catch((errget) => {
      res.send(errget)
  })
})


//GET EDIT USERS
router.get('/:ROWID/edit', (req, res, next) => {
  db.get(`SELECT *, ROWID AS id FROM USERS WHERE id=${req.params.ROWID}`).then((edit) => {

    res.render('./users/edit', {
      edit: edit
    })

    console.log(edit)
    res.json(edit)
  }).catch((errget) => {
      res.send(errget)
  })
})



//POST USERS
router.post('/', (req, res, next) => {

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
    })
  })
  db.run(`INSERT INTO USERS (firstname, lastname, username, password, email, createdAt, updatedAt) VALUES ('${req.body.firstname}','${req.body.lastname}','${req.body.username}','${req.body.password}','${req.body.email}', '${time}', '${time}')`)
  .then((my_User) => {


    res.json('success')
  }).catch((errpost) => {
      res.send(errpost)
  })
  res.redirect(301, '/users')

})



//UPDATE USERS
router.patch('/:ROWID', (req, res, next) => {
  db.run(`UPDATE USERS SET firstname = '${req.body.firstname}', lastname = '${req.body.lastname}', username = '${req.body.username}', password = '${req.body.password}', email = '${req.body.email}', updatedAt = '${time}' WHERE ROWID=${req.params.ROWID}`)
  .then(() => {

    res.json('success')
  }).catch((errput) => {
      res.send(errput)
  })
  res.redirect(301, '/users')
})



// DELETE USERS
router.delete('/:ROWID', (req, res, next) => {
  db.run(`DELETE FROM USERS WHERE ROWID=${req.params.ROWID}`)
  .then((user_Deleted) => {
    console.log('Le user a bien été effacé')
    res.json(user_Deleted)
  }).catch((errdel) => {
      res.send(errdel)
  })
  res.redirect(301, '/users')

})


 router.get('/:ROWID/todos', (req, res, next) => {
   db.all(`SELECT *, ROWID AS id FROM TODOS WHERE userId='${req.params.ROWID}'`)
   .then((todosUser) => {

      res.render('./users/todosUser', {
        todosUser: todosUser
      })

     console.log(todosUser)
     res.json(todosUser)

    }).catch((errget) => {
     res.send(errget)

   })
})


module.exports = router
