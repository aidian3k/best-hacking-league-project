import './App.css';
import PeopleTable from "./components/people-table/people-table";
import Navbar from "./components/navbar/navbar";
import SearchBar from "./components/search-bar/search-bar";

function App() {

    const handleSearch = (query: string) => {
        console.log('Search query:', query);
    };

    return (
        <>
            <div style={{ marginBottom: '20px' }}>
                <Navbar/>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <SearchBar onSearch={handleSearch}/>
            </div>
            <div style={{ padding: '20px' }}>
                <PeopleTable/>
            </div>
        </>
    )
}

export default App;
