const router = require('express').Router()
const db = require('sqlite');
let override = require('method-override');
let dateTime = require('node-datetime');
let dt = dateTime.create();
let time = dt.format('m/d/Y');
let alert = require('alert-node');
const bcrypt = require('bcryptjs');

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
        res.json(users)
      }
    })

  }).catch((errget) => {
      res.send(errget)
  })
})


//GET ADD
router.get('/add', (req, res) => {
  res.format({

    'text/html': function(){
      res.render('./users/add')
    }
  })
})


//GET (ID) USERS
router.get('/:ROWID', (req, res, next) => {
  db.get(`SELECT *, ROWID as id FROM USERS WHERE id=${req.params.ROWID}`).then((show) => {
    res.format({

      'text/html': function(){
        res.render('./users/show', {
          show: show
        })
      },

      'application/json': function(){
        res.json(show)
      }
    })

  }).catch((errget) => {
      res.send(errget)
  })
})


//GET EDIT USERS
router.get('/:ROWID/edit', (req, res, next) => {
  db.get(`SELECT *, ROWID AS id FROM USERS WHERE id=${req.params.ROWID}`).then((edit) => {
    res.format({

      'text/html': function(){
        res.render('./users/edit', {
          edit: edit
        })
      }
    })
  }).catch((errget) => {
      res.send(errget)
  })
})


//POST USERS
router.post('/', (req, res, next) => {
  let psw = bcrypt.hashSync(req.body.password, 10);
  if (req.body.firstname !== '' && req.body.lastname !== '' && req.body.username !== '' && req.body.email != '' && req.body.password !== '') {

    db.run(`INSERT INTO USERS (firstname, lastname, username, password, email, createdAt, updatedAt) VALUES ('${req.body.firstname}','${req.body.lastname}','${req.body.username}','${psw}','${req.body.email}', '${time}', '${time}')`).then((my_User) => {
      res.format({

        'text/html': function(){
          res.redirect(301, '/users')
        },

        'application/json': function(){
          res.json('success')
        }
      })

    }).catch((errpost) => {
        res.send(errpost)
    })
  }

  else {
    alert('Please fill all fields')
    res.redirect(301, '/users/add')
  }
})



//UPDATE USERS
router.patch('/:ROWID', (req, res, next) => {
  let psw = bcrypt.hashSync(req.body.password, 10);
  if (req.body.firstname !== '' && req.body.lastname !== '' && req.body.username !== '' && req.body.email != '' && req.body.password !== '') {
    db.run(`UPDATE USERS SET firstname = '${req.body.firstname}', lastname = '${req.body.lastname}', username = '${req.body.username}', password = '${psw}', email = '${req.body.email}', updatedAt = '${time}' WHERE ROWID=${req.params.ROWID}`).then(() => {
      res.format({

        'text/html': function(){
          res.redirect(301, '/users')
        },
        'application/json': function(){
          res.json('success')
        }
      })

    }).catch((errput) => {
        res.send(errput)
    })
  }
  else{
    alert('Please fill all fields')
    res.redirect(301, '/users')
  }
})



// DELETE USERS
router.delete('/:ROWID', (req, res, next) => {
  db.run(`DELETE FROM USERS WHERE ROWID=${req.params.ROWID}`).then((user_Deleted) => {
    res.format({

      'text/html': function(){
        res.redirect(301, '/users')
      },
      'application/json': function(){
        res.json('success')
      }
    })

  }).catch((errdel) => {
      res.send(errdel)
  })

})

// GET THE USERS' TODOS
router.get('/:ROWID/todos', (req, res, next) => {
  db.all(`SELECT *, ROWID AS id FROM TODOS WHERE userId='${req.params.ROWID}'`).then((todosUser) => {
    res.format({

      'text/html': function(){
        res.render('./users/todosUser', {
          todosUser: todosUser
        })
      },

      'application/json': function(){
        res.json(todosUser)
      }
    })

  }).catch((errget) => {
    res.send(errget)
  })
})


module.exports = router
