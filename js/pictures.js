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
      description: descriptionTemplate[getRandomArrayIndex(descriptionTemplate)]
    }
  }
  return photos;
};

// Конструктор блоков с фото по шаблону
var buildPhoto = function(photo) {
  var element = templateImg.cloneNode(true);
  element.querySelector('.picture__img').setAttribute('src', photo.url);
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

// Заполнение большой картинки первым сгенерированным элементом
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
  document.querySelector('.social__comments')
      .appendChild(fragment);
};

// Заполнение DOM случайными фото
var fillingPhotosDomBlock = function(count, photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < count; i++) {
    fragment.appendChild(buildPhoto(photos[i]));
  }
  return fragment;
};

var photos = getPhotos(numberOfPhoto);
fillingBigPicture(photos[0]);
photosDomParent.appendChild(fillingPhotosDomBlock(numberOfPhoto, photos));
// document.querySelector('.big-picture').classList.remove('hidden');
// document.querySelector('.social__comment-count').classList.add('visually-hidden');
// document.querySelector('.social__comments-loader').classList.add('visually-hidden');

// Показ загруженного изображения пользователем
var imgPopupUploadButton = document.querySelector('.img-upload__overlay');
var imgPopupCloseButton = document.querySelector('#upload-cancel');
var imgUploadButton = document.querySelector('#upload-file');
var ESC_KEYCODE = 27;

var showImgUploadPopup = function() {
  imgPopupUploadButton.classList.remove('hidden');
  document.addEventListener('keydown', onImgPopupEscPress);
};

var closeImgUploadPopup = function() {
  imgPopupUploadButton.classList.add('hidden');
  document.removeEventListener('keydown', onImgPopupEscPress);
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
