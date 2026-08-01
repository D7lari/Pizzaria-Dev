import { useState } from "react"
import Header from "./components/Header/Header"
import Cardapio from "./components/Cardapio/Cardapio"
import Carrinho from "./components/Carrinho/Carrinho"
import Checkout from "./components/Checkout/Checkout"

function App() {
    const [carrinhoAberto, setCarrinhoAberto] = useState(false)
    const [checkoutAberto, setCheckoutAberto] = useState(false)

    return (
        <div>
            <Header onAbrirCarrinho={() => setCarrinhoAberto(true)} />
            <Cardapio />
            {carrinhoAberto && !checkoutAberto && (
                <Carrinho
                    onFechar={() => setCarrinhoAberto(false)}
                    onFinalizar={() => {
                        setCarrinhoAberto(false)
                        setCheckoutAberto(true)
                    }}
                />
            )}
            {checkoutAberto && (
                <Checkout onVoltar={() => {
                    setCheckoutAberto(false)
                    setCarrinhoAberto(true)
                }} />
            )}
        </div>
    )
}

export default App