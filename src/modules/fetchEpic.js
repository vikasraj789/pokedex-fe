import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import { fetchDataSuccess, fetchDataFailure } from "../globalActions";
import APP_CONSTANTS from "../constants";
import { authenticatedPost } from "../utils";

const fetchEpic = action$ =>
    action$.filter(action => action.type === APP_CONSTANTS.fetchData).mergeMap(({ payload }) => {
        return authenticatedPost(payload.url, payload.data)
            .then(res => {
                return fetchDataSuccess(res.data);
            })
            .catch(err => fetchDataFailure());
    });

export default fetchEpic;
