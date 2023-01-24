import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SvgCollection from '../../components/svg-collction/svg-collection';
import { PageNames, questLevelAdapter, questTypeAdapter } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentQuestAction } from '../../store/quests/api-actions';
import { getCurrentQuest } from '../../store/quests/selectors';

function QuestPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentQuestId = Number(id);

  useEffect(() => {
    dispatch(fetchCurrentQuestAction(currentQuestId));
  }, [currentQuestId, dispatch]);

  const currentQuest = useAppSelector(getCurrentQuest);

  const { title, type, level, peopleMinMax, description } = currentQuest;

  return (
    <React.Fragment>
      <SvgCollection />
      <div className="wrapper">
        <Header pageName={PageNames.QuestPage} />

        <main className="decorated-page quest-page">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x" />
              <img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt="" />
            </picture>
          </div>
          <div className="container container--size-l">
            <div className="quest-page__content">
              <h1 className="title title--size-l title--uppercase quest-page__title">{title}</h1>
              <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span>{questTypeAdapter[type]}
              </p>
              <ul className="tags tags--size-l quest-page__tags">
                <li className="tags__item">
                  <svg width="11" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-person"></use>
                  </svg>{peopleMinMax[0]}&ndash;{peopleMinMax[1]}&nbsp;чел
                </li>
                <li className="tags__item">
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-level"></use>
                  </svg>{questLevelAdapter[level]}
                </li>
              </ul>
              <p className="quest-page__description">{description}</p>
              <a className="btn btn--accent btn--cta quest-page__btn" href="booking.html">Забронировать</a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default QuestPage;
