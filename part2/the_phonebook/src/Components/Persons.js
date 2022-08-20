const Persons =({contactToShow})=><div>{contactToShow.map(contact => <div key={contact.id}> {contact.name} {contact.number}</div>)}</div>


export default Persons