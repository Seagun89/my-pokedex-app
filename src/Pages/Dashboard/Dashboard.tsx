import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './Dashboard.css';

type PokemonResponse = {
    id: number;
    name: string;
    abilityType: string;
};

// type QueryPokemonRequest = {
//     AbilityType?: string;
//     Height: number;
//     Ability?: {Name: string; AbilityType: string; Damage: number}[];
//     SortBy?: string;
//     IsDescending: boolean;
//     PageNumber: number;
//     PageSize: number;
//     Username: string;
// };

const Dashboard: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<PokemonResponse[]>([]);

    useEffect(() => {
        
        const params = new URLSearchParams({Username: sessionStorage.getItem("Username") || ""});
        const fetchPokemon = async () => {
            try{
                await fetch(`http://localhost:5206/Pokemon/PokeDex/All?${params}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(async (response) => {
                    if(!response.ok){
                        throw new Error("Failed to fetch pokemon data list.");
                    }

                    const data: PokemonResponse[] = await response.json();
                    setPokemonList(data);
                })
            }catch (error){
                console.error("Error fetching pokemon data:", error);
            }
        };

        fetchPokemon();
    }, []);
    return (
        <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Pokedex</h2>
        <a href="#">Home</a>
        <a href="#">My Pokemon</a>
      </div>

      {/* Main */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <h3>Dashboard</h3>
          <Link to='/'><button>Logout</button></Link>
          
        </div>

        {/* Content */}
        <div className="content">
          <div className="card-grid">
            {pokemonList.map((p) => (
              <div className="card" key={p.id}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                  alt={p.name}
                />
                <h4>{p.name}</h4>
                <p>{p.abilityType}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    );
}

export default Dashboard