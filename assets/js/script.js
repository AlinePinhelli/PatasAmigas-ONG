// =========================================================
// ENTREGA III: FUNCIONALIDADES PRINCIPAIS (JavaScript)
// =========================================================

// 1. FUNCIONALIDADE DO MENU HAMBÚRGUER
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".c-header__nav");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("is-open");
    const isExpanded = navMenu.classList.contains("is-open");
    menuToggle.setAttribute("aria-expanded", isExpanded);
    document.body.classList.toggle("no-scroll", isExpanded);
  });
}

// =========================================================
// 2. FUNCIONALIDADE LIGHTBOX / MODAL
// =========================================================

function setupLightbox() {
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
// 3. FUNCIONALIDADE DE FILTROS E BUSCA NA GALERIA
// =========================================================

function setupFiltros() {
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

      // 1. Filtro por Busca de Texto
      if (query && !cardContent.includes(query)) {
        isVisible = false;
      }

      // 2. Filtro por Tags
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
// 4. VALIDAÇÃO AVANÇADA DE FORMULÁRIO (cadastro.html)
// =========================================================

function setupValidacaoFormulario() {
  const formulario = document.getElementById("formulario-inscricao");
  const inputDataNascimento = document.getElementById("data-nascimento");

  if (!formulario) return;

  const erroGlobalDiv = document.createElement("div");
  erroGlobalDiv.id = "erro-global";
  erroGlobalDiv.textContent = "Por favor, corrija os erros nos campos marcados.";
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
    const divPai = input.closest("div");
    let spanErro = divPai.querySelector(".erro-mensagem");

    if (!spanErro) {
      spanErro = document.createElement("span");
      spanErro.classList.add("erro-mensagem");
      input.insertAdjacentElement("afterend", spanErro);
    }
    spanErro.textContent = mensagem;
    input.classList.add("input-erro");
  }

  function removerErro(input) {
    const divPai = input.closest("div");
    const spanErro = divPai.querySelector(".erro-mensagem");
    if (spanErro) {
      spanErro.remove();
    }
    input.classList.remove("input-erro");
  }

  formulario.addEventListener("submit", e => {
    let formValido = true;
    erroGlobalDiv.classList.remove("erro-ativo");

    // 1. Validação de Idade Mínima
    if (!validarIdade(inputDataNascimento) || inputDataNascimento.value === "") {
      formValido = false;
      exibirErro(
        inputDataNascimento,
        "É necessário ter no mínimo 18 anos para se candidatar."
      );
    } else {
      removerErro(inputDataNascimento);
    }

    // 2. Validação Nativa (complementar)
    if (!formulario.checkValidity()) {
      formValido = false;
    }

    if (!formValido) {
      e.preventDefault();
      erroGlobalDiv.classList.add("erro-ativo");
    } else {
      e.preventDefault();
      alert("Inscrição enviada com sucesso! Entraremos em contato em breve.");
      formulario.reset();
    }
  });

  // Listeners para feedback imediato
  formulario.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("input", () => {
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
// 5. MÁSCARA DINÂMICA PARA TELEFONE
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
// INICIALIZAÇÃO DE TODAS AS FUNÇÕES NO CARREGAMENTO
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  setupLightbox();
  setupFiltros();
  setupValidacaoFormulario();
  setupMascaraTelefone();
});
