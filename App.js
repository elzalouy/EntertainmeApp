import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import AppStack from './src/screens';
const App = () => {
  return (
    <Provider store={store}>
      <AppStack></AppStack>
    </Provider>
  );
};
export default App;
