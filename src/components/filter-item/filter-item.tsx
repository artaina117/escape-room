import { filterByDifficulty, filterByGenres } from '../../const';

type FilterItemProps = {
  filterType: string;
  filterName: string;
  isActive: boolean;
  filterClickHandler: (name: string) => void;
};

function FilterItem({ filterType, filterName, isActive, filterClickHandler }: FilterItemProps): JSX.Element {
  const currentFilter = filterType === 'type' ? filterByGenres[filterName] : filterByDifficulty[filterName];

  return (
    <li className="filter__item">
      <input type="radio" name={filterType} id={filterName} defaultChecked={isActive} onClick={() => filterClickHandler(filterName)} />
      <label className="filter__label" htmlFor={filterName}>
        {filterType === 'type' &&
          <svg className="filter__icon" width={filterByGenres[filterName].icon.width} height={filterByGenres[filterName].icon.height} aria-hidden="true">
            <use xlinkHref={filterByGenres[filterName].icon.name}></use>
          </svg>}
        <span className="filter__label-text">{currentFilter.text}</span>
      </label>
    </li>
  );
}

export default FilterItem;
