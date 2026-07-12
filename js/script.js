/* ==========================================================================
   SUMONTEC - Serviços Especializados de Engenharia Ltda
   Arquivo JavaScript principal (ES6+)
   - Avatar chat com typing effect
   - Expansão de cards de serviços
   - Menu lateral expansível
   - Carrossel de clientes
   - Formulário de contato com validação e WhatsApp
   - Botão flutuante WhatsApp
   - Animações de scroll
   - Menu mobile
   ========================================================================== */

(() => {
  'use strict';

  /* ========================================================================
     1. DADOS DA APLICAÇÃO
     ======================================================================== */

  // Lista de serviços (7 serviços)
  const SERVICES = [
    {
      key: 'estruturas',
      title: 'Estruturas Metálicas',
      description: 'Projeto, fabricação e montagem',
      keywords: ['estruturas metálicas', 'galpões', 'mezaninos'],
      details: [
        'Projeto estrutural completo',
        'Fabricação sob medida',
        'Montagem especializada',
        'Galpões e mezaninos'
      ]
    },
    {
      key: 'projetos',
      title: 'Concreto Armado',
      description: 'Projetos estruturais',
      keywords: ['concreto armado'],
      details: [
        'Cálculo estrutural',
        'Detalhamento de armaduras',
        'Dimensionamento de lajes',
        'Emissão de ART'
      ]
    },
    {
      key: 'projetos',
      title: 'Instalações Elétricas',
      description: 'Projetos BT',
      keywords: ['elétricas'],
      details: [
        'Projetos de baixa tensão',
        'Dimensionamento de carga',
        'Adequação à NBR 5410',
        'Laudo técnico'
      ]
    },
    {
      key: 'pisos',
      title: 'Pisos Industriais',
      description: 'Projeto e execução',
      keywords: ['pisos'],
      details: [
        'Pisos de concreto armado',
        'Revestimentos poliméricos',
        'Recuperação de pisos',
        'Juntas de dilatação'
      ]
    },
    {
      key: 'estruturas',
      title: 'Fabricação e Montagem',
      description: 'Galpões / Mezaninos',
      keywords: ['fabricação', 'montagem'],
      details: [
        'Fabricação de estruturas',
        'Montagem industrial',
        'Galpões pré-moldados',
        'Mezaninos metálicos'
      ]
    },
    {
      key: 'pisos',
      title: 'Pisos (Reforma)',
      description: 'Implantação e reforma',
      keywords: ['pisos', 'reforma'],
      details: [
        'Reforma de pisos existentes',
        'Regularização de superfícies',
        'Tratamento de juntas',
        'Impermeabilização'
      ]
    },
    {
      key: 'energia',
      title: 'Energia Fotovoltaica',
      description: 'Sistemas solares',
      keywords: ['fotovoltaica', 'solar'],
      details: [
        'Projeto de sistema solar',
        'Instalação de painéis',
        'Dimensionamento de inversores',
        'Economia em energia'
      ]
    }
  ];

  // Lista de clientes
  const CLIENTS = [
    'Construtora Alfa',
    'Indústria Beta',
    'Metalúrgica Delta',
    'Tech Solutions',
    'Green Energy',
    'Logística Total',
    'Engenharia Sigma',
    'Grupo Ômega'
  ];

  // Mensagens do avatar com triggers e ações
  const AVATAR_MESSAGES = [
    {
      text: 'Sejam bem-vindos à SUMONTEC - Serviços Especializados de Engenharia Ltda.',
      triggers: [],
      action: null
    },
    {
      text:
        'A SUMONTEC é uma empresa 100% nacional, e fornece uma gama de soluções para pisos de concreto, revestimentos poliméricos (pintura) e recuperação de pisos industriais. Na SUMONTEC você receberá a qualidade e o serviço que você espera de uma empresa especializada em desenvolvimento de projetos e aplicação de pisos industriais, nos mais diversos segmentos de indústria e comércio. Nós fazemos isso com responsabilidade, e trabalhamos com estreita colaboração com sua empresa, para garantir que as soluções que oferecemos sejam adaptadas para atender às suas necessidades e desafios únicos. Contando com corpo técnico altamente qualificado, experiente e dedicado às áreas de engenharia Industrial, somos resultado de mais de duas décadas de atuação nestes segmentos, onde participamos de eventos de pequeno, médio e grande porte, e projetos diversos em empresas de notoriedade nacional e internacional. Estamos orgulhosos em atendê-los, e trabalhamos duro para concretizar nossos objetivos.',
      triggers: [],
      action: null
    },
    {
      text:
        'Nos últimos 25 anos nossa equipe técnica se especializou em: Projeto, construção e recuperação de pisos industriais; Projetos e Instalações de sistemas de energia fotovoltaica; Projeto, fabricação e montagem de estruturas metálicas (Galpões); Projetos de engenharia em Instalações elétricas, cálculo de concreto armado; Instalações elétricas e hidráulicas e incorporação de edifícios',
      triggers: [
        { keyword: 'pisos', cardKey: 'pisos' },
        { keyword: 'fotovoltaica', cardKey: 'energia' },
        { keyword: 'estruturas metálicas', cardKey: 'estruturas' },
        { keyword: 'elétricas', cardKey: 'projetos' },
        { keyword: 'concreto', cardKey: 'projetos' },
        { keyword: 'incorporação', cardKey: 'incorporações' }
      ],
      action: null
    },
    {
      text: 'Esperamos poder tê-los em nossa galeria de clientes em breve',
      triggers: [],
      action: 'pointToClients'
    }
  ];

  // Número de WhatsApp da empresa (formato internacional, somente dígitos)
  const WHATSAPP_NUMBER = '5511999999999'; // Substituir pelo número real
  const WHATSAPP_DEFAULT_MESSAGE = 'Olá SUMONTEC! Gostaria de mais informações sobre os serviços de engenharia.';

  /* ========================================================================
     2. UTILITÁRIOS
     ======================================================================== */

  /**
   * Seleciona um elemento no DOM.
   * @param {string} selector
   * @param {ParentNode} [context=document]
   * @returns {Element|null}
   */
  const $ = (selector, context = document) => context.querySelector(selector);

  /**
   * Seleciona múltiplos elementos no DOM.
   * @param {string} selector
   * @param {ParentNode} [context=document]
   * @returns {Element[]}
   */
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  /**
   * Cria um elemento HTML a partir de uma string.
   * @param {string} html
   * @returns {Element}
   */
  const createElement = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  };

  /**
   * Realiza scroll suave até um elemento.
   * @param {Element|string} target
   */
  const smoothScrollTo = (target) => {
    const element = typeof target === 'string' ? $(target) : target;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /**
   * Debounce para limitar a frequência de execução.
   * @param {Function} fn
   * @param {number} delay
   * @returns {Function}
   */
  const debounce = (fn, delay = 200) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  /* ========================================================================
     3. RENDERIZAÇÃO DE SERVIÇOS
     ======================================================================== */

  /**
   * Renderiza os cards de serviços no container.
   */
  const renderServiceCards = () => {
    const container = $('#services-grid');
    if (!container) return;

    const cardsHTML = SERVICES.map((service, index) => `
      <article class="service-card fade-in-up" data-service-key="${service.key}" data-service-index="${index}">
        <div class="service-card__header">
          <h3 class="service-card__title">${service.title}</h3>
          <p class="service-card__description">${service.description}</p>
        </div>
        <div class="service-card__details">
          <h4>Itens inclusos:</h4>
          <ul>
            ${service.details.map((detail) => `<li>${detail}</li>`).join('')}
          </ul>
        </div>
        <button class="service-card__btn" data-action="open-menu" data-service-index="${index}">
          Ver menu
        </button>
      </article>
    `).join('');

    container.innerHTML = cardsHTML;

    // Adiciona evento de clique em cada card para abrir o menu
    $$('.service-card', container).forEach((card) => {
      card.addEventListener('click', (e) => {
        // Evita conflito com o botão interno
        if (e.target.dataset.action === 'open-menu') {
          openSideMenu();
          return;
        }
        openSideMenu();
      });
    });
  };

  /* ========================================================================
     4. EXPANSÃO DE CARDS
     ======================================================================== */

  /**
   * Expande um card de serviço por 3 segundos.
   * Adiciona a classe .expanded e a remove após o timeout.
   * @param {string} serviceKey - Chave do serviço (pisos, energia, estruturas, projetos, incorporações)
   */
  const expandCard = (serviceKey) => {
    const cards = $$(`.service-card[data-service-key="${serviceKey}"]`);
    if (cards.length === 0) return;

    cards.forEach((card) => {
      card.classList.add('expanded');
      setTimeout(() => {
        card.classList.remove('expanded');
      }, 3000);
    });
  };

  // Expondo globalmente para debug/integração
  window.expandCard = expandCard;

  /* ========================================================================
     5. MENU LATERAL EXPANSÍVEL
     ======================================================================== */

  /**
   * Cria e injeta o menu lateral no DOM.
   */
  const createSideMenu = () => {
    const menuHTML = `
      <div class="side-menu-overlay" id="side-menu-overlay"></div>
      <aside class="side-menu" id="side-menu">
        <div class="side-menu__header">
          <h2>Nossos Serviços</h2>
          <button class="side-menu__close" id="side-menu-close" aria-label="Fechar menu">&times;</button>
        </div>
        <nav class="side-menu__nav">
          <ul class="side-menu__list">
            ${SERVICES.map((service, index) => `
              <li class="side-menu__item">
                <a href="#service-card-${index}" data-service-index="${index}" class="side-menu__link">
                  <span class="side-menu__number">${String(index + 1).padStart(2, '0')}</span>
                  <span class="side-menu__text">
                    <strong>${service.title}</strong>
                    <small>${service.description}</small>
                  </span>
                </a>
              </li>
            `).join('')}
          </ul>
        </nav>
      </aside>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);

    // Adiciona IDs aos cards para ancoragem
    $$('.service-card').forEach((card, index) => {
      card.id = `service-card-${index}`;
    });

    // Eventos do menu
    const overlay = $('#side-menu-overlay');
    const closeBtn = $('#side-menu-close');
    const menu = $('#side-menu');

    if (overlay) overlay.addEventListener('click', closeSideMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeSideMenu);

    // Click nos links do menu -> scroll suave
    $$('.side-menu__link', menu).forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(link.dataset.serviceIndex, 10);
        const card = $(`#service-card-${index}`);
        closeSideMenu();
        setTimeout(() => {
          smoothScrollTo(card);
          // Destaque breve no card
          if (card) {
            card.classList.add('expanded');
            setTimeout(() => card.classList.remove('expanded'), 3000);
          }
        }, 300);
      });
    });
  };

  /**
   * Abre o menu lateral.
   */
  const openSideMenu = () => {
    const menu = $('#side-menu');
    const overlay = $('#side-menu-overlay');
    if (menu) menu.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  /**
   * Fecha o menu lateral.
   */
  const closeSideMenu = () => {
    const menu = $('#side-menu');
    const overlay = $('#side-menu-overlay');
    if (menu) menu.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ========================================================================
     6. CARROSSEL DE CLIENTES
     ======================================================================== */

  /**
   * Renderiza o carrossel de clientes com duplicação para efeito infinito.
   */
  const renderClientsCarousel = () => {
    const track = $('#clients-track');
    if (!track) return;

    // Duplica o array para efeito contínuo
    const duplicatedClients = [...CLIENTS, ...CLIENTS];

    track.innerHTML = duplicatedClients
      .map(
        (client) => `
        <div class="client-item">
          <div class="client-item__logo">
            <span>${client.charAt(0)}</span>
          </div>
          <p class="client-item__name">${client}</p>
        </div>
      `
      )
      .join('');
  };

  /* ========================================================================
     7. AVATAR CHAT COM TYPING EFFECT
     ======================================================================== */

  const AvatarChat = {
    // Estado interno
    isOpen: false,
    currentMessageIndex: 0,
    isTyping: false,
    typingTimer: null,
    autoPlayTimer: null,
    fullText: '',
    displayedChars: 0,

    // Elementos DOM
    elements: {},

    /**
     * Inicializa o avatar chat.
     */
    init() {
      this.createAvatarDOM();
      this.cacheElements();
      this.bindEvents();
      this.renderProgressDots();
      this.updateNavigationButtons();
    },

    /**
     * Cria a estrutura HTML do avatar e balão de chat.
     */
    createAvatarDOM() {
      const avatarHTML = `
        <div class="avatar-container" id="avatar-container">
          <button class="avatar-button" id="avatar-button" aria-label="Abrir chat do avatar">
            <div class="avatar-icon">
              <svg viewBox="0 0 100 100" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" fill="#1a5276" stroke="#f39c12" stroke-width="3"/>
                <circle cx="50" cy="38" r="16" fill="#f39c12"/>
                <path d="M 20 85 Q 50 60 80 85 L 80 95 L 20 95 Z" fill="#f39c12"/>
              </svg>
            </div>
            <span class="avatar-badge" id="avatar-badge">!</span>
          </button>

          <div class="avatar-bubble" id="avatar-bubble">
            <div class="avatar-bubble__header">
              <span class="avatar-bubble__title">SUMONTEC</span>
              <button class="avatar-bubble__close" id="avatar-close" aria-label="Fechar balão">&times;</button>
            </div>
            <div class="avatar-bubble__body" id="avatar-bubble-body">
              <p class="avatar-bubble__text" id="avatar-text"></p>
              <span class="avatar-bubble__cursor" id="avatar-cursor">|</span>
            </div>
            <div class="avatar-bubble__progress" id="avatar-progress"></div>
            <div class="avatar-bubble__controls">
              <button class="avatar-btn avatar-btn--prev" id="avatar-prev" aria-label="Mensagem anterior">
                &larr; Anterior
              </button>
              <button class="avatar-btn avatar-btn--menu" id="avatar-menu-btn">
                Ver menu
              </button>
              <button class="avatar-btn avatar-btn--next" id="avatar-next" aria-label="Próxima mensagem">
                Próxima &rarr;
              </button>
            </div>
            <button class="avatar-btn avatar-btn--close" id="avatar-close-btn">Fechar</button>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', avatarHTML);
    },

    /**
     * Cacheia os elementos do DOM.
     */
    cacheElements() {
      this.elements = {
        container: $('#avatar-container'),
        button: $('#avatar-button'),
        badge: $('#avatar-badge'),
        bubble: $('#avatar-bubble'),
        body: $('#avatar-bubble-body'),
        text: $('#avatar-text'),
        cursor: $('#avatar-cursor'),
        progress: $('#avatar-progress'),
        prev: $('#avatar-prev'),
        next: $('#avatar-next'),
        menuBtn: $('#avatar-menu-btn'),
        close: $('#avatar-close'),
        closeBtn: $('#avatar-close-btn')
      };
    },

    /**
     * Vincula os eventos aos elementos.
     */
    bindEvents() {
      const { button, close, prev, next, menuBtn, closeBtn } = this.elements;

      // Abrir/fechar balão ao clicar no avatar
      button.addEventListener('click', () => this.toggleBubble());

      // Botão fechar (X no header)
      close.addEventListener('click', () => this.closeBubble());

      // Botão fechar (botão inferior)
      closeBtn.addEventListener('click', () => this.closeBubble());

      // Navegação anterior
      prev.addEventListener('click', () => this.goToMessage(this.currentMessageIndex - 1));

      // Navegação próxima
      next.addEventListener('click', () => this.goToMessage(this.currentMessageIndex + 1));

      // Botão "Ver menu" abre o menu lateral
      menuBtn.addEventListener('click', () => {
        openSideMenu();
      });
    },

    /**
     * Alterna a visibilidade do balão.
     */
    toggleBubble() {
      if (this.isOpen) {
        this.closeBubble();
      } else {
        this.openBubble();
      }
    },

    /**
     * Abre o balão de chat.
     */
    openBubble() {
      this.isOpen = true;
      this.elements.bubble.classList.add('open');
      this.elements.button.classList.add('active');
      if (this.elements.badge) {
        this.elements.badge.style.display = 'none';
      }

      // Inicia a digitação da mensagem atual
      this.startTyping(this.currentMessageIndex);
      this.startAutoPlay();
    },

    /**
     * Fecha o balão de chat.
     */
    closeBubble() {
      this.isOpen = false;
      this.elements.bubble.classList.remove('open');
      this.elements.button.classList.remove('active');
      this.stopTyping();
      this.stopAutoPlay();
    },

    /**
     * Inicia o efeito de digitação para uma mensagem.
     * @param {number} index
     */
    startTyping(index) {
      this.stopTyping();

      const message = AVATAR_MESSAGES[index];
      if (!message) return;

      this.currentMessageIndex = index;
      this.fullText = message.text;
      this.displayedChars = 0;
      this.isTyping = true;

      this.elements.text.textContent = '';
      this.elements.cursor.style.display = 'inline';

      // Velocidade de digitação (ms por caractere)
      const typingSpeed = 25;

      const typeNextChar = () => {
        if (this.displayedChars < this.fullText.length) {
          this.elements.text.textContent = this.fullText.substring(0, this.displayedChars + 1);
          this.displayedChars++;
          this.typingTimer = setTimeout(typeNextChar, typingSpeed);
        } else {
          // Digitação concluída
          this.isTyping = false;
          this.onTypingComplete(message);
        }
      };

      typeNextChar();
      this.updateProgressDots();
      this.updateNavigationButtons();
    },

    /**
     * Interrompe a digitação atual.
     */
    stopTyping() {
      if (this.typingTimer) {
        clearTimeout(this.typingTimer);
        this.typingTimer = null;
      }
      this.isTyping = false;
    },

    /**
     * Callback executado quando a digitação de uma mensagem termina.
     * Processa triggers e ações da mensagem.
     * @param {object} message
     */
    onTypingComplete(message) {
      // Processa triggers (expande cards correspondentes)
      if (message.triggers && message.triggers.length > 0) {
        const lowerText = message.text.toLowerCase();

        message.triggers.forEach((trigger) => {
          const keyword = trigger.keyword.toLowerCase();
          if (lowerText.includes(keyword)) {
            // Pequeno delay para sincronizar com a leitura
            setTimeout(() => {
              expandCard(trigger.cardKey);
            }, 500);
          }
        });
      }

      // Processa ação especial
      if (message.action === 'pointToClients') {
        this.pointToClients();
      }
    },

    /**
     * Aponta o avatar para o carrossel de clientes e faz scroll suave.
     */
    pointToClients() {
      const avatar = this.elements.container;
      if (avatar) {
        avatar.classList.add('pointing');
        // Remove a classe após 5 segundos
        setTimeout(() => {
          avatar.classList.remove('pointing');
        }, 5000);
      }

      // Scroll suave até o carrossel
      const carousel = $('#clients-section') || $('#clients-carousel');
      if (carousel) {
        setTimeout(() => {
          smoothScrollTo(carousel);
        }, 1000);
      }
    },

    /**
     * Navega para uma mensagem específica.
     * @param {number} index
     */
    goToMessage(index) {
      // Valida limites (wrap-around circular)
      if (index < 0) index = AVATAR_MESSAGES.length - 1;
      if (index >= AVATAR_MESSAGES.length) index = 0;

      this.startTyping(index);
      this.restartAutoPlay();
    },

    /**
     * Inicia o auto-play (muda a mensagem a cada 8 segundos).
     */
    startAutoPlay() {
      this.stopAutoPlay();
      this.autoPlayTimer = setInterval(() => {
        if (this.isOpen && !this.isTyping) {
          const nextIndex = (this.currentMessageIndex + 1) % AVATAR_MESSAGES.length;
          this.startTyping(nextIndex);
        }
      }, 8000);
    },

    /**
     * Reinicia o auto-play.
     */
    restartAutoPlay() {
      this.stopAutoPlay();
      this.startAutoPlay();
    },

    /**
     * Interrompe o auto-play.
     */
    stopAutoPlay() {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
    },

    /**
     * Renderiza os indicadores de progresso (bolinhas).
     */
    renderProgressDots() {
      const { progress } = this.elements;
      if (!progress) return;

      progress.innerHTML = AVATAR_MESSAGES.map(
        (_, index) =>
          `<span class="progress-dot" data-index="${index}" ${index === 0 ? 'class="progress-dot active"' : ''}></span>`
      )
        .map((html, index) =>
          html.replace(
            'class="progress-dot"',
            `class="progress-dot${index === 0 ? ' active' : ''}"`
          )
        )
        .join('');

      // Eventos de clique nas bolinhas
      $$('.progress-dot', progress).forEach((dot) => {
        dot.addEventListener('click', () => {
          const index = parseInt(dot.dataset.index, 10);
          this.goToMessage(index);
        });
      });
    },

    /**
     * Atualiza o estado visual dos indicadores de progresso.
     */
    updateProgressDots() {
      const { progress } = this.elements;
      if (!progress) return;

      $$('.progress-dot', progress).forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentMessageIndex);
      });
    },

    /**
     * Atualiza o estado (disabled) dos botões de navegação.
     */
    updateNavigationButtons() {
      const { prev, next } = this.elements;
      if (prev) prev.disabled = false; // Sempre habilitado (wrap-around)
      if (next) next.disabled = false;
    }
  };

  /* ========================================================================
     8. FORMULÁRIO DE CONTATO
     ======================================================================== */

  const ContactForm = {
    // Expressão regular para validação de email
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Elementos do formulário
    elements: {},

    /**
     * Inicializa o formulário de contato.
     */
    init() {
      this.cacheElements();
      if (!this.elements.form) return;
      this.bindEvents();
      this.populateServiceSelect();
    },

    /**
     * Cacheia os elementos do formulário.
     */
    cacheElements() {
      this.elements = {
        form: $('#contact-form'),
        name: $('#contact-name'),
        email: $('#contact-email'),
        service: $('#contact-service'),
        message: $('#contact-message'),
        submitBtn: $('#contact-submit'),
        nameError: $('#contact-name-error'),
        emailError: $('#contact-email-error'),
        messageError: $('#contact-message-error')
      };
    },

    /**
     * Popula o select de serviços com os dados da aplicação.
     */
    populateServiceSelect() {
      const { service } = this.elements;
      if (!service) return;

      const options = SERVICES.map(
        (svc) => `<option value="${svc.title}">${svc.title}</option>`
      ).join('');

      service.insertAdjacentHTML('beforeend', options);
    },

    /**
     * Vincula os eventos de validação e envio.
     */
    bindEvents() {
      const { name, email, message, form } = this.elements;

      // Validação em tempo real (blur)
      if (name) name.addEventListener('blur', () => this.validateName());
      if (email) email.addEventListener('blur', () => this.validateEmail());
      if (message) message.addEventListener('blur', () => this.validateMessage());

      // Limpa erro ao digitar
      if (name) name.addEventListener('input', () => this.clearError('name'));
      if (email) email.addEventListener('input', () => this.clearError('email'));
      if (message) message.addEventListener('input', () => this.clearError('message'));

      // Envio do formulário
      if (form) form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    /**
     * Valida o campo nome (>= 3 caracteres).
     * @returns {boolean}
     */
    validateName() {
      const { name, nameError } = this.elements;
      if (!name) return true;

      const value = name.value.trim();

      if (value.length < 3) {
        this.showError('name', 'O nome deve ter pelo menos 3 caracteres.');
        return false;
      }

      this.clearError('name');
      return true;
    },

    /**
     * Valida o campo email (regex).
     * @returns {boolean}
     */
    validateEmail() {
      const { email, emailError } = this.elements;
      if (!email) return true;

      const value = email.value.trim();

      if (!this.emailRegex.test(value)) {
        this.showError('email', 'Por favor, informe um email válido.');
        return false;
      }

      this.clearError('email');
      return true;
    },

    /**
     * Valida o campo mensagem (>= 10 caracteres).
     * @returns {boolean}
     */
    validateMessage() {
      const { message, messageError } = this.elements;
      if (!message) return true;

      const value = message.value.trim();

      if (value.length < 10) {
        this.showError('message', 'A mensagem deve ter pelo menos 10 caracteres.');
        return false;
      }

      this.clearError('message');
      return true;
    },

    /**
     * Exibe uma mensagem de erro para um campo.
     * @param {string} field
     * @param {string} message
     */
    showError(field, message) {
      const errorEl = this.elements[`${field}Error`];
      const inputEl = this.elements[field];

      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
      }
      if (inputEl) {
        inputEl.classList.add('invalid');
        inputEl.classList.remove('valid');
      }
    },

    /**
     * Limpa a mensagem de erro de um campo.
     * @param {string} field
     */
    clearError(field) {
      const errorEl = this.elements[`${field}Error`];
      const inputEl = this.elements[field];

      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
      if (inputEl) {
        inputEl.classList.remove('invalid');
        inputEl.classList.add('valid');
      }
    },

    /**
     * Manipula o envio do formulário.
     * @param {Event} e
     */
    handleSubmit(e) {
      e.preventDefault();

      // Valida todos os campos
      const isNameValid = this.validateName();
      const isEmailValid = this.validateEmail();
      const isMessageValid = this.validateMessage();

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        return;
      }

      // Coleta os dados do formulário
      const name = this.elements.name.value.trim();
      const email = this.elements.email.value.trim();
      const service = this.elements.service.value || 'serviços de engenharia';
      const message = this.elements.message.value.trim();

      // Prepara a mensagem para o WhatsApp
      const whatsappMessage = `Olá SUMONTEC! Meu nome é ${name}, email ${email}, gostaria de informações sobre ${service}. Mensagem: ${message}`;

      // Codifica a mensagem para URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Redireciona para o WhatsApp
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      // Abre o WhatsApp em nova aba
      window.open(whatsappUrl, '_blank');

      // Reseta o formulário
      this.elements.form.reset();
      ['name', 'email', 'message'].forEach((field) => this.clearError(field));
    }
  };

  /* ========================================================================
     9. BOTÃO FLUTUANTE WHATSAPP
     ======================================================================== */

  /**
   * Cria e inicializa o botão flutuante do WhatsApp.
   */
  const initWhatsAppFloat = () => {
    const whatsappHTML = `
      <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}"
         class="whatsapp-float"
         id="whatsapp-float"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Falar no WhatsApp">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    `;
    document.body.insertAdjacentHTML('beforeend', whatsappHTML);
  };

  /* ========================================================================
     10. ANIMAÇÕES DE SCROLL (Intersection Observer)
     ======================================================================== */

  /**
   * Inicializa o Intersection Observer para animar elementos .fade-in-up.
   */
  const initScrollAnimations = () => {
    const elements = $$('.fade-in-up');
    if (elements.length === 0) return;

    // Fallback para navegadores sem IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Opcional: parar de observar após animar
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));
  };

  /**
   * Adiciona sombra ao header durante o scroll.
   */
  const initHeaderShadow = () => {
    const header = $('#header') || $('header');
    if (!header) return;

    const handleScroll = debounce(() => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Estado inicial
  };

  /* ========================================================================
     11. MENU MOBILE (HAMBURGER)
     ======================================================================== */

  /**
   * Inicializa o menu mobile com hamburger.
   */
  const initMobileMenu = () => {
    const toggle = $('#mobile-menu-toggle') || $('.hamburger');
    const nav = $('#mobile-nav') || $('.mobile-nav') || $('nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    // Smooth scroll para links de navegação
    $$('a[href^="#"]', nav).forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          smoothScrollTo(href);

          // Fecha o menu mobile após clicar
          toggle.classList.remove('active');
          nav.classList.remove('open');
          document.body.classList.remove('menu-open');
        }
      });
    });
  };

  /* ========================================================================
     12. SMOOTH SCROLL GLOBAL PARA LINKS DE NAVEGAÇÃO
     ======================================================================== */

  /**
   * Inicializa smooth scroll para todos os links de navegação com href="#...".
   */
  const initSmoothScrollLinks = () => {
    $$('a[href^="#"]').forEach((link) => {
      // Evita duplicar links já tratados pelo menu mobile
      if (link.closest('#side-menu') || link.closest('.mobile-nav')) return;

      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.length > 1) {
          const target = $(href);
          if (target) {
            e.preventDefault();
            smoothScrollTo(target);
          }
        }
      });
    });
  };

  /* ========================================================================
     13. INICIALIZAÇÃO PRINCIPAL
     ======================================================================== */

  /**
   * Inicializa todos os módulos quando o DOM estiver pronto.
   */
  const init = () => {
    // Renderização de conteúdo dinâmico
    renderServiceCards();
    renderClientsCarousel();

    // Criação de elementos injetados no DOM
    createSideMenu();
    initWhatsAppFloat();

    // Inicialização de módulos interativos
    AvatarChat.init();
    ContactForm.init();

    // Animações e navegação
    initScrollAnimations();
    initHeaderShadow();
    initMobileMenu();
    initSmoothScrollLinks();

    // Reobserva novos elementos fade-in-up adicionados dinamicamente
    setTimeout(() => {
      const newElements = $$('.fade-in-up:not(.visible)');
      if ('IntersectionObserver' in window && newElements.length > 0) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 }
        );
        newElements.forEach((el) => observer.observe(el));
      }
    }, 100);

    // Log de inicialização
    console.log('%cSUMONTEC - Site inicializado com sucesso!', 'color: #1a5276; font-weight: bold; font-size: 14px;');
  };

  /* ========================================================================
     14. BOOTSTRAP
     ======================================================================== */

  // Aguarda o DOM estar completamente carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();