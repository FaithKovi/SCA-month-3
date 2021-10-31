import Api from '@/services/Api'
export default {
    get() {
        return Api().get(`students/get`);
    },
    show(studentId) {
        return Api().get(`student/get/${studentId}`);
    },
    addCourse(student) {
        return Api().put(`student/add-course/${student._id}`, student);
    },
}