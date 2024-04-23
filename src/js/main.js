"use strict"; 

getExperiece(); 
let submitBtnEl = document.getElementById("submitBtn"); 

let errorDiv = document.getElementById("errorDiv");
//eventlyssnare
submitBtnEl.addEventListener("click", function(event){
    event.preventDefault(); //så sidan inte laddar om. 

    //hämtar värden från formuläret
    let workplaceStr = document.getElementById("workplace").value; 
    let titleStr = document.getElementById("title").value;  
    let locationStr = document.getElementById("location").value;
    let descriptionStr = document.getElementById("description").value; 

    //skickar med värden till funktion
    addExperience(workplaceStr, titleStr, descriptionStr, locationStr);
})  

//för att lägga till värden(POST)
async function addExperience(workplace, title, description, location) {
    let experience = {
        workplace:workplace, 
        title: title, 
        description: description, 
        location: location
    } 

    try {
    let response = await fetch("http://127.0.0.1:3000/workexps", {
        method: "POST", //visar att det är ett post-anrop
        headers: {
            "content-type": "Application/json"
        }, 
        body: JSON.stringify(experience)
    }); 

    //om svaret inte är OK så skrivs felmeddelanden ut: 
    if (!response.ok) {
        throw new Error("Vänligen fyll i alla värden!");
    } 

    let data = await response.json(); 

    console.table(data); 
    } catch (error){
        errorDiv.innerHTML = error.message
    }
}

//hämtar in data från API
async function getExperiece(){
    let response = await fetch("http://127.0.0.1:3000/workexps"); 

    let data = await response.json(); 

    console.log(data);

    printOutData(data);  
} 
 

//för att skriva ut data till första sidan. 
function printOutData(data){ 

    let expListEl = document.getElementById("expList")

    data.forEach(post => {
    let newPost = document.createElement("article"); 
    
    newPost.innerHTML = `
    <b>Arbetsgivare:</b> ${post.workplace}<br>
    <b>Jobbtitel:</b> ${post.title}<br>
    <b>Plats/Stad:</b> ${post.location}<br>
    <b>Arbetsuppgift:</b> ${post.description}<br>
    `;  
    
    let deleteBtn = document.createElement("button"); 
    deleteBtn.textContent = "Radera" 

    deleteBtn.addEventListener('click', function(){
        deletePost(post._id); 
    });

    newPost.appendChild(deleteBtn); 
    expListEl.appendChild(newPost); 
            
    });
}  

//för att ta bort data
async function deletePost(_id){

    let response = await fetch("http://127.0.0.1:3000/workexps/" + _id, {
        method: "DELETE", //Visar att det är ett delete anrop
        headers: {
        "content-type": "Application/json"
        }
    }); 

    let data = await response.json(); 

    window.location.reload(); 

    console.log(data);
 
}

window.onload = printOutData; 