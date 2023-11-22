import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';

import { EmailInput,Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ForgotPassword.module.css';
import clsx from 'clsx';

import { forgotPassword } from '../../utils/auth';



function ForgotPassword() {
  const [form, setValue] = useState({ email: '' });
  const history = useHistory();
  const auth = useSelector((store) => store.authReducer.isAuthorized);
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const passwordReset = useCallback(
    (e) => {
      e.preventDefault();
      forgotPassword(form.email)
        .then((data) => {
          if (data.success) {
            history.replace({ pathname: '/reset-password' });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    [form, history]
  );

  if (auth) {
    return <Redirect to={'/'} />;
  }

  return (
    <div className={styles.main}>
      <form
        className={clsx(styles.form,'mb-20')}
        onSubmit={passwordReset}
      >
        <h1 className={'text text_type_main-large mb-6'}>
          Восстановление пароля
        </h1>
        <div className={'mb-6'}>
          <EmailInput
            value={form.email}
            name="email"
            placeholder="Укажите e-mail"
            onChange={onChange}
          />
        </div>
        <Button primary={true}>Восстановить</Button>
      </form>
      <div className={styles.flex}>
        <p className={'text text_type_main-default text_color_inactive'}>
          Вспомнили пароль?
        </p>
        <Link
          to="/login"
          className={clsx(styles.link,' text text_type_main-default ml-2')}
        >
          Войти
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;