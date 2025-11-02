// =========================================================
// ENTREGA III & IV: FUNCIONALIDADES COMPLETAS (JavaScript SPA)
// =========================================================

// =========================================================
// 1. MENU HAMBÚRGUER E TEMA (Funcionalidades Globais)
// =========================================================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".c-header__nav");

// Lógica para o Menu Hambúrguer (Funciona em todas as telas)
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("is-open");
    const isExpanded = navMenu.classList.contains("is-open");
    menuToggle.setAttribute("aria-expanded", isExpanded);
    document.body.classList.toggle("no-scroll", isExpanded);
  });
}

// Lógica para Alternância de Tema (Requisito da Entrega IV)
function setupTemaAlternancia() {
  const temaToggle = document.getElementById("tema-toggle");
  const body = document.body;

  if (!temaToggle) return;

  // Aplica o tema salvo no localStorage
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "escuro") {
    body.classList.add("tema-escuro");
  }

  temaToggle.addEventListener("click", () => {
    body.classList.toggle("tema-escuro");

    if (body.classList.contains("tema-escuro")) {
      localStorage.setItem("tema", "escuro");
    } else {
      localStorage.setItem("tema", "claro");
    }
  });
}

// =========================================================
// 2. LIGHTBOX / MODAL (Função de Componente para Projetos)
// =========================================================

function setupLightbox() {
  // Nota: Os elementos são buscados no DOM após o template ser renderizado
  const triggers = document.querySelectorAll(".js-lightbox-trigger");
  const body = document.body;

  triggers.forEach(img => {
    img.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.classList.add("c-modal", "is-open");

      modal.innerHTML = `
        <div class="c-modal__conteudo">
            <button class="c-modal__fechar" aria-label="Fechar Galeria de Imagem">&times;</button>
            <img class="c-modal__imagem" src="${img.src}" alt="${img.alt}">
        </div>
      `;

      body.appendChild(modal);
      body.classList.add("no-scroll");

      const fecharBotao = modal.querySelector(".c-modal__fechar");

      const fecharModal = () => {
        modal.remove();
        body.classList.remove("no-scroll");
      };

      fecharBotao.addEventListener("click", fecharModal);

      modal.addEventListener("click", e => {
        if (e.target.classList.contains("c-modal")) {
          fecharModal();
        }
      });

      document.addEventListener(
        "keydown",
        e => {
          if (e.key === "Escape" && modal) {
            fecharModal();
          }
        },
        { once: true }
      );
    });
  });
}

// =========================================================
// 3. FILTROS E BUSCA (Função de Componente para Projetos)
// =========================================================

function setupFiltros() {
  // Nota: Os elementos são buscados no DOM após o template ser renderizado
  const cards = document.querySelectorAll(".c-galeria-animais__item");
  const searchInput = document.getElementById("search-input");
  const filterTags = document.querySelectorAll(".js-filter-tag");
  const limparBotao = document.getElementById("limpar-filtros");

  let filtrosAtivos = {
    searchText: "",
    tags: [],
  };

  function aplicarFiltros() {
    const query = filtrosAtivos.searchText.toLowerCase();

    cards.forEach(card => {
      const cardContent = card.textContent.toLowerCase();
      let isVisible = true;

      // Filtro de Texto
      if (query && !cardContent.includes(query)) {
        isVisible = false;
      }

      // Filtro de Tags
      if (filtrosAtivos.tags.length > 0) {
        const possuiTodasTags = filtrosAtivos.tags.every(tag => {
          return cardContent.includes(tag.toLowerCase());
        });

        if (!possuiTodasTags) {
          isVisible = false;
        }
      }

      card.style.display = isVisible ? "block" : "none";
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", e => {
      filtrosAtivos.searchText = e.target.value;
      aplicarFiltros();
    });
  }

  filterTags.forEach(tag => {
    tag.addEventListener("click", e => {
      const tagElement = e.target;
      const filterValue = tagElement.getAttribute("data-filter");

      tagElement.classList.toggle("is-active");

      const index = filtrosAtivos.tags.indexOf(filterValue);
      if (index > -1) {
        filtrosAtivos.tags.splice(index, 1);
      } else {
        filtrosAtivos.tags.push(filterValue);
      }

      aplicarFiltros();
    });
  });

  if (limparBotao) {
    limparBotao.addEventListener("click", () => {
      filtrosAtivos.searchText = "";
      filtrosAtivos.tags = [];

      searchInput.value = "";
      filterTags.forEach(tag => tag.classList.remove("is-active"));

      aplicarFiltros();
    });
  }
}

