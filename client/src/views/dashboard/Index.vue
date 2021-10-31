<template>
	<div class="about">
		<Nav />
		<div class="container">
			<div class="content-wrapper">
				<div class="mt-3 mb-3 d-flex justify-content-center" v-if="isLoading">
					<div class="loader"></div>
				</div>
				<div class="col-lg-6 mx-auto student-list">
					<div class="student-list--item" v-for="student in students" :key="student._id">
						<p class="mb-0">{{student.firstName}}  {{student.lastName}}</p>
						<p class="mb-0 small text-muted">Courses Registered {{student.courses.length}}</p>
						<div class="mt-3 text-right">
						<router-link class="app-link" :to="{ name: 'Student', params: { studentId:student._id}}">View <i class="fa fa-long-arrow-right"></i></router-link>
						</div>
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
	import Nav from '@/components/Nav';
	import StudentService from '@/services/StudentService';
	export default {
		name: 'Dashboard',
		data() {
			return {
				students: [],
				isLoading: true,
			}
		},
		components: {
			Nav
		},
		head: {
			title: {
				inner: 'Student Admin - Dashboard'
			},
		},
		mounted() {
			setTimeout(async () => {
				this.students = (await StudentService.get()).data;
				this.isLoading = false;
			}, 3000);

		},
		computed: {
			...mapState([
				'isUserLoggedIn',
				'user'
			])
		},

	}
</script>