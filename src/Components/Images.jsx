import { useState, useEffect } from "react";

import { shuffleCards } from "./shuffle";

 export function GetImages() {
    const url = "https://pokeapi.co/api/v2/pokemon";
    const [data, setData] = useState([]);
    const [selectedCard, setSelectedCard] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
 

    useEffect(() => {

       /* fetch(url).then((response) => response.json())
        .then((results) => {
            Promise.all(results.results.map((data) => {
                
                return  fetch(data.url).then((response) => response.json());

            })).then((res) => {
                const shuffled = shuffleCards(res);
                setData(shuffled); 

            })
        })*/

        const load = async() => {
            const list = await  fetch(url).then((response) => response.json());
            
            const promiseArray = list.results.map((pokemon) => {
                fetch(pokemon.url).then((response) => response.json());
            })
            
           const res = await Promise.all(promiseArray);
           const shuffled = shuffleCards(res);
            setData(shuffled);
            
            
        }
       load();
           
       }, []);


    const handleDivClick =  (id) => {

        const cards = [...selectedCard];


        const cardId = cards.find((card) => card === id);

        if (cardId === undefined) {

            setSelectedCard((prev) => [...prev, id]);
            setScore((prev) => prev + 1);


        }else {
            setScore(0);
            setSelectedCard([]);
            setBestScore((best) => Math.max(best, score));
            
        }
        setData((prev) => shuffleCards(prev));

    }
   
 
   return (
    <div>
        <div className="container">
            <div className="headingDiv">
                <h1>Pokemon Card Memory Game</h1>
                <p>Pick a card once to get a score!</p>
            </div>
            <div className="scoreDiv">
                <div className="score">Score: <span>{score}</span></div>
                <div className="best-score">BestScore: <span>{bestScore}</span></div>
            </div>
        </div>
        <div className="pokemon-outer-container">
        {data.map((pokemon) => {
            return <div key={pokemon.id} className={`${pokemon.name} pokemon`} onClick={() => handleDivClick(pokemon.id)}>
                <p>{pokemon.name}</p>
                <img src={pokemon.sprites.front_default} alt={`pokemon ${pokemon.name} sprites`} width={200} className="image"/>
            </div>
        })}
        </div>
    </div>
   )

}