// =========================================================
// 4. VALIDAÇÃO AVANÇADA DE FORMULÁRIO (Função de Componente para Cadastro)
// =========================================================

function setupValidacaoFormulario() {
  const formulario = document.getElementById("formulario-inscricao");
  const inputDataNascimento = document.getElementById("data-nascimento");

  if (!formulario) return;

  const erroGlobalDiv = document.createElement("div");
  erroGlobalDiv.id = "erro-global";
  erroGlobalDiv.textContent =
    "Por favor, corrija os erros nos campos marcados.";
  erroGlobalDiv.setAttribute("aria-live", "polite");
  formulario.prepend(erroGlobalDiv);

  function validarIdade(input) {
    const dataNasc = new Date(input.value);
    const dataAtual = new Date();
    const idadeLimite = 18;
    const dataLimite = new Date(
      dataAtual.getFullYear() - idadeLimite,
      dataAtual.getMonth(),
      dataAtual.getDate()
    );
    return dataNasc <= dataLimite;
  }

  function exibirErro(input, mensagem) {
    const divPai = input.closest("div") || input.closest("fieldset");
    let spanErro = divPai.querySelector(".erro-mensagem");

    if (!spanErro) {
      spanErro = document.createElement("span");
      spanErro.classList.add("erro-mensagem");
      input.insertAdjacentElement("afterend", spanErro);
    }
    spanErro.textContent = mensagem;
    input.classList.add("input-erro");
    erroGlobalDiv.classList.add("erro-ativo");
  }

  function removerErro(input) {
    const divPai = input.closest("div") || input.closest("fieldset");
    const spanErro = divPai.querySelector(".erro-mensagem");
    if (spanErro) {
      spanErro.remove();
    }
    input.classList.remove("input-erro");

    // Verifica se ainda existem erros para manter o erro global ativo
    if (!formulario.querySelector(".input-erro")) {
      erroGlobalDiv.classList.remove("erro-ativo");
    }
  }

  formulario.addEventListener("submit", e => {
    let formValido = true;

    // Validação de Idade (Regra Específica)
    if (
      !validarIdade(inputDataNascimento) ||
      inputDataNascimento.value === ""
    ) {
      formValido = false;
      exibirErro(
        inputDataNascimento,
        "É necessário ter no mínimo 18 anos para se candidatar."
      );
    } else {
      removerErro(inputDataNascimento);
    }

    // Validação Padrão de HTML5 (Required, Email, etc.)
    if (!formulario.checkValidity()) {
      formValido = false;
    }

    if (!formValido) {
      e.preventDefault();
      erroGlobalDiv.classList.add("erro-ativo");
      // Força a exibição dos erros nativos do navegador
      formulario.reportValidity();
    } else {
      e.preventDefault();
      // Lógica de sucesso
      alert("Inscrição enviada com sucesso! Entraremos em contato em breve.");
      formulario.reset();
    }
  });

  // Limpeza de erro ao digitar
  formulario.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("input", () => {
      // Revalida a idade no input para limpeza
      if (input.id === "data-nascimento") {
        if (validarIdade(input)) {
          removerErro(input);
        }
      } else if (input.checkValidity()) {
        removerErro(input);
      }
    });
  });
}

// =========================================================
// 5. MÁSCARA DINÂMICA PARA TELEFONE (Função de Componente para Cadastro)
// =========================================================

