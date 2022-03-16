import React, {useState} from 'react'
import axios from 'axios'

const Pokemon = () => {
    const[pokemons, setPokemons] = useState()

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
    </div>

  )
}

export default Pokemon