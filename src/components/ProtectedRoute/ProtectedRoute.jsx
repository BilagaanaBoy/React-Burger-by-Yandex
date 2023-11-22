import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { getUser } from '../../services/actions/authActions';

export function ProtectedRoute({ children, ...rest }) {
    
  const dispatch = useDispatch();

  const [isUserLoaded, setUserLoaded] = useState(false);
  const auth = useSelector((store) => store.authReducer.isAuthorized);
  

  const init = async () => {
    await dispatch(getUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  console.log({children})
  console.log({...rest})

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}