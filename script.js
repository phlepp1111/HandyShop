const container = document.getElementById("container");

function getProducts(){
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((products)=>{
            createDOM(products);
        });
}
function createDOM(products){
    for(let i=0; i<products.products.length; i++){
        console.log(products.products[i]);
        const card = document.createElement("div");
        card.setAttribute("id", "card "+(i+1));
        const title = document.createElement("h2");
        title.setAttribute("id", "title "+(i+1));
        title.innerHTML=products.products[i].title;
        const image = document.createElement("img");
        image.setAttribute("id", "image "+(i+1));
        image.src= products.products[i].images[0];        
        const description = document.createElement("p");
        description.setAttribute("id", "description "+(i+1));
        description.innerHTML=products.products[i].description;
        const price = document.createElement("p");
        price.setAttribute("id", "price "+(i+1));
        price.innerHTML=products.products[i].price+" €";
        const addButton = document.createElement("button");
        addButton.setAttribute("id", "addButton "+(i+1));
        const subtractButton = document.createElement("button");
        subtractButton.setAttribute("id", "subtractButton "+(i+1));

        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(price);
        card.appendChild(addButton);
        card.appendChild(subtractButton);

        container.appendChild(card);
     
    }
};

getProducts();