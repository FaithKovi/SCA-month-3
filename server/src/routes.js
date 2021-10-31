const AuthController = require('./controllers/AuthController');
const StudentController = require('./controllers/StudentController');
const CourseController = require('./controllers/CourseController');
const isAuth = require('../helpers/isAuth.js');
module.exports = (app) => {
    app.get('/', (req, res) => {
        res.json({
            message: 'App running',
            status: 'Ok'
        })
    });
    //Handle Registeration Request
    app.post('/register', AuthController.register);
    // Handle Login Request
    app.post('/login', AuthController.login);
    //Handle Student Get Request
    app.get('/students/get', isAuth, StudentController.get);
    // Get a single Student
    app.get('/student/get/:studentId', isAuth, StudentController.show);
    app.put('/student/add-course/:studentId', isAuth, StudentController.addCourse);

    //Get All courses
    app.get('/courses/get', isAuth, CourseController.get);
}