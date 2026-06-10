import { useState, useEffect } from "react";

 export function GetImages() {
    const url = "https://pokeapi.co/api/v2/pokemon";
    const [results, setResults] = useState([]);
    const [data, setData] = useState([]);
    const [selectedCard, setSelectedCard] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
 

    useEffect(() => {

        fetch(url)
        .then((response) => (response.json()))
        .then((res) => {
            setResults(res.results)

        });
    }, []);

    useEffect(() => {
        Promise.all(results.map((pokemon) => {
            return fetch(pokemon.url)
            .then((response) => response.json())
             })).then((res) => setData(res))
           
       }, [results]);

    
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
        
    
        setData((data) => {
            const prevData = [...data];
        
            for (let i = prevData.length - 1; i > 0; i-- ) {
                const j = Math.floor(Math.random() * (i + 1));

                [prevData[i], prevData[j]] =  [prevData[j], prevData[i]]
            }
           
            return prevData;
        });

    }
   
 
   return (
    <div>
        <div className="container">
            <div className="headingDiv">
                <h1>Pokemon Card Memory Game</h1>
                <p>Pick a card once to get a score</p>
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
                <img src={pokemon.sprites.front_default} alt={`pokemon ${pokemon.name} sprites`} width={200} />
            </div>
        })}
        </div>
    </div>
   )

}


