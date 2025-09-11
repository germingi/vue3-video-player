<template>
  <div :class="{ overlay: true, active: isPaused || isLoading }">
    <h1 :class="{ active: isPaused }">{{ title }}</h1>
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
  font-size: 3ch;
}
.overlay.active {
  opacity: 100;
}
.overlay > h1 {
  opacity: 0;
  transition: 100ms;
  top: 8%;
  left: 6%;
  position: absolute;
}
.overlay > h1.active {
  opacity: 100;
  top: 6%;
}
.overlay > .spinner {
  height: 25%;
  aspect-ratio: 1;
}
</style>
