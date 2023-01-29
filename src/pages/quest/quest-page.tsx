import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SvgCollection from '../../components/svg-collection/svg-collection';
import { AppRoute, AuthorizationStatus, questLevelAdapter, questTypeAdapter } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentQuestAction } from '../../store/quests/api-actions';
import { getCurrentQuest } from '../../store/quests/selectors';
import { getAuthorizationStatus } from '../../store/user/selectors';

function QuestPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const currentQuestId = Number(id);

  useEffect(() => {
    dispatch(fetchCurrentQuestAction(currentQuestId));
  }, [currentQuestId, dispatch]);

  const currentQuest = useAppSelector(getCurrentQuest);
  const AuthStatus = useAppSelector(getAuthorizationStatus);

  const { title, type, level, peopleMinMax, description, coverImg, coverImgWebp } = currentQuest;

  return (
    <React.Fragment>
      <Helmet>
        <title>{title} | Escape Room</title>
      </Helmet>
      <SvgCollection />
      <div className="wrapper">
        <Header />

        <main className="decorated-page quest-page">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source type="image/webp" srcSet={`${coverImgWebp}, ${coverImgWebp} 2x`} />
              <img src={coverImg} srcSet={`${coverImg} 2x`} width="1366" height="768" alt="" />
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
              <Link className="btn btn--accent btn--cta quest-page__btn" to={AuthStatus === AuthorizationStatus.Auth ? `${AppRoute.Quest}/${currentQuestId}${AppRoute.Booking}` : AppRoute.Login}>Забронировать</Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default QuestPage;