function setupMascaraTelefone() {
  const inputTelefone = document.getElementById("telefone");

  if (!inputTelefone) return;

  inputTelefone.addEventListener("input", handleTelefone, false);
}

const phoneMask = value => {
  if (!value) return "";

  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");

  if (value.length > 15) {
    value = value.substring(0, 15);
  }

  return value;
};

const handleTelefone = event => {
  event.target.value = phoneMask(event.target.value);
};

// =========================================================
// 6. SINGLE PAGE APPLICATION (SPA) BÁSICA E TEMPLATES JS
// =========================================================

// Templates de Conteúdo (HTML como strings)
const templates = {
  inicio: `
        <section class="c-secao-apresentacao">
            <h2>Nossa Missão: Resgatar, Cuidar, Amar</h2>
            <figure class="c-figure-destaque">
                <img src="assets/images/cachorro_resgatado_feliz.jpg" alt="Cachorro sendo abraçado por um voluntário." class="c-figure-destaque__imagem" loading="lazy">
                <figcaption class="c-figure-destaque__legenda">
                    Há mais de 10 anos transformando vidas de animais abandonados.
                </figcaption>
            </figure>
            <p>A Patas Amigas é uma Organização Não Governamental dedicada a oferecer uma segunda chance a cães e gatos em situação de vulnerabilidade. Atuamos no resgate, fornecemos tratamento veterinário completo e promovemos a adoção responsável. Acreditamos que todo animal merece um lar seguro e cheio de amor.</p>
        </section>

        <section class="c-secao-pilares">
            <h2>Como a Patas Amigas Transforma</h2>
            <article class="c-card-pilar"><h3>Resgate e Reabilitação</h3><p>Nossa equipe atua no resgate de animais feridos ou abandonados, garantindo cuidados médicos urgentes e reabilitação física e comportamental antes da adoção.</p></article>
            <article class="c-card-pilar"><h3>Adoção Responsável</h3><p>Realizamos entrevistas e acompanhamento pós-adoção, garantindo que nossos amigos encontrem lares seguros e que a família adotante esteja preparada.</p></article>
            <article class="c-card-pilar"><h3>Educação Comunitária</h3><p>Promovemos a conscientização sobre a importância da castração, vacinação e posse responsável em comunidades locais.</p></article>
            <a href="#projetos" class="c-botao c-botao--acao">Conheça os Animais para Adoção</a>
        </section>

        <section class="c-secao-contato">
            <h2>Fale Conosco e Ajude!</h2>
            <address><p><strong>Local de Visitação (mediante agendamento):</strong></p><p>Rua da Esperança, 123 - Bairro Solidário, Curitiba - PR</p><p><strong>Telefone:</strong> (41) 98765-4321</p><p><strong>E-mail:</strong> <a href="mailto:contato@patasamigas.org">contato@patasamigas.org</a></p></address>
        </section>
    `,

  projetos: `


        <section class="c-secao-galeria">
            <h2>Nossos Amigos à Espera de um Lar</h2>
            <figure class="c-figure-destaque">
                <img src="assets/images/header_galeria_adocao.jpg" alt="Foto de vários filhotes brincando juntos." width="800" class="c-figure-destaque__imagem" loading="lazy">
                <figcaption class="c-figure-destaque__legenda">Cada adoção abre espaço para um novo resgate!</figcaption>
            </figure>
             <section class="c-filtros">
            <h2>Encontre o Seu Amigo Ideal</h2>
            <form id="form-filtros" class="c-filtros__form">
                <div class="c-filtros__busca">
                    <label for="search-input" class="sr-only">Buscar por Nome ou Descrição</label>
                    <div class="c-filtros__search-wrapper">
                        <input type="text" id="search-input" placeholder="Buscar por nome, porte ou raça..." class="c-filtros__input">
                        <button type="button" class="c-filtros__btn-busca" aria-label="Aplicar Busca">&#128269;</button>
                    </div>
                </div>
                <div class="c-filtros__grupos">
                    <div class="c-filtros__grupo-tags"><span class="c-filtros__label">Espécie:</span><div class="c-filtros__opcoes"><button type="button" class="c-tag c-tag--cao js-filter-tag" data-filter="Cão">Cão</button><button type="button" class="c-tag c-tag--gato js-filter-tag" data-filter="Gato">Gato</button></div></div>
                    <div class="c-filtros__grupo-tags"><span class="c-filtros__label">Status/Porte:</span><div class="c-filtros__opcoes"><button type="button" class="c-tag c-tag--urgente js-filter-tag" data-filter="Pequeno">Pequeno</button><button type="button" class="c-tag c-tag--castrado js-filter-tag" data-filter="Castrado">Castrado</button><button type="button" class="c-tag c-tag--urgente js-filter-tag" data-filter="Grande">Grande</button></div></div>
                    <button type="button" class="c-botao c-botao--secundario c-filtros__limpar" id="limpar-filtros">Limpar Filtros</button>
                </div>
            </form>
        </section>

            <ul class="c-galeria-animais">
                <li class="c-galeria-animais__item"><article class="c-card-animal"><h3>Bolinha (Cão)</h3><div class="c-tags-container"><span class="c-tag c-tag--cao">Cão</span><span class="c-tag c-tag--urgente">Filhote</span></div><img class="c-card-animal__imagem js-lightbox-trigger" src="assets/images/animal_bolinha.jpg" alt="Bolinha - Cão Pequeno" loading="lazy"><p class="c-card-animal__info"><strong>Porte:</strong> Pequeno | <strong>Idade:</strong> 2 anos</p><a class="c-card-animal__botao c-botao c-botao--primario" href="#cadastro">Candidatar-se para Adoção</a></article></li>
                <li class="c-galeria-animais__item"><article class="c-card-animal c-card-animal--gato"><h3>Mia (Gato)</h3><div class="c-tags-container"><span class="c-tag c-tag--gato">Gato</span><span class="c-tag c-tag--castrado">Castrada</span></div><img class="c-card-animal__imagem js-lightbox-trigger" src="assets/images/animal_mia.jpg" alt="Mia - Gata Média" loading="lazy"><p class="c-card-animal__info"><strong>Porte:</strong> Médio | <strong>Idade:</strong> 6 meses</p><a class="c-card-animal__botao c-botao c-botao--primario" href="#cadastro">Candidatar-se para Adoção</a></article></li>
                <li class="c-galeria-animais__item"><article class="c-card-animal"><h3>Mel (Cão)</h3><div class="c-tags-container"><span class="c-tag c-tag--cao">Cão</span><span class="c-tag c-tag--castrado">Castrado</span></div><img class="c-card-animal__imagem js-lightbox-trigger" src="assets/images/animal_mel.jpg" alt="Mel - Cão Médio" loading="lazy"><p class="c-card-animal__info"><strong>Porte:</strong> Médio | <strong>Idade:</strong> 1 ano</p><a class="c-card-animal__botao c-botao c-botao--primario" href="#cadastro">Candidatar-se para Adoção</a></article></li>
                <li class="c-galeria-animais__item"><article class="c-card-animal c-card-animal--gato"><h3>Tom (Gato)</h3><div class="c-tags-container"><span class="c-tag c-tag--gato">Gato</span><span class="c-tag c-tag--urgente">Precisa de Padrinho</span></div><img class="c-card-animal__imagem js-lightbox-trigger" src="assets/images/animal_tom.jpg" alt="Tom - Gato Laranja" loading="lazy"><p class="c-card-animal__info"><strong>Porte:</strong> Médio | <strong>Idade:</strong> 2 anos</p><a class="c-card-animal__botao c-botao c-botao--primario" href="#cadastro">Candidatar-se para Adoção</a></article></li>
                <li class="c-galeria-animais__item"><article class="c-card-animal"><h3>Thor (Cão)</h3><div class="c-tags-container"><span class="c-tag c-tag--cao">Cão</span><span class="c-tag c-tag--castrado">Castrado</span></div><img class="c-card-animal__imagem js-lightbox-trigger" src="assets/images/animal_thor.jpg" alt="Thor - Cão Grande" loading="lazy"><p class="c-card-animal__info"><strong>Porte:</strong> Grande | <strong>Idade:</strong> 3 anos</p><a class="c-card-animal__botao c-botao c-botao--primario" href="#cadastro">Candidatar-se para Adoção</a></article></li>
                <li class="c-galeria-animais__item"><article class="c-card-animal c-card-animal--gato"><h3>Dumbo (Gato)</h3><div class="c-tags-container"><span class="c-tag c-tag--gato">Gato</span><span class="c-tag c-tag--urgente">Jovem</span></div><img class="c-card-animal__imagem js-lightbox-trigger" src="assets/images/animal_dumbo.jpg" alt="Dumbo - Gato Jovem" loading="lazy"><p class="c-card-animal__info"><strong>Porte:</strong> Médio | <strong>Idade:</strong> 6 meses</p><a class="c-card-animal__botao c-botao c-botao--primario" href="#cadastro">Candidatar-se para Adoção</a></article></li>
            </ul>
        </section>

        <section class="c-secao-voluntariado">
            <h2>Seja Voluntário e Transforme Vidas</h2>
            <p>Se você não pode adotar, pode ser um anjo na vida de nossos resgatados. Temos diversas oportunidades, desde Lar Temporário até ajuda em eventos.</p>

            <dl class="c-lista-voluntariado">
                <dt class="c-lista-voluntariado__titulo">Lar Temporário</dt>
                <dd class="c-lista-voluntariado__descricao">Ofereça um lar de passagem enquanto o pet não encontra a família definitiva.</dd>

                <dt class="c-lista-voluntariado__titulo">Ajuda em Eventos</dt>
                <dd class="c-lista-voluntariado__descricao">Participe de feiras de adoção e arrecadação de fundos.</dd>
            </dl>

            <a href="#cadastro" class="c-botao c-botao--acao">Quero ser Voluntário</a>
        </section>

        <section class="c-secao-doacao">
            <h2>Apoie Nossa Causa: Como Doar</h2>
            <p>Toda ajuda é vital para custear alimentação, vacinas e procedimentos veterinários.</p>

            <article class="c-card-campanha">
                <h3 class="c-card-campanha__titulo">Campanha Atual: Ajude o Resgate de Março</h3>
                <p class="c-card-campanha__meta">Nossa meta é arrecadar R$ 5.000 para tratar 15 animais abandonados recentemente.</p>
                <p class="c-card-campanha__progresso"><strong>Progresso:</strong> R$ 2.500 arrecadados!</p>
                <a href="#" class="c-botao c-botao--acao">Realizar Doação Online (Futura Implementação)</a>
            </article>

            <img src="assets/images/doacao_racao.jpeg" alt="Pilha de sacos de ração, ilustrando doações." width="400" loading="lazy">
        </section>
    `,

  cadastro: `
        <section>
            <h2>Junte-se a Nós!</h2>
            <p>Preencha o formulário abaixo para manifestar interesse em adoção ou para se tornar um voluntário da Patas Amigas.</p>

            <form class="c-formulario" id="formulario-inscricao" novalidate>
                <fieldset><legend>Dados Pessoais e Contato</legend>
                    <div><label for="nome">Nome Completo</label><input type="text" id="nome" name="nome" required></div>
                    <div><label for="email">E-mail</label><input type="email" id="email" name="email" required></div>
                    <div><label for="telefone">Telefone</label><input type="tel" id="telefone" name="telefone" placeholder="(XX) 9XXXX-XXXX" required maxlength="15"></div>
                    <div><label for="data-nascimento">Data de Nascimento</label><input type="date" id="data-nascimento" name="data-nascimento" required></div>
                </fieldset>

                <fieldset class="fieldset-endereco">
                    <legend>Informações de Endereço</legend>
                    <div><label for="endereco">Endereço (Rua, Número, Complemento)</label><input type="text" id="endereco" name="endereco" required></div>
                    <div><label for="cep">CEP</label><input type="text" id="cep" name="cep" pattern="\\d{5}-\\d{3}" placeholder="XXXXX-XXX" required></div>
                    <div><label for="cidade">Cidade</label><input type="text" id="cidade" name="cidade" required></div>
                    <div><label for="estado">Estado</label>
                        <select id="estado" name="estado" required>
                            <option value="">Selecione</option>
                            <option value="AC">Acre</option><option value="AL">Alagoas</option><option value="AP">Amapá</option><option value="BA">Bahia</option><option value="CE">Ceará</option><option value="DF">Distrito Federal</option><option value="ES">Espírito Santo</option><option value="GO">Goiás</option><option value="MA">Maranhão</option><option value="MG">Minas Gerais</option><option value="MS">Mato Grosso do Sul</option><option value="MT">Mato Grosso</option><option value="PA">Pará</option><option value="PB">Paraíba</option><option value="PE">Pernambuco</option><option value="PI">Piauí</option><option value="PR">Paraná</option><option value="RJ">Rio de Janeiro</option><option value="RN">Rio Grande do Norte</option><option value="RO">Rondônia</option><option value="RR">Roraima</option><option value="RS">Rio Grande do Sul</option><option value="SC">Santa Catarina</option><option value="SE">Sergipe</option><option value="SP">São Paulo</option><option value="TO">Tocantins</option>
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Qual seu objetivo?</legend>
                    <div><input type="radio" id="adocao" name="objetivo" value="adocao" required><label for="adocao">Quero Adotar um animal</label></div>
                    <div><input type="radio" id="voluntario" name="objetivo" value="voluntario" required><label for="voluntario">Quero ser Voluntário</label></div>
                    <div><label for="mensagem">Deixe uma mensagem sobre seu interesse:</label><textarea id="mensagem" name="mensagem" rows="5"></textarea></div>
                </fieldset>

                <button type="submit" class="c-botao c-botao--primario">Enviar Inscrição</button>
            </form>
        </section>
    `,

  404: "<h2>Página não encontrada!</h2><p>Parece que você se perdeu.</p>",
};

