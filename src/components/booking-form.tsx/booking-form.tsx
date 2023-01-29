import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { postNewBookingAction } from '../../store/booking/api-actions';
import { BookingQuest } from '../../types/booking-quest';

type BookingFormProps = {
  bookingQuest: BookingQuest;
  locationId: number;
}

function BookingForm({ bookingQuest, locationId }: BookingFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const { slots, id } = bookingQuest;

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    contactPerson: '',
    phone: '',
    withChildren: true,
    peopleCount: 0,
    locationId: 0,
    questId: id,
  });

  const onSubmit = () => {
    dispatch(postNewBookingAction({

    }))
  }

  return (
    <form className="booking-form" action="https://echo.htmlacademy.ru/" method="post">
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <div className="booking-form__date-inner-wrapper">

            {slots.today.map((slot) => (
              <label className="custom-radio booking-form__date" key={slot.time}>
                <input type="radio" id={`today${slot.time}`} name="date" required value={slot.time} disabled={!slot.isAvailable} />
                <span className="custom-radio__label">{slot.time}</span>
              </label>)
            )}

          </div>
        </fieldset>

        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Завтра</legend>
          <div className="booking-form__date-inner-wrapper">

            {slots.tomorrow.map((slot) => (
              <label className="custom-radio booking-form__date" key={slot.time}>
                <input type="radio" id={`tomorrow${slot.time}`} name="date" required value={slot.time} disabled={!slot.isAvailable} />
                <span className="custom-radio__label">{slot.time}</span>
              </label>)
            )}

          </div>
        </fieldset>
      </fieldset>

      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">Ваше имя</label>
          <input type="text" id="name" name="name" placeholder="Имя" required pattern="[А-Яа-яЁёA-Za-z'- ]{1,}" />
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <input type="tel" id="tel" name="tel" placeholder="Телефон" required pattern="[0-9]{10,}" />
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <input type="number" id="person" name="person" placeholder="Количество участников" required />
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input type="checkbox" id="children" name="children" defaultChecked />
          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span>
          <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>
      <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
        <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
        <span className="custom-checkbox__icon">
          <svg width="20" height="17" aria-hidden="true">
            <use xlinkHref="#icon-tick"></use>
          </svg>
        </span>
        <span className="custom-checkbox__label">Я&nbsp;согласен с&nbsp;
          <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>
          &nbsp;и пользовательским соглашением
        </span>
      </label>
    </form>
  );
}

export default BookingForm;
