import React, { useState } from 'react';
import './App.scss';
import { createApiClient, Ticket } from './api';
import pin_tag from './pin.jpg';
import ShowMoreText from "react-show-more-text";
import InfiniteScroll from 'react-infinite-scroll-component';


export type AppState = {
	tickets?: Ticket[];
	search: string;
	pinned_tickets: Ticket[];  //array for the pinned tickets that will be able to be restored
	next_data?:Ticket[];
	page_number:number;

	
};


const api = createApiClient();


export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		search: '',
		pinned_tickets: [],
		next_data:[],
		page_number:1,

	};

	filteredTickets = new Array<Ticket>();
	searchDebounce: any = null;

	async componentDidMount() {
		console.log("start mount")
		let tickets_from_server = Array<Ticket>();
		tickets_from_server = await api.getTickets(1);
		let next_tickets = Array<Ticket>();
		next_tickets = await api.getTickets(2);
		const fullTickets = tickets_from_server.map(({id, title,content,userEmail,creationTime}: Ticket) => ({id, title,content,userEmail,creationTime,isPinned: false}))
		
		console.log("%%%next tickets");
		console.log(next_tickets);

		this.setState({
			//tickets: await api.getTickets(),
			tickets: fullTickets,
			next_data:next_tickets,
		});
	
	}

	executeOnClick(isExpanded :boolean) {
        console.log(isExpanded);
    } 


	
	renderTickets = (tickets: Ticket[]) => {
		
		// ======== add filtering options ===== 

		console.log("render tickets")
		//after date 
		if(this.state.search.toLowerCase().startsWith("after:")&& this.state.search.charAt(8)==="/" && this.state.search.charAt(11)==="/" && this.state.search.charAt(16)===" "){
			
			//if(!isNaN(Number(this.state.search.slice(6,8))) && !isNaN(Number(this.state.search.slice(9,11))) && !isNaN(Number(this.state.search.slice(12,16))) ){
				console.log("=====> after string good2223333")
				//console.log("=====> string good2")
				let given_date = new Date(this.state.search.slice(6,16))
				console.log(given_date)
				this.filteredTickets = tickets.filter((t) =>
				(   t.title.toLowerCase() + t.content.toLowerCase()).includes(
					this.state.search.toLowerCase().slice(16)
				)&&
				((new Date(t.creationTime))>(given_date)));
			
			
			//}
			}


			// //before date 
			else if(this.state.search.toLowerCase().startsWith("before:")&& this.state.search.charAt(9)==="/" && this.state.search.charAt(12)==="/" && this.state.search.charAt(17)===" "){
		
				//if(!isNaN(Number(this.state.search.slice(6,8))) && !isNaN(Number(this.state.search.slice(9,11))) && !isNaN(Number(this.state.search.slice(12,16))) ){
					console.log("=====> before string good333")
					//console.log("=====> string good2")
					let given_date = new Date(this.state.search.slice(7,17))
	
					this.filteredTickets = tickets.filter((t) =>
					(   t.title.toLowerCase() + t.content.toLowerCase()).includes(
						this.state.search.toLowerCase().slice(18)
					)&&
					((new Date(t.creationTime))<(given_date)));
				
				
				//}
			}

			//from email 
			else if(this.state.search.toLowerCase().startsWith("from:")&& this.state.search.slice(5).includes("@")&&this.state.search.includes(" ",5) ){

					let str_index = this.state.search.indexOf(" ") +1
					let str_mail = this.state.search.slice(5,str_index-1)
					console.log("=====> from string good444")
					console.log(this.state.search.toLowerCase().slice(str_index))
					console.log(str_mail)
					this.filteredTickets = tickets.filter((t) =>
					(   t.title.toLowerCase() + t.content.toLowerCase()).includes(
						this.state.search.toLowerCase().slice(str_index)
					)&&
					(t.userEmail===str_mail));
				
				
				//}
			}

		// general search

		else{	
			console.log("general")
		this.filteredTickets = tickets.filter((t) =>
		(   t.title.toLowerCase() + t.content.toLowerCase()).includes(
			this.state.search.toLowerCase()	
		));

		}


				
		console.log(" filtered tickets in render tickets ")
		console.log(this.filteredTickets)
		console.log("state tickets in render tickets ")
		console.log(this.state.tickets);


		return (


		<InfiniteScroll 
				
			style={{
				
				width:"104%"
			}}
			dataLength={tickets.length*100} //This is important field to render the next data
			next={this.getNextPage}
			hasMore={true}
			loader={<h4>Loading...</h4>}
			endMessage={
				<p style={{ textAlign: 'center' }}>
				<b>Yay! You have seen it all</b>
				</p>
			}
			
			scrollableTarget="scrollableDiv"
			//below props only if you need pull down functionality
			refreshFunction={this.getNextPage}
			pullDownToRefresh
			pullDownToRefreshThreshold={50}
			pullDownToRefreshContent={
				<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
			}
			releaseToRefreshContent={
				<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
			}
			>
			<ul className='tickets'>
				{this.filteredTickets.map((ticket) => (
					<li key={ticket.id} className='ticket' >

						{ ticket.isPinned 
						
						? <img id='pin_photo'  src={pin_tag} alt="bla" width={52} height={54} onClick={() => this.handlePin(ticket)} />
					    : <button id="pin_button" className='button' onClick={() => this.handlePin(ticket)}> PIN</button>
						}

						<button id="clone_button" className='button' onClick={() => this.handlePin(ticket)}> Clone</button>

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

			</InfiniteScroll>
		
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


	getNextPage = async()=>{
		console.log("%%%inside next page ")
		
		if(!this.state.tickets){
		 	console.log("page number problem")
			return
		 }
		else{

			console.log(this.state.tickets)
			console.log("curr page number is:"+ this.state.page_number)
		let new_page_num = (this.state.page_number) +1;
		console.log("next page number is:"+ new_page_num)

		//let next_tickets1 = Array<Ticket>();
		let tickets1 = Array<Ticket>();
		let old_tickets = Array<Ticket>(); 

		for (var _y = 0; _y < this.state.tickets.length; _y++) {
			old_tickets[_y] = this.state.tickets[_y]
		}

		tickets1 = await api.getTickets(new_page_num);
		//next_tickets1 = await api.getTickets(new_page_num+1);
		tickets1 = old_tickets.concat(tickets1)
		console.log("merged")
		console.log(tickets1)
		setTimeout(() => {
			this.setState({
			  tickets: tickets1,
			  page_number: new_page_num,

			});
		  }, 1500);
		};


	};






	render() {

		console.log("===RENDER===")

		const { tickets } = this.state;

		return (
			<main>
				<h1>Tickets List</h1>
				<button id="restore_button" className='button' > My Favorite Tickets </button>
				<header>
					<input
						id= "search_input"
						type='search'
						placeholder='Search...'
						onChange={(e) => this.onSearch(e.target.value)}
					/>
				</header>
				{tickets ? <div className='results'>filtered {this.filteredTickets.length} from {tickets.length} results</div> : null}
				{tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
				<p> Scroll down for more results! (maximum: 200) </p>
			</main>
		);
	}
}

export default App;
