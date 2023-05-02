const container = document.getElementById("container");
const warenkorbContainer = document.getElementById("warenkorbSub");
const warenkorb = document.getElementById("warenkorb");
const detail = document.getElementById("detail");

const productItems = [];
let warenkorbToggle = 0;
let detailToggle = 0;

function getProducts() {
    return fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((products) => {
            productItems.push(...products.products);
            productItems.forEach((product) => {
                product.anzahl = 0;
            });
            createDOM();
            total();
        });
}
getProducts();

function createDOM() {
    container.innerHTML = "";
    productItems.map((_, i) => {
        let card = document.createElement("div");
        card.setAttribute("class", "card " + (i + 1));

        let titleContainer = document.createElement("div");
        titleContainer.setAttribute("class", "titleContainer " + (i + 1));

        let title = document.createElement("h3");
        title.setAttribute("class", "title " + (i + 1));
        title.innerHTML = productItems[i].title;

        let image = document.createElement("img");
        image.setAttribute("class", "image " + (i + 1));
        image.setAttribute("onclick", "toggleDetail(" + (i + 1) + ")");
        image.src = productItems[i].images[0];

        let descContainer = document.createElement("div");
        descContainer.setAttribute("class", "descContainer " + (i + 1));

        let description = document.createElement("p");
        description.setAttribute("class", "description " + (i + 1));
        description.innerHTML = productItems[i].description;

        let priceContainer = document.createElement("div");
        priceContainer.setAttribute("class", "priceContainer " + (i + 1));

        let price = document.createElement("p");
        price.setAttribute("class", "price " + (i + 1));
        price.innerHTML = "<b>" + productItems[i].price + " €";

        let anzahl = document.createElement("p");
        anzahl.setAttribute("id", "anzahl" + (i + 1));
        anzahl.innerHTML = "Anzahl: <b>" + productItems[i].anzahl;

        let buttonContainer = document.createElement("div");
        buttonContainer.setAttribute("class", "buttonContainer " + (i + 1));

        let addButton = document.createElement("button");
        addButton.setAttribute("id", "addButton " + (i + 1));
        addButton.setAttribute("onclick", "add(" + (i + 1) + ")");
        addButton.innerHTML = "+";

        let subtractButton = document.createElement("button");
        subtractButton.setAttribute("id", "subtractButton " + (i + 1));
        subtractButton.setAttribute("onclick", "subtract(" + (i + 1) + ")");
        subtractButton.innerHTML = "-";

        let br = document.createElement("br");

        titleContainer.appendChild(title);
        card.appendChild(titleContainer);
        card.appendChild(image);
        descContainer.appendChild(description);
        card.appendChild(descContainer);
        priceContainer.appendChild(price);
        priceContainer.appendChild(anzahl);
        buttonContainer.appendChild(addButton);
        buttonContainer.appendChild(subtractButton);
        priceContainer.appendChild(buttonContainer);
        card.appendChild(priceContainer);
        card.appendChild(br);

        container.appendChild(card);
    });
}

function warenkorbUpdate() {
    warenkorbContainer.innerHTML = "";
    productItems
        .filter((item) => item.anzahl > 0)
        .map((_, i) => {
            let item = document.createElement("div");
            item.setAttribute("class", "item");

            let titleContainer = document.createElement("div");
            titleContainer.setAttribute("class", "titleContainer");

            let title = document.createElement("p");
            title.setAttribute("class", "title " + (i + 1));
            title.innerHTML = _.title;

            let priceContainer = document.createElement("div");
            priceContainer.setAttribute("class", "priceContainer");

            let price = document.createElement("p");
            price.setAttribute("class", "price " + (i + 1));
            price.innerHTML = _.price + " €";

            let buttonContainer = document.createElement("div");
            buttonContainer.setAttribute("class", "buttonContainerWarenkorb");

            let addButton = document.createElement("button");
            addButton.setAttribute("id", "addButton " + (i + 1));
            addButton.setAttribute("onclick", "add(" + _.id + ")");
            addButton.innerHTML = "+";

            let subtractButton = document.createElement("button");
            subtractButton.setAttribute("id", "subtractButton " + (i + 1));
            subtractButton.setAttribute("onclick", "subtract(" + _.id + ")");
            subtractButton.innerHTML = "-";

            let anzahlContainer = document.createElement("div");
            anzahlContainer.setAttribute("class", "anzahlContainer");

            let anzahl = document.createElement("p");
            anzahl.setAttribute("id", "anzahl" + (i + 1));
            anzahl.innerHTML = "Anzahl: " + _.anzahl;

            titleContainer.appendChild(title);
            item.appendChild(titleContainer);
            priceContainer.appendChild(price);
            item.appendChild(priceContainer);

            buttonContainer.appendChild(addButton);
            buttonContainer.appendChild(subtractButton);
            item.appendChild(buttonContainer);
            anzahlContainer.appendChild(anzahl);
            item.appendChild(anzahlContainer);
            warenkorbContainer.appendChild(item);
        });
}

