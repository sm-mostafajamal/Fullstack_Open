const PersonForm =({addContact, newName, setNewName, number, setNumber })=> <form onSubmit={addContact}>
                <div>
                name: <input value={newName} onChange={(e)=> setNewName(e.target.value)} />
                </div>
                <div>
                number: <input value={number} onChange={(e)=> setNumber(e.target.value) } />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>


export default PersonForm