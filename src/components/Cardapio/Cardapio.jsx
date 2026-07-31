import { useCarrinho } from "../../context/CarrinhoContext"
import { pizzas } from "../../data/cardapio"
import styles from "./Cardapio.module.css"

function Cardapio() {
    const { adicionarItem } = useCarrinho()

    return (
        <section className={styles.cardapio}>
            <h2 className={styles.titulo}>Nosso Cardápio</h2>
            <p className={styles.subtitulo}>Escolha sua pizza favorita</p>
            <div className={styles.grid}>
                {pizzas.map((pizza) => (
                    <div key={pizza.id} className={styles.card}>
                        <div className={styles.imagem}>{pizza.imagem}</div>
                        <div className={styles.info}>
                            <span className={styles.categoria}>{pizza.categoria}</span>
                            <h3 className={styles.nome}>{pizza.nome}</h3>
                            <p className={styles.descricao}>{pizza.descricao}</p>
                            <div className={styles.rodape}>
                                <span className={styles.preco}>
                                    R$ {pizza.preco.toFixed(2)}
                                </span>
                                <button
                                    className={styles.botao}
                                    onClick={() => adicionarItem(pizza)}
                                >
                                    Adicionar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Cardapio