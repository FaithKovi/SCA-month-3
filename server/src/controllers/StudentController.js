const mongoose = require('mongoose');
require('../../models/Student');
const Student = mongoose.model('students');
const faker = require('faker');

module.exports = {
    //Get all Students
    get(req, res) {
        Student.find()
            .lean()
            .sort({
                date: 'desc'
            })
            .then(students => {
                res.send(students)
            }).catch(err => {
                console.log(err)
                res.status(500).send({
                    message: 'An error occurred trying to fetch tasks! Try again'
                })
            })
    },
    // Get a Single Student
    show(req, res) {
        Student.findOne({
            _id: req.params.studentId
        }).then(student => {
            res.send(student)
        }).catch(err => {
            res.status(500).send({
                message: "Error fetching student"
            })
        })
    },
    // Add a Course
    addCourse(req, res) {
        console.log(req.body)
        if (req.body.code === undefined) {
            res.send({
                error: true,
                message: "Seems no record was selected"
            })
        } else {
            Student.findOne({
                _id: req.params.studentId
            }).then(() => {
                Student.findOne({
                    _id: req.params.studentId,
                    "courses.code": req.body.code
                }).then(found => {
                    if (found) {
                        console.log('Course Code exists');
                        res.send({
                            exists: true,
                            message: 'This course has already been registered for this user'
                        })
                    } else {
                        console.log('Course Not found! Adding Now!');

                        const newCourse = {
                            code: req.body.code,
                            title: req.body.title,
                            desc: req.body.desc
                        };
                        console.log(newCourse);
                        Student.updateOne({
                            _id: req.params.studentId
                        }, {
                            $push: {
                                courses: [newCourse]
                            }
                        }).then(update => {
                            res.send({
                                message: 'Course Added for this student'
                            });
                        }).catch(err => {
                            console.log(err);
                            res.send({
                                message: 'An error occurred'
                            })
                        })
                    }
                })

            }).catch(error => {
                console.log(error);
            })
        }

    },
}