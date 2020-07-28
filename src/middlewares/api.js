/* eslint-disable */
import Symbol from "es6-symbol";
import { isUndefined, isEmpty } from "lodash";

import { callApi } from "../services";

export const CALL_API = Symbol("Call API");

export default ({ getState }) => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === "undefined") return next(action);

  let {
    id,
    wow,
    data,
    sort,
    types,
    postId,
    pageNo,
    method,
    endpoint,
    formData,
    expiresIn,
    searchType,
    searchToken,
    authenticated,
  } = callAPI;

  const [requestType, successType, errorType, collateralType] = types;
  let requestAction = { type: requestType };

  if (typeof id !== "undefined") requestAction.id = id;

  if (typeof postId !== "undefined") requestAction.postId = postId;

  if (typeof pageNo !== "undefined") requestAction.pageNo = pageNo;

  if (typeof wow !== "undefined") requestAction.wow = wow;

  if (typeof sort !== "undefined") requestAction.sort = sort;

  if (typeof searchType !== "undefined") requestAction.searchType = searchType;

  if (typeof expiresIn !== "undefined") requestAction.expiresIn = expiresIn;

  next(requestAction);

  return callApi(data, method, endpoint, authenticated, formData)
    .then(response => {
      responseHandler(response);
    })
    .catch(error => {
      next({ error, type: errorType });
    });

  /* helpers below */

  function responseHandler(response) {
		response = winnowResponse(response);
    if (response) {
      const { data } = response;
      /* run all collateral */
      if (!isUndefined(collateralType) && !isEmpty(collateralType)) {
        collateralType.map(type => {
          next({
            id,
            wow,
            data,
            type,
            postId,
            expiresIn,
            searchToken
          });
        });
			}
      next({ data, type: successType, pageNo });
    }
  }

  function winnowResponse(response) {
    if (!isUndefined(response.response)) {
      const { data, status } = response.response;
      if (status === 401) {
        next({ error: data, type: errorType });
        return false;
      }
      next({ error: data, type: errorType });
      return false;
    } else {
      /* internet connection */
      if (response.message === "Network Error") {
        const error = { message: "Please check your internet connection" };
        next({ error, type: errorType });
        return false;
      }
      return response;
    }
  }
};