function add(x) {
    let anzahl = document.getElementById("anzahl" + x);
    productItems[x - 1].anzahl++;
    anzahl.innerText = "Anzahl: " + productItems[x - 1].anzahl;
    total();
    warenkorbUpdate();
}

function subtract(x) {
    let anzahl = document.getElementById("anzahl" + x);
    if (productItems[x - 1].anzahl > 0) {
        productItems[x - 1].anzahl--;
        anzahl.innerText = "Anzahl: " + productItems[x - 1].anzahl;
        total();
        warenkorbUpdate();
    }
}

function total() {
    let gesamtpreis = document.getElementById("total");
    let total = 0;
    for (let i = 0; i < productItems.length; i++) {
        total += productItems[i].anzahl * productItems[i].price;
    }
    gesamtpreis.innerText = "Gesamtpreis: " + total + " €";
}

function toggleWarenkorb() {
    if (warenkorbToggle == 0) {
        detail.classList.add("fade-in");
        setTimeout(() => {
            warenkorb.style.visibility = "visible";
            document.body.style.overflow = "hidden";
            warenkorbToggle = 1;
        }, 300);
    } else {
        detail.classList.add("fade-out");
        setTimeout(() => {
            warenkorb.style.visibility = "hidden";
            document.body.style.position = "";
            warenkorbToggle = 0;
            detail.style.visibility = "hidden";
            document.body.style.position = "";
            detailToggle = 0;
            document.body.style.overflow = "auto";
        }, 300);
    }
}

function toggleDetail(x) {
    detail.innerHTML = "";
    if (detailToggle == 0) {
        setTimeout(() => {
            detail.classList.add("fade-in");
            document.body.style.overflow = "hidden";

            detail.style.visibility = "visible";
            detailToggle = 1;

            let title = document.createElement("h3");
            title.setAttribute("class", "title " + x);
            title.innerHTML = productItems[x - 1].title;

            let image = document.createElement("img");
            image.setAttribute("class", "imageDetail " + x);
            image.setAttribute("onclick", "toggleDetail(" + x + ")");
            image.src = productItems[x - 1].images[0];

            let descContainer = document.createElement("div");
            descContainer.setAttribute("class", "descContainer " + x);

            let description = document.createElement("p");
            description.setAttribute("class", "description " + x);
            description.innerHTML = productItems[x - 1].description;
            descContainer.appendChild(description);

            detail.appendChild(title);
            detail.appendChild(image);
            detail.appendChild(descContainer);
            detail.classList.remove("fade-in");
        }, 300);
    } else {
        detail.classList.add("fade-out");
        setTimeout(() => {
            detail.style.visibility = "hidden";
            document.body.style.position = "";
            document.body.style.overflow = "auto";
            detailToggle = 0;
            detail.classList.remove("fade-out");
        }, 300);
    }
}
function bezahlen() {
    warenkorbContainer.innerHTML = "";
    toggleWarenkorb();
    productItems.forEach((product) => {
        product.anzahl = 0;
    });
    total();
    createDOM();
    alert("✅alles bezahlt!✅");
}
