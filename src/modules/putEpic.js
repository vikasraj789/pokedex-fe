import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import { putDataSuccess, putDataFailure } from "../globalActions";
import APP_CONSTANTS from "../constants";
import { authenticatedPut } from "../utils";

const fetchEpic = action$ =>
    action$.filter(action => action.type === APP_CONSTANTS.putData).mergeMap(({ payload }) => {
        return authenticatedPut(payload.url, payload.data)
            .then(res => {
                return putDataSuccess(res.data);
            })
            .catch(err => putDataFailure());
    });

export default fetchEpic;
