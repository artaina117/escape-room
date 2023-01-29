import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { REGEX } from '../../const';
import { useAppDispatch } from '../../hooks';
import { postNewBookingAction } from '../../store/booking/api-actions';
import { BookingQuest } from '../../types/booking-quest';
import { NewBooking } from '../../types/new-booking';

type BookingFormProps = {
  bookingQuest: BookingQuest;
  locationId: number;
  peopleMinMax: number[];
}

function BookingForm({ bookingQuest, locationId, peopleMinMax }: BookingFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const { slots, id } = bookingQuest;

  const { control, formState: { errors }, handleSubmit } = useForm<NewBooking>({
    defaultValues: {
      withChildren: true,
      locationId: 0,
      questId: 0,
    },
    mode: 'onSubmit',
  });

  const [timeToday, setTimeToday] = useState('');
  const [timeTommorow, setTimeTommorow] = useState('');

  const todayTimeClickHandler = (time: string) => {
    setTimeToday(time);
    setTimeTommorow('');
  };

  const tommorowTimeClockHandler = (time: string) => {
    setTimeTommorow(time);
    setTimeToday('');
  };

  const onSubmit = (data: NewBooking): void => {
    const date = timeToday ? 'today' : 'tomorrow';
    const time = timeToday ? timeToday : timeTommorow;

    if (!Object.keys(errors).length) {
      dispatch(postNewBookingAction({
        ...data,
        peopleCount: Number(data.peopleCount),
        locationId,
        questId: id,
        date,
        time,
      }));
    }
  };

  return (
    <form
      className="booking-form"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <div className="booking-form__date-inner-wrapper">

            {slots.today.map((slot) => (
              <label className="custom-radio booking-form__date" key={slot.time} onClick={() => todayTimeClickHandler(slot.time)}>
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
              <label className="custom-radio booking-form__date" key={slot.time} onClick={() => tommorowTimeClockHandler(slot.time)}>
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
          <Controller
            control={control}
            rules={{
              required: { value: true, message: 'Введите имя' },
              pattern: { value: REGEX.name, message: 'Введите корректное имя' },
            }}
            render={({ field }) => (
              <input type="text" id="name" placeholder="Имя" {...field} />
            )}
            name='contactPerson'
          />
          <span>{errors.contactPerson?.message}</span>
        </div>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: 'Введите номер телефона' },
              pattern: { value: REGEX.phone, message: 'Введите корректный номер телефона' },
            }}
            render={({ field }) => (
              <input type="tel" id="tel" placeholder="Телефон" {...field} />
            )}
            name='phone'
          />
          <span>{errors.phone?.message}</span>
        </div>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: 'Введите количество участников' },
              validate: (value) => value >= peopleMinMax[0] && value <= peopleMinMax[1] ? undefined : `В этом квесте может участвовать от ${peopleMinMax[0]} до ${peopleMinMax[1]} человек`,
            }}
            render={({ field }) => (
              <input type="number" id="peopleCount" placeholder="Количество участников" {...field} />
            )}
            name='peopleCount'
          />
          <span>{errors.peopleCount?.message}</span>
        </div>

        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <Controller
            control={control}
            render={({ field }) => (
              <input type="checkbox" id="withChildren" onChange={field.onChange} checked={field.value} />
            )}
            name='withChildren'
          />

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
