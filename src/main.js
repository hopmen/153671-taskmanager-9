import {getSiteMenuTemplate} from "./components/menu";
import {getSearchTemplate} from "./components/search";
import {getFilterTemplate} from "./components/filter";
import {getBoardTemplate} from "./components/board";
import {getSortingTemplate} from "./components/sorting";
import {getTaskEditTemplate} from "./components/task-edit";
import {getTaskTemplate} from "./components/task";
import {getLoadMoreButtonTemplate} from "./components/more-button";
import {task} from "./data";

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderTasks = (container, count) => {
  container.insertAdjacentHTML(`beforeend`, new Array(count)
    .fill(``)
    .map(task)
    .map(getTaskTemplate)
    .join(``));
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, getSiteMenuTemplate());
render(siteMainElement, getSearchTemplate());
render(siteMainElement, getFilterTemplate());
render(siteMainElement, getBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);


render(boardElement, getSortingTemplate(), `afterbegin`);
render(taskListElement, getTaskEditTemplate());

renderTasks(taskListElement, TASK_COUNT);

render(boardElement, getLoadMoreButtonTemplate());
