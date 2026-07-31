import { useState } from "react"
import Header from "./components/Header/Header"
import Cardapio from "./components/Cardapio/Cardapio"
import Carrinho from "./components/Carrinho/Carrinho"

function App() {
    const [carrinhoAberto, setCarrinhoAberto] = useState(false)

    return (
        <div>
            <Header onAbrirCarrinho={() => setCarrinhoAberto(true)} />
            <Cardapio />
            {carrinhoAberto && (
                <Carrinho onFechar={() => setCarrinhoAberto(false)} />
            )}
        </div>
    )
}

export default App