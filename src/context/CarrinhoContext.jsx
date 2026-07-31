import { createContext, useContext, useState } from "react" //Para acessar o contexto//

const CarrinhoContext = createContext() //Contexto criado//

export function CarrinhoProvider({ children }) {
    const [itens, setItens] = useState([])

    function adicionarItem(pizza) { //Recebe uma pizza//
        setItens((itensAtuais) => {  //Atualizando o estado//
            const itemExistente = itensAtuais.find(item => item.id === pizza.id) //Procurando se já existe//  //O .fiind() procura.// 

            if (itemExistente) {  //Aumenta a quantidade//
                return itensAtuais.map(item => //map vai percorrer todos//
                    item.id === pizza.id
                        ? { ...item, quantidade: item.quantidade + 1 } 
                        : item
                )
            }

            return [...itensAtuais, { ...pizza, quantidade: 1 }]  // ... copia todos os itens//
        })
    }

    function removerItem(id) { //recebe um id//
        setItens((itensAtuais) =>
            itensAtuais.filter(item => item.id !== id) //.filder vai remover o item que recebeu//
        )
    }

    function alterarQuantidade(id, quantidade) {
        if (quantidade <= 0) {
            removerItem(id)  //Se a quantidade for 0 ele remove//
            return
        }
        setItens((itensAtuais) =>
            itensAtuais.map(item => 
                item.id === id ? { ...item, quantidade } : item
            )
        )
    }

    function limparCarrinho() {
        setItens([]) //Volta para [] carrinho vazio//
    }

    const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0) // reduce vai calcular a soma acumulada//
    const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0) // Vai  somar apenas as quantidades//

    return (
        <CarrinhoContext.Provider value={{ //É quem vai disponibiliza os dados para toda a aplicação//
            itens,                // Com value tudo isso ficará disponível para qualquer componente//
            adicionarItem,
            removerItem,
            alterarQuantidade,
            limparCarrinho,
            total,
            totalItens
        }}>
            {children} 
        </CarrinhoContext.Provider>
    )
}   //children mostrar toda a aplicação dentro do Provider//

export function useCarrinho() {  //Hook personalizada, vai evitar que precise importa useContaxt e CarrinhoContext//
    return useContext(CarrinhoContext)
}