import {takeLatest, put, call} from 'redux-saga/effects';
import {GET_EVENTS} from './actionTypes';
import {getEventsSuccess, getEventsFail} from './actions';
import {getEvents} from '../../helpers/backendHelper';

function* onGetEvents(action) {
    try {
        const {latitude, longitude, categoryId} = action.payload;

        const response = yield call(getEvents, latitude, longitude, categoryId);

        console.log(['response', response]);
        yield put(getEventsSuccess(response));
    } catch (error) {
        yield put(getEventsFail(error.response));
    }
}

function* EventsSaga() {
    yield takeLatest(GET_EVENTS, onGetEvents);
}

export default EventsSaga;
