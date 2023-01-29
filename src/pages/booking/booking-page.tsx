import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import BookingForm from '../../components/booking-form.tsx/booking-form';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import SvgCollection from '../../components/svg-collection/svg-collection';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBookingQuestAction } from '../../store/booking/api-actions';
import { getBookingQuest } from '../../store/booking/selectors';
import { fetchCurrentQuestAction } from '../../store/quests/api-actions';
import { getCurrentQuest } from '../../store/quests/selectors';
import { Coords } from '../../types/coords';

function BookingPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const currentId = Number(id);

  const bookingQuest = useAppSelector(getBookingQuest);
  const quest = useAppSelector(getCurrentQuest);

  const { title, coverImg, coverImgWebp } = quest;
  const { locations } = bookingQuest;

  const coords: Coords[] = [];
  locations.forEach((location) => coords.push(location.coords));

  const [currentAddress, setCurrentAddress] = useState(locations[0].address);
  const [currentCoords, setCurrentCoords] = useState(locations[0].coords);

  const getMarkerCoords = (newCoords: Coords): void => {
    locations.forEach((location) => {
      if (newCoords === location.coords) {
        setCurrentAddress(location.address);
        setCurrentCoords(location.coords);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchBookingQuestAction(currentId));
    dispatch(fetchCurrentQuestAction(currentId));
  }, [currentId, dispatch]);

  useEffect(() => {
    setCurrentAddress(locations[0].address);
    setCurrentCoords(locations[0].coords);
  }, [locations]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Бронирование | Escape Room</title>
      </Helmet>
      <SvgCollection />
      <div className="wrapper">
        <Header />

        <main className="page-content decorated-page">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source type="image/webp" srcSet={`${coverImgWebp}, ${coverImgWebp} 2x`} />
              <img src={coverImg} srcSet={`${coverImg} 2x`} width="1366" height="1959" alt="" />
            </picture>
          </div>
          <div className="container container--size-s">
            <div className="page-content__title-wrapper">
              <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
              </h1>
              <p className="title title--size-m title--uppercase page-content__title">{title}</p>
            </div>
            <div className="page-content__item">
              <div className="booking-map">
                <div className="map">
                  <Map points={coords} selectedPoint={currentCoords} getMarkerCoords={getMarkerCoords} />
                </div>
                <p className="booking-map__address">Вы&nbsp;выбрали: {currentAddress}</p>
              </div>
            </div>

            <BookingForm bookingQuest={bookingQuest} />
          </div>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default BookingPage;
