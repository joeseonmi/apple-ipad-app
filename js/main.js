import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'


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
const searchInputEl = searchWrapEl.querySelector('input')
const searchAutoCompletesEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  animateHeaderMenu()
  showAutocompletes()
  setTimeout(function () {
    searchInputEl.focus()
  }, 600)
}

function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  animateHeaderMenu()
  hideAutocompletes()
  searchInputEl.value = ''
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

//요소의 가시성 관찰

const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
});

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (infoEl) {
  io.observe(infoEl);
});


//비디오 재생
//버튼 찾아서 클릭이벤트 넣고 클릭하면 하이드?, 비디오도?
const playEl = document.querySelector('.stage .controller--play')
const pauseEl = document.querySelector('.stage .controller--pause')
const videoEl = document.querySelector('.stage video')

playEl.addEventListener('click', function () {
  //누르면 비디오 플레이되고, 일시정지버튼 보여야됨
  videoEl.play()
  playEl.classList.add('hide')
  pauseEl.classList.remove('hide')
});

pauseEl.addEventListener('click', function () {
  //누르면 비디오 정지되고, 재생버튼 보여야됨
  videoEl.pause()
  pauseEl.classList.add('hide')
  playEl.classList.remove('hide')
});

// '당신에게 맞는 iPad는?' 렌더링
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`
  })
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})

const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')
  // div 만들고 map 클래스 추가함
  let mapList = ''
  
  nav.maps.forEach(function (map) {
    mapList += `<li><a href="${map.url}">${map.name}</a></li>`
  })

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `
  navigationsEl.append(mapEl)
})

const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()
