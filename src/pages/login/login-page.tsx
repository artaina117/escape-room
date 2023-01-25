import React, { FormEvent, useEffect, useRef } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SvgCollection from '../../components/svg-collection/svg-collection';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { loginAction } from '../../store/user/api-actions';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { AuthData } from '../../types/auth-data';

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }, [dispatch, authorizationStatus]);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordMask = /([0-9].*[a-z])|([a-z].*[0-9])/;

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const password = passwordRef.current.value.trim();

      if (!password.length || !passwordMask.test(password)) {
        // toast.warn('Password must contain at least one number and one letter');
        return;
      }

      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <React.Fragment>
      <SvgCollection />
      <div className="wrapper">
        <Header />

        <main className="decorated-page login">
          <div className="decorated-page__decor" aria-hidden="true">
            <picture>
              <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x" />
              <img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt="" />
            </picture>
          </div>
          <div className="container container--size-l">
            <div className="login__form">
              <form className="login-form" action="#" method="post" onSubmit={submitHandler}>
                <div className="login-form__inner-wrapper">
                  <h1 className="title title--size-s login-form__title">Вход</h1>
                  <div className="login-form__inputs">
                    <div className="custom-input login-form__input">
                      <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                      <input ref={loginRef} type="email" id="email" name="email" placeholder="Адрес электронной почты" required />
                    </div>
                    <div className="custom-input login-form__input">
                      <label className="custom-input__label" htmlFor="password">Пароль</label>
                      <input ref={passwordRef} type="password" id="password" name="password" placeholder="Пароль" required />
                    </div>
                  </div>
                  <button className="btn btn--accent btn--general login-form__submit" type="submit">Войти</button>
                </div>
                <label className="custom-checkbox login-form__checkbox">
                  <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
                  <span className="custom-checkbox__icon">
                    <svg width="20" height="17" aria-hidden="true">
                      <use xlinkHref="#icon-tick"></use>
                    </svg>
                  </span>
                  <span className="custom-checkbox__label">Я&nbsp;согласен с
                    <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>
                    &nbsp;и пользовательским соглашением
                  </span>
                </label>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default LoginPage;
