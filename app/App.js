import React, {Component} from 'react';
import AppNavigator from './container/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store'

import { createStore, applyMiddleware } from 'redux';
import logger from './store/middleware/logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer';

import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
  palette: {
    primaryColor: COLOR.blue500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

console.disableYellowBox = true;

class App extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const createStoreWithMW = applyMiddleware(logger, thunk)(createStore)
    const store = createStoreWithMW(rootReducer)

    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Provider store = {store}>
          <AppNavigator/>
        </Provider>
      </ThemeContext.Provider>
    );
  }
}

export default App;
