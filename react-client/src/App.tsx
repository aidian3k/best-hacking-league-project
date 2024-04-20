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
            <Navbar/>
            <SearchBar onSearch={handleSearch}/>
            <PeopleTable/>
        </>
    )
}

export default App;
