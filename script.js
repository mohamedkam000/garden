    const cities = [
      {id:'khartoum',name:'Khartoum',img:'https://images.unsplash.com/photo-1659864216522-494efbd76895?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2hhcnRvdW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=1200',price:'$1,200'},
      {id:'jazeera',name:'Al-Jazeera',img:'https://www.alnilin.com/wp-content/uploads/2023/09/madani_kush-780x470.jpg',price:'$940'},
      {id:'rivernile',name:'River Nile',img:'https://www.sudanakhbar.com/wp-content/uploads/2024/10/445.jpg',price:'$780'},
      {id:'nsudan',name:'Northern Sudan',img:'https://sudanjournal.com/wp-content/uploads/2021/01/a1bd13c5fc813f0c17a64c8d52265180.jpg',price:'$1,050'},
      {id:'rsea',name:'Red Sea',img:'https://i0.wp.com/arabscountries.com/wp-content/uploads/2022/11/The-Red-Sea-1.jpg',price:'$1,430'},
      {id:'kassala',name:'Kassala',img:'https://saqraljidyanews.com/wp-content/uploads/2020/08/d6e7a4bc43ae7ef56f2bcf0bb6571f6e.jpg',price:'$1,120'},
      {id:'sinnar',name:'Sinnar',img:'https://kushnews.net/wp-content/uploads/2023/09/sinnar_kush.jpg',price:''}
    ];

/*const altCities = [
  {id:'prt',name:'Port Sudan',img:'https://www.midad.com/storage/posts/June2022/R5XQELzA1K3e5jHCZtx9.jpg',price:'$980'},
  {id:'atb',name:'Atbara',img:'https://upload.wikimedia.org/wikipedia/commons/3/39/Atbara_River_Sudan.jpg',price:'$860'},
  {id:'don',name:'Dongola',img:'https://sudanile.com/wp-content/uploads/2022/07/Dongola-1.jpg',price:'$1,030'}
];*/

    const accents = [
  '#06b6d4','#6366f1','#ef4444','#f59e0b','#10b981','#8b5cf6','#ec4899','#f97316',
  '#22c55e','#0ea5e9','#ef5350','#a78bfa','#fb7185','#60a5fa','#34d399','#f43f5e',
  '#f87171','#4ade80','#60a5fa','#facc15','#c084fc','#f472b6','#38bdf8','#f97316',
  '#22c55e','#6366f1','#f43f5e','#3b82f6','#84cc16','#e879f9','#fbbf24','#10b981',
  '#7c3aed','#f87171','#2dd4bf','#fcd34d','#e11d48','#6366f1','#f97316','#22d3ee',
  '#16a34a','#f59e0b','#8b5cf6','#f472b6','#0ea5e9','#ea580c','#4ade80','#f43f5e',
  '#60a5fa','#db2777','#22c55e','#fcd34d','#9333ea','#f87171'
    ];

    const cardsGrid = document.getElementById('cardsGrid');
    const gridView = document.getElementById('gridView');
    const detailView = document.getElementById('detailView');
    const detailContent = document.getElementById('detailContent');

    const savedAccent = localStorage.getItem('accentColor');
    if(savedAccent) setAccent(savedAccent);

function randomAccent(){
  return accents[Math.floor(Math.random()*accents.length)];
}

function setAccent(hex){
  document.documentElement.style.setProperty('--accent', hex);
}

    document.getElementById('titleColored').addEventListener('click', ()=>setAccent(randomAccent()));

    function renderCards(){
      cardsGrid.innerHTML = '';
      cities.forEach(c => {
        const el = document.createElement('article');
        el.className = 'card';
        el.tabIndex = 0;
        el.innerHTML = `
          <div class="img" style="background-image:url('${c.img}')"></div>
          <div class="title-band">
            <div style="display:flex;flex-direction:column">
              <div class="city">${c.name}</div>
              <div class="desc">Select city to track average prices</div>
            </div>
            <div class="price">${c.price}</div>
          </div>
          <div class="meta">
            <div class="desc">Sample overview • updated recently</div>
          </div>`;
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.textContent = 'Alpha';
        el.appendChild(tag);
        el.addEventListener('click', ()=>navigateTo('city/'+c.id));
        el.addEventListener('keypress', (e)=>{ if(e.key==='Enter') navigateTo('city/'+c.id); });
        cardsGrid.appendChild(el);
      });
    }

    function navigateTo(path, opts={push:true}){
      if(opts.push) history.pushState({path}, '', path);
      if(path==='/'||path===''||path==='/index.html') showGrid();
/*      else if(path==='/page.html/') showAltGrid();*/
      else if(path.startsWith('city/')){
        const id=path.split('city/')[1];
        const city=cities.find(x=>x.id===id)||cities[0];
        showDetails(city);
      } else showGrid();
    }

