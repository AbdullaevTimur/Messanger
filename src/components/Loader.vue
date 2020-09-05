<template>
  <div
    class="loader"
    :class="{
      'loader_fullscreen': fullscreen,
      'loader_dark': dark,
    }"
  >
    <div class="loader__mask" v-if="fullscreen"/>
    <div class="loader__body" :class="{ 'loader_dark': dark }">
      <span v-for="(item, key) in 3" :key="key"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &__mask {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(black, 0.5);
  }

  &__body {
    position: relative;
    margin: 0 -3px;

    span{
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 100%;
      background-color: var(--color-white);
      margin: 3px;

      &:nth-child(1){
        animation: bounce 1s ease-in-out infinite;
      }

      &:nth-child(2){
        animation: bounce 1s ease-in-out 0.33s infinite;
      }

      &:nth-child(3){
        animation: bounce 1s ease-in-out 0.66s infinite;
      }
    }
  }
}

.loader_fullscreen {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
}

.loader_dark {
  .loader__mask {
    background-color: rgba(white, 0.8) !important;
  }

  .loader__body {
    span {
      background-color: var(--color-blue);
    }
  }
}

@keyframes bounce{
  0%, 75%, 100%{
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
  }

  25%{
    -webkit-transform: translateY(-6px);
    -ms-transform: translateY(-6px);
    -o-transform: translateY(-6px);
    transform: translateY(-6px);
  }
}
</style>
