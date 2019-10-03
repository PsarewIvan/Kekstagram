'use strict';

// Работа с формой
(function () {
  var buttonImgScaleSmaller = document.querySelector('.scale__control--smaller');
  var buttonImgScaleBigger = document.querySelector('.scale__control--bigger');

  var MIN_IMG_SCALE = 25;
  var MAX_IMG_SCALE = 100;
  var IMG_SCALE_STEP = 25;
  var DEFAULT_EFFECT_VALUE = 100;

  var effectsFieldset = document.querySelector('.img-upload__effects');
  var effectSlider = document.querySelector('.img-upload__effect-level');

  // Переменные для работы с формой
  window.form = {
    userUploadImg: document.querySelector('.js__user-upload-img'),
    imgScaleValue: document.querySelector('.scale__control--value'),
    EFFECT_VALUE: {
      imgScale: '100',
      effect: 'effect-none',
      effectLevel: '100',
      hashtags: '',
      comment: ''
    },

    // Коллекция эффектов
    effectsCollection: [
      {
        filter: 'grayscale',
        className: 'chrome',
        units: '',
        min: 0,
        max: 1
      },
      {
        filter: 'sepia',
        className: 'sepia',
        units: '',
        min: 0,
        max: 1
      },
      {
        filter: 'invert',
        className: 'marvin',
        units: '%',
        min: 0,
        max: 100
      },
      {
        filter: 'blur',
        className: 'phobos',
        units: 'px',
        min: 0,
        max: 3
      },
      {
        filter: 'brightness',
        className: 'heat',
        units: '',
        min: 1,
        max: 3
      }
    ],

    // Метод создает массив с классами возможных эффектов
    getEffectsClassNames: function () {
      var effectList = [];
      for (var i = 0; i < this.effectsCollection.length; i++) {
        effectList[i] = 'effects__preview--' + this.effectsCollection[i].className;
      }
      return effectList;
    },

    // Метод добавляет к элументу(element) фильтр из коллекции window.form.effectsCollection
    // под индексом effectIndex и со значением value
    addFIlterDepth: function (element, value, effectIndex) {
      var effect = this.effectsCollection[effectIndex];
      var attrValue = (effect.max - effect.min) / 100 * value;
      var filterAtrr = effect.filter + '(' + attrValue + effect.units + ')';
      element.style.filter = filterAtrr;
      element.style['-webkit-filter'] = filterAtrr;
    },

    // Метод убирает все эффекты с изображения
    removeImgEffects: function () {
      var imgClassList = this.userUploadImg.classList;
      var effectsClassList = this.getEffectsClassNames();
      for (var i = 0; i < effectsClassList.length; i++) {
        if (imgClassList.contains(effectsClassList[i])) {
          imgClassList.remove(effectsClassList[i]);
        }
      }
      // Убирает инлайновые стили из html
      this.userUploadImg.style.filter = '';
      this.userUploadImg.style['-webkit-filter'] = '';
    },

    // Устанавливает значение инпута в дефолтное состояние
    setDefaultEffectValue: function() {
      document.querySelector('.effect-level__value').value = DEFAULT_EFFECT_VALUE;
    },

    // Скрывает слайдер глубины эффекта
    hideEffectSlider: function () {
      effectSlider.classList.add('hidden');
    },

    // Перемещает пин на штатное место
    setPinToDefault: function() {
      document.querySelector('.effect-level__pin').style.left = '';
    }
  }

  // Редактируем масштаб загружаемого изображения
  var doImgScaleSmaller = function () {
    var scaleValue = +window.form.imgScaleValue.getAttribute('value').slice(0, -1);
    if (scaleValue > MIN_IMG_SCALE) {
      var newScaleValue = scaleValue - IMG_SCALE_STEP;
      window.form.imgScaleValue.setAttribute('value', newScaleValue + '%');
      window.form.userUploadImg.setAttribute('style', 'transform: scale(' + newScaleValue / 100 + ')');
    }
  };

  var doImgScaleBigger = function () {
    var scaleValue = +window.form.imgScaleValue.getAttribute('value').slice(0, -1);
    if (scaleValue < MAX_IMG_SCALE) {
      var newScaleValue = scaleValue + IMG_SCALE_STEP;
      window.form.imgScaleValue.setAttribute('value', newScaleValue + '%');
      window.form.userUploadImg.setAttribute('style', 'transform: scale(' + newScaleValue / 100 + ')');
    }
  };

  buttonImgScaleSmaller.addEventListener('click', function () {
    doImgScaleSmaller();
  });

  buttonImgScaleBigger.addEventListener('click', function () {
    doImgScaleBigger();
  });

  // Наложение эффекта на изображение
  var addEffectClassMod = function (mod) {
    effectSlider.classList.remove('hidden');
    window.form.userUploadImg.classList.add('effects__preview--' + mod)
  };

  var changeImgEffects = function (evt) {
    if (evt.target.value == 'none') {
      window.form.removeImgEffects();
      window.form.setDefaultEffectValue();
      window.form.hideEffectSlider();
      window.form.setPinToDefault();
    } else {
      addEffectClassMod(evt.target.value);
    }
  };

  effectsFieldset.addEventListener('click', function (evt) {
    if (evt.target.name == 'effect') {
      window.form.removeImgEffects();
      window.form.setDefaultEffectValue();
      window.form.setPinToDefault();
      changeImgEffects(evt);
    }
  });
})();
