import React from 'react';
import clsx from 'clsx';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import headerStyles from './AppHeader.module.css';

function AppHeader() {

  const [activeMenuItem, setactiveMenuItem] = React.useState('constructor');

  return (
    <header className={clsx(headerStyles.mainDiv, 'mt-10')}>
      <nav className={clsx(headerStyles.header, 'mt-10')}>
        <section className={headerStyles.flex} >
          <a href="#" className={
            activeMenuItem === 'constructor'
              ? clsx(headerStyles.menuItemActive, 'text text_type_main-default pt-4 pb-4 pl-5 pr-5  mr-2')
              : clsx(headerStyles.menuItem, 'text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5  mr-2')}>
            <BurgerIcon type={activeMenuItem === 'constructor' ? 'primary' : 'secondary'} />
            <p className="ml-2">Конструктор</p>
          </a>
          <a href="#"
            className={
              activeMenuItem === 'ordering'
                ? clsx(headerStyles.menuItemActive, 'text text_type_main-default pt-4 pb-4 pl-5 pr-5  mr-2')
                : clsx(headerStyles.menuItem, 'text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5  mr-2')}>
            <ListIcon type={activeMenuItem === 'ordering' ? 'primary' : 'secondary'} />
            <p className="ml-2">Лента заказов</p>
          </a>
        </section>
        <section className={headerStyles.flex}>
          <Logo />
        </section>
        <section >
          <a href="#" className={
            activeMenuItem === 'profile'
              ? clsx(headerStyles.menuItemActive, 'text text_type_main-default pt-4 pb-4 pl-5 pr-5  mr-2')
              : clsx(headerStyles.menuItem, 'text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5  mr-2')}>
            <ProfileIcon type={activeMenuItem === 'profile' ? 'primary' : 'secondary'} />
            <p className="ml-3">Личный кабинет</p>
          </a>
        </section>
      </nav>
    </header>
  );

}

export default AppHeader;