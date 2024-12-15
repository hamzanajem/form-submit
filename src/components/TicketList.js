import TicketItem from "./Ticketitem";

export default function TicketList({ tickets, dispatch }) {

    return (
        <div className="ticket-list">
            {tickets.map(ticket => (<TicketItem key={ticket.id} dispatch={dispatch} ticket={ticket} />))}

        </div>
    );
}
