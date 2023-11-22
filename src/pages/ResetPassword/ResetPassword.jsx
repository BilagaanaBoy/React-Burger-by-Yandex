import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ResetPassword.module.css';
import clsx from 'clsx';

import { resetPassword } from '../../utils/auth';

function ResetPassword() {
    
  const history = useHistory();
  const [form, setValue] = useState({ code: '', password: '' });
  
  let permission = false;
  if (history.action === 'PUSH' || history.action === 'REPLACE') {
    if (history.location.pathname === '/reset-password') {

      permission = true;
    }
  }
  if (!permission) {
    history.replace({ pathname: '/' });
  }
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const passwordCreate = useCallback(
    (e) => {
      e.preventDefault();
      resetPassword(form.password, form.code)
        .then((data) => {
          if (data.success) {
            history.replace({ pathname: '/' });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [form, history]
  );

  return (
    <div className={styles.main}>
      <form
        onSubmit={passwordCreate}
        className={clsx(styles.form,'mb-20')}
      >
        <h1 className={'text text_type_main-large mb-6'}>
          Восстановление пароля
        </h1>
        <div className={'mb-6'}>
          <PasswordInput
            placeholder="Введите новый пароль"
            value={form.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <div className={'mb-6'}>
          <Input
            placeholder="Введите код из письма"
            value={form.code}
            name="code"
            onChange={onChange}
          />
        </div>
        <Button type="primary">Сохранить</Button>
      </form>
      <div className={styles.flex}>
        <p className={'text text_type_main-default text_color_inactive'}>
          Уже зарегистрированы?
        </p>
        <Link
          to="/login"
          className={clsx(styles.link, 'text text_type_main-default ml-2')}
        >
          Войти
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;