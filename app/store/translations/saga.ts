import {takeLatest, put, call} from 'redux-saga/effects';
import {GET_TRANSLATIONS} from './actionTypes';
import {getTranslationsSuccess, getTranslationsFail} from './actions';
import {getTranslations} from '../../helpers/backendHelper';

function* onGetTranslations() {
    try {
        const response = yield call(getTranslations);
        yield put(getTranslationsSuccess(response));
    } catch (error) {
        yield put(getTranslationsFail(error.response));
    }
}

function* TranslationsSaga() {
    yield takeLatest(GET_TRANSLATIONS, onGetTranslations);
}

export default TranslationsSaga;
