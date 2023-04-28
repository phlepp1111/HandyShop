const container = document.getElementById("container");
const productItems = [];
const warenkorb = [];

function getProducts() {
  return fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then((products) => {
        productItems.push(...products.products);
        productItems.forEach((product) => {
            product.anzahl = 0;
        });
        createDOM(products);
        total();
        return products.products;
    });
};
getProducts();

function createDOM(products){
    for(let i=0; i<products.products.length; i++){
        const card = document.createElement("div");
        card.setAttribute("class", "card "+(i+1));

        const title = document.createElement("h2");
        title.setAttribute("class", "title "+(i+1));
        title.innerHTML=products.products[i].title;

        const image = document.createElement("img");
        image.setAttribute("class", "image "+(i+1));
        image.src= products.products[i].images[0];  

        const description = document.createElement("p");
        description.setAttribute("class", "description "+(i+1));
        description.innerHTML=products.products[i].description;

        const priceContainer = document.createElement("div");
        priceContainer.setAttribute("class", "priceContainer "+(i+1));

        const price = document.createElement("p");
        price.setAttribute("class", "price "+(i+1));
        price.innerHTML=products.products[i].price+" €";

        const anzahl = document.createElement("p");
        anzahl.setAttribute("id", "anzahl"+(i+1));
        anzahl.innerHTML = "Anzahl: "+productItems[i].anzahl;

        const buttonContainer = document.createElement("div");
        buttonContainer.setAttribute("class", "buttonContainer "+(i+1));

        const addButton = document.createElement("button");
        addButton.setAttribute("id", "addButton "+(i+1));
        addButton.setAttribute("onclick", "add("+(i+1)+")");
        addButton.innerHTML = "+";

        const subtractButton = document.createElement("button");
        subtractButton.setAttribute("id", "subtractButton "+(i+1));
        subtractButton.setAttribute("onclick", "subtract("+(i+1)+")");
        subtractButton.innerHTML = "-";

        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(description);
        priceContainer.appendChild(price);
        priceContainer.appendChild(anzahl);

        buttonContainer.appendChild(addButton);
        buttonContainer.appendChild(subtractButton);
        priceContainer.appendChild(buttonContainer);

        card.appendChild(priceContainer);

        container.appendChild(card);
    }
};

function add(x){
    let anzahl = document.getElementById("anzahl"+x);
    productItems[x-1].anzahl++;
    anzahl.innerText=("Anzahl: ")+productItems[x-1].anzahl;
    total();
}

function subtract(x){
    let anzahl = document.getElementById("anzahl"+x);
    if(productItems[x-1].anzahl>0){
        productItems[x-1].anzahl--;
        anzahl.innerText=("Anzahl: ")+productItems[x-1].anzahl;
        total();
    } 
}

function total(){
    let gesamtpreis = document.getElementById("total");
    let total= 0;
    for(let i=0; i<productItems.length; i++){
        total+= productItems[i].anzahl*productItems[i].price;
    };
    gesamtpreis.innerText=("Gesamtpreis: "+total+" €");

}