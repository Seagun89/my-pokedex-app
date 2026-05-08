import React, { useState, useEffect } from 'react';

type PokemonResponse = {
    id: number;
    name: string;
    abilityType: string;
};

type QueryPokemonRequest = {

};

const Home: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<PokemonResponse[]>([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState<PokemonResponse[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSizeVal = "5";
    
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
    let totalPages = Math.ceil(pokemonList.length / Number.parseInt(pageSizeVal));
    // might need to find way to remove duplicate and have a full pokemon list to use of filtering and pagination instead of making a new api call for each page change
    useEffect(() => {
        
        const params = new URLSearchParams({Username: sessionStorage.getItem("Username") || "", PageNumber: currentPage.toString(), PageSize: pageSizeVal});
        const fetchFilteredPokemon = async () => {
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
                    setFilteredPokemonList(data);
                })
            }catch (error){
                console.error("Error fetching pokemon data:", error);
            }
        };

        fetchFilteredPokemon();
    }, [currentPage, pageSizeVal]);

    return (
        <div className="content">
          <div className="card-grid">
            {filteredPokemonList.map((p) => (
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
            <div className="pagination">
                <button
                    className="page-btn"
                    disabled={currentPage === 1}
                    onClick={(() => setCurrentPage(currentPage - 1))}
                >
                    Prev
                </button>

                <button
                    className="page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Home;