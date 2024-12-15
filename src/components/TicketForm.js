import { useEffect, useState } from "react"

export default function TicketForm({ dispatch, editingTicket }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('1');

    useEffect(() => {
        if (editingTicket) {
            setTitle(editingTicket.title);
            setDescription(editingTicket.description);
            setPriority(editingTicket.priority);
        }
        else {
            clearForm();
        }
    }, [editingTicket])


    const priorityLabels = {
        1: 'low',
        2: 'medium',
        3: 'high'
    }

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setPriority('1');
    }
    const handleSubmit = (e) => {
        e.preventDefault();



        const ticketData = {
            id: editingTicket ? editingTicket.id : new Date().toISOString(),
            title,
            description,
            priority

        }
        dispatch({ type: editingTicket ? 'UPDATE_TICKET' : 'ADD_TICKET', payload: ticketData });
        clearForm();


    }
    const handleCancel = () => {
        dispatch({ type: 'CLEAR_EDITING_TICKET' })
        clearForm();
    }



    return (<>

        <form className="ticket-form" onSubmit={handleSubmit}>

            <div> <label>
                title
            </label>
                <input type="text" className="form-input" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div> <label>
                description
            </label>
                <textarea type="text" className="form-input" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <fieldset className="priority-feildset">
                <legend>priority</legend>
                {
                    Object.entries(priorityLabels).map(([value, label]) => (<label key={value} className="priority-label">{label}
                        <input type="radio" value={value} checked={priority === value} onChange={e => setPriority(e.target.value)} className="priority-input" />
                    </label>))

                }
            </fieldset>
            <button type="submit" className="button">{editingTicket ? "edit" : "add"}</button>

            {
                editingTicket &&
                <button className="button" onClick={handleCancel}>cancel</button>


            }
        </form>
    </>)
}