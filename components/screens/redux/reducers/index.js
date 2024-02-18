import { combineReducers } from 'redux';
import commonReducer from './commomReducer';
import DoctorDataReducer from './DoctorDataReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['currentColor','doctoreDetaile'],
};

const rootReducers = combineReducers({
  commonReducer: persistReducer(persistConfig, commonReducer),
  doctorDataReducer : persistReducer(persistConfig,DoctorDataReducer),
});

export default rootReducers;