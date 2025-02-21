<script setup lang="ts">
import VideoPlayer from "../dist/video-player";
import "../dist/video-player.css";
</script>

<template>
  <div class="video-player-container">
    <VideoPlayer
      video-url="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    />
  </div>
</template>

<style scoped>
.video-player-container {
  display: flex;
  align-items: center;
}
</style>
