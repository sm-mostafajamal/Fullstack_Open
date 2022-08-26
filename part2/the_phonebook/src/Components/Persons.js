import contactServices from '../services/persons';

const Persons =({contactToShow})=>{

    const deleteContact =(contact) => window.confirm(`Delete ${contact.name}?`) && contactServices.deleteObj(contact.id)

    return  <div>
                {contactToShow.map(contact => 
                <div key={contact.id}> 
                {contact.name} {contact.number} 
                <button onClick={()=> deleteContact(contact)}>delete</button>
                </div>
                )}
            </div>
}


export default Persons