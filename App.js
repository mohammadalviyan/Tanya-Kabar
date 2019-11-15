import React from 'react';
import Router from './src/Router';
import { Root } from "native-base";
import { store, persistor } from './src/redux/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {

  return(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root>
          <Router/>
        </Root>
      </PersistGate>
    </Provider> 
  )
}

export default App;