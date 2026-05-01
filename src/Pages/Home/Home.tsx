import React, { useState, useEffect } from 'react';

type PokemonResponse = {
    id: number;
    name: string;
    abilityType: string;
};

const Home: React.FC = () => {
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
    );
}

export default Home;