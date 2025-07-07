// casos de uso dos itens
export default function createItem(name, price, quantity) {
    return {
        name,
        price,
        quantity,
        subtotal() {
            return this.price * this.quantity;
        }
    };
}

