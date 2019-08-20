/**
 * Генерирует случайное целое число *
 * @param round при 1 аргументе: min = 0, при 2: min = аргумен[0], max = аргумен[1]
 * @return {number} случайное целое число
 */
const randomInteger = (...round) => {
  let [min, max] = round[1] ? [round[0], round[1]] : [0, round[0]];
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const randomBoolean = () => Boolean(Math.round(Math.random()));

Array.prototype.getRandomItem = function () {
  return this[Math.floor((Math.random() * this.length))];
};


const getDataTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`].getRandomItem(),
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': randomBoolean(),
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ]),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ].getRandomItem(),
  isFavorite: randomBoolean(),
  isArchive: randomBoolean(),
});

export {getDataTask};
