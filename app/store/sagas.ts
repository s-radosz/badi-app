import {all, fork} from 'redux-saga/effects';

import TranslationsSaga from './translations/saga';

export default function* rootSaga() {
    yield all([fork(TranslationsSaga)]);
}
