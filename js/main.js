//장바구니
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function(event) {
  event.stopPropagation();
  const isShow = basketEl.classList.contains('show');
  if (isShow) {
    //hide
    hideBasket();
  } else {
    //show
    showBasket();
  }
});

basketEl.addEventListener('click', function(event) {
  // 바스켓 영역을 선택해도 전파되지않게 이벤트 추가
  event.stopPropagation();
});

window.addEventListener('click', function () {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add('show');
}

function hideBasket() {
  basketEl.classList.remove('show');
}

// 검색!
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchAutoCompletesEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  animateHeaderMenu()
  showAutocompletes()
}

function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  animateHeaderMenu()
  hideAutocompletes()
}

function animateHeaderMenu() {
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = `${index * .4 / headerMenuEls.length}s`
  })
}

function showAutocompletes() {
  searchAutoCompletesEls.forEach(function (el, index) {
    el.style.transitionDelay = `${index * .4 / searchAutoCompletesEls.length}s`
  })
}

function hideAutocompletes() {
  searchAutoCompletesEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = `${index * .4 / searchAutoCompletesEls.length}s`
  })
  searchAutoCompletesEls.reverse()
}
