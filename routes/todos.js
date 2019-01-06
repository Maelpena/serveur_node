const router = require('express').Router()
const db = require('sqlite');
let override = require('method-override');
let dateTime = require('node-datetime');
let dt = dateTime.create();
let time = dt.format('m/d/Y');
let alert = require('alert-node');

router.use(override('_override'))



//GET ALL TODOS
router.get('/', (req, res, next) => {
  db.all('SELECT *, ROWID as id FROM TODOS;').then((todos) => {
    res.format({

      'text/html': function(){
        res.render('./todos/main', {
          todos: todos
        })
      },

      'application/json': function(){
        res.json(todos);
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
      res.render('./todos/add')
    }
  })
})


//GET (ID) TODOS
router.get('/:ROWID', (req, res, next) => {
  db.get(`SELECT *, ROWID AS id FROM TODOS WHERE id=${req.params.ROWID}`).then((show) => {
    res.format({

      'text/html': function(){
        res.render('./todos/show', {
          show: show
        })
      },

      'application/json': function(){
        res.json(show);
      }
    })

  }).catch((errget) => {
      res.send(errget)
  })
})


//GET EDIT TODOS
router.get('/:ROWID/edit', (req, res, next) => {
  db.get(`SELECT *, ROWID AS id FROM TODOS WHERE id=${req.params.ROWID}`).then((edit) => {
    res.format({

      'text/html': function(){
        res.render('./todos/edit', {
          edit: edit
        })
      }
    })

  }).catch((errget) => {
      res.send(errget)
  })
})





//POST TODOS
router.post('/', (req, res, next) => {
  if (req.body.message !== '') {
    db.run(`INSERT INTO TODOS (message, completion, createdAt, updatedAt, userId) VALUES ('${req.body.message}','${req.body.completion}', '${time}', '${time}', '${req.body.userId}')`).then((my_Todo) => {
      res.format({

        'text/html': function(){
          res.redirect(301, '/todos')
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
    alert('Please fill all fields');
    res.redirect(301, '/todos/add')
  }
})


//UPDATE TODOS
router.patch('/:ROWID', (req, res, next) => {
  if (req.body.message !== '') {
    db.run(`UPDATE TODOS SET message = '${req.body.message}', completion = '${req.body.completion}', userId = '${req.body.userId}', updatedAt = '${time}' WHERE ROWID=${req.params.ROWID}`).then(() => {
      res.format({

        'text/html': function(){
          res.redirect(301, '/todos')
        },

        'application/json': function(){
          res.json('success')
        }
      })

    }).catch((errput) => {
        res.send(errput)
    })
  }
  else {
    alert('Please fill all fields');
    res.redirect(301, '/todos')
  }
})


// DELETE TODOS
router.delete('/:ROWID', (req, res, next) => {
  db.run(`DELETE FROM TODOS WHERE ROWID=${req.params.ROWID}`).then(() => {
    res.format({

      'text/html': function(){
        res.redirect(301, '/todos')
      },

      'application/json': function(){
        res.json('success')
      }
    })
  }).catch((errdel) => {
    res.send(errdel)
  })
})


module.exports = router
