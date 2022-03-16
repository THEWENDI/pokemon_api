import React, {useState} from 'react'
import axios from 'axios'

const Pokemon = () => {
    const[pokemons, setPokemons] = useState();
    const[pokemonName, setPokemonName] = useState("");
    const[pokemonChosen, setPokemonChosen] = useState(false);
    const[spokemon, setsPokemon] = useState({
        name: "",
        species: "",
        img: "",
    });

    const searchPokemon = () =>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response =>{
                console.log(response.data)
                setsPokemon({
                    name: pokemonName,
                    species: response.data.species.name,
                    img: response.data.sprites.front_default,
                });
                setPokemonChosen(true);
            })
            .catch(err => console.log(err))
    }

    const fetchPokemonAwait = async() => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=807`)
        const jsonResponse = await response.json()
        console.log(jsonResponse)
        setPokemons(jsonResponse.results)
    }
    const fetchPokemonAxios = () =>{
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
            .then(response =>{
                console.log("axios function")
                console.log(response.data.results)
                setPokemons(response.data.results)
            })
            .catch(err => console.log(err))
    }

  return (
    <div>
        <button onClick={fetchPokemonAwait}>Fetch Pokemon</button>
        <button onClick={fetchPokemonAxios}> Fetch Pokemon by AXIOS!!!!!</button>

        {pokemons?
            <div>
                {
                    pokemons.map((pokemon, i)=>{
                        return (
                            <ul key={i}>
                                <li >{pokemon.name}</li>
                            </ul>
                        )
                    }
                    )
                }
            </div>:
            <h1>Click the button!</h1>

        }
        <div>
        <h1>Pokemon</h1>
        <input type="text" onChange={(e)=>setPokemonName(e.target.value)}/>
        <button onClick={searchPokemon}>Search Pokemon</button>

        {pokemonChosen?
            <div>
                <h1>{spokemon.name}</h1>
                <img style={{height: '200px'}} src={spokemon.img}/>
                <h3>Species: {spokemon.species}</h3>
            </div>:
            <h1>Search Pokemon</h1>

        }
        </div>
    </div>

  )
}

export default Pokemon