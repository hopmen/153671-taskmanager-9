import {getSiteMenuTemplate} from "./components/menu";
import {getSearchTemplate} from "./components/search";
import {getFilterTemplate} from "./components/filter";
import {getBoardTemplate} from "./components/board";
import {getSortingTemplate} from "./components/sorting";
import {getTaskEditTemplate} from "./components/task-edit";
import {getTaskTemplate} from "./components/task";
import {getLoadMoreButtonTemplate} from "./components/more-button";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
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

for (let count = 3; count >= 0; count--) {
  render(taskListElement, getTaskTemplate());
}

render(boardElement, getLoadMoreButtonTemplate());
