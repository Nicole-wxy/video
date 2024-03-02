<template>
  <div class="pa-3">
    <like-btn type="Course" :object="course._id"></like-btn>
    <h3>{{ course.name }}</h3>
    <v-select
      v-model="currentIndex"
      :items="course.episodes.map((v, i) => ({ text: v.name, value: i }))"
    ></v-select>
    <video width="100%" :src="episode.file" controls></video>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn.vue'
export default {
  components: {
    LikeBtn
  },
  async asyncData({ $axios, params }) {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' }
      }
    })
    return {
      id,
      course
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    episode() {
      return this.course.episodes[this.currentIndex]
    }
  }
}
</script>

<style></style>
