export const getDialogDisplayDatetime = {
  methods: {
    // Пиведение даты и времени в "локальный формат" времени
    getDialogDisplayDatetime (date) {
      const dt = new Date(date)
      const options = { day: 'numeric', month: 'short', year: 'numeric' }
      const locale = 'ru-RU'
      return dt.toLocaleDateString(locale, options)
    }
  }
}

export const getMessageDisplayDatetime = {
  methods: {
    // Для корректного отображения времени "пользователю". Привидение в общий формат.
    getMessageDisplayDatetime (date) {
      const dt = date.split(':')
      return `${dt[0]}:${dt[1]}`
    }
  }
}

export const getDateInStringFormat = {
  methods: {
    // Получение текущей даты и времени в виде строки.
    getDateInStringFormat () {
      const d = new Date()
      const date = d.toISOString().split('T')[0]
      const time = d.toTimeString().split(' ')[0]
      return `${date} ${time}`
    }
  }
}

export const getTimestamp = {
  methods: {
    // Получение timestampa для последующего испольования при сравнении дат.
    getTimestamp (obj = {}) {
      if (!obj || !obj.parts) return
      return new Date(obj.parts[obj.parts.length - 1].created).getTime()
    }
  }
}
