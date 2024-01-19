import React, { FunctionComponent , useState, useCallback, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Register.module.css';
import clsx from 'clsx';

import { useSelector, useDispatch } from '../../utils/hooks';
import { register } from '../../services/actions/authActions';

interface IRegisterProps {
  state?: {
    from: Location;
  }
}

const  Register: FunctionComponent<IRegisterProps> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const auth = useSelector((store) => store.authReducer.isAuthorized);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const registerListener = useCallback(
    (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(register(form));
    },
    [form]
  );

  useEffect(() => {
    if (auth) {
      history.replace({ pathname: '/' });
    }
  }, [auth]);

  if (auth) {
    return (
      <Redirect
        to={props.state?.from || '/'}
      />
    );
  }

  return (
    <div className={styles.main}>
      <form onSubmit={registerListener} className={clsx(styles.form, 'mb-20')}>
        <h1
          className={'text text_type_main-large mb-6'}
        >
          Регистрация
        </h1>
        <div className={'mb-6'}>
          <Input
            placeholder="Имя"
            value={form.name}
            name="name"
            onChange={onChange}
          />
        </div>
        <div className={'mb-6'}>
          <EmailInput value={form.email} name="email" onChange={onChange} />
        </div>
        <div className={'mb-6'}>
          <PasswordInput
            value={form.password}
            name="password"
            onChange={onChange}
          />
        </div>
          {/* @ts-ignore */}
          <Button type="primary">Зарегистрироваться</Button>
      </form>
      <div className={styles.flex}>
        <p className={'text text_type_main-default text_color_inactive'}>
          Уже зарегистрированы?
        </p>
        <Link
          to="/login"
          className={clsx(styles.link,'text text_type_main-default ml-2')}
        >
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;