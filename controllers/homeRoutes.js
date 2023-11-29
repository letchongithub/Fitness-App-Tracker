const router = require('express').Router();
const { User } = require(('../models'));
// const withAuth = require('../utils/auth');
    
    
    // GET route for the login page
    router.get('/login', (req, res) => {
        if (req.session.logged_in) {
            // res.redirect('/dashboard');
            return;
        }
    
        res.render('login');
      });
    
      // GET route for the signup page
      router.get('/signUp', (req, res) => {
        if (req.session.logged_in) {
            // res.redirect('/dashboard');
            return;
        }
        res.render('signUp');
    });
    module.exports = router;