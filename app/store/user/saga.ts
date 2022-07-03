// import {takeLatest, put, call} from 'redux-saga/effects';
// import {GET_USER_DETAILS} from './actionTypes';
// import {setUserDetailsSuccess, setUserDetailsFail} from './actions';
// import {getUserDetails} from '../../helpers/backendHelper';

// function* onGetUserData() {
//     try {
//         const response = yield call(getUserDetails);
//         yield put(setUserDetailsSuccess(response));
//     } catch (error) {
//         yield put(setUserDetailsFail());
//     }
// }

// function* UserSaga() {
//     yield takeLatest(GET_USER_DETAILS, onGetUserData);
// }

// export default UserSaga;
