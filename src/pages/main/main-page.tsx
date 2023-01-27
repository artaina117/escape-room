import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import FilterList from '../../components/filter-list/filter-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import QuestList from '../../components/quest-list/quest-list';
import SvgCollection from '../../components/svg-collection/svg-collection';
import { DEFAULT_GENRE, DEFAULT_LEVEL } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getQuests, getQuestsGenreFilter, getQuestsLevelFilter } from '../../store/quests/selectors';
import { changeActiveGenreFilter } from '../../store/quests/slice';
import { Quest } from '../../types/quest';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const quests: Quest[] = useAppSelector(getQuests);
  const genreFilter: string = useAppSelector(getQuestsGenreFilter);
  const levelFilter: string = useAppSelector(getQuestsLevelFilter);

  const filteredByGenre = genreFilter === DEFAULT_GENRE ? quests : quests.filter((quest) => quest.type === genreFilter);
  const filteredByLevel = levelFilter === DEFAULT_LEVEL ? filteredByGenre : filteredByGenre.filter((quest) => quest.level === levelFilter);

  useEffect(() => {
    dispatch(changeActiveGenreFilter(DEFAULT_GENRE));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Каталог квестов | Escape Room</title>
      </Helmet>
      <SvgCollection />
      <div className="wrapper">
        <Header />

        <main className="page-content">
          <div className="container">
            <div className="page-content__title-wrapper">
              <h1 className="subtitle page-content__subtitle">
                квесты в Санкт-Петербурге
              </h1>
              <h2 className="title title--size-m page-content__title">
                Выберите тематику
              </h2>
            </div>
            <div className="page-content__item">
              <FilterList />
            </div>
            <QuestList quests={filteredByLevel} />
          </div>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default MainPage;
