import { Route, Routes } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import BookingPage from '../../pages/booking/booking-page';
import ContactsPage from '../../pages/contacts/contacts-page';
import LoginPage from '../../pages/login/login-page';
import MainPage from '../../pages/main/main-page';
import PersonalBookingPage from '../../pages/personal-booking/personal-booking-page';
import QuestPage from '../../pages/quest/quest-page';
import { getAuthorizationStatus } from '../../store/user/selectors';
import HistoryRouter from '../history-route/history-route';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <HistoryRouter history={browserHistory}>
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
          path={AppRoute.Booking}
          element={<BookingPage />}
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
      </Routes>
    </HistoryRouter>
  );
}

export default App;
