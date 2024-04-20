import './App.css';
import PeopleTable from "./components/people-table/people-table";
import Filters from './components/filters/filters.component';

function App() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-2 p-4 w-full">
        <Filters />
      </div>
      
      <div className="col-span-10 bg-white p-4">
        <h2 className="text-xl font-bold mb-4">People Table</h2>
        <PeopleTable />
      </div>
    </div>
  )
}

export default App;
