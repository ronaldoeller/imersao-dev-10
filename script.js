/**
 * @file Script para buscar dados de linguagens de programação e renderizá-los como cards na página.
 */

/**
 * O contêiner do DOM onde os cards de linguagens de programação serão inseridos.
 * @type {HTMLElement}
 */
let cardContainer = document.querySelector(".card-container");

/**
 * O campo de input onde o usuário digitará o termo de busca.
 * @type {HTMLInputElement}
 */
const caixaBusca = document.querySelector("header input");

/**
 * Array para armazenar os dados das linguagens de programação buscados do arquivo JSON.
 * @type {Array<{nome: string, descrição: string, ano: number, link: string}>}
 */
let dados = [];

/**
 * Função assíncrona que busca os dados do arquivo 'data.json'.
 * Após a busca, converte a resposta para JSON, armazena na variável global 'dados'
 * e chama a função 'renderizarCards' para exibir os dados na tela.
 * @async
 * @returns {Promise<void>}
 * @description Adiciona um listener ao campo de busca para filtrar os resultados dinamicamente.
 */
async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca no JSON.
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");  // Retorna os dados do arquivo data.json
             dados = await resposta.json();  // Converte os dados para JSON
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);  // Loga qualquer erro que ocorra durante a busca
            return;  // Sai da função se houver um erro
        }
    }

    // Converte o termo de busca para minúsculas para uma busca case-insensitive.
    const termoBusca = caixaBusca.value.toLowerCase();

    // Filtra o array 'dados' original.
    const dadosFiltrados = dados.filter(dado => {
        // Verifica se o nome ou a descrição da linguagem (em minúsculas) incluem o termo de busca.
        const nome = dado.nome.toLowerCase();
        const descricao = dado.descricao.toLowerCase();
        return nome.includes(termoBusca) || descricao.includes(termoBusca);
    });

    // Renderiza novamente os cards, mas desta vez apenas com os dados filtrados.
    renderizarCards(dadosFiltrados);
}

/**
 * Renderiza os cards na página a partir de um array de dados.
 * Para cada objeto no array, cria um elemento <article> (card) e o adiciona ao 'cardContainer'.
 * @param {Array<{name: string, descrição: string, ano: number, link: string}>} dadosParaRenderizar - O array de objetos de linguagens a ser renderizado.
 */
function renderizarCards(dadosParaRenderizar) {
    // Limpa o contêiner de cards antes de adicionar os novos.
    // Isso é crucial para que os resultados da busca não sejam apenas adicionados aos existentes.
    cardContainer.innerHTML = "";
    // Itera sobre cada objeto 'dado' dentro do array 'dadosParaRenderizar'.
    for (let dado of dadosParaRenderizar) { 
        console.log(dado); // Loga o objeto atual no console para depuração.
        let article = document.createElement("article"); // Cria um novo elemento HTML <article> para representar o card.
        article.classList.add("card"); // Adiciona a classe CSS 'card' ao elemento <article> para estilização.
        // Define o conteúdo HTML interno do card usando um template literal para inserir os dados dinâmicos.
        article.innerHTML = ` 
            <h2>${dado.nome}</h2>
            <p>${dado.descricao}</p>
            <p>${dado.data_criacao}</p>
            <a href="${dado.link}">Saiba mais</a>
        `;
        cardContainer.appendChild(article); // Anexa o card recém-criado como um filho do 'cardContainer' no DOM, tornando-o visível na página.
    }
}