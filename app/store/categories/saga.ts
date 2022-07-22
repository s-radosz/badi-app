import {takeLatest, put, call} from 'redux-saga/effects';
import {GET_CATEGORIES} from './actionTypes';
import {getCategoriesSuccess, getCategoriesFail} from './actions';
import {getCategories} from '../../helpers/backendHelper';

function* onGetCategories() {
    try {
        const response = yield call(getCategories);
        yield put(getCategoriesSuccess(response));
    } catch (error) {
        yield put(getCategoriesFail(error.response));
    }
}

function* CategoriesSaga() {
    yield takeLatest(GET_CATEGORIES, onGetCategories);
}

export default CategoriesSaga;
