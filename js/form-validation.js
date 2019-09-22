'use strict';

// Валидация формы
(function () {
  var customValidation = function () {};

  customValidation.prototype = {
    invalidities: [], // Массив с сообщениями об ошибках
    maxHashNumber: 5, // Максимальное количесвто хэштегов
    maxHashLength: 20, // Максимальная длина хэштега

    doHashArray: function (input) { // Разбиваем строку по пробелам на массив
      // Эта штука разбивает строку на массивы по пробелам и
      // удаляет пустые значения массива, если между словами
      // было больше одного пробела. да...
      return input.toLowerCase().split(/\s/).filter(function (value) {
        return value
      });
    },

    // Проверка на то, что хэштег начинается с #
    isHashBegin: function (input) {
      return !this.doHashArray(input).every(hash => hash[0] == '#');
    },

    // Проверка на то, что хэштег не пустой
    isHashFull: function (input) {
      return !this.doHashArray(input).every(hash => hash != '#');
    },

    // Проверка на то, что хэштеги разделяются пробелами
    isHashNotSplited: function (input) {
      return !this.doHashArray(input).every(hash => !(hash.indexOf('#', 1) + 1));
    },

    // Проверка на то, что один и тот же хэштег не используется дважды
    isHashNotDouble: function (input) {
      return new Set(this.doHashArray(input)).size !== this.doHashArray(input).length;
    },

    // Проверка на то, введено не больше пяти хэштегов
    isHashCrowded: function (input) {
      return this.doHashArray(input).length > this.maxHashNumber;
    },

    // Проверка на то, что максимальная длина одного хэш-тега 20 символов, включая решётку
    isHashLengthCrowded: function (input) {
      return !this.doHashArray(input).every(hash => hash.length <= this.maxHashLength);
    },

    checkValidity: function (input) {
      if (this.isHashBegin(input)) {
        this.addInvalidity('Хэштег должен начинаться с символа #');
      }
      if (this.isHashFull(input)) {
        this.addInvalidity('Хэштег не может состоять только из одной решётки');
      }
      if (this.isHashNotSplited(input)) {
        this.addInvalidity('Хэштеги разделяются пробелами');
      }
      if (this.isHashNotDouble(input)) {
        this.addInvalidity('Один и тот же хэш-тег не может быть использован дважды');
      }
      if (this.isHashCrowded(input)) {
        this.addInvalidity('Нельзя указать больше пяти хэш-тегов');
      }
      if (this.isHashLengthCrowded(input)) {
        this.addInvalidity('Максимальная длина одного хэш-тега 20 символов');
      }
    },

    // Добавляем сообщение об ошибке в массив ошибок
    addInvalidity: function (message) {
      this.invalidities.push(message);
    },

    // Получаем общий текст сообщений об ошибках
    getInvalidities: function () {
      return this.invalidities.join('. \n');
    },

    // Очищаем поле ошибок
    clearInvalidities: function () {
      this.invalidities = [];
    }
  };

  var imgForm = document.querySelector('.img-upload__form');
  var tagsInput = imgForm.querySelector('.text__hashtags');
  var formSubmit = imgForm.querySelector('.img-upload__submit');
  var inputCustomValidation = new customValidation();

  formSubmit.addEventListener('click', function () {
    tagsInput.setCustomValidity(''); // Очищаем поле ошибок
    var inputValue = tagsInput.value; // Получаем введенные хэштеги
    inputCustomValidation.checkValidity(inputValue); // Проверка на валидность
    var errors = inputCustomValidation.getInvalidities(); // Записываем ошибки

    if (errors) {
      tagsInput.setCustomValidity(errors); // Показываем ошибки
      inputCustomValidation.clearInvalidities(); // Очистка массива с ошибками
    } else {
      tagsInput.setCustomValidity(''); // Оищаем ошибки
    }
  });
})();
