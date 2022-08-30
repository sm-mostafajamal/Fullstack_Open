import contactServices from '../services/persons';

const Persons =({contactToShow, setPersons})=>{
    const deleteContact =(contact) => window.confirm(`Delete ${contact.name}?`) && contactServices.deleteObj(contact.id).then(res => setPersons(contactToShow.filter(p=> p.id !== contact.id)))
    
    return  <div>
                {contactToShow.map((contact, index) => 
                <div key={index}>
                {contact.name} {contact.number} 
                <button onClick={()=> deleteContact(contact)}>delete</button>
                </div>
                )}
            </div>
}


export default Persons