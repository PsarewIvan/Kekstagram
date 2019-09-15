'use strict';

var commentsTemplate = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var descriptionTemplate = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var photosDomParent = document.querySelector('.pictures');
var templateImg = document.querySelector('#picture')
    .content.querySelector('.picture');
var templateComments = document.querySelector('#comments')
    .content.querySelector('.social__comment');
var numberOfPhoto = 25;
var minLikes = 15;
var maxLikes = 200;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Случайный индекс массива array
var getRandomArrayIndex = function(array) {
  return Math.floor(Math.random() * array.length);
};

// Генерируем массив длиной commentsNumber со случайными комментариями из 'array'.
// Если длина array меньше commentsNumber функция вернет массив уникальных элементов
var getRandomComments = function(array, commentsNumber = 2) {
  var comments = [];
  // Массив с уникальными элементами
  var uniqueArray = Array.from(new Set(array));
  if (uniqueArray.length < commentsNumber) return uniqueArray;
  if (commentsNumber > 1) {
    for (var i = 0; i < commentsNumber; i++) {
      comments[i] = uniqueArray.splice([getRandomArrayIndex(uniqueArray)], 1)[0];
    }
  } else if (commentsNumber == 1) {
    comments[0] = array[getRandomArrayIndex(array)];
  } else {
    return comments;
  }
  return comments;
};

// Случайное число от min до max
var getRandomNumber = function(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Создание массива случайных объектов с данными для конструктора
var getPhotos = function(count) {
  var photos = [];
  for (var i = 0; i < count; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(minLikes, maxLikes),
      comments: getRandomComments(commentsTemplate, getRandomNumber(1, 2)),
      description: descriptionTemplate[getRandomArrayIndex(descriptionTemplate)],
      index: i
    }
  }
  return photos;
};

// Конструктор блоков с фото по шаблону
var buildPhoto = function(photo) {
  var element = templateImg.cloneNode(true);
  element.querySelector('.picture__img').setAttribute('src', photo.url);
  element.querySelector('.picture__img').setAttribute('data-index', photo.index);
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;
  return element;
};

// Генерируем комментарии к болшьшой картинке
var buildComments = function(photoComment) {
  var element = templateComments.cloneNode(true);
  element.querySelector('.social__text').textContent = photoComment;
  element.querySelector('.social__picture')
      .setAttribute('src', ('img/avatar-' + getRandomNumber(1, 6) + '.svg'));
  return element;
}

// Заполнение большой картинки сгенерированным элементом
var fillingBigPicture = function(firstPhoto) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < firstPhoto.comments.length; i++) {
    fragment.appendChild(buildComments(firstPhoto.comments[i]));
  }
  document.querySelector('.big-picture__img')
      .querySelector('img')
      .setAttribute('src', firstPhoto.url);
  document.querySelector('.likes-count').textContent = firstPhoto.likes;
  document.querySelector('.social__caption').textContent = firstPhoto.description;
  document.querySelector('.comments-count').textContent = firstPhoto.comments.length;
  document.querySelector('.social__comments').innerHTML = '';
  document.querySelector('.social__comments').appendChild(fragment);
};

// Заполнение DOM случайными фото
var fillingPhotosDomBlock = function(count, photosPar) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < count; i++) {
    fragment.appendChild(buildPhoto(photosPar[i]));
  }
  return fragment;
};

// Создаем массив случайных фото
var photos = getPhotos(numberOfPhoto);

// Вставка случайных миниатюр
photosDomParent.appendChild(fillingPhotosDomBlock(numberOfPhoto, photos));

// Показ большой превьюшки по клику на миниатюру
var userImgList = document.querySelector('.pictures');
var bigPictureCloseButton = document.querySelector('.big-picture__cancel');

var showBigPicture = function() {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscPress);
  bigPictureCloseButton.addEventListener('click', function() {
    closeBigPicture();
  });
};

var onBigPictureEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

var closeBigPicture = function() {
  document.querySelector('.big-picture').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscPress);
};

userImgList.addEventListener('click', function(evt) {
  if (evt.target.className == 'picture__img') {
    showBigPicture();
    fillingBigPicture(photos[evt.target.dataset.index]);
  }
});

document.addEventListener('keydown', function(evt) {
  if (evt.keyCode == ENTER_KEYCODE &&
      evt.target.querySelector('img').dataset.index) {
    showBigPicture();
    fillingBigPicture(photos[evt.target.querySelector('img').dataset.index]);
  }
});




