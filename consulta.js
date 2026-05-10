const produtos = [
    {
        nome: "Arroz Branco Tipo 1 5kg",
        sku: "7891000100",
        lote: "LT-2023-A",
        validade: "15/12/2026",
        quantidade: 150,
        reservado: 20
    },
    {
        nome: "Feijão Carioca 1kg",
        sku: "7891000200",
        lote: "LT-2023-B",
        validade: "20/01/2026",
        quantidade: 320,
        reservado: 0
    },
    {
        nome: "Leite Integral 1L",
        sku: "7893000123",
        lote: "LT-LATIC-44",
        validade: "05/06/2026",
        quantidade: 12,
        reservado: 0
    },
    {
        nome: "Macarrão Espaguete 500g",
        sku: "7894000555",
        lote: "LT-MASS-12",
        validade: "15/05/2025",
        quantidade: 5,
        reservado: 0
    }
];

function calcularStatus(validadeTexto) {
    const validade = converterDataBrasileira(validadeTexto);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (!validade) {
        return { classe: "vencido", texto: "Data inválida" };
    }

    const diferenca = Math.ceil(
        (validade - hoje) / (1000 * 60 * 60 * 24)
    );

    if (diferenca < 0) {
        return { classe: "vencido", texto: "Vencido" };
    }

    if (diferenca <= 30) {
        return { classe: "alerta", texto: "Alerta" };
    }

    return { classe: "normal", texto: "Normal" };
}

function converterDataBrasileira(dataTexto) {
    const partes = dataTexto.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (!partes) {
        return null;
    }

    const dia = Number(partes[1]);
    const mes = Number(partes[2]);
    const ano = Number(partes[3]);
    const data = new Date(ano, mes - 1, dia);
    data.setHours(0, 0, 0, 0);

    const dataExiste =
        data.getFullYear() === ano &&
        data.getMonth() === mes - 1 &&
        data.getDate() === dia;

    return dataExiste ? data : null;
}

function validarValidade(dataTexto) {
    if (!/^(\d{2})\/(\d{2})\/(\d{4})$/.test(dataTexto)) {
        return {
            valido: false,
            mensagem: "Digite a data no formato DD/MM/AAAA, com as barras."
        };
    }

    if (!converterDataBrasileira(dataTexto)) {
        return {
            valido: false,
            mensagem: "Informe uma data existente no calendário."
        };
    }

    return { valido: true, mensagem: "" };
}

function mostrarErroValidade(mensagem) {
    const campo = document.getElementById("novaValidade");
    const erro = document.getElementById("erroValidade");

    campo.classList.toggle("invalido", Boolean(mensagem));
    erro.textContent = mensagem;
}

function renderizar(lista) {
    const corpo = document.getElementById("corpoTabela");
    const contador = document.getElementById("contador");

    corpo.innerHTML = "";

    lista.forEach(produto => {
        const status = calcularStatus(produto.validade);

        corpo.innerHTML += `
            <tr>
                <td>
                    ${produto.nome}<br>
                    <small>${produto.sku}</small>
                </td>
                <td>${produto.lote}</td>
                <td>${produto.validade}</td>
                <td>${produto.quantidade} un</td>
                <td>${produto.reservado} un</td>
                <td>
                    <div class="status-box">
                        <span class="status ${status.classe}"></span>
                        ${status.texto}
                    </div>
                </td>
            </tr>
        `;
    });

    contador.textContent = `Mostrando ${lista.length} resultados`;
}

function filtrar() {
    const produto = document
        .getElementById("filtroProduto")
        .value
        .toLowerCase();

    const lote = document
        .getElementById("filtroLote")
        .value
        .toLowerCase();

    const resultado = produtos.filter(item =>
        item.nome.toLowerCase().includes(produto) &&
        item.lote.toLowerCase().includes(lote)
    );

    renderizar(resultado);
}

function abrirModal() {
    document.getElementById("modal").style.display = "flex";
    mostrarErroValidade("");
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
    mostrarErroValidade("");
}

function salvarProduto() {
    const nome = document.getElementById("novoNome").value.trim();
    const sku = document.getElementById("novoSku").value.trim();
    const lote = document.getElementById("novoLote").value.trim();
    const validade = document.getElementById("novaValidade").value.trim();
    const quantidade = document.getElementById("novaQuantidade").value.trim();
    const reservado = document.getElementById("novoReservado").value.trim();

    if (!nome || !sku || !lote || !validade || !quantidade) {
        alert("Preencha os campos obrigatórios.");
        return;
    }

    const validacaoValidade = validarValidade(validade);

    if (!validacaoValidade.valido) {
        mostrarErroValidade(validacaoValidade.mensagem);
        document.getElementById("novaValidade").focus();
        return;
    }

    produtos.push({
        nome,
        sku,
        lote,
        validade,
        quantidade: Number(quantidade),
        reservado: Number(reservado || 0)
    });

    fecharModal();
    renderizar(produtos);
}

document.getElementById("novaValidade").addEventListener("input", event => {
    const caracteresPermitidos = event.target.value.replace(/[^\d/]/g, "");

    if (event.target.value !== caracteresPermitidos) {
        event.target.value = caracteresPermitidos;
    }

    mostrarErroValidade("");
});

renderizar(produtos);
