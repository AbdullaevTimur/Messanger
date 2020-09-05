<template>
  <div class="dialog" :class="{ 'dialog_selected': selected }">
    <div class="dialog__headline headline">
      <div class="headline__subject">{{ src.subject }}</div>
      <div class="headline__date">{{ getDialogDisplayDatetime(lastMessage.created) }}</div>
    </div>
    <v-clamp
      autoresize
      :max-lines="maxLines"
      class="dialog__message"
    >
      {{ lastMessage.text }}
    </v-clamp>
  </div>
</template>

<script>
import VClamp from 'vue-clamp'
import { getDialogDisplayDatetime } from '@/mixins/datetime'

export default {
  name: 'Dialog',
  props: {
    src: {
      type: Object,
      default: () => {}
    },
    selected: {
      type: Boolean,
      default: false
    },
    maxLines: {
      type: Number,
      default: 2
    }
  },
  components: {
    VClamp
  },
  mixins: [
    getDialogDisplayDatetime
  ],
  computed: {
    lastMessage () {
      return this.src.parts[this.src.parts.length - 1]
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  position: relative;
  padding: 20px 20px 20px 23px;

  &__message {
    font-size: 13px;
    line-height: 18px;
    color: var(--color-darkgray);
  }
}

.dialog_selected {
  background-color: var(--color-white);

  &:before {
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    background-color: var(--color-blue);
    content: '';
  }
}

.headline {
  display: flex;
  justify-content: space-between;

  &__subject {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  &__date {
    font-size: 10px;
    text-transform: uppercase;
    color: var(--color-gray);
    margin-left: 10px;
  }
}
</style>
