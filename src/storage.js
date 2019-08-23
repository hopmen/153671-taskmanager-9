const randomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const randomBoolean = () => Boolean(Math.round(Math.random()));

const getRandomValue = (array) => array[Math.floor((Math.random() * array.length))];

const description = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`];
const repeatingDays = {
  'mo': false,
  'tu': false,
  'we': randomBoolean(),
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
  dueDate: getRandomValue([Date.now() - week, Date.now() + week]),
  repeatingDays,
  tags,
  color: getRandomValue(color),
  isFavorite: getRandomValue([true, false]),
  isArchive: getRandomValue([true, false]),
});
const getDataFilter = (tasks) => {
  let filters = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

  const today = new Date();
  const now = today.getTime();

  const statistics = filters.reduce((acc, cur) => {
    acc[cur] = 0;
    return acc;
  }, {});

  for (const task of tasks) {
    statistics[`all`]++;

    if (task.dueDate < now) {
      statistics[`overdue`]++;
    }

    const taskDate = new Date(task.dueDate);
    if (taskDate.getFullYear() === today.getFullYear()
      && taskDate.getMonth() === today.getMonth()
      && taskDate.getDate() === today.getDate()
    ) {
      statistics[`today`]++;
    }

    if (task.isFavorite) {
      statistics[`favorites`]++;
    }

    if (Object.keys(task.repeatingDays).some((key) => task.repeatingDays[key])) {
      statistics[`repeating`]++;
    }

    if ([...task.tags].length > 0) {
      statistics[`tags`]++;
    }


    if (task.isArchive) {
      statistics[`archive`]++;
    }
  }
  return Object.keys(statistics).map((key) => {
    return {
      title: key,
      count: statistics[key],
    };
  });
};

const TASK_COUNT_MIN = 1;
const TASK_COUNT_MAX = 81;
const tasks = new Array(randomInteger(TASK_COUNT_MIN, TASK_COUNT_MAX)).fill(``).map(() => getDataTask());
const filters = getDataFilter(tasks);

export {tasks, filters};
