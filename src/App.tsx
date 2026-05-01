import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Home/Home';
import AddPokemon from './Pages/AddPokemon/AddPokemon';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/home" element={<Dashboard> <Home/> </Dashboard> } />
      <Route path="/dashboard/add" element={<Dashboard> <AddPokemon/> </Dashboard>} />
    </Routes>
    
  );
}

export default App;
