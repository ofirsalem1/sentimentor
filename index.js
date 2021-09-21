document.getElementById("button").addEventListener("click",sentimentalSentence);
//image 
const ImgEl = document.createElement("img");

//Finds the sentimentality of the sentence
async function sentimentalSentence(){
    const resultId = document.getElementById("result");
    const imgId = document.getElementById("img");
    try{
        ImgEl.setAttribute("src", `https://cdn.dribbble.com/users/1698559/screenshots/3790348/___.gif`);
        imgId.appendChild(ImgEl);
        //appear until the await stop to load*
        const response = await fetch("https://sentim-api.herokuapp.com/api/v1/",{
            method:"POST",
            headers: { Accept: "application/json",
                "Content-Type": "application/json"},
            body: JSON.stringify({text: document.getElementById("textarea").value})
        })
        const data = await response.json();
        resultId.textContent = `Sentiment: ${data.result.type} , ${data.result.polarity}`;
        if(data.result.type === "positive"){
            resultId.classList = "positive";
        }else if(data.result.type === "negative"){
            resultId.classList = "negative";
        }else{
            resultId.classList = "neutral";
        }
        ImgEl.setAttribute("src", `https://http.cat/${response.status}`); //Replaces the charge with a cat image
        if(response.status >= 400){
            throw response.status;
        }
    }catch {
        alert("You must write something down");
        document.getElementById("result").classList = "";
        document.getElementById("result").textContent = `There was an error`;
        ImgEl.setAttribute("src", "https://c.tenor.com/rdwIYpoFXecAAAAM/dog-no.gif");//Replaces the charge with a dog image
    }
}

