import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

export default function Home() {
  const [pokemonList, setPokemonList] = useState(null)
  const [pokemon, setPokemon] = useState(null)
  const [pokemonData, setPokemonData] = useState(null)


  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=50')
      .then(response => response.json())
      .then(data => setPokemonList(data.results));
  }, [])


  function getPokemonId(pokemonData) {
    const pokemonId = pokemonData.url.split('/')[6]
    return pokemonId
  }

  useEffect(() => {
    if (pokemon?.url) {
      fetch(pokemon.url)
        .then(response => response.json())
        .then(data => setPokemonData(data));
    }
  }, [pokemon?.url])

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon viewer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Pokemon Viewer!
        </h1>

        <p className={styles.description}>
          Get started by selecting a pokemon from the list below.
        </p>

        <div className={styles.grid}>
          <FormControl style={{ width: '200px' }}>
            <InputLabel id="pokemon">Pokemon</InputLabel>
            <Select
              labelId="pokemon"
              id="pokemon"
              value={pokemon?.name}
              label="Pokemon"
              onChange={(e) => setPokemon({ ...e.target.value, id: getPokemonId(e.target.value) })}
            >
              {pokemonList?.map(pokemon => (
                <MenuItem key={pokemon.name} value={pokemon}>
                  {pokemon.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Avatar
            alt={pokemon?.name}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`}
            sx={{ width: 200, height: 200 }}
          />

        </div>

        <div style={{ justifyContent: 'space-around', display: 'flex', width: '80%' }}>
          <div>
            <h5>Moves</h5>
            <List sx={{
              width: '100%',
              maxWidth: 360,
              maxHeight: 360,
              overflowY: 'scroll',
              bgcolor: 'background.paper'
            }}>
              {pokemonData?.moves?.map(
                (move, index) => (
                  <ListItem
                    key={index}
                    disableGutters
                  >
                    <ListItemText primary={move.move.name} />
                  </ListItem>
                ))}
            </List>
          </div>


          <div>
            <h5>Abilities</h5>
            <List sx={{
              width: '100%',
              maxWidth: 360,
              maxHeight: 360,
              overflowY: 'scroll',
              bgcolor: 'background.paper'
            }}>
              {pokemonData?.abilities?.map(
                (ability, index) => (
                  <ListItem
                    key={index}
                    disableGutters
                  >
                    <ListItemText primary={ability.ability.name} />
                  </ListItem>
                ))}
            </List>
          </div>

        </div>


      </main > <footer className={styles.footer}>
        Made by Valentina Garavaglia
      </footer>
    </div >
  )
}
