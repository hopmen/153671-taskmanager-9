import {getSiteMenuTemplate} from "./components/menu";
import {getSearchTemplate} from "./components/search";
import {getFilterTemplate} from "./components/filter";
import {getBoardTemplate} from "./components/board";
import {getSortingTemplate} from "./components/sorting";
import {getTaskEditTemplate} from "./components/task-edit";
import {getTaskTemplate} from "./components/task";
import {getLoadMoreButtonTemplate} from "./components/more-button";
import {filters, tasks} from "./storage";

let tasksForLoad = tasks;
const firstLoadTask = 7;
const buttonLoadTask = 8;
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

renderTasks(taskListElement, firstLoadTask);

render(boardElement, getLoadMoreButtonTemplate());

const loadMoreButton = document.querySelector(`.load-more`);
const loadMoreButtonHandler = () => {
  renderTasks(taskListElement, buttonLoadTask);
  if (tasksForLoad.length === 0) {
    loadMoreButton.removeEventListener(`click`, loadMoreButtonHandler);
    loadMoreButton.remove();
  }
};
loadMoreButton.addEventListener(`click`, loadMoreButtonHandler);