// Função principal para renderizar o conteúdo (Roteamento e Templates)
function renderizarConteudo(rota) {
  const mainContent = document.querySelector("main");
  const templateHTML = templates[rota] || templates["404"];

  // Injeta o HTML (Template JS)
  mainContent.innerHTML = templateHTML;

  // RE-INICIALIZA AS FUNÇÕES JS NECESSÁRIAS PARA A NOVA PÁGINA
  // As funções só devem ser chamadas se os elementos existirem.
  if (rota === "projetos") {
    setupFiltros();
    setupLightbox();
  }
  if (rota === "cadastro") {
    setupValidacaoFormulario();
    setupMascaraTelefone();
  }

  // Atualiza o título da página (melhoria de UX)
  document.title = `Patas Amigas | ${rota.charAt(0).toUpperCase() + rota.slice(1)}`;

  // Fecha o menu mobile após a navegação
  navMenu.classList.remove("is-open");
  document.body.classList.remove("no-scroll");

  // Volta para o topo da página após a navegação (melhoria de UX)
  window.scrollTo(0, 0);
}

// Roteador baseado em hash
function roteador() {
  // Pega a rota (o que vem depois do #) ou usa 'inicio' como padrão
  const rota = window.location.hash.slice(1) || "inicio";
  renderizarConteudo(rota);
}

// =========================================================
// INICIALIZAÇÃO DE TODAS AS FUNÇÕES NO CARREGAMENTO
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  // Configurações Globais (Tema e Início do Roteamento)
  setupTemaAlternancia();

  // 1. Inicia o roteador na carga inicial
  roteador();

  // 2. Escuta mudanças na hash da URL para navegação SPA
  window.addEventListener("hashchange", roteador);
});
