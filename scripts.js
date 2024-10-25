const link = './data.json'

// container btns
const profileData = document.querySelector('.profile-data')

// obtener datos de json
const fetchData = async () => {
    const response = await fetch(link)
    const data = await response.json()
    return data
}

// insertar datos en cards
const insertData = async (btns, containerCards) => {
    const data = await fetchData()

    // limpiar cards en caso de cambiar de filtro
    const cards = containerCards.querySelectorAll('.card')
    cards.forEach(card => card.remove())
    
    // document fragment para insertar cards
    const fragment = document.createDocumentFragment() 
    for(i = 0; i < data.length; i++) {

        // crear article con clase card
        const article = document.createElement('article')
        article.classList.add('card')

        let lastComparison = ''
        if(btns.toLowerCase() === 'daily') {
            lastComparison = 'Day'
        }else if(btns.toLowerCase() === 'weekly') {
            lastComparison = 'Week'
        }else if(btns.toLowerCase() === 'monthly') {
            lastComparison = 'Month'
        }
        // insertar contenido en article
        article.innerHTML += `
            <div class="card-detail">
                <div class="detail-type">
                    <h3>${data[i].title}</h3>
                    <div class="detail-img">
                        <img src="./images/icon-ellipsis.svg" alt="ellipsis" title="ellipsis">
                    </div>
                </div>
                <div class="detail-hrs">
                    <h1>${data[i]['timeframes'][btns.toLowerCase()].current}hrs</h1>
                    <p>Last ${lastComparison} - ${data[i]['timeframes'][btns.toLowerCase()].previous}hrs</p>
                </div>
            </div>
        `


        // añadir animación de aparición
        article.style.opacity = 0;
        article.style.transform = 'translateY(20px)';
        setTimeout(() => {
            article.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            article.style.opacity = 1;
            article.style.transform = 'translateY(0)';
        }, (i+1) * 50);

        // añadir a fragment
        fragment.appendChild(article)
        // añadir animación de aparición
        
    }

    // insertar fragment en container
    containerCards.appendChild(fragment)
}

// cargar datos de json al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
    const btns = document.querySelectorAll('.profile-data .weekly-info button')
    let btnData
    const containerCards = document.querySelector('.dashboard')

    for (let i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains('active')) {
            btnData = btns[i].textContent
        }
    }


    insertData(btnData, containerCards)
})

// asignar clase active a boton presionado
profileData.addEventListener('click', (e) => {
    const containerCards = document.querySelector('.dashboard')

    // si el elemento presionado es un boton
    if(e.target.tagName === ('BUTTON')) {
        const buttons = profileData.querySelectorAll('button');
        buttons.forEach(button => {
            if (button !== e.target) {
                button.classList.remove('active');
            }
        });
        e.target.classList.add('active')
        insertData(e.target.textContent, containerCards)
    }
})