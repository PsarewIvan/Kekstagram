'use strict';

// Глобальные переменные и функции
window.global = (function () {
  return {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    // Случайный индекс массива
    getRandomArrayIndex: function (array) {
      return Math.floor(Math.random() * array.length);
    },

    // Случайное число от min до max
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    // События клавиатуры
    isEscEvent: function (evt, action) {
      if (evt.keyCode == this.ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode == this.ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
