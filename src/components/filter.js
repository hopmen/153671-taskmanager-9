export default class Filter {
  constructor(filters) {
    this._filters = filters;
  }

  getTemplate() {
    return `<section class="main__filter filter container">
    ${this._filters.map((filter) => ` <input
      type="radio"
      id="filter__all"
      class="filter__input visually-hidden"
      name="filter"
      checked
      ${filter.count === 0 ? `disabled` : ``}
      
    />
    <label for="filter__all" class="filter__label">
      ${filter.title} <span class="filter__${filter.title}-count">${filter.count}</span></label
    >`).join(``)}
   
    
  </section>`;
  }
}
