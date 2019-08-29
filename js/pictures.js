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
var template = document.querySelector('#picture')
    .content.querySelector('.picture');
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
  var element = template.cloneNode(true);
  element.querySelector('.picture__img').setAttribute('src', photo.url);
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;
  return element;
};

// Заполнение DOM случайными фото
var fillingPhotosDomBlock = function(count) {
  var fragment = document.createDocumentFragment();
  var photos = getPhotos(count);
  for (var i = 0; i < count; i++) {
    fragment.appendChild(buildPhoto(photos[i]));
  }
  return fragment;
};

photosDomParent.appendChild(fillingPhotosDomBlock(numberOfPhoto));
document.querySelector('.big-picture').classList.remove('hidden');

console.log(getRandomArrayIndex(commentsTemplate));
console.log(getRandomComments(commentsTemplate));
console.log(getPhotos(4));
