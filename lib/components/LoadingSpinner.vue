<template>
  <span class="loader"></span>
</template>

<!-- https://cssloaders.github.io/ -->
<style scoped>
.loader {
  width: 100%;
  height: 100%;
  border: 0.125rem solid var(--loading-spinner, #fff);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
