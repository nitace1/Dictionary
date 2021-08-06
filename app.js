const resultDiv = document.querySelector(".result");
const wordEle = document.querySelector(".word");
const phonetics = document.querySelector(".phonetics");
const audio = document.querySelector("audio");
const wordMeaning = document.querySelector(".word-defination");
const synonyms = document.querySelector(".synonyms");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const handle = async (e) => {
  if (e.keyCode == 13) {
    const word = e.target.value;
    // call to api
    const result = await fetch(url + word);
    const data = await result.json();
    resultDiv.style.display = "block";
    if(!result.ok){
        alert("No results found");
         return;
    }
   
    
    wordEle.innerText = data[0].word;
    phonetics.innerText = data[0].phonetics[0].text;
    audio.src = data[0].phonetics[0].audio;
    wordMeaning.innerText = data[0].meanings[0].definitions[0].definition;
    const synArr = data[0].meanings[0].definitions[0].synonyms;
    let ans = "";
    if(synArr){
       
        for (let i = 0; i < synArr.length; i++) {
          ans += `<p class="pills" > ${synArr[i]}<p>`;
        }
        synonyms.innerHTML = ans;

    }
    else {
        synonyms.innerHTML =`<p class="pills" >No synonyms Found<p>`;
    }
   
  }
};
