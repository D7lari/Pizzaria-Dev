import { useCarrinho } from "../../context/CarrinhoContext"
import styles from "./Header.module.css"

function Header ({ onAbrirCarrinho }) {
    const { totalItens } = useCarrinho()


    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <span className={styles.logoIcone}>🍕</span>
                <div>
                    <h1 className={styles.logoNome}>Pizzaria Dev</h1>
                    <p className={styles.logoSlogan}>A melhor pizza da cidade</p>
                </div>
            </div>
            <button className={styles.botaoCarrinho} onClick={onAbrirCarrinho}>
                🛒 Carrinho
                {totalItens > 0 &&(
                    <span className={styles.badge}>{totalItens}</span>
                )}
            </button>
        </header>
    )
}

export default Header