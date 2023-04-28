// Додаємо анімацію Lottie на сайт
const animation = lottie;
const rouletteContainer = document.querySelector('.promo__animation');
const balloonsContainer = document.querySelector('.promo__balloons-left');
const balloonsContainer_2 = document.querySelector('.promo__balloons-right');

animation.loadAnimation({
  container: rouletteContainer,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '../lottie-animations/roulette.json',
});

animation.loadAnimation({
  container: balloonsContainer,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '../lottie-animations/balloons.json',
});

animation.loadAnimation({
  container: balloonsContainer_2,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '../lottie-animations/balloons.json',
});

// Зміна фону меню страви по кліку на неї
let isDiscount = true;
const itemsMenu = document.querySelectorAll('.menu__item');

itemsMenu.forEach((item) => {
  item.addEventListener('click', (event) => {
    const itemDescription = item.querySelector('.menu__description');
    const itemIcon = item.querySelector('.menu__icon');
    const isItemSelected = item.classList.contains('menu__item--selected');

    if (event.target.className === 'discount__cross') {
      deleteDiscount();
      isDiscount = false;
    }

    if (event.target.className.includes('discount')) {
      return;
    }

    item.classList.toggle('menu__item--selected');
    itemDescription.classList.toggle('menu__description--selected');

    if (isItemSelected) {
      itemIcon.firstElementChild.style.display = 'block';
      itemIcon.lastElementChild.style.display = 'none';
    } else {
      itemIcon.firstElementChild.style.display = 'none';
      itemIcon.lastElementChild.style.display = 'block';
    }
  });
});

// Змна фону картки при кліку

const orderBtns = document.querySelectorAll('.order__btn');

orderBtns.forEach((orderBtn) => {
  orderBtn.addEventListener('click', () => {
    const parentElement = orderBtn.parentElement;

    orderBtn.classList.toggle('order__btn--checked');
    parentElement.classList.toggle('order__card--checked');
    parentElement
      .querySelector('.order__title')
      .classList.toggle('order__title--checked');
    parentElement
      .querySelector('.order__price')
      .classList.toggle('order__price--checked');
  });
});

// Рейтинг зірочки.
const orderStars = document.querySelectorAll('.order__star');
let starIndex;

function changeRating(stars) {
  stars.forEach((star) => {
    star.addEventListener('click', () => {
      const parentStar = star.parentElement;

      const parentStars = Array.from(
        parentStar.querySelectorAll('.order__star')
      );

      for (let i = 0; i < parentStars.length; i++) {
        if (star === parentStars[i]) {
          starIndex = i;
        }
      }

      if (
        parentStars[starIndex]
          .querySelector('path')
          .getAttribute('fill-rule') === 'evenodd'
      ) {
        for (; starIndex >= 0; starIndex--) {
          parentStars[starIndex]
            .querySelector('path')
            .setAttribute('fill-rule', 'nonzero');
        }
      } else {
        for (; starIndex < parentStars.length; starIndex++) {
          parentStars[starIndex]
            .querySelector('path')
            .setAttribute('fill-rule', 'evenodd');
        }
      }
    });
  });
}

changeRating(orderStars);

// Додавання Discount при наведенні на меню страви
const menuItems = document.querySelector('.menu__items');
let currentTarget;

menuItems.onmouseover = function (event) {
  const target = event.target;

  if (target.querySelector('.menu__discount')) {
    return;
  }

  if (
    (isDiscount && target.className === 'menu__item') ||
    (target.className === 'menu__item menu__item--selected' && isDiscount)
  ) {
    createDiscount(target);
    currentTarget = target;
  }

  if (this.querySelectorAll('.menu__discount').length > 1) {
    deleteDiscount();
  }
};

function deleteDiscount() {
  document.querySelector('.menu__discount').remove();
}

function createDiscount(target) {
  const discount = document.createElement('div');
  const discountTitle = document.createElement('div');
  const discountForm = document.createElement('form');
  const discountInput = document.createElement('input');
  const discountSubmit = document.createElement('input');
  const discountDescription = document.createElement('div');
  const discountClose = document.createElement('button');
  const discountCross = document.createElement('span');

  discount.classList.add('menu__discount', 'discount', 'discount--size-small');
  discountTitle.classList.add(
    'discount__title',
    'discount__title--font-size-40'
  );
  discountForm.classList.add('discount__form');
  discountForm.action = '#';
  discountForm.method = 'post';
  discountInput.classList.add('discount__input', 'discount__input--size-small');
  discountSubmit.classList.add(
    'discount__submit',
    'discount__submit--size-small'
  );
  discountDescription.classList.add('discount__description');
  discountClose.classList.add('discount__close');
  discountCross.classList.add('discount__cross');

  discountCross.innerHTML = '&times;';
  discountTitle.textContent = '40% Discount';
  discountDescription.textContent = 'Discount code for your first order';

  discountInput.type = 'text';
  discountSubmit.type = 'submit';
  discountSubmit.value = 'Login';

  discount.appendChild(discountTitle);
  discountForm.appendChild(discountInput);
  discountForm.appendChild(discountSubmit);
  discount.appendChild(discountForm);
  discount.appendChild(discountDescription);
  discountClose.appendChild(discountCross);
  discount.appendChild(discountClose);

  target.appendChild(discount);
}

// Carousel
const menuCards = document.querySelector('.menu__cards');
const firstCard = menuCards.querySelectorAll('.menu__card')[0];
const orderCards = document.querySelector('.order__cards');

createCarousel(menuCards);
createCarousel(orderCards);

function createCarousel(carousel) {
  let isDragStart = false;
  let prevPageX;
  let prevScrollLeft;

  const dragStart = (event) => {
    isDragStart = true;
    prevPageX = event.pageX || event.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
  };

  const dragging = (event) => {
    if (!isDragStart) return;

    event.preventDefault();
    carousel.classList.add('dragging');
    let currentPageX = event.pageX || event.touches[0].pageX;
    let positionDiff = currentPageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
  };
  const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove('dragging');
  };

  carousel.addEventListener('mousedown', dragStart);
  carousel.addEventListener('touchstart', dragStart);

  carousel.addEventListener('mousemove', dragging);
  carousel.addEventListener('touchmove', dragging);

  carousel.addEventListener('mouseup', dragStop);
  carousel.addEventListener('touchend', dragStop);
}

// РАндом

const menuBtnLuck = document.querySelector('.menu__btn');
let containerImage = document.querySelector('.promo__img');
const lengthOrderCards = document.querySelectorAll('.order__card').length;

menuBtnLuck.addEventListener('click', () => {
  const randomImg = Math.floor(Math.random() * lengthOrderCards) + 1;

  containerImage.setAttribute('src', `img/menu_${randomImg}.jpg`);
});
