const html = document.querySelector('html')
const foco = document.querySelector('.app__card-button--foco')
const curto = document.querySelector('.app__card-button--curto')
const longo = document.querySelector('.app__card-button--longo')
const img = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const active = document.querySelectorAll('.app__card-button')
const startPause = document.querySelector('#start-pause')
const musicaFoco = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iconPause = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')


const musica = new Audio('./sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')



let tempoDecorrido = 1500
let intervalo = null


musica.loop = true

musicaFoco.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})


foco.addEventListener ('click', () => {
    tempoDecorrido = 1500
    altContexto('foco')
    foco.classList.add('active')
})

curto.addEventListener ('click', () => {
    tempoDecorrido = 300
    altContexto('descanso-curto')
    curto.classList.add('active')
})

longo.addEventListener ('click', () => {
    tempoDecorrido = 900
    altContexto('descanso-longo')
    longo.classList.add('active')
})

function altContexto(contexto){
    mostrarTempo()
    active.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    img.setAttribute('src', `./imagens/${contexto}.png` )
    switch (contexto) {
        case "foco":
            
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
        case "descanso-curto" :
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong"> Faça uma pausa curta!</strong>`

            break
        case "descanso-longo" :
            titulo.innerHTML = `Hora de volta à superfície. <strong class="app__title-strong"> Faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemR = () => {
    if(tempoDecorrido <= 0) {
  //      audioTempoFinalizado.play()
        alert('Tempo Finalizado') 
        zerar()
        return
    }
    tempoDecorrido -= 1
    mostrarTempo()
}

startPause.addEventListener ('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervalo) {
        audioPause.play();
        zerar()
        return
    }
    audioPlay.play();
    intervalo = setInterval(contagemR, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iconPause.setAttribute('src', `./imagens/pause.png` )
}

function zerar() {
    clearInterval(intervalo)
    iniciarOuPausarBt.textContent = "Começar"
    iconPause.setAttribute('src', `./imagens/play_arrow.png` )
    intervalo = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorrido * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()