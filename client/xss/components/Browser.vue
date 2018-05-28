<style>
.browser-box {
  font-family: "Helvetica Neue", "Helvetiva", "Arial";
  box-shadow: 1px 2px 6px 1px #0000002b;
  width: 100%;
  border-radius: 5px;
  border-top: 1px solid #eee;
  min-width: 450px;
  margin: 0 auto 10px;
}
.browser-box-nav {
  display: flex;
  background: #dddddd;
  height: 40px;
  border-radius: 5px 5px 0 0;
  padding: 0 8px;
  position: relative;
}
.browser-box-actions {
  display: flex;
  padding: 14px 5px;
}
.browser-box-action-btn {
  width: 12px;
  height: 12px;
  border-radius: 10px;
  margin-right: 8px;
  display: block;
  background: #ccc;
}
.browser-box-action-btn.red {
  background: #ff5555;
  border: 1px solid #dd2222;
}
.browser-box-action-btn.green {
  background: #55ff55;
  border: 1px solid #22dd22;
  margin-right: 0;
}
.browser-box-action-btn.orange {
  background: #ffa500;
  border: 1px solid #dd9500;
}
.browser-box-address {
  width: 100%;
  padding: 5px;
}
.browser-box-url {
  text-align: left;
  background: white;
  overflow: hidden;
  white-space: nowrap;
  color: #666;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #bbb;
  margin: 3px 0;
}
.browser-box-body {
  min-height: 200px;
  overflow: auto;
  height: calc(100% - 40px);
}
</style>

<template>
  <div class="browser-box">
    <div class="browser-box-nav">
      <div class="browser-box-actions">
        <span class="browser-box-action-btn red"></span>
        <span class="browser-box-action-btn orange"></span>
        <span class="browser-box-action-btn green"></span>
      </div>
      <div class="browser-box-address browser-box-url">
        {{ url }}
      </div>
    </div>
    <div class="browser-box-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    url () {
      if (this.$route) return decodeURIComponent(window.location)
      decodeURIComponent(window.location)
    }
  }
}
</script>