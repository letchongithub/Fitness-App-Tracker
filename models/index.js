const User = require('./User');
const Workout = require('./Blog');
const Comment = require('./Comment');



User.hasMany(Workout, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Workout.belongsTo(User, {
    foreignKey: 'user_id'
});

Workout.hasMany(Comment, {
    foreignKey: 'blog_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

;

module.exports = { User, Workout, Comment };