document.getElementById("button").addEventListener("click",sentimental);

async function sentimental(){
    const response = await fetch("https://sentim-api.herokuapp.com/api/v1/",{
        method:"POST",
        headers: { Accept: "application/json",
         "Content-Type": "application/json"},
         body: JSON.stringify({text: document.getElementById("textarea").value})
    })
    const data = await response.json()
    document.getElementById("result").textContent = `Result: ${data.result.type} , ${data.result.polarity}`;
    if(data.result.type === "positive"){
        document.getElementById("result").classList = "positive";
    }else if(data.result.type === "negative" ){
        document.getElementById("result").classList = "negative";
    }else{
        document.getElementById("result").classList = "neutral";
    }
}
