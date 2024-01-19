import React, { useState, useCallback } from 'react';

import { Link, Redirect, useLocation } from 'react-router-dom';

import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { login } from '../../services/actions/authActions';
import styles from './Login.module.css';
import clsx from 'clsx';

import { useSelector, useDispatch } from '../../utils/hooks';

type TLocationState = {
  background: Location;
  from: Location;
}

function Login() {
  const [form, setValue] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.authReducer.isAuthorized);

  const location = useLocation<TLocationState>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const loginListener = useCallback(
    (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(login(form));
    },
    [form]
  );

  if (auth) {
    return (
      <Redirect
        to={location.state?.from || '/'}
      />
    );
  }

  return (
    <div className={styles.main}>
      <form onSubmit={loginListener} className={clsx(styles.form, 'mb-20')}>
        <h1 className={'text text_type_main-large mb-6'}>
          Вход
        </h1>
        <div className={'mb-6'}>
          <EmailInput value={form.email} name={'email'} onChange={onChange} />
        </div>
        <div className={'mb-6'}>
          <PasswordInput
            value={form.password}
            name="password"
            onChange={onChange}
          />
        </div>
        {/* @ts-ignore */}
        <Button type="primary" >Войти</Button>
      </form>
      <div className={styles.flex}>
        <p className={'text text_type_main-default text_color_inactive'}>
          Вы — новый пользователь?
        </p>
        <Link
          to="/register"
          className={clsx(styles.link,'text text_type_main-default ml-2')}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={clsx(styles.flex, 'mt-4')}>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </p>
        <Link
          to="/forgot-password"
          className={clsx(styles.link,'text text_type_main-default ml-2')}
        >
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
}

export default Login;