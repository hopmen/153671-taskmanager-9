const randomInteger = (...round) => {
  let [min, max] = round[1] ? [round[0], round[1]] : [0, round[0]];
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const randomBoolean = () => Boolean(Math.round(Math.random()));

const getDataTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`][randomInteger(3)],
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
  ][randomInteger(5)],
  isFavorite: randomBoolean(),
  isArchive: randomBoolean(),
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
