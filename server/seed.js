// const faker = require('faker');
// const mongoose = require('mongoose');
// require('./models/Student.js');
// require('./models/Course.js');
// const Student = mongoose.model('students');
// const Course = mongoose.model('courses');
// require('dotenv').config();
// mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         // Ensure MongoDB Connection is successful
//         const connectionState = mongoose.connection.readyState;
//         if (connectionState === 1) {
//             console.log('MongoDB Connected');
//         } else {
//             console.log('MongoDB Failed to connect');
//         }
//     })
//     .catch((err) => {
//         console.log(err)
//     });

// const seedStudents = () => {
//     const quantity = 10;
//     const students = [];
//     for (let x = 0; x < quantity; x++) {
//         students.push(
//             new Student({
//                 firstName: faker.name.firstName(),
//                 lastName: faker.name.lastName(),
//                 email: faker.internet.email(),
//                 imageURL: faker.image.imageUrl(),
//                 courses: [{
//                         code: faker.random.uuid(),
//                         desc: 'Learn the basics of javascript',
//                         title: 'Javascript for Beginners'
//                     },
//                     {
//                         code: faker.random.uuid(),
//                         desc: 'Learn the basics of JVM',
//                         title: 'JVM for Beginners'
//                     },
//                     {
//                         code: faker.random.uuid(),
//                         desc: 'Learn the basics of React',
//                         title: 'React for Beginners'
//                     },
//                     {
//                         code: faker.random.uuid(),
//                         desc: 'Learn the basics of HTML',
//                         title: 'HTML for Beginners'
//                     },
//                     {
//                         code: faker.random.uuid(),
//                         desc: 'Learn the basics of Vue',
//                         title: 'Vue for Beginners'
//                     },
//                 ]
//             })
//         )
//     }
//     students.forEach(student => {
//         Student.create(student).then(student => {
//             console.log('Student Added to Database');
//         }).catch(error => {
//             console.log(error)
//         })
//     })
// };
// const seedCourses = () => {
//     const quantity = 6;
//     const courses = [];
//     for (let x = 0; x < quantity; x++) {
//         courses.push(
//             new Course({

//                 code: faker.random.uuid(),
//                 desc: faker.lorem.paragraph(),
//                 title: faker.lorem.word()

//             })
//         )
//     }
//     courses.forEach(course => {
//         Course.create(course).then(course => {
//             console.log('Course Added to Database');
//             console.log('Process Completed, press CTRL + C to cancel');
//         }).catch(error => {
//             console.log(error)
//         })
//     })
// }

// seedStudents();
// seedCourses();