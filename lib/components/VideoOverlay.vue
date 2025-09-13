<template>
  <div :class="{ overlay: true, active: isPaused || isLoading }">
    <h1 :class="{ title: true, active: isPaused }">{{ title }}</h1>
    <div v-show="isLoading" class="spinner">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script lang="ts">
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  name: "VideoOverlay",
  components: {
    LoadingSpinner,
  },
  props: {
    isPaused: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
@container (height < 16rem) {
  .title {
    font-size: 1.5rem;
  }
}
@container (16rem < height < 32rem) {
  .title {
    font-size: 2rem;
  }
}
@container (32rem < height < 64rem) {
  .title {
    font-size: 3rem;
  }
}
@container (64rem < height) {
  .title {
    font-size: 5rem;
  }
}
.overlay {
  pointer-events: none;
  opacity: 0;
  transition: 100ms;

  background-color: var(--overlay-dim-color);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;

  container-type: size;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.overlay.active {
  opacity: 100;
}
.overlay > .title {
  opacity: 0;
  transition: 100ms;

  display: inline-block;
  width: 88%;
  top: 6%;
  left: 4%;
  position: absolute;

  white-space: nowrap;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.overlay > .title.active {
  opacity: 100;
  top: 6%;
  left: 6%;
}
.overlay > .spinner {
  height: 25%;
  aspect-ratio: 1;
}
</style>
