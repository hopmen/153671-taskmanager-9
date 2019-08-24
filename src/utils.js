const getRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomValue = (array) => array[Math.floor((Math.random() * array.length))];

export {getRandomInteger, getRandomValue};
