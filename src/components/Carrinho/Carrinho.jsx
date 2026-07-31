import { useCarrinho } from "../../context/CarrinhoContext"
import styles from "./Carrinho.module.css"

function Carrinho({ onFechar }) {
    const { itens, removerItem, alterarQuantidade, total, limparCarrinho } = useCarrinho()

    if (itens.length === 0) {
        return (
            <div className={styles.carrinho}>
                <div className={styles.cabecalho}>
                    <h2 className={styles.titulo}>Seu Carrinho</h2>
                    <button className={styles.fechar} onClick={onFechar}>✕</button>
                </div>
                <div className={styles.vazio}>
                    <span className={styles.vazioBotao}>🍕</span>
                    <p>Seu carrinho está vazio</p>
                    <p>Adicione pizzas para continuar</p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.carrinho}>
            <div className={styles.cabecalho}>
                <h2 className={styles.titulo}>Seu Carrinho</h2>
                <button className={styles.fechar} onClick={onFechar}>✕</button>
            </div>

            <div className={styles.itens}>
                {itens.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <span className={styles.itemImagem}>{item.imagem}</span>
                        <div className={styles.itemInfo}>
                            <p className={styles.itemNome}>{item.nome}</p>
                            <p className={styles.itemPreco}>
                                R$ {(item.preco * item.quantidade).toFixed(2)}
                            </p>
                        </div>
                        <div className={styles.itemQuantidade}>
                            <button onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}>
                                -
                            </button>
                            <span>{item.quantidade}</span>
                            <button onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}>
                                +
                            </button>
                        </div>
                        <button
                            className={styles.itemRemover}
                            onClick={() => removerItem(item.id)}
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.rodape}>
                <div className={styles.total}>
                    <span>Total</span>
                    <span className={styles.totalValor}> R$ {total.toFixed(2)}</span>
                </div>
                <button className={styles.botaoFinalizar}>
                    Finalizar Pedido
                </button>
                <button className={styles.botaoLimpar} onClick={limparCarrinho}>
                    Limpar carrinho
                </button>
            </div>
        </div>
    )
}

export default Carrinho