const product = [
    {
        id: 1,
        image: './assets/img/image1.jpg',
        title: 'Push Up Bars',
        price: 50,
        stock: 10,
        details: 'Bratele pentru flotari sunt perfecte pentru cei ce doresc sa lucreze intens muschii bratelor, si umerilor, si spatelui, si nu numai. Pot fi folositi de orice persoana, oferind mai mult confort si stabilitate exercitiilor. Sunt fabricate din materiale de calitate, ceea ce le face sa fie durabile. Manerele sunt buretate pentru a proteja mainile, iar piciorusele invelite in cauciuc nu permit bratelor sa alunece in timpul exercitiilor.',
    },
    {
        id: 2,
        image: './assets/img/image2.jpg',
        title: 'Dumbbell',
        price: 150,
        stock: 20,
        details: 'Forma sa hexagonala o impiedica sa se rostogoleasca (6 laturi). Este acoperita cu un strat foarte rezistent si durabil de cauciuc care o protejează de socuri si minimizeaza zgomotul. Maner ergonomic cromat cu zona antiderapanta pentru o prindere perfecta.',
    },
    {
        id: 3,
        image: './assets/img/image3.jpg',
        title: 'Pull Up Bar',
        price: 250,
        stock: 30,
        details: 'O bara de tractiuni este dispozitivul perfect pentru exercitii. Il poti atasa cu usurinta pe perete, facandu-l stabil si sigur. Este potrivit atat pentru incepatori, cat si pentru sportivii experimentati. Bara poate rezista la o sarcina de pana la 90 kg, ceea ce o face solida si fiabila.',
    },
    {
        id: 4,
        image: './assets/img/image4.jpg',
        title: 'Barbell',
        price: 350,
        stock: 40,
        details: 'Bara este conceputa in principal pentru Body Pump, un antrenament de fitness bazat pe forta si rezistenta care intareste muschii, imbunatateste conditia fizica si ajuta la arderea grasimilor corporale. Setul Body Pump va permite sa antrenati diferite grupe de muschi fara a fi nevoie sa cumparati alte accesorii de fitness. Faceti ghemuituri, fandari, tractiuni, flotari, flotari pe banca si alte exercitii cu greutati pentru a va asigura rezultate mai rapide sub forma unor muschi dezvoltati si a unei pierderi de grasime. Exercitiu cu echipamente de cea mai buna calitate!',
    }
];
const products = [...new Set(product.map((item)=>
{return item}))]
let i=0;
document.getElementById('root').innerHTML = products.map((item)=>
{
    var {image, title, price, details} = item;
    return(
        `<div class='box'>
        <div class='img-box'>
        <img class='image' src=${image}></img>
        </div>
        <div class='bottom'>
        ${title}
        <h2>$ ${price}.00</h2>
        <button onclick="togglePopup()">Details</button>
        <div class="popup" id="popup-1">
        <div class="overlay"></div>
        <div class="content">
        <div class="close-btn" onclick="togglePopup()">&times;</div>
        <h1>Description</h1>
        ${details}
        </div>
        </div>`+
        "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
        `</div>
        </div>`
    )
}).join('');
var cart =[];
function addtocart(a) {
    cart.push({...products[a]});
    displaycart();
}
function delElement(a) {
    cart.splice(a, 1);
    displaycart();
}
function displaycart() {
    let j = 0, total=0;
    document.getElementById("count").innerHTML=cart.length;
    if(cart.length == 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    else {
        document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            var {image, title, price, id} = items;
            total = total + price;
            document.getElementById("total").innerHTML = "$ "+total+".00";
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                <img class='rowimg' src=${image}>
                </div>
                <p>${id}</p>
                <button onclick="totalClick(1)" style='width: 10px;'>+</button>
                <span id="totalClicks">1</span>
                <button onclick="totalClick(-1)" style='width: 10px;'>-</button>
                <p style='font-size: 12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}.00</h2>`+
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            );
        }).join('');
    } 
}
function clear() {
    document.getElementById('cartItem').innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$ "+0+".00";
    document.getElementById("count").innerHTML = 0;
    cart.length = 0;
    renderCart();
}
document.getElementById("clear-btn").addEventListener("click", clear);
function checkout() {
    if(cart.length == 0) {
        alert(`Your cart is empty!`);
        return;
    } else {
        (cart.length > 0) 
            alert(`Thank you for your purchase!`);
            document.getElementById('cartItem').innerHTML = "Your cart is empty";
            document.getElementById("total").innerHTML = "$ "+0+".00";
            document.getElementById("count").innerHTML = 0;
            cart.length = 0;
    }
    renderCart();
}
document.getElementById("checkout-btn").addEventListener("click", checkout);
renderProducts();
function totalClick(click) {
    const totalClicks = document.getElementById('totalClicks');
    const sumvalue = parseInt(totalClicks.innerText) + click;
    totalClicks.innerText = sumvalue;
    if(sumvalue <= 1) {
        totalClicks.innerText = 1;
    }
}
function togglePopup() {
    document.getElementById("popup-1").classList.toggle("active");
}