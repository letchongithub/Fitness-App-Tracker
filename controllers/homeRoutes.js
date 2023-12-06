const router = require('express').Router();
const { User, Workout, Comment} = require('../models');
const withAuth = require('../utils/auth');

// GET route for the root path or homepage
router.get('/', async (req, res) => {
	try {
		// Retrieve workout blog data with associated usernames
		const workoutData = await Workout.findAll({
			include: [{
				model: User,
				attributes: ['username'],
			},],
		});
		// Map workout blog data to plain JavaScript objects
		const workouts = workoutData.map((workout) => workout.get({
			plain: true
		}));
		// Render the homepage view with workout blog data and logged_in status
		res.render('homepage', {
			workouts,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
// GET route for a specific workout blog endpoint post based on id
router.get('/blog/:id', async (req, res) => {
	try {
		const workoutData = await Workout.findByPk(req.params.id, {
			include: [
				{
				// Including the User model to retrieve the username attribute
					model: User,
					attributes: ['username'],
				}, {
					// Including the Comment model along with its associated User
					model: Comment,
					include: [
						User
					]
				}
			],
		});
		// Converting the Sequelize model instance to a plain JavaScript object
		const blog = workoutData.get({
			plain: true
		});

		console.log(blog)
		// Rendering the workout 'blog' view with the retrieved data and additional information
		res.render('blog', {
			// Spread operator to include data from the blog object
			...blog,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
// GET route for the user dashboard enpoint (requires authentication that you are loggedin)
router.get('/profile', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password']
			},
			include: [{
				model: Workout
			}],
		});
		//convert squelize model instance to plan JS object
		const user = userData.get({
			plain: true
		});
		// Render login dashboard view with user login data
			console.log(user);
		res.render('dashboard', {
			//Spres user properties into view data
			...user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
	// GET route for the login endpoint
  router.get('/login', (req, res) => {
	// check if logged in
    if (req.session.logged_in) {
		// If logged in redirect to dashpoint endpoint
        res.redirect('/profile');
        return;
    }
	// If not logged in, render login view
    res.render('login');
  });

  // GET route for the signup page
  router.get('/signUp', (req, res) => {
	if (req.session.logged_in) {
		// if logged in redirect to dashboard endpoint
		res.redirect('/profile');
		return;
	}
	//if not logged in render the sign up view
	res.render('signUp');
});
module.exports = router;