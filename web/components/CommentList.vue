<template>
  <v-card flat tile class="pa-3">
    <v-form @submit.prevent="send">
      <v-text-field
        v-model="content"
        label="说点啥吧"
        required
        append-icon="mdi-send"
        @click:append="send"
      >
      </v-text-field>
    </v-form>
    评论列表
    <v-list two-line>
      <v-list-item v-for="(item, i) in comments" :key="i">
        <v-list-item-avatar color="blue">
          <span class="white--text">{{
            item.user.username[0].toUpperCase()
          }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.content }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ item.user.username }}
            {{ item.createdAt }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    object: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      content: null,
      comments: []
    }
  },
  watch: {
    object: {
      handler: 'fetch',
      immediate: true
    }
  },
  methods: {
    async send() {
      await this.$axios.$post('comments', {
        type: this.type,
        object: this.object,
        content: this.content
      })
      this.content = null
      await this.fetch()
    },
    async fetch() {
      this.comments = await this.$axios.$get('comments', {
        params: {
          query: {
            where: {
              type: this.type,
              object: this.object
            }
          }
        }
      })
    }
  }
}
</script>

<style></style>
