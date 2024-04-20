import './App.css';
import PeopleTable from "./components/people-table/people-table";
import Filters from './components/filters/filters.component';
import Navbar from "./components/navbar/navbar";
import SearchBar from "./components/search-bar/search-bar";

function App() {

    const handleSearch = (query: string) => {
        console.log('Search query:', query);
    };

    return (
        <>
            <div style={{marginBottom: '20px'}}>
                <Navbar/>
            </div>
            <div className="grid grid-cols-12 gap-4 p-6">
                <div className="col-span-2 p-4 w-full" >
                    <Filters/>
                </div>
                <div className="col-span-10 bg-white p-4">
                    <SearchBar onSearch={handleSearch}/>
                    <h2 className="text-xl font-bold mb-4 mt-8">People Table</h2>
                    <PeopleTable/>
                </div>
            </div>
        </>
    )
}

export default App;
