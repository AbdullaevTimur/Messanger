<template>
  <div class="message" :class="{ 'message_user': fromUser }" v-if="src">
    <div class="message__body">
      <div class="message__text">{{ src.text }}</div>
      <div class="message__information information">
        <div class="information__name">{{ src.author }}</div>
        <div class="information__date">{{ getMessageDisplayDatetime(src.created) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMessageDisplayDatetime } from '@/mixins/datetime'

export default {
  name: 'Message',
  props: {
    src: {
      type: Object,
      default: () => {}
    }
  },
  mixins: [
    getMessageDisplayDatetime
  ],
  computed: {
    // Используем mapState для получения перменных из "центрального хранилища".
    ...mapState([
      'user'
    ]),
    fromUser () {
      return this.src.author === this.user.login
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  position: relative;
  width: 100%;

  .message__body {
    display: inline-block;
    position: relative;
    max-width: 66.6%;

    & > *:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  .message__text {
    display: block;
    padding: 21px 21px 16px 22px;
    border-radius: 8px;
    font-size: 14px;
    background-color: var(--color-lightgray);
  }
}

.message_user {
  text-align: right;

  .message__information {
    justify-content: flex-end;
  }
}

.information {
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 10px;
  }

  &__name {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-black);
  }

  &__date {
    font-size: 10px;
    color: var(--color-gray);
  }
}
</style>
