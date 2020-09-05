<template>
  <section class="chat">
    <main class="chat__window" ref="window">
      <Loader
        v-show="!inited"
        :dark="true"
        :fullscreen="true"
        class="chat__loader"
      />
      <div class="chat__messages">
        <div class="chat__group group" v-for="(group, date) in groupedMessages" :key="date">
          <div class="group__date">{{ getDialogDisplayDatetime(date) }}</div>
          <Message
            v-for="(msg, index) in group"
            :key="index"
            :src="msg"
            class="group__message"
          />
        </div>
      </div>
    </main>
    <footer class="chat__footer footer">
      <div class="footer__text" @click.capture="focusOnInput">
        <textarea
          ref="input"
          v-autosize="text"
          v-model="text"
          :placeholder="labels.placeholder"
          :disabled="loading || !inited"
          class="footer__input"
          rows="1"
        />
      </div>
      <div
        class="footer__button footer__button_submit"
        :class="{ 'footer__button_disable': !text || loading || !inited }"
        @click="send"
      >
        <Loader v-if="loading"/>
        <img v-else class="footer__icon" src="@/assets/icons/send.svg"/>
      </div>
    </footer>
  </section>
</template>

<script>
import Message from '@/components/Message.vue'
import { mapState } from 'vuex'
import { getDateInStringFormat, getDialogDisplayDatetime } from '@/mixins/datetime'

const TIMEOUT = 2000

export default {
  name: 'Chat',
  components: {
    Message,
    Loader: () => import('@/components/Loader.vue')
  },
  mixins: [
    getDateInStringFormat,
    getDialogDisplayDatetime
  ],
  computed: {
    // Используем mapState для получения перменных из "центрального хранилища".
    ...mapState([
      'user'
    ]),
    id () {
      // Получаем параметр "id" из мараметров монитрованной страницы
      // Небходимо изменять тип данных, т.к. в параметрах храниться в формате строки.
      return parseInt(this.$route.params.id)
    },
    messages () {
      // Получаю список писем из "центрального хранилища."
      return this.$store.getters.getMessages(this.id)
    },
    groupedMessages () {
      return this.groupByDate(this.messages, 'created')
    }
  },
  data () {
    return {
      labels: {
        placeholder: 'Введите текст...'
      },
      text: '',
      inited: false,
      loading: false
    }
  },
  methods: {
    initWindowLoader () {
      this.inited = false // Сбрасываем состояние к стандартному "false".
      setTimeout(() => {
        this.inited = true // Назначяем состояние в переменной "inited" в "true".

        // Ждем обновления DOM-а и фокусируемся на поле ввода.
        this.$nextTick(() => {
          this.focusOnInput()
        })
      }, TIMEOUT)
    },
    groupByDate (collection, prop) {
      return collection.reduce((groups, item) => {
        // Так как мы знаем, что мы сортируем по дате в формате "YYYY-MM-DD HH:mm:ss", то мы отризаем вторую часть от строки функцией "split".
        const val = item[prop].split(' ')[0]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
      }, {})
    },
    focusOnInput () {
      this.$refs.input.focus()
    },
    send () {
      const { id, text } = this
      // Проверяем есть ли текст в поле ввода. Если "Нет", то прекращаем выполнение функции.
      if (!text) return
      // Включаем "лоудер".
      this.loading = true
      // Подготавливаем объек "сообщения".
      const message = {
        author: this.user.login,
        created: this.getDateInStringFormat(),
        text
      }
      // Выполняем искуственную задержу для "тестового задания".
      setTimeout(async () => {
        try {
          // Добавляем новое сообщение через "ыентральное хранилище".
          await this.$store.dispatch('send', { message, id })
        } catch (e) {
          // Вводитиь ошибку, хотя бы в console.log, считается хорошей практикой!
          console.log(e)
        } finally {
          // Выключаем "лоудер".
          this.loading = false
          // Прокрусиваем лист к последнему сообщению.
          this.$refs.window.scrollTop = this.$refs.window.scrollHeight
          // Очищаем поле ввода.
          this.text = ''
        }
      }, TIMEOUT)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.initWindowLoader()
    })
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.initWindowLoader()
  }
}
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  &__window {
    position: relative;
    order: 1;
    height: 100%;
    overflow-y: auto;
  }

  &__messages {
    display: block;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 23px;
    max-height: 100%;
  }

  &__footer {
    order: 2;
    flex-grow: 0;
    flex-shrink: 0;
  }
}

.footer {
  display: flex;
  align-items: stretch;
  align-content: stretch;

  &__text {
    order: 1;
    flex-grow: 1;
    flex-shrink: 1;

    border-top: 1px solid var(--color-puregray);
    padding: 0 39px;
    max-height: 120px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &__input {
    width: 100%;
    border: none;
    font-family: 'Norms';
    font-size: 14px;
    margin: 30px 0;

    &:focus {
      outline: none;
    }

    &:disabled {
      background-color: transparent;
    }
  }

  &__button {
    order: 2;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: var(--color-blue);

    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 80px;
    min-height: 80px;
    cursor: pointer;
  }
}

.footer__button_disable {
  opacity: 0.7;
  pointer-events: none;
}

.group {
  &__date {
    width: 100%;
    margin: 24px 0;
    font-size: 11px;
    color: var(--color-blue);
    text-align: center;
    text-transform: uppercase;
  }

  &__message {
    margin-bottom: 20px;
  }
}
</style>
