// Construir un producto **********

let itemStorage = [];


class Product {
    constructor(name , price , year){
        this.name = name;
        this.price = price;
        this.year = year
    }
}

// Interactuar con la interfaz *********

class UI {
    addProduct(item){
        const productList = document.getElementById("product-list");
        const element = document.createElement("div")
        element.innerHTML = `
        <div class="card text-center mb-4"> 
            <div class="card-body">
                Modelo: ${item.name}
                -$ ${item.price} -
                - año: ${item.year}
                <button name="btn-delete" class="btn btn-danger" data-id="${item.name}">Delete</button>
            </div>     
        </div>`

        productList.appendChild(element)
        this.resetForm();
        itemStorage.push(item)
        this.addLocalStorage();
    }

    addLocalStorage(){
        localStorage.setItem( " product " , JSON.stringify( itemStorage ) );
    }

    resetForm(){
        document.getElementById("form-products").reset()
    }

    deleteProduct(productDelete){
        if( productDelete.name === "btn-delete"){
            let itemDelete = productDelete.dataset.id;
            this.deleteProductStorage(itemDelete);
            productDelete.parentElement.parentElement.remove();
            this.showMessage("Product deleted successfully" , "info");
        }
       
    }

    deleteProductStorage(itemDeleteStorage){

        for(let i=0 ; i<itemStorage.length ; i++ ){
            if(itemStorage[i].name == itemDeleteStorage ){
                
                itemStorage.splice(i , 1);
                localStorage.removeItem(" product ");
                this.addLocalStorage(itemStorage);
            }
        }
    }

    showMessage( message , cssClass ){
        const div = document.createElement("div");
        const container = document.querySelector(".container");
        const app = document.querySelector("#app");
        div.className = (`alert alert-${cssClass} mt-4`);
        div.appendChild(document.createTextNode(message))
        container.insertBefore(div , app)
        setTimeout (function() {
            document.querySelector(".alert").remove();
        }, 3000 )
    }
}

// DOM Events ***********

const formProducts = document.getElementById("form-products");

formProducts.addEventListener("submit" , (e) => {
    e.preventDefault();
    let productName = document.getElementById("name").value;
    let productPrice = document.getElementById("price").value;
    let productYear = document.getElementById("year").value;

    const product= new Product(productName , productPrice , productYear);
    
    const ui = new UI();

    if( productName === "" || productPrice === "" || productYear === "" ){
        ui.showMessage("Complete fields please" , "info");
    }else {
        ui.addProduct(product);
        ui.showMessage( "Product added successfully" , "success");
    }
})

// Deleting products ****************

document.getElementById("product-list").addEventListener("click", (e) => {
    const ui = new UI();
    ui.deleteProduct(e.target)
      

})

window.onload = () => {
       let productStorage = JSON.parse( localStorage.getItem( " product " ) );
       if( productStorage === null ){
           
       }else{
           productStorage.forEach( product => {
               const ui = new UI();
               ui.addProduct( product )
           } )
       }
    }

