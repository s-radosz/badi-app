import {combineReducers} from 'redux';

import Alert from './alert/reducer';
import Loader from './loader/reducer';
import Translations from './translations/reducer';
import User from './user/reducer';

const rootReducer = combineReducers({
    Alert,
    Loader,
    Translations,
    User,
});

export default rootReducer;