// Показ загруженного изображения пользователем
var imgPopupUploadButton = document.querySelector('.img-upload__overlay');
var imgPopupCloseButton = document.querySelector('#upload-cancel');
var imgUploadButton = document.querySelector('#upload-file');

var showImgUploadPopup = function() {
  imgPopupUploadButton.classList.remove('hidden');
  document.addEventListener('keydown', onImgPopupEscPress);
};

var closeImgUploadPopup = function() {
  imgPopupUploadButton.classList.add('hidden');
  document.removeEventListener('keydown', onImgPopupEscPress);
  document.querySelector('.js__user-upload-img').removeAttribute('style');
  document.querySelector('.scale__control--value').setAttribute('value', '100%');
}

var onImgPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeImgUploadPopup();
  }
};

imgUploadButton.addEventListener('change', function() {
  if (this.files[0]) {
    var fr = new FileReader();

    fr.addEventListener('load', function() {
      document.querySelector('.js__user-upload-img').setAttribute('src', fr.result);
      showImgUploadPopup();
    }, false);

    fr.readAsDataURL(this.files[0]);
  }
});

imgPopupCloseButton.addEventListener('click' , function() {
  closeImgUploadPopup();
})

// Редактируем масштаб загружаемого изображения
var buttonImgScaleSmaller = document.querySelector('.scale__control--smaller');
var buttonImgScaleBigger = document.querySelector('.scale__control--bigger');
var imgScaleValue = document.querySelector('.scale__control--value');
var userUploadImg = document.querySelector('.js__user-upload-img');
var MIN_IMG_SCALE = 25;
var MAX_IMG_SCALE = 100;
var IMG_SCALE_STEP = 25;

var doImgScaleSmaller = function() {
  var scaleValue = +imgScaleValue.getAttribute('value').slice(0, -1);
  if (scaleValue > MIN_IMG_SCALE) {
    var newScaleValue = scaleValue - IMG_SCALE_STEP;
    imgScaleValue.setAttribute('value', newScaleValue + '%');
    userUploadImg.setAttribute('style', 'transform: scale(' + newScaleValue / 100 + ')');
  }
};

var doImgScaleBigger = function() {
  var scaleValue = +imgScaleValue.getAttribute('value').slice(0, -1);
  if (scaleValue < MAX_IMG_SCALE) {
    var newScaleValue = scaleValue + IMG_SCALE_STEP;
    imgScaleValue.setAttribute('value', newScaleValue + '%');
    userUploadImg.setAttribute('style', 'transform: scale(' + newScaleValue / 100 + ')');
  }
};

buttonImgScaleSmaller.addEventListener('click', function() {
  doImgScaleSmaller();
});

buttonImgScaleBigger.addEventListener('click', function() {
  doImgScaleBigger();
});

// Наложение эффекта на изображение
var effectsList = document.querySelector('.img-upload__effects');
var effectSlider = document.querySelector('.img-upload__effect-level');

var removeImgEffects = function() {
  userUploadImg.classList.remove('effects__preview--chrome',
                                  'effects__preview--sepia',
                                  'effects__preview--marvin',
                                  'effects__preview--phobos',
                                  'effects__preview--heat'
  );
};

var addEffectClassMod = function(mod) {
  effectSlider.classList.remove('hidden');
  userUploadImg.classList.add('effects__preview--' + mod)
};

var hideEffectSlider = function() {
  effectSlider.classList.add('hidden');
}

var changeImgEffects = function(evt) {
  if (evt.target.value == 'none') {
    removeImgEffects();
    hideEffectSlider();
  } else if (evt.target.value == 'chrome') {
    addEffectClassMod('chrome')
  } else if (evt.target.value == 'sepia') {
    addEffectClassMod('sepia')
  } else if (evt.target.value == 'marvin') {
    addEffectClassMod('marvin')
  } else if (evt.target.value == 'phobos') {
    addEffectClassMod('phobos')
  } else if (evt.target.value == 'heat') {
    addEffectClassMod('heat')
  } else {
    removeImgEffects();
  }
};

effectsList.addEventListener('click', function(evt) {
  if (evt.target.name == 'effect') {
    removeImgEffects();
    changeImgEffects(evt);
  }
});
