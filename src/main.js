import Menu from "./components/menu";
import Search from "./components/search";
import Filter from "./components/filter";
import Board from "./components/board";
import Sorting from "./components/sorting";
import TaskEdit from "./components/task-edit";
import Task from "./components/task";
import MoreButton from "./components/more-button";
import {getRandomInteger} from "./utils";
import {getDataFilter} from "./storage/filters";
import {getDataTask} from "./storage/tasks";

const TASK_COUNT_MIN = 1;
const TASK_COUNT_MAX = 81;
const tasks = new Array(getRandomInteger(TASK_COUNT_MIN, TASK_COUNT_MAX)).fill(``).map(() => getDataTask());
const filterData = getDataFilter(tasks);
const filters = new Filter(filterData);


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
    container.insertAdjacentHTML(`beforeend`, new Task({description, dueDate, repeatingDays, tags, color}).getTemplate());
  }
  tasksForLoad = tasksForLoad.slice(count);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, Menu.getTemplate());
render(siteMainElement, Search.getTemplate());
render(siteMainElement, filters.getTemplate());
render(siteMainElement, new Board().getTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);


render(boardElement, new Sorting().getTemplate(), `afterbegin`);
render(taskListElement, new TaskEdit().getTemplate());

renderTasks(taskListElement, FIRST_LOAD_TASK);

render(boardElement, new MoreButton().getTemplate());

const loadMoreButton = document.querySelector(`.load-more`);
const loadMoreButtonHandler = () => {
  renderTasks(taskListElement, BUTTON_LOAD_TASK);
  if (tasksForLoad.length === 0) {
    loadMoreButton.removeEventListener(`click`, loadMoreButtonHandler);
    loadMoreButton.remove();
  }
};
loadMoreButton.addEventListener(`click`, loadMoreButtonHandler);
