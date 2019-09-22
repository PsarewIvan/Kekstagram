'use strict';

// Генерация случайного комментария
(function () {
  // Генерируем массив длиной commentsNumber со случайными комментариями из 'array'.
  // Если длина array меньше commentsNumber функция вернет массив уникальных элементов
  window.comments = {
    getRandomComments: function (array, commentsNumber = 2) {
      var comments = [];
      // Массив с уникальными элементами
      var uniqueArray = Array.from(new Set(array));
      if (uniqueArray.length < commentsNumber) return uniqueArray;
      if (commentsNumber > 1) {
        for (var i = 0; i < commentsNumber; i++) {
          comments[i] = uniqueArray.splice([window.global.getRandomArrayIndex(uniqueArray)], 1)[0];
        }
      } else if (commentsNumber == 1) {
        comments[0] = array[window.global.getRandomArrayIndex(array)];
      } else {
        return comments;
      }
      return comments;
    }
  }
})();
