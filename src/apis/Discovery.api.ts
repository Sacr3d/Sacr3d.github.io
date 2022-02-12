import axios from "axios";

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000'
});

export const DiscoveryAPI = {
	get: function () {
		return axiosInstance.request({
			method: "GET",
			url: '/sltaxii2'
		})
	},
}