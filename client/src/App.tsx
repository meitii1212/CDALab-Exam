import React, { useState } from 'react';
import './App.scss';
import { createApiClient, Ticket } from './api';
import pin_tag from './pin.jpg';
import ShowMoreText from "react-show-more-text";


export type AppState = {
	tickets?: Ticket[];
	search: string;
	pinned_tickets: Ticket[];  //array for the pinned tickets that will be able to be restored

	
};


const api = createApiClient();


export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		search: '',
		pinned_tickets: [],

	
		
		

	};

	//const [ show,More,setShowMore] = useState(false);

	searchDebounce: any = null;

	async componentDidMount() {
		console.log("start mount")
		let tickets_from_server = Array<Ticket>();
		tickets_from_server = await api.getTickets()

		const fullTickets = tickets_from_server.map(({id, title,content,userEmail,creationTime}: Ticket) => ({id, title,content,userEmail,creationTime,isPinned: false}))


		this.setState({
			//tickets: await api.getTickets(),
			tickets: fullTickets,
		});
	
	}

	executeOnClick(isExpanded :boolean) {
        console.log(isExpanded);
    }



	
	renderTickets = (tickets: Ticket[]) => {
		
	
		console.log("render tickets")
		const filteredTickets = tickets.filter((t) =>
			(t.title.toLowerCase() + t.content.toLowerCase()).includes(
				this.state.search.toLowerCase()
			)
		);
				
		console.log("filtered tickets in render tickets ")
		console.log(filteredTickets)
		console.log("state tickets in render tickets ")
		console.log(this.state.tickets);
		return (

			
			<ul className='tickets'>
				{filteredTickets.map((ticket) => (
					<li key={ticket.id} className='ticket' >

						{ ticket.isPinned 
						
						? <img id='pin_photo'  src={pin_tag} alt="bla" width={52} height={54} onClick={() => this.handlePin(ticket)} />
					    : <button id="pin_button" className='button' onClick={() => this.handlePin(ticket)}> PIN</button>
						}
						<h5 className='title'>{ticket.title}</h5>

						<ShowMoreText
                /* Default options */
                lines={3}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="my-anchor-css-class"
                 onClick={this.executeOnClick}
                expanded={false}
                width={930}
                truncatedEndingComponent={"... "}>  <div className='contentDiv'> {ticket.content}</div> 
				
				</ShowMoreText>

							<footer>
							<div className='meta-data'>
								By {ticket.userEmail} |{' '}
								{new Date(ticket.creationTime).toLocaleString()}
							</div>
						</footer>
					</li>
				))}
			</ul>
		);
	};

	//=========== HELPER FUNCTIONS =========== 


	handlePin= (ticket: Ticket) =>{
		console.log("pinning");
		
		if(!this.state.tickets){
			console.log("no data")
			return
		}
		//finding the item 
		let index = this.state.tickets.findIndex(x => x.id === ticket.id)
		var new_pinned_tickets = Array<Ticket>();
		var new_tickets = Array<Ticket>();

		//CASE1 - if wasnt pinned:
		if(!ticket.isPinned){
		ticket.isPinned= true;
		//changing the tickets list order so the pinned items will be first according to the pinning order.

		
		new_tickets[0] = ticket
		for (var _i = 0; _i < this.state.tickets.length; _i++) {
			if(_i < index){
				new_tickets[_i+1] = this.state.tickets[_i]}

			if(_i  === index){
				continue
			}
			if(_i > index){
				new_tickets[_i] = this.state.tickets[_i]}

	
		}

		//updating the restored tickets list

		new_pinned_tickets = [...this.state.pinned_tickets.slice(0)]
		new_pinned_tickets.push(ticket)

		}

		else{

			console.log("un-pinning");
			ticket.isPinned= false;

			//changing the tickets list order so the pinned items will be last according to the pinning order.

			for (var _j = 0; _j < this.state.tickets.length; _j++) {
				if(_j < index){
					new_tickets[_j] = this.state.tickets[_j]}

				if(_j  === index){
					continue
				}
				if(_j > index){
					new_tickets[_j-1] = this.state.tickets[_j]}

		
			}
		
		new_tickets.push(ticket)
		//updating the restored tickets list
		new_pinned_tickets = [...this.state.pinned_tickets.slice(0)]
		new_pinned_tickets= new_pinned_tickets.filter((x:Ticket)=> x.id !== ticket.id)

		}


		//=== SAVING CHANGES AND WRITING TO MEMORY ===== 
	
		this.setState({
			tickets: new_tickets,
			pinned_tickets: new_pinned_tickets,
		});
		

		};
	onSearch = async (val: string, newPage?: number) => {
		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: val,
			});
		}, 300);
	};




	render() {

		console.log("===RENDER===")

		const { tickets } = this.state;

		return (
			<main>
				<h1>Tickets List</h1>
				<button id="restore_button" className='button' > Restore </button>
				<header>
					<input
						type='search'
						placeholder='Search...'
						onChange={(e) => this.onSearch(e.target.value)}
					/>
				</header>
				{tickets ? <div className='results'>Showing {tickets.length} results</div> : null}
				{tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
			</main>
		);
	}
}

export default App;
