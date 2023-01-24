import { useState } from 'react';
import { DEFAULT_GENRE, DEFAULT_LEVEL, filterByDifficulty, filterByGenres } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeActiveGenreFilter, changeActiveLevelFilter } from '../../store/quests/slice';
import FilterItem from '../filter-item/filter-item';

function FilterList(): JSX.Element {
  const dispatch = useAppDispatch();
  const [activeGenreFilter, setActiveGenreFilter] = useState(DEFAULT_GENRE);
  const [activeLevelFilter, setActiveLevelFilter] = useState(DEFAULT_LEVEL);

  const filterClickHandler = (name: string) => {
    if (Object.keys(filterByGenres).includes(name)) {
      setActiveGenreFilter(name);
      dispatch(changeActiveGenreFilter(name));
    } else {
      setActiveLevelFilter(name);
      dispatch(changeActiveLevelFilter(name));
    }
  };

  return (
    <form className="filter" action="#" method="get">
      <fieldset className="filter__section">
        <legend className="visually-hidden">Тематика</legend>
        <ul className="filter__list">
          {Object.keys(filterByGenres).map((genre) => <FilterItem filterType={'type'} filterName={genre} isActive={genre === activeGenreFilter} filterClickHandler={filterClickHandler} key={genre} />)}
        </ul>
      </fieldset>

      <fieldset className="filter__section">
        <legend className="visually-hidden">Сложность</legend>
        <ul className="filter__list">
          {Object.keys(filterByDifficulty).map((level) => <FilterItem filterType={'level'} filterName={level} isActive={level === activeLevelFilter} filterClickHandler={filterClickHandler} key={level} />)}
        </ul>
      </fieldset>
    </form>
  );
}

export default FilterList;
