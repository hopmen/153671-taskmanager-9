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
export {getDataFilter};
