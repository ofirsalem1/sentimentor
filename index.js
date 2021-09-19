document.getElementById("button").addEventListener("click",sentimentalSentence);
//gif image
const gifEl = document.createElement("img");
gifEl.setAttribute("src", "https://cdn.dribbble.com/users/1698559/screenshots/3790348/___.gif");
//cat image
const catImgEl = document.createElement("img");

//Finds the sentimentality of the sentence
async function sentimentalSentence(){
    try{
        document.getElementById("result").appendChild(gifEl);//appear until the await stop to load
       
        const response = await fetch("https://sentim-api.herokuapp.com/api/v1/",{
            method:"POST",
            headers: { Accept: "application/json",
                "Content-Type": "application/json"},
            body: JSON.stringify({text: document.getElementById("textarea").value})
        })
        const data = await response.json();
        document.getElementById("result").textContent = `Sentiment: ${data.result.type} , ${data.result.polarity}`;
        if(data.result.type === "positive"){
            document.getElementById("result").classList = "positive";
        }else if(data.result.type === "negative" ){
            document.getElementById("result").classList = "negative";
        }else{
            document.getElementById("result").classList = "neutral";
        }
        catImgEl.setAttribute("src", `https://http.cat/${response.status}`);
        document.getElementById("catImg").appendChild(catImgEl);
        if(response.status >= 400){
            throw response.status;
        }
    }catch {
        alert("You must write something down");
        document.getElementById("result").classList = "";
        document.getElementById("result").textContent = `There was an error`;
        catImgEl.setAttribute("src", "https://c.tenor.com/rdwIYpoFXecAAAAM/dog-no.gif");
    }
}

