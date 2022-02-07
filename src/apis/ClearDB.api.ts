import axios from "axios";

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000'
});

export const ClearDBAPI = {
	clear: function () {
		return axiosInstance.request({
			method: "GET",
			url: '/db/drop'
		});
	},
}