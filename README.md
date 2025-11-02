# 🐾 Patas Amigas: Plataforma Web para ONG de Adoção Animal

## 🌟 Contexto do Projeto

Este projeto é desenvolvido como parte da disciplina de **Desenvolvimento Web: Front-end** com o objetivo de criar uma plataforma digital completa para Organizações Não Governamentais (ONGs).

A ONG escolhida para simulação é a **"Patas Amigas"**, focada no resgate, reabilitação e promoção da adoção responsável de cães e gatos.

O objetivo principal é aplicar e integrar os conhecimentos adquiridos na disciplina, abordando desde a estruturação semântica até a interatividade e acessibilidade.

---

## 📦 Entrega I: Fundamentos e Estruturação (HTML5)

Esta entrega focou na criação da estrutura base do projeto, utilizando apenas **HTML5 Semântico** e garantindo que todos os requisitos de formulário e conteúdo fossem atendidos.

### 📝 Requisitos Atendidos (Entrega I)

* **Estrutura Semântica Completa:** Uso correto de tags como `<header>`, `<main>`, `<section>`, `<article>` e `<footer>` em todas as páginas.
* **Hierarquia de Títulos:** Aplicação lógica e consistente de `<h1>`, `<h2>`, etc.
* **Páginas Obrigatórias:** Criação dos arquivos `index.html`, `projetos.html` e `cadastro.html`.
* **Formulário Complexo:** Desenvolvimento do formulário de Candidatura à Adoção (`cadastro.html`), utilizando agrupamento lógico (`<fieldset>`).
* **Validação Nativa:** Uso de atributos HTML5 como `required`, `type="email"`, `type="date"` e `pattern` para simular as máscaras de CPF, Telefone e CEP.
* **Organização Profissional:** Estrutura de pastas organizada para futuras implementações de CSS e JavaScript.

### 📁 Estrutura de Arquivos

A estrutura do projeto está organizada da seguinte forma:
[PatasAmigas-ONG] ├── index.html ├── projetos.html ├── cadastro.html └── assets/ ├── css/ ├── js/ └── images/ └── [Arquivos de Imagem da ONG]


---

## 🎨 Entrega II: Estilização e Responsividade (CSS3 Avançado)

A segunda fase do projeto transformou a estrutura semântica em uma interface visual completa e totalmente responsiva, aplicando as melhores práticas de CSS3 e Design System.

### ⚙️ Tecnologias e Metodologias Chave

* **Design System:** Uso de **Variáveis CSS** (`:root`) para cores (8+ cores) e espaçamento modular (`--espacamento-base`, `--espacamento-duplo`), garantindo consistência.
* **Mobile-First:** O desenvolvimento foi iniciado para a visualização móvel, com o layout evoluindo para telas maiores.
* **Metodologia BEM:** Utilização da convenção Bloco-Elemento-Modificador (`c-header`, `c-card-animal__imagem`, `c-botao--primario`) para código escalável e de fácil manutenção.
* **Layout Responsivo:**
    * **5 Breakpoints:** Implementados em `480px`, `768px`, `992px`, e `1200px` para adaptar o layout a diversos dispositivos.
    * **Flexbox:** Utilizado no cabeçalho e na Galeria de Cards (`projetos.html`) para alinhamento e distribuição de espaço.
    * **CSS Grid:** Aplicado no Formulário de Cadastro (`cadastro.html`) para criar um layout de duas colunas em telas maiores (otimizando a experiência do usuário em campos de dados).

### ✨ Componentes Implementados

* **Galeria de Cards (Projetos):** Layout responsivo que alterna de 1 coluna (mobile) para 2 e 3 colunas (desktop).
* **Sistema de Tags/Badges:** Classes CSS (`c-tag--cao`, `c-tag--urgente`) criadas para categorização visual dos animais.
* **Menu Hambúrguer:** Estrutura HTML e CSS implementadas para o ícone e o estado de ocultação/exibição da navegação mobile (`position: fixed` e `transform: translateX(100%)`).
* **Acessibilidade Visual:** Garantia de alto contraste (WCAG AA) com a paleta de cores definida.

---

## 💻 Entrega III: Interatividade e Dinamismo (JavaScript)

Esta fase introduziu a lógica de programação para transformar a interface estática em um sistema web dinâmico, aplicando conceitos de manipulação do DOM e lógica de validação.

### ⚙️ Funcionalidades Dinâmicas

* **Menu Hambúrguer Funcional:** Implementação de JavaScript (Toggle Class) para abrir e fechar a navegação mobile ao clicar no ícone (`menu-toggle`).
* **Lightbox / Modal:** Criação dinâmica de um componente modal/popup (usando `document.createElement`) para exibir a imagem de um animal em tela cheia ao clicar no card (`projetos.html`).
* **Filtros de Busca e Tags:** Lógica de filtragem em tempo real (evento `input`) que esconde ou exibe cards de animais com base no texto digitado e nas tags selecionadas.
* **Validação Avançada de Formulário:** Implementação de validação mais sofisticada no `cadastro.html`:
    * Checagem de **Idade Mínima (18 anos)** para adoção/voluntariado.
    * Máscara de Input Dinâmica para o campo **Telefone**, inserindo automaticamente os caracteres `()` e `-` enquanto o usuário digita.

---

## 🏁 Entrega IV: Versionamento, Acessibilidade e Qualidade Profissional

A fase final do projeto focou em transformar o produto funcional em um projeto pronto para produção, seguindo normas de acessibilidade (WCAG 2.1) e boas práticas de Git/DevOps.

### ♿ Acessibilidade e Conformidade (WCAG 2.1 Nível AA)

* **Tema Escuro / Alto Contraste:** Adicionado um botão (💡) e lógica em JavaScript/CSS para alternar o **Modo Escuro Acessível**, garantindo contraste mínimo de 4.5:1 para texto normal.
* **Suporte a Leitores de Tela:** Uso de atributos ARIA (`aria-label`, `aria-expanded`) e validação semântica para navegação por teclado completa.

### 🔄 Versionamento e Gerenciamento de Código

* **Estratégia de Branching (Simulação GitFlow):** Utilização de branches separadas para desenvolvimento (`feature/nome-da-feature`).
* **Histórico de Commits Semântico:** Todos os commits seguem o padrão semântico (`feat:`, `fix:`, `style:`).
* **Sistema de Releases:** O projeto será finalizado com a criação de uma tag **`v1.0.0`** (versionamento semântico) no GitHub.
* **Otimização (Documentação):** Instruções para Minificação de código e Compressão de Imagens.

---

## 🛠️ Como Visualizar o Projeto

Para visualizar o projeto completo, basta clonar este repositório e abrir os arquivos HTML diretamente no seu navegador.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/AlinePinhelli/PatasAmigas-ONG](https://github.com/AlinePinhelli/PatasAmigas-ONG)
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd PatasAmigas-ONG
    ```
3.  **Abra os arquivos:**
    * Clique duas vezes em `index.html` ou arraste-o para a aba do seu navegador (Chrome, Firefox, etc.).

---

## 🧑‍💻 Autor

* **Aluno(a):** Aline dos Santos Pinhelli
* **Tecnologia:** HTML5, CSS3, JavaScript
