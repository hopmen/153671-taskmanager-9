const getDataFilter = (tasks) => {

  const today = new Date();
  const now = today.getTime();
  const statistics = {
    'all': 0,
    'overdue': 0,
    'today': 0,
    'favorites': 0,
    'repeating': 0,
    'tags': 0,
    'archive': 0,
  };

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
