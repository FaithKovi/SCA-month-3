const mongoose = require('mongoose');
require('../../models/Course');
const Course = mongoose.model('courses');


module.exports = {
    //Get all Courses
    get(req, res) {
        Course.find()
            .lean()
            .sort({
                date: 'desc'
            })
            .then(courses => {
                res.send(courses)
            }).catch(err => {
                console.log(err)
                res.status(500).send({
                    message: 'An error occurred trying to fetch tasks! Try again'
                })
            })
    },

}