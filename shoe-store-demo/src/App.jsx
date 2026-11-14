import { useMemo, useState } from 'react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Heart, Instagram, Menu, Minus, Plus, Search, ShoppingBag, SlidersHorizontal,
  X, Truck, RotateCcw, ShieldCheck
} from 'lucide-react'

const products = [
  { id: 1, name: 'Cloud Runner', category: 'Кроссовки', type: 'Для города', price: 12990, oldPrice: 15990, color: 'Молочный / серый', tag: 'Бестселлер', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85', sizes: [39,40,41,42,43,44] },
  { id: 2, name: 'Studio 02', category: 'Повседневные', type: 'На каждый день', price: 10990, color: 'Песочный', tag: 'Новинка', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=85', sizes: [39,40,41,42,43] },
  { id: 3, name: 'Track One', category: 'Бег', type: 'Для движения', price: 14990, color: 'Графит', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1000&q=85', sizes: [40,41,42,43,44,45] },
  { id: 4, name: 'Everyday Leather', category: 'Классика', type: 'Новая классика', price: 17990, color: 'Белый', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=85', sizes: [39,40,41,42,43] },
  { id: 5, name: 'Motion 90', category: 'Кроссовки', type: 'Для города', price: 13990, color: 'Серый / белый', tag: 'Выбор команды', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=85', sizes: [40,41,42,43,44] },
  { id: 6, name: 'Soft Form', category: 'Повседневные', type: 'На каждый день', price: 9990, color: 'Светлый беж', image: 'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1000&q=85', sizes: [36,37,38,39,40] },
  { id: 7, name: 'Pace Pro', category: 'Бег', type: 'Для движения', price: 16990, color: 'Чёрный', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=85', sizes: [40,41,42,43,44,45] },
  { id: 8, name: 'Minimal Low', category: 'Классика', type: 'Новая классика', price: 15490, color: 'Молочный', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=85', sizes: [39,40,41,42,43] },
]

const categories = ['Все модели', 'Кроссовки', 'Повседневные', 'Классика', 'Бег']
const money = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₽'

function App() {
  const [category, setCategory] = useState('Все модели')
  const [sort, setSort] = useState('popular')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [selectedSizes, setSelectedSizes] = useState({})
  const [toast, setToast] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [email, setEmail] = useState('')

  const filtered = useMemo(() => {
    let result = products.filter(p => (category === 'Все модели' || p.category === category) && (p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())))
    if (sort === 'cheap') result = [...result].sort((a,b) => a.price-b.price)
    if (sort === 'expensive') result = [...result].sort((a,b) => b.price-a.price)
    return result
  }, [category, query, sort])

  const count = cart.reduce((sum, item) => sum + item.qty, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const notify = message => {
    setToast(message)
    window.clearTimeout(window.__formaToast)
    window.__formaToast = window.setTimeout(() => setToast(''), 2400)
  }

  const addToCart = product => {
    const size = selectedSizes[product.id] || product.sizes[1]
    setCart(current => {
      const existing = current.find(item => item.id === product.id && item.size === size)
      return existing
        ? current.map(item => item.id === product.id && item.size === size ? { ...item, qty: item.qty + 1 } : item)
        : [...current, { ...product, size, qty: 1 }]
    })
    notify(`${product.name} · размер ${size} добавлен в корзину`)
  }

  const changeQty = (id, size, delta) => setCart(current => current
    .map(item => item.id === id && item.size === size ? { ...item, qty: item.qty + delta } : item)
    .filter(item => item.qty > 0))

  const toggleFavorite = id => setFavorites(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id])

  const submitOrder = event => {
    event.preventDefault()
    setCart([])
    setCartOpen(false)
    notify('Заявка оформлена — менеджер скоро свяжется с вами')
  }

  const subscribe = event => {
    event.preventDefault()
    if (!email.trim()) return
    setEmail('')
    notify('Спасибо! Вы подписаны на новости FORMA')
  }

  return (
    <div className="site-shell">
      <div className="topline"><span>Бесплатная доставка от 12 000 ₽</span><span className="topline-right">Новая коллекция уже здесь <ArrowUpRight size={12} /></span></div>
      <header className="header">
        <button className="icon-btn mobile-only" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Открыть меню"><Menu /></button>
        <a className="wordmark" href="#top" aria-label="FORMA — главная">FORMA<span>®</span></a>
        <nav className={mobileMenu ? 'nav nav-open' : 'nav'}>
          <a href="#catalog" onClick={() => setMobileMenu(false)}>Каталог</a>
          <a href="#story" onClick={() => setMobileMenu(false)}>О бренде</a>
          <a href="#advantages" onClick={() => setMobileMenu(false)}>Доставка и возврат</a>
        </nav>
        <div className="header-actions">
          <button className="icon-btn search-trigger" onClick={() => setSearchOpen(!searchOpen)} aria-label="Поиск"><Search /></button>
          <button className="icon-btn favorite-trigger" onClick={() => { setCategory('Все модели'); setQuery(''); document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }); notify(`Избранное: ${favorites.length} моделей`) }} aria-label="Избранное"><Heart />{favorites.length > 0 && <i>{favorites.length}</i>}</button>
          <button className="icon-btn bag-trigger" onClick={() => setCartOpen(true)} aria-label="Корзина"><ShoppingBag />{count > 0 && <i>{count}</i>}</button>
        </div>
      </header>

      {searchOpen && <div className="search-bar"><Search size={18}/><input autoFocus placeholder="Найти свою пару..." value={query} onChange={e => {setQuery(e.target.value); document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'})}}/><button className="icon-btn" onClick={() => {setSearchOpen(false); setQuery('')}}><X size={18}/></button></div>}

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> КОЛЛЕКЦИЯ  /  2026</div>
            <h1>Меньше<br/><em>лишнего.</em><br/>Больше движения.</h1>
            <p className="hero-description">Обувь, в которой комфорт становится привычкой. Чистые линии, продуманные детали и свобода быть собой.</p>
            <div className="hero-buttons"><a className="button button-dark" href="#catalog">Смотреть коллекцию <ArrowUpRight size={16}/></a><a className="text-link" href="#story">Наша философия <ArrowDownRight size={16}/></a></div>
            <div className="hero-note"><span>01 / 03</span><span className="note-line"/><span>Создано для каждого дня</span></div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1500&q=90" alt="Минималистичные светлые кроссовки FORMA" />
            <div className="hero-stamp"><span>FORM</span><strong>F</strong><span>FUNCTION</span></div>
            <div className="hero-caption"><span>DROP  /  001</span><span>Городская серия</span></div>
          </div>
        </section>

        <section className="ticker" aria-label="Преимущества"><div className="ticker-track"><span>ДВИЖЕНИЕ БЕЗ ЛИШНЕГО</span><b>✳</b><span>ПРОДУМАННЫЙ КОМФОРТ</span><b>✳</b><span>СВОБОДА КАЖДОГО ШАГА</span><b>✳</b><span>ДВИЖЕНИЕ БЕЗ ЛИШНЕГО</span><b>✳</b><span>ПРОДУМАННЫЙ КОМФОРТ</span><b>✳</b></div></section>

        <section className="catalog section-wrap" id="catalog">
          <div className="section-heading">
            <div><div className="eyebrow">ПОДОБРАНО ДЛЯ ТЕБЯ</div><h2>Найди свою <em>форму.</em></h2></div>
            <p>Универсальные модели на каждый день —<br/>от первого шага до последнего маршрута.</p>
          </div>
          <div className="catalog-toolbar">
            <div className="category-tabs">{categories.map(item => <button key={item} className={category === item ? 'category-tab active' : 'category-tab'} onClick={() => setCategory(item)}>{item}</button>)}</div>
            <label className="sort-select"><SlidersHorizontal size={15}/><select value={sort} onChange={e => setSort(e.target.value)}><option value="popular">Сначала популярные</option><option value="cheap">Сначала дешевле</option><option value="expensive">Сначала дороже</option></select><ChevronDown size={14}/></label>
          </div>
          <div className="product-grid">
            {filtered.map((product, index) => <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <img src={product.image} alt={product.name} loading="lazy"/>
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <button className={favorites.includes(product.id) ? 'product-favorite is-favorite' : 'product-favorite'} onClick={() => toggleFavorite(product.id)} aria-label="Добавить в избранное"><Heart size={17} fill={favorites.includes(product.id) ? 'currentColor' : 'none'}/></button>
                <button className="quick-add" onClick={() => addToCart(product)}>В корзину <Plus size={15}/></button>
              </div>
              <div className="product-meta"><div><h3>{product.name}</h3><span>{product.type} · {product.color}</span></div><strong>{money(product.price)}</strong></div>
              <div className="product-bottom"><div className="size-list">{product.sizes.slice(0,5).map(size => <button key={size} className={selectedSizes[product.id] === size ? 'size-chip selected' : 'size-chip'} onClick={() => setSelectedSizes(old => ({...old,[product.id]:size}))}>{size}</button>)}</div><span className="size-caption">RU</span></div>
              {product.oldPrice && <span className="old-price">{money(product.oldPrice)}</span>}
            </article>)}
          </div>
          {filtered.length === 0 && <div className="empty-state">Ничего не найдено. Попробуйте изменить запрос.</div>}
          <div className="catalog-foot"><span>Показано {filtered.length} из {products.length} моделей</span><button className="text-link" onClick={() => {setCategory('Все модели');setQuery('');setSort('popular')}}>Сбросить фильтры <X size={14}/></button></div>
        </section>

        <section className="manifesto section-wrap" id="story">
          <div className="manifesto-image"><img src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85" alt="Обувь в минималистичном стиле"/></div>
          <div className="manifesto-copy"><div className="eyebrow">МЕНЬШЕ, НО ЛУЧШЕ</div><h2>Хороший дизайн<br/>не требует <em>шума.</em></h2><p>Мы верим, что вещи должны работать на тебя. Поэтому в основе каждой модели — понятная форма, качественные материалы и внимание к тому, что действительно важно.</p><a className="text-link" href="#catalog">Выбрать свою пару <ArrowUpRight size={16}/></a><div className="manifesto-index">F / 001</div></div>
        </section>

        <section className="benefits section-wrap" id="advantages">
          <div className="eyebrow">СЕРВИС FORMA</div><div className="benefit-grid">
            <div className="benefit"><Truck size={22}/><h3>Доставка без забот</h3><p>Бережно доставим заказ в удобный пункт выдачи или курьером.</p></div>
            <div className="benefit"><RotateCcw size={22}/><h3>Лёгкий возврат</h3><p>14 дней на обмен или возврат, если пара не подошла.</p></div>
            <div className="benefit"><ShieldCheck size={22}/><h3>Проверенное качество</h3><p>Контроль материалов, посадки и каждой детали.</p></div>
          </div>
        </section>

        <section className="newsletter">
          <div><div className="eyebrow">ПИСЬМА ПО ДЕЛУ</div><h2>Будь в <em>форме.</em></h2><p>Новые коллекции, небольшие тиражи и идеи для движения.</p></div>
          <form className="newsletter-form" onSubmit={subscribe}><label htmlFor="email">ТВОЯ ЭЛЕКТРОННАЯ ПОЧТА</label><div><input id="email" type="email" required placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)}/><button type="submit" aria-label="Подписаться"><ArrowUpRight/></button></div><small>Никакого спама. Только важное.</small></form>
        </section>
      </main>

      <footer className="footer"><a className="wordmark footer-mark" href="#top">FORMA<span>®</span></a><span className="footer-copy">© 2026 FORMA. Концепт интернет-магазина.</span><div className="footer-links"><a href="#catalog">Каталог</a><a href="#story">О бренде</a><a href="mailto:hello@forma.store">Контакты</a><a href="#top" aria-label="Instagram"><Instagram size={17}/></a></div></footer>

      {cartOpen && <div className="overlay" onMouseDown={e => {if(e.target === e.currentTarget) setCartOpen(false)}}><aside className="cart-drawer"><div className="drawer-head"><div><span className="eyebrow">ТВОЙ ВЫБОР</span><h2>Корзина <sup>{count}</sup></h2></div><button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Закрыть"><X/></button></div>
        {cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={34}/><h3>Пока здесь пусто</h3><p>Добавь пару, которая подходит твоему ритму.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Перейти в каталог</button></div> : <>
          <div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id+'-'+item.size}><img src={item.image} alt={item.name}/><div className="cart-item-info"><strong>{item.name}</strong><span>Размер {item.size} · {item.color}</span><b>{money(item.price)}</b><div className="qty-control"><button onClick={() => changeQty(item.id,item.size,-1)} aria-label="Уменьшить"><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => changeQty(item.id,item.size,1)} aria-label="Увеличить"><Plus size={13}/></button></div></div><button className="remove-item" onClick={() => changeQty(item.id,item.size,-item.qty)} aria-label="Удалить"><X size={15}/></button></div>)}</div>
          <form className="checkout" onSubmit={submitOrder}><div className="checkout-total"><span>Итого</span><strong>{money(total)}</strong></div><p>Доставка рассчитывается при подтверждении заказа.</p><button className="button button-dark full-button" type="submit">Оформить заказ <ArrowUpRight size={16}/></button><small>Демонстрационная форма — заказ не отправляется в реальную систему.</small></form>
        </>}
      </aside></div>}
      {toast && <div className="toast"><Check size={16}/>{toast}</div>}
    </div>
  )
}

export default App
