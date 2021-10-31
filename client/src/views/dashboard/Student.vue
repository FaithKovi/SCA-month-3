<template>
  <div>
    <Nav />
    <div class="container">
      <div class="content-wrapper">
        <div class="crumbs d-flex align-items-center">
          <router-link :to="{ name: 'Dashboard'}">
            Student List
          </router-link> <i class="fa fa-angle-double-right p-1"></i> <span>{{student.firstName}}</span>
        </div>
        <div class="profile">
          <div class="row align-items-center">
            <div class="col-lg-4">
              <img :src="student.imageURL" :alt="student.firstName" class="avatar">
            </div>
            <div class="col-lg-8 info">
              <p><span>First Name:</span> {{student.firstName}}</p>
              <p><span>Last Name:</span> {{student.lastName}}</p>
              <p><span>Email: </span> {{student.email}}</p>
            </div>
          </div>
        </div>
        <div class="">
          <h1 class="app-heading">Courses</h1>
          <div class="row">
            <div class="col-lg-4" v-for="course in getCourses" v-bind:key="course.uuid">
              <div class="course-card">
                <div class="container">
                  <h3 class="title">{{course.title}}</h3>
                  <p class="desc">{{course.desc}}</p>
                  <div class="mt-5 text-right">
                    <span class="enrolled-tag">Enrolled <i class="fa fa-check"></i></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="mt-3 mb-3 d-flex justify-content-center course-card" v-if="isLoading">
                <div class="loader"></div>
              </div>
            </div>

          </div>
        </div>
        <span class="add-course-btn" @click="toggleCourseSelection">
          Register New Course <i class="fa fa-plus p-1"></i>
        </span>
        <div class="add-course" v-if="addingCourse">
          <div class="container">
            <h1 class="app-heading">Add new Course</h1>
            <p class="text-muted">(click to add course)</p>

            <form @submit.prevent="addCourse" class="app-form">
              <div class="row">
                <div v-for="option in availableCourses" :key="option._id" class="col-md-4 col-lg-4 col-sm-4">


                  <label>
                    <input type="radio" id="option.id" name="course" :value="option" v-model="pickedCourse"
                      class="card-input-element" />

                    <div class="card-input">
                      <div class="w-100">
                        <div class="heading">
                          <h4> {{option.title}}</h4>
                        </div>
                        <div class="body">
                          <p> {{option.desc}}</p>
                        </div>
                      </div>
                    </div>


                  </label>
                </div>
              </div>
              <div class="w-100 mt-5 text-center">
                   <div class="mt-3 mb-3 d-flex justify-content-center" v-if="isLoading">
                <div class="loader"></div>
              </div>
                <button type="text" class="app-btn btn btn-lg mr-1">Add Course</button>
                <a type="text" class="app-btn btn btn-lg btn-danger mr-1" @click="toggleCourseSelection()">Cancel</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex';
  import StudentService from '@/services/StudentService';
  import CourseService from '@/services/CourseService';
  import Nav from '@/components/Nav.vue'
  export default {
    name: "Student",
    components: {
      Nav
    },
    data() {
      return {
        student: {},
        pickedCourse: '',
        addingCourse: false,
        isLoading: false,
        availableCourses: []

      }
    },
    head: {
      title: {
        inner: 'Student Admin - Dashboard'
      },
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user'
      ]),
      getCourses() {
        return this.student.courses;
      }
    },
    async mounted() {
      try {
        const studentId = this.$store.state.route.params.studentId;
        this.student = (await StudentService.show(studentId)).data;
        this.availableCourses = (await CourseService.get()).data
      } catch (err) {
        console.log(err);
      }
    },
    methods: {
      addCourse() {
        console.log(this.pickedCourse.title);
        this.isLoading = true
        setTimeout(async () => {
          const newCourse = {
            _id: this.student._id,
            desc: this.pickedCourse.desc,
            title: this.pickedCourse.title,
            code: this.pickedCourse.code
          }
          StudentService.addCourse(newCourse).then(res => {
            if (res.data.exists || res.data.error) {
              console.log(res.data.message);
              this.$swal(`${res.data.message}`);
              this.reset();
            } else {
              this.student.courses.push(newCourse);
               this.reset();
            }

          }).catch(error => {
            console.log(error);
          })
           this.reset();
        }, 3000);

      },
      toggleCourseSelection() {
        if (this.addingCourse) {
          this.addingCourse = false
        } else {
          this.addingCourse = true;
          this.scrollToElement();
        }

      },
      scrollToElement() {
        setTimeout(() => {
          const el = this.$el.getElementsByClassName('add-course')[0];

          if (el) {
            el.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }, 200);

      },
      reset(){
        this.addingCourse = false;
        this.pickedCourse = '';
        this.isLoading = false;
      }
    }
  }
</script>