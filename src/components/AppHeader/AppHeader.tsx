import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import headerStyles from './AppHeader.module.css';
import clsx from 'clsx';


function AppHeader() {

  const [activeMenuItem, setactiveMenuItem] = React.useState('constructor');
  
  const { path } = useRouteMatch();
  
  React.useEffect(() => {
    switch (path) {
      case '/feed':
        setactiveMenuItem('ordering');
        break;
      case '/profile':
        setactiveMenuItem('profile');
        break;
      case '/':
        setactiveMenuItem('constructor');
        break;
      default:
        setactiveMenuItem('constructor');
    }
  }, [path]);
  
  return (
    <header className={clsx(headerStyles.mainDiv, 'mt-10')}>
      <nav className={clsx(headerStyles.header, 'mt-10')}>
        <section className={headerStyles.flex} >
          <Link to="/" 
            className={
              activeMenuItem === 'constructor'
                ? clsx(headerStyles.menuItemActive, 'text text_type_main-default pt-4 pb-4 pl-5 pr-5  mr-2')
                : clsx(headerStyles.menuItem, 'text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5  mr-2')}>
            <BurgerIcon type={activeMenuItem === 'constructor' ? 'primary' : 'secondary'} />
            <p className="ml-2">Конструктор</p>
          </Link>
          <Link to="/feed"
            className={
              activeMenuItem === 'ordering'
                ? clsx(headerStyles.menuItemActive, 'text text_type_main-default pt-4 pb-4 pl-5 pr-5  mr-2')
                : clsx(headerStyles.menuItem, 'text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5  mr-2')}>
            <ListIcon type={activeMenuItem === 'ordering' ? 'primary' : 'secondary'} />
            <p className="ml-2">Лента заказов</p>
          </Link>
        </section>
        <section className={headerStyles.flex}>
          <Link to="/"> 
            <Logo />
          </Link>
        </section>
        <section >
          <Link to="/profile"
            className={
              clsx((activeMenuItem === 'profile'
                ? clsx(headerStyles.menuItemActive, 'text text_type_main-default pt-4 pb-4 pl-5 pr-5  mr-2')
                : clsx(headerStyles.menuItem, 'text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5  mr-2')),headerStyles.flexEnd)}>
            <ProfileIcon type={activeMenuItem === 'profile' ? 'primary' : 'secondary'} />
            <p className="ml-3">Личный кабинет</p>
          </Link>
        </section>
      </nav>
    </header>
  );

}

export default AppHeader;