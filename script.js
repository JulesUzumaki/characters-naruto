
let nbPages = 1;
let village = '""';
let totalPagesNum;

let div = document.createElement("div");
document.body.appendChild(div);
div.classList.add('big-div');

let leaf = document.querySelector('#leaf');
let sand = document.querySelector('#sand');
let rock = document.querySelector('#rock');
let rain = document.querySelector('#rain');
let mist = document.querySelector('#mist');
let cloud = document.querySelector('#cloud');
let all = document.querySelector('#all');

//event listeners

leaf.addEventListener("change", (e) => {
    if (leaf.checked){
        village = '"' + e.target.value +'"' ;
        removeAllChildNodes(div);
        accessValuePages();
    }else{
        village = '""' ;
        removeAllChildNodes(div);
        accessValuePages();
    }
})

sand.addEventListener("change", (e) => {
    if (sand.checked){
        village = '"' + e.target.value +'"' ;
        removeAllChildNodes(div);
        accessValuePages();
    }else{
        village = '""' ;
        removeAllChildNodes(div);
        accessValuePages();
    }
})

rock.addEventListener("change", (e) => {
    if (rock.checked){
        village = '"' + e.target.value +'"' ;
        removeAllChildNodes(div);
        accessValuePages();
    }else{
        village = '""' ;
        removeAllChildNodes(div);
        accessValuePages();
    }
})

rain.addEventListener("change", (e) => {
    if (rain.checked){
        village = '"' + e.target.value +'"' ;
        removeAllChildNodes(div);
        accessValuePages();
    }else{
        village = '""' ;
        removeAllChildNodes(div);
        accessValuePages();
    }
})

mist.addEventListener("change", (e) => {
    if (mist.checked){
        village = '"' + e.target.value +'"' ;
        removeAllChildNodes(div);
        accessValuePages();
    }else{
        village = '""' ;
        removeAllChildNodes(div);
        accessValuePages();
    }
})

cloud.addEventListener("change", (e) => {
    if (cloud.checked){
        village = '"' + e.target.value +'"' ;
        removeAllChildNodes(div);
        accessValuePages();
    }else{
        village = '""' ;
        removeAllChildNodes(div);
        accessValuePages();
    }
})

all.addEventListener("change", (e) => {
    if (all.checked){
        village = '""' ;
        removeAllChildNodes(div);
        accessValuePages();
    }else{
        village = '""' ;
        removeAllChildNodes(div);
        accessValuePages();
    }
})












//Functions
//the query
const updateQuery = () =>{
    const queryHuh =  `
query{
    
    characters(filter: {village: ${village} }, page: ${nbPages}){
        info {
            count
            pages
            next
            prev
        }
        results {
            name
            avatarSrc
            village
            age
            description
        }
    }
}
`

return queryHuh;
};


//total pages
const totalPages = (data) => {
    console.log(data);
    totalPagesNum = data.data.characters.info.pages;
    return totalPagesNum;
};

function removeAllChildNodes(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

//loop over the characters and create a div to show them 
const showCharacters = data => {
    data.data.characters.results.forEach(result => {
        const resultDiv = document.createElement('div');
        const resultTextDiv = document.createElement('div');
        const resultImg = document.createElement('img');
        const resultTextName = document.createElement('p');
        const resultTextVillage = document.createElement('p');
        const resultTextAge = document.createElement('p');
        const resultTextDescrip = document.createElement('p');

        resultDiv.classList.add('div-small');
        resultTextDiv.classList.add('div-text')

        resultImg.src = result.avatarSrc;
        resultTextName.innerHTML = '<strong>Name: </strong>' + result.name;

        resultTextDescrip.innerHTML = '<strong>Description: </strong>' + result.description;

        if(result.age){
            resultTextAge.innerHTML = '<strong>Age: </strong>' + result.age;
        }else{
            resultTextAge.innerHTML = '<strong>Age: </strong>' + "?";
        }

        if(result.village){
            resultTextVillage.innerHTML = '<strong>Village: </strong>' + result.village;
        }else{
            resultTextVillage.innerHTML = '<strong>Village: </strong>' + "?";
        }

        if(result.village === "leaf village"){
            resultDiv.style.backgroundColor = "#F6D5F6";
        }else if(result.village === "rock village"){
            resultDiv.style.backgroundColor = "#E4C9A5";
        }else if(result.village === "mist village"){
            resultDiv.style.backgroundColor = "#C7E9FF";
        }else if(result.village === "rain village"){
            resultDiv.style.backgroundColor = "#D4D4FF";
        }else if(result.village === "sand village"){
            resultDiv.style.backgroundColor = "#F1E2A4";
        } else if(result.village === "star village"){
            resultDiv.style.backgroundColor = "#F2F2B9";
        }else if(result.village === "sound village"){
            resultDiv.style.backgroundColor = "#6DCE80";
        }else if(result.village === "cloud village"){
            resultDiv.style.backgroundColor = "#CDDADD";
        }else if(result.village === "waterfall village"){
            resultDiv.style.backgroundColor = "#D5F6F1";
        }else if(result.village === "hot springs village"){
            resultDiv.style.backgroundColor = "#FBC089";
        }



        resultTextDiv.appendChild(resultTextName);
        resultTextDiv.appendChild(resultTextVillage);
        resultTextDiv.appendChild(resultTextAge);
        resultTextDiv.appendChild(resultTextDescrip);
 
        resultDiv.appendChild(resultImg);
        resultDiv.appendChild(resultTextDiv);
        div.appendChild(resultDiv);
});
};

//fetching the API 
/*
const fetchingTotalPages = () = {
    fetch('https://www.narutoql.com/graphql', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        query: updateQuery()
        })
    }).then(res => res.json());
*/

const fetchingTotalPages = () => {
    return  fetch('https://www.narutoql.com/graphql', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        query: updateQuery()
        })
    })
    .then(res => res.json())
    .then(data => Promise.resolve(data))
};

const fetching = () => {
    fetch('https://www.narutoql.com/graphql', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        query: updateQuery()
        })
    })
    .then(res => res.json())
    .then(data => showCharacters(data))
};

const callingFetch = () => {
    for(let i = 1; i <= totalPagesNum; i++){
        nbPages = i;
        updateQuery();
        fetching(); 
    }
    nbPages = 1;
};

const accessValuePages = async () => {
    nbPages = 1;
    totalPagesNum = 1;
    updateQuery();
    console.log(updateQuery() + 'hey dude ');
    fetchingTotalPages()
    .then((data) => {
        totalPages(data);
        callingFetch(); 
    });
};

accessValuePages();

