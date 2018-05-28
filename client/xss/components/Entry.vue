<style>
.entry-card {
  color: #9c9c9c;
  display: flex;
  background: #fff;
  border-bottom: 1px solid rgb(223, 231, 239);
  font-size: 14px;
  padding: 10px;
  box-sizing: border-box;
}
.entry-card-cover {
  flex-shrink: 0;
  height: 60px;
  width: 60px;
  background-size: cover;
}
.entry-card-content {
  width: 100%;
  padding-right: 12px;
}
.entry-card-title {
  font-size: 14px;
  color: #4e4e4e;
  margin: 0;
  font-weight: 400;
  margin-bottom: 10px;
}
.entry-card-tag {
  background: #3F51B5;
  color: #fff;
  padding: 2px 5px;
  font-size: 11px;
}
.entry-card-profile {
  font-size: 12px;
}
.entry-card-profile-highlight {
  color: #3F51B5;
}
</style>

<template>
    <article class="entry-card" @click="touchEntry">
      <div class="entry-card-content">
        <div class="entry-card-profile">
          <span class="entry-card-profile-highlight">
          </span>
          <span>
            {{ entry.createdAt | timeago }}
          </span>
        </div>
        <h2 class="entry-card-title">{{ entry.title }}</h2>
        <!-- <div class="entry-card-tags">
          <span class="entry-card-tag">{{ entry.from }}</span>
        </div> -->
      </div>
      <div class="entry-card-cover" v-if="entry.cover" :style="{ 'background-image': `url('${entry.cover}')` }"></div>
    </article>
</template>

<script>
export default {
  name: 'entry',
  props: {
    entry: Object,
    isMobile: Boolean
  },
  computed: {
    source () {
      const source = this.entry.source
      if (source && source.name) return source.name
      return this.entry.from
    }
  },
  methods: {
    touchEntry (e) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
}
</script>
