import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/user/api-actions';
import { getAuthorizationStatus } from '../../store/user/selectors';
import cn from 'classnames';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();

  const AuthStatus = useAppSelector(getAuthorizationStatus);

  const location = window.location.href;
  const currentRoute = location.slice(location.lastIndexOf('/'));

  const [route, setRoute] = useState(currentRoute);

  useEffect(() => {
    setRoute(currentRoute);
  }, [location]);

  return (
    <header className="header">
      <div className="container container--size-l">
        <Link to={AppRoute.Root}>
          <span className="logo header__logo">
            <svg width="134" height="52" aria-hidden="true">
              <use xlinkHref="#logo"></use>
            </svg>
          </span>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className={cn('link', { 'active': route === AppRoute.Root })} to={AppRoute.Root}>Квесты</Link>
            </li>
            <li className="main-nav__item">
              <Link className={cn('link', { 'active': route === AppRoute.Contacts })} to={AppRoute.Contacts}>Контакты</Link>
            </li>
            {AuthStatus === AuthorizationStatus.Auth &&
              <li className="main-nav__item">
                <Link className={cn('link', { 'active': route === AppRoute.PersonalBooking })} to={AppRoute.PersonalBooking}>Мои бронирования</Link>
              </li>}
          </ul>
        </nav>
        <div className="header__side-nav">
          {AuthStatus === AuthorizationStatus.Auth ?
            <Link
              className="btn btn--accent header__side-item"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
              to={AppRoute.Root}
            >
              Выйти
            </Link>
            : <Link className="btn header__side-item header__login-btn" to={AppRoute.Login}>Вход</Link>}
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
