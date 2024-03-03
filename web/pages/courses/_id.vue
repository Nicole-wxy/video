<template>
  <div class="pa-3">
    <v-row>
      <v-col :md="8">
        <video width="100%" :src="episode.file" controls></video>
        <like-btn type="Course" :object="course._id"></like-btn>
        <h3>{{ course.name }}</h3>
        <v-select
          v-model="currentIndex"
          :items="course.episodes.map((v, i) => ({ text: v.name, value: i }))"
        ></v-select>
      </v-col>
      <v-col :md="4">
        <comment-list type="Episode" :object="episode._id"></comment-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn.vue'
import CommentList from '../../components/CommentList.vue'
export default {
  components: {
    LikeBtn,
    CommentList
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
