import { useState } from "react"
import { useCarrinho } from "../../context/CarrinhoContext"
import styles from "./Checkout.module.css"

const BACKEND_URL = "http://localhost:3001"

function Checkout({ onVoltar }) {
    const { itens, total } = useCarrinho()
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState("")

    async function finalizarPedido() {
        setCarregando(true)
        setErro("")

        try {
            const resposta = await fetch(`${BACKEND_URL}/criar-preferencia`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ itens })
            })

            const dados = await resposta.json()

            if (!resposta.ok) {
                setErro(dados.erro || "Erro ao processar pagamento.")
                return
            }

            window.location.href = dados.url

        } catch (erro) {
            setErro("Erro ao conectar com o servidor. Tente novamente.")
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div className={styles.checkout}>
            <div className={styles.cabecalho}>
                <button className={styles.voltar} onClick={onVoltar}>
                    ← Voltar
                </button>
                <h2 className={styles.titulo}>Finalizar Pedido</h2>
            </div>

            <div className={styles.resumo}>
                <h3 className={styles.resumoTitulo}>Resumo do pedido</h3>
                <div className={styles.itens}>
                    {itens.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <span className={styles.itemImagem}>{item.imagem}</span>
                            <span className={styles.itemNome}>
                                {item.nome} X {item.quantidade}
                            </span>
                            <span className={styles.itemPreco}>  
                                R$   {(item.preco * item.quantidade).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
                <div className={styles.total}>
                    <span>Total</span>
                    <span className={styles.totalValor}> R$ {total.toFixed(2)}</span>
                </div>
            </div>

            {erro && (
                <div className={styles.erro}>{erro}</div>
            )}

            <button
                className={styles.botaoPagar}
                onClick={finalizarPedido}
                disabled={carregando}
            >
                {carregando ? "Processando..." : "Pagar com Mercado Pago"}
            </button>
        </div>
    )
}

export default Checkout