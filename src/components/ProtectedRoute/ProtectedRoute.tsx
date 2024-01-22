import { FunctionComponent,ReactNode,useEffect, useState } from 'react';
import { Route, Redirect,RouteProps  } from 'react-router-dom';

import { getUser } from '../../services/actions/authActions';
import { useSelector, useDispatch } from '../../utils/hooks';

type TRouteProps = {
  children: React.ReactNode
} & RouteProps

const ProtectedRoute: FunctionComponent<TRouteProps> = ({ children, ...rest })  => {
    
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

export default ProtectedRoute;