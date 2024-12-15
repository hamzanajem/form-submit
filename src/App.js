
import './App.css';
import './styles.css';
import TicketForm from './components/TicketForm';
import TicketReducer from './reducers/TicketReducer';
import { useReducer } from 'react';
import TicketList from './components/TicketList';
import { sortTickets } from './utilities/sortingUtilities';
import { type } from '@testing-library/user-event/dist/type';
function App() {
  const intialeState = { tickets: [], editingTicket: null, sortPreference: "High to low" };
  const [state, dispatch] = useReducer(TicketReducer, intialeState);

  const sortedTicket = sortTickets(state.tickets, state.sortPreference);
  console.log("sort", sortedTicket);


  return (
    <div className="App">
      <div className='container'>
        <h1>bug blaster</h1>
        <TicketForm dispatch={dispatch} editingTicket={state.editingTicket} />
        {
          state.tickets.length > 0 && <div className='results'><h1>ALL TICKET</h1>
            <select value={state.sortPreference} onChange={(e) => { dispatch({ type: "SET_SORTING", payload: e.target.value }) }}>
              <option value="High to low">High to low</option>
              <option value="low to high">low to high</option>
            </select>
            <TicketList dispatch={dispatch} tickets={sortedTicket} />
          </div>

        }

      </div>
    </div>
  );
}

export default App;
