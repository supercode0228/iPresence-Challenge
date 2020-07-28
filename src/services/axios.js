import axios from "axios";
import { isEmpty } from "lodash";
import { API_URL } from "../constants";

/**
 *  For Rest Calls
 *
 * @param {object|undefined} data
 * @param {string} method
 * @param {string} endpoint
 * @param {boolean|undefined} authenticated
 * @param {string|undefined} token
 *
 * @returns {Promise}
 */
export const callApi = (
	data,
	method,
	endpoint,
	authenticated,
	token,
	formData,
) => {
	let config, headers, url;
	url = API_URL + endpoint;
	headers = { "Content-Type": "application/json" };

	if (authenticated) {
		headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		};
	}

	if (formData && authenticated) {
		headers = {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`
		};
	}

	if (!isEmpty(data) || formData) {
		config = { method, url, headers, data };
	} else {
		config = { method, url, headers };
	}

	return axios(config)
		.then(response => {
			return response;
		})
		.catch(error => {
			return error;
		});
};

/**
 * Refresh User Token
 *
 * @param {string} token
 *
 * @returns {Promise}
 */
export const refreshToken = token => {
	const url = `${API_URL}refresh`;
	const method = "POST";
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`
	};
	const config = { method, url, headers };
	return axios(config)
		.then(response => {
			return response;
		})
		.catch(error => {
			return error;
		});
};
