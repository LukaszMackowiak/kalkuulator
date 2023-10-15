const liczby - document.querySelectorAll('.liczba')
const znaki - document.querySelectorAll('.znak')
const wyczysc = document.querySelector('.wyczysc')
const wynikPoprzednie - document.querySelectorAll('.poprzednie')
const wynikAktualne - document.querySelectorAll('.aktualne')

let aktualneDzial = ''
let poprzednieDzial = ''
let operacja = undefined

const oblicz = () => {
    let dzialanie
    if(!poprzednieDzial || !aktualneDzial){
        return
    }

    const poprzednie = parseFloat(poprzednieDzial)
    const aktualne = parseFloat(aktualneDzial)

    if(isNaN(poprzednie) || isNaN(aktualne)) {
        return
    }

    switch (operacja) {
        case "+":
            dzialanie = poprzednie + aktualne
            break;
        case "-":
            dzialanie = poprzednie - aktualne
            break;
        case "*":
            dzialanie = poprzednie * aktualne
            break;
        case "/":
            if(aktualne === 0){
                wyczyscWynik()
                return
            }
            dzialanie = poprzednie / aktualne
            break;
        case "√":
            dzialanie = Math.pow(poprzednie, 1/aktualne)
            break;
        case "%":
            dzialanie = poprzednie / 100 * aktualne
            break;
        case "^":
            dzialanie = Math.pow(poprzednie, aktualne)
            break;
        case 'log':
            dzialanie = Math.log(poprzednie) / Math.log(aktualne)
            break;
        default:
            return
    }

    aktualneDzial = dzialanie
    operacja = undefined
    poprzednieDzial = ''

}

const wyborZnaku = (znak) => {
    if(aktualneDzial === ''){
        return
    }
    if(poprzednieDzial !== ''){
        const poprzednie = wynikPoprzednie.innerText
        if(aktualneDzial.toString() === '0' && poprzednie[poprzednie.length-1] === '/'){
            wyczyscWynik()
            return
        }
        oblicz()
    }
    operacja = znak
    poprzednieDzial = aktualneDzial
    aktualneDzial = ''
}

const aktualWynik = () => {
    wynikAktualne.innerText = aktualneDzial
    if(operacja != null) {
        wynikPoprzednie.innerText = poprzednieDzial + operacja
    } else {
        wynikPoprzednie.innerText = ''
    }
}

const dodajLiczbe = (liczba) => {
    if(liczba === "."){
        if(aktualneDzial.includes('.')){
            return
        }
        liczba = '.'
    }
    aktualneDzial = aktualneDzial.toString() + liczba.toString()
}

/* const usunLiczbe = () => {
    aktualneDzial = aktualneDzial.toString().slice(0,-1)
} */

const wyczyscWynik = () => {
    aktualneDzial = ''
    poprzednieDzial = ''
    operacja = undefined
}

liczby.forEach((liczba) => {
    liczba.addEventListener('click', () => {
        dodajLiczbe(liczba.innerText)
        aktualWynik()
    })
})

znaki.forEach((znak) => {
    znak.addEventListener('click', () => {
        wyborZnaku(znak.innerText)
        aktualWynik()
    })
});

wynik.addEventListener('click', () => {
    oblicz()
    aktualWynik()
})

wyczysc.addEventListener('click', () => {
    wyczyscWynik()
    aktualWynik()
})