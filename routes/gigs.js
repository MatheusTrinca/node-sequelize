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
  const data = {
    title: req.body.title,
    technologies: req.body.technologies,
    budget: req.body.technologies,
    description: req.body.description,
    contact_email: req.body.contact_email
  }
  let { title, technologies, budget, description, contact_email } = data;

  Gig.create({
    title,
    technologies,
    budget,
    description,
    contact_email
  })
  .then(gig => res.redirect('/gigs'))
  .catch(err => console.log(err));

})

module.exports = router;