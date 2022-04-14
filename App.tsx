import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'

import { store, persistor } from './redux/store';
import MainBottomNavigation from './navigation/MainBottomNavigation';
import { PersistGate } from 'redux-persist/integration/react';


export default function App() {
  return (
    <NavigationContainer>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <MainBottomNavigation />
          </PersistGate>
        </Provider>
    </NavigationContainer>
  );
}
