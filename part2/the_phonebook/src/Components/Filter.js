const Filter = ({showAll, setShowAll}) => <div>filter shown with: <input  value={showAll} onChange={(e)=> setShowAll(e.target.value)} /></div>



export default Filter