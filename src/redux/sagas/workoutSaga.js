import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchWorkouts(action) {
  try {

    // passes the exercise object from the payload to the server
    const response = yield axios.get('/api/workout');
    yield put({ type: 'SET_WORKOUTS', payload: response.data });
  } catch (error) {
    console.log('Error with exercise saga', error);
  }
}

function* addWorkout(action) {
  // on success, dispatch the FETCH_FRUITS action so that
  // everything refreshes!
  // action.payload will just be the thing that we want to post:
  // { fruit: 'Orange' }
  let item = action.payload;
  try {
    yield axios.post(`/api/workout`, action.payload);
    yield put({ type: 'FETCH_WORKOUT_ID', payload: item });
  } catch (error) {
    alert('Unable to POST workout to server', error);
  }
}


function* workoutSaga() {
  yield takeEvery('FETCH_WORKOUTS', fetchWorkouts); // take latest vs take every
  yield takeEvery('ADD_WORKOUT', addWorkout); // take latest vs take every

}

export default workoutSaga;
