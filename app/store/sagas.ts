import {all, fork} from 'redux-saga/effects';

import TranslationsSaga from './translations/saga';
import CategoriesSaga from './categories/saga';

export default function* rootSaga() {
    yield all([fork(TranslationsSaga), fork(CategoriesSaga)]);
}
