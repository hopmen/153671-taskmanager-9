import {getRandomInteger, getRandomValue} from "../utils";

const description = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`];
const repeatingDays = {
  'mo': false,
  'tu': false,
  'we': getRandomValue([true, false]),
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};
const tags = new Set([
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
]);
const color = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];
const week = 7 * 24 * 60 * 60 * 1000;
const getDataTask = () => ({
  description: getRandomValue(description),
  dueDate: getRandomInteger([Date.now() - week, Date.now() + week]),
  repeatingDays,
  tags,
  color: getRandomValue(color),
  isFavorite: getRandomValue([true, false]),
  isArchive: getRandomValue([true, false]),
});
export {getDataTask};
