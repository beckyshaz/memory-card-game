

export function shuffleCards(data) {
    const prevData = [...data];
    for (let i = prevData.length - 1; i > 0; i-- ) {
        const j = Math.floor(Math.random() * (i + 1));
        [prevData[i], prevData[j]] =  [prevData[j], prevData[i]]
    }
   
    return prevData;
}
       