/*function renderAltCards(){
  cardsGrid.innerHTML = '';
  altCities.forEach(c => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <div class="img" style="background-image:url('${c.img}')"></div>
      <div class="title-band">
        <div class="city">${c.name}</div>
        <div class="price">${c.price}</div>
      </div>`;
    el.addEventListener('click', ()=>alert('Clicked: '+c.name));
    cardsGrid.appendChild(el);
  });
}

function showAltGrid(){
  detailView.classList.add('hidden');
  gridView.classList.remove('hidden');
  document.title = 'Sooq Price — Extra';
  renderAltCards();
}*/

function showGrid(){
  detailView.classList.add('hidden');
  gridView.classList.remove('hidden');
  document.title='Sooq Price';
}

function showDetails(city) {
  fetch(`city/${city.id}.html`)
    .then(res => res.text())
    .then(html => {
      detailView.innerHTML = html;
      gridView.classList.add('hidden');
      detailView.classList.remove('hidden');
      document.title = city.name + ' — Price Tracker';
    })
    .catch(() => {
      detailView.innerHTML = `<h2>${city.name}</h2><p>No custom page found.</p>`;
    });
}

/*    function showDetails(city){
      gridView.classList.add('hidden');detailView.classList.remove('hidden');
      detailContent.innerHTML = `<h2>${city.name}</h2><p class="desc">Tracking average market prices for ${city.name}.</p><div style="height:240px;background-image:url('${city.img}');background-size:cover;border-radius:12px;margin-top:12px"></div><div style="margin-top:12px;display:flex;gap:12px;align-items:center"><div class="price">Current: ${city.price}</div><button class="btn" onclick=\"alert('testing pop-up dialogues ${city.name}')\">Track</button></div>`;
      document.title = city.name+' — Price Tracker';
    }*/

    setInterval(() => {
      document.querySelectorAll('.letter').forEach((span, i) => {
        span.style.color = accents[Math.floor(Math.random() * accents.length)];
      });
    }, 2000);
    document.body.setAttribute("data-theme", "light");

    document.getElementById('backBtn').addEventListener('click',()=>navigateTo('/',{push:true}));
    window.addEventListener('popstate',()=>navigateTo(location.pathname,{push:false}));

    renderCards();
    navigateTo(location.pathname,{push:false});

    const titleText = 'Sooq Price';
    const titleColored = document.getElementById('titleColored');
    titleText.split('').forEach((ch,i)=>{
      const span = document.createElement('span');
      span.className='letter';
      span.style.color = accents[i % accents.length];
      span.textContent = ch;
      titleColored.appendChild(span);
    });







/*
 * This is the footer. Don't worry about it and go fix something else.
 * Seriously, stay away.
 */

const fooText = 'Muhammad Kamal';
const fooColored = document.getElementById('footer');
fooText.split('').forEach((ch,i)=>{
  const span = document.createElement('span');
  span.className='letter';
  span.style.color = accents[i % accents.length];
  span.textContent = ch;
  fooColored.appendChild(span);
});

const footer = document.getElementById('footer');

function updateFooter() {
  footer.innerHTML = `<div style="color: var(--accent);">Copyright © 2025 Muhammad Kamal</div>`;
}

updateFooter();

const dateEl = document.getElementById('date');

function updateDate() {
  const now = new Date();
  const date = now.toLocaleDateString();
  dateEl.textContent = date;
}

updateDate();
setInterval(updateDate, 86400000);