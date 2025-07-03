import readline from 'readline';
import createItem from './services/item.js';
import * as cartService from './services/cart.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const carrinho = [];

console.log("🛒 Bem-vindo ao sistema de carrinho de compras!");

function menu() {
    console.log("\nEscolha uma opção:");
    console.log("1 - Adicionar item");
    console.log("2 - Remover 1 unidade de um item");
    console.log("3 - Excluir item completamente");
    console.log("4 - Mostrar carrinho");
    console.log("5 - Calcular total");
    console.log("0 - Sair");
}

async function prompt(question) {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer));
    });
}

async function main() {
    let running = true;

    while (running) {
        menu();
        const option = await prompt("Digite a opção: ");

        switch (option) {
            case '1': {
                const name = await prompt("Nome do item: ");
                const price = parseFloat(await prompt("Preço do item: "));
                const quantity = parseInt(await prompt("Quantidade: "));

                const item = await createItem(name, price, quantity);
                await cartService.addItem(carrinho, item);
                console.log(`✅ Item ${name} adicionado ao carrinho.`);
                break;
            }
            case '2': {
                const name = await prompt("Nome do item para remover 1 unidade: ");
                const item = carrinho.find(i => i.name === name);
                if (item) {
                    await cartService.removeItem(carrinho, item);
                } else {
                    console.log("❌ Item não encontrado no carrinho.");
                }
                break;
            }
            case '3': {
                const name = await prompt("Nome do item para excluir completamente: ");
                await cartService.deleteItem(carrinho, name);
                break;
            }
            case '4': {
                await cartService.displayCart(carrinho);
                break;
            }
            case '5': {
                await cartService.calculateTotal(carrinho);
                break;
            }
            case '0': {
                running = false;
                console.log("👋 Saindo do sistema...");
                rl.close();
                break;
            }
            default: {
                console.log("❌ Opção inválida. Tente novamente.");
            }
        }
    }
}

await main();
