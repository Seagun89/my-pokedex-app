import React, { useState } from 'react';
import './Addpokemon.css';

type AddPokemonRequest = {
    Name: string;
    PokemonId: number | undefined;
    Height: number | undefined;
    Weight: number | undefined;
    CreatedBy: string;
    AbilityType: string;
    Abilities: {Name: string, Description: string, AbilityType: string, Damage: number | undefined}[];
}
const AddPokemon: React.FC = () => {
    const [addpokemon, setAddpokemon] = useState<AddPokemonRequest>({
        Name: "",
        PokemonId: undefined as unknown as number,
        Height: undefined as unknown as number,
        Weight: undefined as unknown as number,
        CreatedBy: sessionStorage.getItem("Username") || "",
        AbilityType: "",
        Abilities: [{Name: "", Description: "", AbilityType: "", Damage: undefined as unknown as number}]
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        fetch("http://localhost:5206/Pokemon/PokeDex/AddPokemon", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(addpokemon)
        }).then(async (response) => {
            if (!response.ok) {
                throw new Error("Failed to add Pokemon.");
            }
            console.log("Pokemon added successfully.");
        }).catch((error) => {
            console.error("Error adding pokemon:", error);
        });
    }
    
    return (
        <div className="content">
            <h1>Add New Pokemon</h1>
            <form onSubmit={handleSubmit}>
                <h4>Pokemon Data</h4>
                <input type="text" placeholder="Name" value={addpokemon.Name} onChange={(e) => setAddpokemon({...addpokemon, Name: e.target.value})} required />
                <input type="string" placeholder="Pokemon ID" value={addpokemon.PokemonId} onChange={(e) => setAddpokemon({...addpokemon, PokemonId: parseInt(e.target.value)})} required />
                <input type="number" placeholder="Height" value={addpokemon.Height} onChange={(e) => setAddpokemon({...addpokemon, Height: parseInt(e.target.value)})} required />
                <input type="number" placeholder="Weight" value={addpokemon.Weight} onChange={(e) => setAddpokemon({...addpokemon, Weight: parseInt(e.target.value)})} required />
                <input type="text" placeholder="Ability Type" value={addpokemon.AbilityType} onChange={(e) => setAddpokemon({...addpokemon, AbilityType: e.target.value})} required />
                <h4>Ability</h4>
                <input type="text" placeholder="Ability Name" value={addpokemon.Abilities[0].Name} onChange={(e) => setAddpokemon({...addpokemon, Abilities: [{...addpokemon.Abilities[0], Name: e.target.value}]})} required />
                <input type="text" placeholder="Ability Description" value={addpokemon.Abilities[0].Description} onChange={(e) => setAddpokemon({...addpokemon, Abilities: [{...addpokemon.Abilities[0], Description: e.target.value}]})} required />
                <input type="text" placeholder="Ability Type" value={addpokemon.Abilities[0].AbilityType} onChange={(e) => setAddpokemon({...addpokemon, Abilities: [{...addpokemon.Abilities[0], AbilityType: e.target.value}]})} required />
                <input type="number" placeholder="Ability Damage" value={addpokemon.Abilities[0].Damage} onChange={(e) => setAddpokemon({...addpokemon, Abilities: [{...addpokemon.Abilities[0], Damage: parseInt(e.target.value)}]})} required />
                <button type="submit">Add Pokemon</button>
            </form>
        </div>
    );
}

export default AddPokemon;