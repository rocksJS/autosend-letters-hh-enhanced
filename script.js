function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Добавил константы для дилея

let minimalDelay = 200;
let maximumDelay = 450;

async function init() {
  var vacancies = document.querySelectorAll('[data-qa="vacancy-serp__vacancy_response"]');
  var vacancy = document.querySelector('[data-qa="vacancy-response-link-top"]');
  var i = 0;

  // Функция для автоматического выбора резюме
  function selectResume() {
    var resume = document.querySelector('#resume_f8e8ff1bff0beb25fa0039ed1f4a5a58724c31');
    var message = document.querySelector('[data-qa="vacancy-response-letter-toggle"]');

    if (!message) {
      resume.click();
    } else {
      resume.click();
      message.click();
    }
  }

  // Функция для автоматической отправки Сопроводительного письма
  function handlerCoverLetter() {
    // Шаблон Сопроводительного письма
    var vacancyTitle = document.querySelector('.bloko-modal-header_outlined > div').textContent;
    var vacancyName = vacancyTitle.slice(1, vacancyTitle.length - 1);
    var messagesData = {
      frontend: `... some text`,
    };

    var messageArea = document.querySelector(
      '[data-qa="vacancy-response-popup-form-letter-input"]'
    );
    messageArea.value = '';
    messageArea.value = messagesData.frontend;

    // Добавить изменения в поле текста
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', true, true);
    messageArea.dispatchEvent(evt);

    // Отправить отклик
    var btnSubmit = document.querySelector('[data-qa="vacancy-response-submit-popup"]');
    btnSubmit.click();
  }

  // Функция для получения кнопки "Все равно откликнуться"

  function clickConfirmCountry() {
    const button = document.querySelector(
      'button.bloko-button.bloko-button_kind-success.bloko-button_scale-small[data-qa="relocation-warning-confirm"]'
    );
    if (button) {
      button.click();
    }
  }

  // Вызвать функцию на странице с вакансией
  if (vacancy) {
    vacancy.click();

    await delay(maximumDelay);
    clickConfirmCountry();

    await delay(maximumDelay);
    selectResume();

    await delay(minimalDelay);
    handlerCoverLetter();
  }
  // Иначе вызвать функцию на странице со списком вакансий
  else {
    while (i <= vacancies.length) {
      vacancies[i].click();

      // Тут должна быть проверка на появление кнопки с последующим нажатием если она есть
      await delay(maximumDelay);
      clickConfirmCountry();

      await delay(maximumDelay);
      selectResume();

      await delay(minimalDelay);
      handlerCoverLetter();
      i++;

      await delay(maximumDelay);
    }
  }
}

// Добавить на панель доп. функционал
(async function addNavLinks() {
  await delay(maximumDelay);

  const navLinks = document.querySelectorAll(
    '.supernova-navi-item.supernova-navi-item_lvl-2.supernova-navi-item_no-mobile'
  );

  const itemLetters = document.createElement('div');

  function createElement(item, attribute, title) {
    item.classList.add(
      'supernova-navi-item',
      'supernova-navi-item_lvl-2',
      'supernova-navi-item_no-mobile'
    );

    item.innerHTML = `
    <a
      data-qa="mainmenu_vacancyResponses"
      class="supernova-link"
      ${attribute}
    >
      ${title}
    </a>
    <div class="supernova-navi-underline">${title}</div>
    `;
  }

  createElement(itemLetters, 'handler-letters', 'Отправить отклики');

  navLinks[2].append(itemLetters);
  document.querySelector('[handler-letters]').addEventListener('click', init);
})();
