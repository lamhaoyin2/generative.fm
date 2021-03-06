import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import './title-nav.scss';

const TitleNavLink = ({
  text,
  linkTo,
  parentClass,
  hasDot = false,
  exact = false,
  isActive = match => match && match.url === linkTo,
}) => (
  <li className={`${parentClass}__item`}>
    {hasDot && <div className="title-nav__header__tab-list__item__dot" />}
    <NavLink
      className={`${parentClass}__item__link`}
      activeClassName={`${parentClass}__item__link--is-active`}
      to={linkTo}
      exact={exact}
      isActive={isActive}
    >
      {text}
      <div className={`${parentClass}__item__active-indicator`} />
    </NavLink>
  </li>
);

TitleNavLink.propTypes = {
  text: propTypes.string.isRequired,
  linkTo: propTypes.string.isRequired,
  parentClass: propTypes.string.isRequired,
  hasDot: propTypes.bool,
  exact: propTypes.bool,
  isActive: propTypes.func,
};

const matchRootOrMusic = (match, location) =>
  location.pathname === '/' || location.pathname.startsWith('/music');

const TitleNavComponent = ({
  isUpdateAvailable,
  notifications,
  dismissNotification,
}) => {
  let notification;
  if (notifications.length > 0) {
    //eslint-disable-next-line prefer-destructuring
    notification = notifications[0];
  }
  return (
    <div className="title-nav">
      <div className="title-nav__header">
        <h1 className="title-nav__header__title title-nav__header__title--primary">
          Generative.fm
        </h1>
        <h2 className="title-nav__header__title title-nav__header__title--secondary">
          Endlessly unique ambient music
        </h2>
        <ul className="title-nav__header__tab-list">
          <TitleNavLink
            text="MUSIC"
            parentClass="title-nav__header__tab-list"
            linkTo="/"
            isActive={matchRootOrMusic}
          />
          <TitleNavLink
            text="ABOUT"
            parentClass="title-nav__header__tab-list"
            linkTo="/about"
            hasDot={isUpdateAvailable}
          />
          <TitleNavLink
            text="HELP"
            parentClass="title-nav__header__tab-list"
            linkTo="/help"
          />
          <TitleNavLink
            text="RECORD"
            parentClass="title-nav__header__tab-list"
            linkTo="/record"
          />
        </ul>
      </div>
      {notification && (
        <div className="title-nav__notification">
          <a
            href={notification.link}
            target="_blank"
            rel="noreferrer noopener"
            className="title-nav__notification__msg"
          >
            {notification.message}
          </a>
          <button
            type="button"
            className="title-nav__notification__close"
            onClick={() => dismissNotification(notification.id)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
    </div>
  );
};

TitleNavComponent.propTypes = {
  isUpdateAvailable: propTypes.bool.isRequired,
  notifications: propTypes.array.isRequired,
  dismissNotification: propTypes.func.isRequired,
};

export default TitleNavComponent;
