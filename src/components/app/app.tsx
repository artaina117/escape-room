import { Route, Routes } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import BookingPage from '../../pages/booking/booking-page';
import ContactsPage from '../../pages/contacts/contacts-page';
import LoginPage from '../../pages/login/login-page';
import MainPage from '../../pages/main/main-page';
import NotFound from '../../pages/not-found/not-found';
import PersonalBookingPage from '../../pages/personal-booking/personal-booking-page';
import QuestPage from '../../pages/quest/quest-page';
import { getAuthorizationStatus } from '../../store/user/selectors';
import HistoryRouter from '../history-route/history-route';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import LoadingPage from '../../pages/loading/loading-page';
import { getIsQuestsDataLoading } from '../../store/quests/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isQuestsDataLoading = useAppSelector(getIsQuestsDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isQuestsDataLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage />}
          />
          <Route
            path={`${AppRoute.Quest}/:id`}
            element={<QuestPage />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={`${AppRoute.Quest}/:id${AppRoute.Booking}`}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <BookingPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Contacts}
            element={<ContactsPage />}
          />
          <Route
            path={AppRoute.PersonalBooking}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <PersonalBookingPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.NotFound}
            element={<NotFound />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
