const router = require('express').Router()
const db = require('sqlite');
let override = require('method-override');
let dateTime = require('node-datetime');
let dt = dateTime.create();
const moment = require('moment');
//let time = dt.format('m/d/Y H:M:S');

let time = moment().calendar();


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
        res.json({message :'success'});
      }
    })

  }).catch((errget) => {
      res.send(errget)
  })
})



//
//
// res.format({
//
//             'text/html': function(){
//                 res.render('index.pug', {
//                     todo: rows
//                 })
//               },
//
//             'application/json': function(){
//                 res.json(rows);
//               }
//         })

//GET ADD
router.get('/add', (req, res) => {
  res.render('./todos/add')
})


//GET (ID) TODOS
router.get('/:ROWID', (req, res, next) => {
  db.get(`SELECT *, ROWID AS id FROM TODOS WHERE id=${req.params.ROWID }`).then((show) => {

    res.render('./todos/show', {
      show: show
    })

    console.log(show)
    res.json(show)
  }).catch((errget) => {
      res.send(errget)
  })
})


//GET (ROWID) TODOS EDIT
router.get('/:ROWID/edit', (req, res, next) => {
  db.get(`SELECT *, ROWID AS id FROM TODOS WHERE id=${req.params.ROWID}`).then((edit) => {

    res.render('./todos/edit', {
      edit: edit
    })

    console.log(edit)
    res.json(edit)
  }).catch((errget) => {
      res.send(errget)
  })
})





//POST TODOS
router.post('/', (req, res, next) => {
  db.run(`INSERT INTO TODOS (message, completion, createdAt, updatedAt, userId) VALUES ('${req.body.message}','${req.body.completion}', '${time}', '${time}', '${req.body.userId}')`)
  .then((my_Todo) => {


    res.json('success')
  }).catch((errpost) => {
      res.send(errpost)
  })
  res.redirect(301, '/todos')

})


//UPDATE TODOS
router.patch('/:ROWID', (req, res, next) => {
  db.run(`UPDATE TODOS SET message = '${req.body.message}', completion = '${req.body.completion}', userId = '${req.body.userId}', updatedAt = '${time}' WHERE ROWID=${req.params.ROWID}`)
  .then(() => {

     res.json('success')
  }).catch((errput) => {
      res.send(errput)
  })
  res.redirect(301, '/todos')

})


// DELETE TODOS
router.delete('/:ROWID', (req, res, next) => {
  db.run(`DELETE FROM TODOS WHERE ROWID=${req.params.ROWID}`)
  .then((todo_Deleted) => {
    console.log('La todo a bien été effacé')
    res.json(todo_Deleted)
  }).catch((errdel) => {
    res.send(errdel)
  })
    res.redirect(301, '/todos')
})























module.exports = router
