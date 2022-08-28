import axios from 'axios';
import { APIRootPath } from '@fed-exam/config';

export type Ticket = {
	id: string;
	title: string;
	content: string;
	creationTime: number;
	userEmail: string;
	labels?: string[];
	isPinned:  boolean
};




export type ApiClient = {
	getTickets: (page?:number) => Promise<Ticket[]>;
	cloneTicket:(ticket:Ticket) =>Promise<boolean>;
	deleteTicket: (ticket:Ticket) =>Promise<boolean>;
	// getFavourites: (page?:number) => Promise<Ticket[]>;
};

export const createApiClient = (): ApiClient => {
	return {
		getTickets: (page?:number) => {
			return axios.get(APIRootPath,{params:{page:page}}).then((res) => res.data);
		},

		cloneTicket: (ticket:Ticket) =>{

			return axios.post(APIRootPath,{ticket:ticket}).then((res) => res.data);
		},

		deleteTicket: (ticket:Ticket) =>{

			return axios.put(APIRootPath,{ticket:ticket}).then((res) => res.data);
		},

		// getFavourites: (page?:number) => {
		// 	return axios.get(APIRootPath+"/fav",{params:{page:page}}).then((res) => res.data);
		// },

	};
};
