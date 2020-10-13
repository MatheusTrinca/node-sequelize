const express = require('express');
const Gig = require('../models/Gig');

const router = express.Router();

// Get gig list
router.get('/', (req, res) => {
  Gig.findAll()
    .then(gigs => {
      res.render('gigs', {
        gigs
      })
    })
    .catch(err => console.log(err));
});

router.get('/add', (req, res) => {
  res.render('add');
});

// Add a gig
router.post('/add', (req, res) => {

  let { title, technologies, budget, description, contact_email } = req.body;
  
  let errors = [];

  if(!title){
    errors.push({text: 'Title is required'});
  }
  if(!technologies){
    errors.push({text: 'At least one technology is required'});
  }
  if(!description){
    errors.push({text: 'Please fill in description field'});
  }
  if(!contact_email){
    errors.push({text: 'Email is required'});
  }

  if(errors.length > 0){
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    })
  }else{
    if(!budget){
      budget = 'Unknown';
    }else{
      budget = `$${budget}`;
    }

    // Deixar minúsculas e remover espaço depois da vírgula
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email
    })
    .then(gig => res.redirect('/gigs'))
    .catch(err => console.log(err));
  }
})

module.exports = router;