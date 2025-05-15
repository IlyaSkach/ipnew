document.addEventListener("DOMContentLoaded", function () {
  // Мобильное меню
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenuPanel = document.querySelector(".mobile-menu-panel");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenuLinks = document.querySelectorAll(
    ".mobile-menu-panel .menu a"
  );
  const mainNav = document.querySelector(".main-nav");
  const contactInfo = document.querySelector(".contact-info");

  function openMobileMenu() {
    mobileMenuButton.classList.add("open");
    mobileMenuPanel.classList.add("active");
    mobileMenuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeMobileMenu() {
    mobileMenuButton.classList.remove("open");
    mobileMenuPanel.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (mobileMenuButton && mobileMenuPanel && mobileMenuOverlay) {
    mobileMenuButton.addEventListener("click", function () {
      if (mobileMenuPanel.classList.contains("active")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
    mobileMenuOverlay.addEventListener("click", closeMobileMenu);
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  // Закрытие меню при клике на ссылку (только на мобильных)
  document.querySelectorAll(".main-nav .menu a").forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 992) {
        mobileMenuButton.classList.remove("open");
        mainNav.classList.remove("open");
        contactInfo.classList.remove("open");
      }
    });
  });

  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Закрываем мобильное меню при клике на ссылку
        if (mainNav.classList.contains("open")) {
          mainNav.classList.remove("open");
          mobileMenuButton.classList.remove("open");
          contactInfo.classList.remove("open");
        }
      }
    });
  });

  // Анимация появления элементов при прокрутке
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Добавляем классы для анимации
  document
    .querySelectorAll(".service-card, .advantage-card, .document-item")
    .forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });

  // Добавляем стили для анимации
  const style = document.createElement("style");
  style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(style);

  // Обработка модального окна политики конфиденциальности
  const privacyPolicyModal = document.getElementById("privacy-policy-modal");
  const privacyPolicyLinks = document.querySelectorAll(
    'a[onclick="showPrivacyPolicyModal()"]'
  );
  const closeButtons = document.querySelectorAll(".close-button");

  window.showPrivacyPolicyModal = function () {
    if (privacyPolicyModal) {
      privacyPolicyModal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  };

  function closePrivacyPolicyModal() {
    if (privacyPolicyModal) {
      privacyPolicyModal.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  // Добавляем обработчики событий
  privacyPolicyLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showPrivacyPolicyModal();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closePrivacyPolicyModal);
  });

  // Закрытие модального окна при клике вне его содержимого
  if (privacyPolicyModal) {
    privacyPolicyModal.addEventListener("click", function (e) {
      if (e.target === privacyPolicyModal) {
        closePrivacyPolicyModal();
      }
    });
  }

  // Закрытие модального окна при нажатии Escape
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      privacyPolicyModal &&
      privacyPolicyModal.style.display === "block"
    ) {
      closePrivacyPolicyModal();
    }
  });

  // Документы для отображения
  const documents = [
    {
      name: "Приказ от 26.10.2020 №707 (Критерии аккредитации)",
      path: "document/Приказ%20от%2026_10_2020%20N%20707%20Об%20утверждении%20критериев%20аккредитации%20и%20перечня%20документов,..._Текст.pdf",
    },
    {
      name: "Приказ от 25.01.2019 №11 (Область аккредитации)",
      path: "document/Приказ%20от%2025_01_2019%20N%2011%20Об%20утверждении%20методических%20рекомендаций%20по%20описанию%20области%20аккредитации..._Текст.pdf",
    },
    {
      name: "Приказ от 13.06.2019 №106 (Методические рекомендации)",
      path: "document/Приказ%20от%2013_06_2019%20N%20106%20Об%20утверждении%20методических%20рекомендаций%20по%20описанию%20области..._Текст.pdf",
    },
    {
      name: "Приказ от 09.01.2020 №1 (Формы сведений)",
      path: "document/Приказ%20от%2009_01_2020%20N%201%20О%20формах%20сведений%20о%20соответствии%20аккредитованных%20в%20национальной%20системе..._Текст.pdf",
    },
    {
      name: "ГОСТ Р ИСО/МЭК 17065-2012",
      path: "document/ГОСТ%20Р%20ИСОМЭК%2017065-2012%20Оценка%20соответствия.%20Требования%20к%20органам%20по%20сертификации%20продукции,..._Текст.pdf",
    },
    {
      name: "ГОСТ ISO/IEC 17025-2019",
      path: "document/ГОСТ%20ISOIEC%2017025-2019%20Общие%20требования%20к%20компетентности%20испытательных%20и%20калибровочных%20лабораторий..._Текст.pdf",
    },
    {
      name: "Приказ от 16.08.2021 №496 (Формы заявлений)",
      path: "document/Приказ%20от%2016_08_2021%20N%20496%20Об%20утверждении%20форм%20заявления%20об%20аккредитации,%20заявления%20о%20расширении..._Текст.pdf",
    },
    {
      name: "Положение о составе сведений (ред.)",
      path: "document/Об%20утверждении%20Положения%20о%20составе%20сведений%20о%20результатах%20деятельности%20аккредитованных%20лиц,%20об..._Текст%20редакции%20(1).pdf",
    },
    {
      name: "Закон от 28.12.2013 №412-ФЗ",
      path: "document/Закон%20от%2028_12_2013%20N%20412-ФЗ%20Об%20аккредитации%20в%20национальной%20системе%20аккредитации%20(с%20изменениями%20на..._Текст.pdf",
    },
    {
      name: "Решение от 05.12.2018 №100",
      path: "document/Решение%20от%2005_12_2018%20N%20100%20О%20Порядке%20включения%20аккредитованных%20органов%20по%20оценке%20соответствия%20(в..._Текст.pdf",
    },
  ];

  const container = document.querySelector(".documents-container");
  if (container) {
    documents.forEach((doc) => {
      const item = document.createElement("div");
      item.className = "document-item";
      item.innerHTML = `
        <div class="document-icon">
          <div class="document-front">
            <i class="fas fa-file-pdf"></i>
          </div>
          <div class="document-back">
            <i class="fas fa-eye"></i>
          </div>
        </div>
        <div class="document-title">${doc.name}</div>
      `;
      item.addEventListener("click", () => {
        window.open(doc.path, "_blank");
      });
      container.appendChild(item);
    });
  }
});

window.addEventListener("resize", function () {
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mainNav = document.querySelector(".main-nav");
  const contactInfo = document.querySelector(".contact-info");
  if (window.innerWidth > 768) {
    if (mobileMenuButton) mobileMenuButton.classList.remove("open");
    if (mainNav) mainNav.classList.remove("open");
    if (contactInfo) contactInfo.classList.remove("open");
  }
});
