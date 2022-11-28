const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const stratSeed = require('./models/strats.js')
const Strata = require('./models/schema.js')


//NEW ROUTE
app.get('/strats/new', (req, res)=>{
    res.render('new.ejs')
})

//CREATE ROUTE
app.post('/strats/', (req, res)=>{
    Strata.create(req.body, (error, createdStrat)=>{
        res.redirect('/strats')
    })
})

//INDEX ROUTE
app.get('/strats', (req, res)=>{
    Strata.find({}, (error, allStrats)=>{
        res.render('index.ejs', {
            strats: allStrats
        })
    }) 
})

//SHOW ROUTE
app.get('/strats/:id', (req, res)=>{
    Strata.findById(req.params.id, (err, foundStrat)=>{
        res.render('show.ejs', {
            submission: foundStrat
        })
    })
})

//DELETE ROUTE
app.delete('/strats/:id', (req, res)=>{
    Strata.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/strats')
    })
})

//EDIT ROUTE
app.get('/strats/:id/edit', (req, res)=>{
    Strata.findById(req.params.id, (err, foundStrat)=>{
        res.render(
            'edit.ejs',
            {
                edit: foundStrat
            }
        )
    })
})

//UPDATE ROUTE
app.put('/strats/:id', (req, res)=>{
    Strata.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel)=>{
        res.redirect('/strats')
    })
})









//SEED ROUTE
// Strata.create(stratSeed, (error, createdStrategies)=> {
//     console.log('success')
// })



app.listen(3000, ()=>{
    console.log('M E T A N O I A');
});

mongoose.connect('mongodb://localhost:27017/Metanoia', () => {
  console.log('The connection with mongod is established')
})