const url = "https://gotdata.northeurope.cloudapp.azure.com/api/show/characters";
var data;

const container = document.getElementById("root");

const h1 = document.createElement('h1');
h1.textContent = "Names and Spouses";

container.appendChild(h1);

var request = new XMLHttpRequest();
request.open('GET', url, true);
request.onload = function () {

    // Begin accessing JSON data here
    data = JSON.parse(this.response);
    console.log(data);
    console.log(data[0].name)

    data.forEach(element => {
        const card = document.createElement('div');
        card.setAttribute('class', 'container');

        const h2 = document.createElement('h2');
        h2.textContent = element.name + "+" + element.slug;

        const p = document.createElement('p');
        p.textContent = element.spouse;

        container.appendChild(card);
        
        card.appendChild(h2);
        card.appendChild(p);
    });
}

request.send();