import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import BookingPage from '../../pages/booking/booking-page';
import ContactsPage from '../../pages/contacts/contacts-page';
import LoginPage from '../../pages/login/login-page';
import MainPage from '../../pages/main/main-page';
import PersonalBookingPage from '../../pages/personal-booking/personal-booking-page';
import QuestPage from '../../pages/quest/quest-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
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
          element={<PersonalBookingPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
