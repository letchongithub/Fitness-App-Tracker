const router = require('express').Router();
const { Workout } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new workout blog post to the root path (requires authentication - means your loggedIn)
router.post('/', withAuth, async (req, res) => {
    try {
      const newWorkout = await Workout.create({
        // Spread operator to include properties from the request body
        ...req.body,
        // Setting the user_id for the workout blog entry based on the user session
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newWorkout);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  // Route to delete a post by ID from the root path (requires authentication - means your loggedIn)
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const workoutData = await Workout.destroy({
        where: {
          // Deleting the workout blog with the specified id
          id: req.params.id,
          // Setting that the user_id matches the user's session
          user_id: req.session.user_id,
        },
      });
  
      if (!workoutData) {
        res.status(404).json({ message: '404 Blog ID not found' });
        return;
      }
  
      res.status(200).json(workoutData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;