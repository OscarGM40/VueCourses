

async function getRandomInt(){
 return await new Promise( resolve => {
    const rndInt = Math.random().toFixed(2)*100;
    setTimeout(() => resolve(rndInt), 2000);
    
  })
}

// (async () => console.log(await getRandomInt()))()
export default getRandomInt;

