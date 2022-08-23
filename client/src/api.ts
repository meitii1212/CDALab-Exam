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
	//storeTickets: () =>void
};

export const createApiClient = (): ApiClient => {
	return {
		getTickets: (page?:number) => {
			return axios.get(APIRootPath,{params:{page:page}}).then((res) => res.data);
		},

		// storeTickets: (pinned_tickets_list: Array<Ticket>) =>{

		// 	return axios.post(APIRootPath,{body:{tickets:pinned_tickets_list}}).then((res) => res.data);
		// },

	};
};
