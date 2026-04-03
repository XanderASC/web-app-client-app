import { Link, useLocation } from "react-router";
import Container from "./Container";
import Search from '../assets/search-svgrepo-com.svg';

export default function Navbar({ search, setSearch }: { search: string, setSearch: React.Dispatch<React.SetStateAction<string>> }) {
  const location = useLocation();
  const pathname = location.pathname;

  return <Container className="bg-primary text-background py-2">
    <div className="bg-background flex justify-between">
      <Link to="/" className="text-3xl font-bold bg-primary border-background border-l-16 px-2">FlickCritic</Link>
      {pathname === '/' &&
        <div className="bg-primary border-r-16 border-background px-2 flex">
          <label htmlFor="search">
            <img src={Search} className="h-9 cursor-text" />
          </label>
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            id="search" 
            type="text" 
            className="w-0 h-full text-xl duration-300 focus:w-50 focus:ml-2 focus:px-2"
            style={search.trim() !== '' ? {
              width: '200px',
              marginLeft: '8px',
              padding: '0 8px'
            } : {}}
          />
        </div>
      }
    </div>
  </Container>
}