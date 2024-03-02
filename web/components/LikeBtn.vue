<template>
  <v-btn flat icon :color="status ? 'pink' : null">
    <v-icon>mdi-heart</v-icon>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      status: false
    }
  },
  methods: {
    async getStatus() {}
  }
}
</script>

<style></style>
