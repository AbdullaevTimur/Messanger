<template>
  <section class="messanger">
    <aside class="messanger__aside">
      <div class="messanger__meta meta">
        <div class="meta__title">{{ labels.title }}</div>
        <div class="meta__count">{{ allMessagesNumber }}</div>
      </div>
      <div class="messanger__items">
        <Dialog
          v-for="(dialog, index) in sortedDialogs"
          :key="index"
          :src="dialog"
          :selected="selected.id === dialog.id"
          @click.native="openChat(dialog)"
          class="messanger__item"
        />
      </div>
    </aside>
    <main class="messanger__main">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </main>
  </section>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import { mapState } from 'vuex'
import { getTimestamp } from '@/mixins/datetime'

export default {
  name: 'Messanger',
  components: {
    Dialog
  },
  mixins: [
    getTimestamp
  ],
  computed: {
    // Используем mapState для получения перменных из "центрального хранилища".
    ...mapState([
      'dialogs'
    ]),
    sortedDialogs () {
      // Определяем переменую "dialogs" в новую константу для того чтобы изьежать "side effect-а".
      const arr = this.dialogs
      // Сортируем массив по "timestamp", который получаем из переменых аргумента.
      return arr.sort((a, b) => {
        const dateA = this.getTimestamp(a)
        const dateB = this.getTimestamp(b)
        return dateA < dateB
      })
    },
    id () {
      // Переопределяем тип переменой "id" в "number", так как в параметрах она хранится в виде "string".
      return parseInt(this.$route.params.id)
    },
    allMessagesNumber () {
      // высчитываем общее кол-во сообшений из всех чатов.
      return this.dialogs.reduce((acc, cur) => acc + cur.parts.length, 0)
    }
  },
  data () {
    return {
      labels: {
        title: 'Сообещния'
      },
      selected: {}
    }
  },
  methods: {
    openChat (dialog) {
      // Определяем монитруемый "диалог", в качестве "текущего" (selected).
      this.selected = dialog
      // Проверяем есть ли необходимость, осуществлять переход. Предотвращаем ошибку vue-router(а)
      if (this.id !== dialog.id) {
      // Открываю чат и монтирую выбранный диалог по "Id".
        this.$router.push({
          name: 'Chat',
          params: {
            id: dialog.id
          }
        })
      }
    },
    initMessanger () {
      if (this.dialogs.length > 0) {
        let index = this.dialogs.findIndex(x => x.id === this.id)
        // В случае если диалог не найден, монтируем самый последний.
        if (index < 0) index = 0
        // Монтируем чат.
        this.openChat(this.dialogs[index])
      }
    }
  },
  mounted () {
    this.initMessanger()
  }
}
</script>

<style lang="scss" scoped>
.messanger {
  display: flex;
  width: 100%;
  height: 100vh;

  &__aside {
    order: 1;
    flex-grow: 0;
    flex-shrink: 0;
    width: 300px;
    background-color: var(--color-lightgray);
  }

  &__main {
    order: 1;
    flex-grow: 1;
    flex-shrink: 1;
    background-color: var(--color-white);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  &__meta {
    padding: 20px 24px;
    font-size: 14px;
  }

  &__items {
    border-top: 1px solid rgba(black, 0.05)
  }

  &__item {
    cursor: pointer;
  }
}

.meta {
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 10px;
  }

  &__title {
    color: var(--color-darkgray);
  }

  &__count {
    color: var(--color-gray);
  }
}
</style>
