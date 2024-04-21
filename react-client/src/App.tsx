import './App.css';
import PeopleTable from "./components/people-table/people-table.component";
import Filters from './components/filters/filters.component';
import Navbar from "./components/navbar/navbar";
import SearchBar from "./components/search-bar/search-bar.component";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setSearchText } from './redux/filters/Filters.slice';
import { useEffect, useState } from 'react';
import { MatchingTasksTableData } from './components/people-table/columns';
import { getMatchingTasks } from './tools/api/matching-tasks/matching-tasks.service';

function App() {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState<MatchingTasksTableData[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const handleSearch = (query: string[]) => {
    const filtersToSend = {...filters, searchText: query}
    dispatch(setSearchText(query))
    setLoadingTasks(true)
    getMatchingTasks(filtersToSend, 0, 10)
      .then(tasks => {setTableData(tasks)})
      .catch(e => alert('Nie udało się wyszukać pracowników'))
      .finally(() => setLoadingTasks(false))
  };

  const displayDetails = () => {
    console.log('details')
  }

  return (
      <>
        <div style={{marginBottom: '20px'}}>
          <Navbar/>
        </div>
        <div className="grid grid-cols-12 gap-4 p-4 ml-32">
          <div className="col-span-2 p-4 w-full">
            <Filters/>
          </div>
          <div className="col-span-10 bg-white p-4 mr-32">
            <SearchBar onSearch={handleSearch}/>
            <h2 className="text-xl font-bold mb-4 mt-8">People Table</h2>
            <PeopleTable data={tableData} loading={loadingTasks} displayDetails={displayDetails}/>
          </div>
        </div>
      </>
  )
}

export default App;
