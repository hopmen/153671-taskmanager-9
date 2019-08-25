import {getSiteMenuTemplate} from "./components/menu";
import {getSearchTemplate} from "./components/search";
import {getFilterTemplate} from "./components/filter";
import {getBoardTemplate} from "./components/board";
import {getSortingTemplate} from "./components/sorting";
import {getTaskEditTemplate} from "./components/task-edit";
import {getTaskTemplate} from "./components/task";
import {getLoadMoreButtonTemplate} from "./components/more-button";
import {getRandomInteger} from "./utils";
import {getDataFilter} from "./storage/filters";
import {getDataTask} from "./storage/tasks";

const TASK_COUNT_MIN = 1;
const TASK_COUNT_MAX = 81;
const tasks = new Array(getRandomInteger(TASK_COUNT_MIN, TASK_COUNT_MAX)).fill(``).map(() => getDataTask());
const filters = getDataFilter(tasks);

let tasksForLoad = tasks;
const FIRST_LOAD_TASK = 7;
const BUTTON_LOAD_TASK = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderTasks = (container, count) => {
  count = count <= tasksForLoad.length ? count : tasksForLoad.length;
  for (let i = 0; i < count; i++) {
    let {description, dueDate, repeatingDays, tags, color} = tasksForLoad[i];
    container.insertAdjacentHTML(`beforeend`, getTaskTemplate({description, dueDate, repeatingDays, tags, color}));
  }
  tasksForLoad = tasksForLoad.slice(count);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, getSiteMenuTemplate());
render(siteMainElement, getSearchTemplate());
render(siteMainElement, getFilterTemplate(filters));
render(siteMainElement, getBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);


render(boardElement, getSortingTemplate(), `afterbegin`);
render(taskListElement, getTaskEditTemplate());

renderTasks(taskListElement, FIRST_LOAD_TASK);

render(boardElement, getLoadMoreButtonTemplate());

const loadMoreButton = document.querySelector(`.load-more`);
const loadMoreButtonHandler = () => {
  renderTasks(taskListElement, BUTTON_LOAD_TASK);
  if (tasksForLoad.length === 0) {
    loadMoreButton.removeEventListener(`click`, loadMoreButtonHandler);
    loadMoreButton.remove();
  }
};
loadMoreButton.addEventListener(`click`, loadMoreButtonHandler);
