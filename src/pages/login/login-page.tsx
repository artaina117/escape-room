import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SvgCollection from '../../components/svg-collection/svg-collection';
import { AppRoute, AuthorizationStatus, REGEX } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { loginAction } from '../../store/user/api-actions';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { AuthData } from '../../types/auth-data';

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const { control, formState: { errors }, handleSubmit } = useForm<AuthData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (data: AuthData): void => {
    if (!Object.keys(errors).length) {
      dispatch(loginAction({
        email: data.email,
        password: data.password,
      }));
    }
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }, [dispatch, authorizationStatus]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Авторизация | Escape Room</title>
      </Helmet>
      <SvgCollection />
      <div className='wrapper'>
        <Header />

        <main className='decorated-page login'>
          <div className='decorated-page__decor' aria-hidden='true'>
            <picture>
              <source type='image/webp' srcSet='img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x' />
              <img src='img/content/maniac/maniac-size-m.jpg' srcSet='img/content/maniac/maniac-size-m@2x.jpg 2x' width='1366' height='768' alt='' />
            </picture>
          </div>
          <div className='container container--size-l'>
            <div className='login__form'>
              <form
                className='login-form'
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className='login-form__inner-wrapper'>
                  <h1 className='title title--size-s login-form__title'>Вход</h1>
                  <div className='login-form__inputs'>
                    <div className='custom-input login-form__input'>
                      <label className='custom-input__label' htmlFor='email'>E&nbsp;&ndash;&nbsp;mail</label>
                      <Controller
                        control={control}
                        rules={{
                          required: { value: true, message: 'Введите email' },
                          pattern: { value: REGEX.email, message: 'Формат email неверный' },
                        }}
                        render={({ field }) => (
                          <input type='email' id='email' placeholder='Адрес электронной почты' {...field} />
                        )}
                        name='email'
                      />
                      <span>{errors.email?.message}</span>

                    </div>
                    <div className='custom-input login-form__input'>
                      <label className='custom-input__label' htmlFor='password'>Пароль</label>
                      <Controller
                        control={control}
                        rules={{
                          required: { value: true, message: 'Введите пароль' },
                          pattern: { value: REGEX.password, message: 'Введите минимум одну букву и одну цифру' },
                        }}
                        render={({ field }) => (
                          <input type='password' id='password' placeholder='Пароль' {...field} />
                        )}
                        name='password'
                      />
                      <span>{errors.password?.message}</span>

                    </div>
                  </div>
                  <button className='btn btn--accent btn--general login-form__submit' type='submit'>Войти</button>
                </div>
                <label className='custom-checkbox login-form__checkbox'>
                  <input type='checkbox' id='id-order-agreement' name='user-agreement' required />
                  <span className='custom-checkbox__icon'>
                    <svg width='20' height='17' aria-hidden='true'>
                      <use xlinkHref='#icon-tick'></use>
                    </svg>
                  </span>
                  <span className='custom-checkbox__label'>Я&nbsp;согласен с&nbsp;
                    <a className='link link--active-silver link--underlined' href='#'>правилами обработки персональных данных</a>
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
