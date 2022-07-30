import {all, fork} from 'redux-saga/effects';

import TranslationsSaga from './translations/saga';
import CategoriesSaga from './categories/saga';
import EventsSaga from './events/saga';

export default function* rootSaga() {
    yield all([fork(TranslationsSaga), fork(CategoriesSaga), fork(EventsSaga)]);
}
