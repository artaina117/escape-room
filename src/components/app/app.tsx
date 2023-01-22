import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Booking from '../../pages/booking/booking';
import Contacts from '../../pages/contacts/contacts';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import PersonalBooking from '../../pages/personal-booking/personal-booking';
import Quest from '../../pages/quest/quest';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main />}
        />
        <Route
          path={AppRoute.Quest}
          element={<Quest />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Booking}
          element={<Booking />}
        />
        <Route
          path={AppRoute.Contacts}
          element={<Contacts />}
        />
        <Route
          path={AppRoute.PersonalBooking}
          element={<PersonalBooking />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
