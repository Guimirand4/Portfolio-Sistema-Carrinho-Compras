//possibilidade de ações do carrinho
async function addItem(userCart, item){
    userCart.push(item);
}

async function deleteItem(userCart, name){
    const index = userCart.findIndex(item => item.name === name);
    if (index !== -1) {
        userCart.splice(index, 1);
        console.log(`Item with name ${name} has been deleted from the cart.`);
    } else {
        console.log(`Item with name ${name} not found in the cart.`);
    }

    
}

async function removeItem(userCart, item) {
    const indexFound = userCart.findIndex(cartItem => cartItem.name === item.name);

    if (indexFound !== -1) {
        userCart[indexFound].quantity -= 1;

        if (userCart[indexFound].quantity <= 0) {
            userCart.splice(indexFound, 1);
            console.log(`Item with name ${item.name} has been removed from the cart.`);
        } else {
            console.log(`Item ${item.name} quantity decreased by 1.`);
        }

    } else {
        console.log(`Item ${item.name} is not found in the cart.`);
    }
}

async function calculateTotal(userCart) {
const result = userCart.reduce((total, item) => total + item.subtotal(), 0);
console.log(`Total Price is: ` + result);
}

async function displayCart(userCart) {
    console.log("Itens in the cart:");
    userCart.forEach(item => {
        console.log(`Item: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}, Subtotal: ${item.subtotal()}`);
    });
}

export {
    addItem,
    deleteItem,
    removeItem,
    calculateTotal,
    displayCart
};