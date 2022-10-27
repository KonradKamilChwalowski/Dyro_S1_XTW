const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    renderScene("Start1")
}

function renderScene(Scene_id){
    const Scene = Scenes.find(Scene => Scene.id === Scene_id)
    document.body.style.backgroundImage = Scene.tlo
    textElement.innerText = Scene.text /*ustala tekst okienka*/
    while (optionButtonsElement.firstChild){ /*usuwa guziki*/
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    Scene.options.forEach(option => { /*Tworzy guziki*/
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requierdState == null || option.requierdState(state)
}

function selectOption(option){
    const next_Scene_id = option.nextText
    if(next_Scene_id <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    renderScene(next_Scene_id)
}

const Scenes = [
    {
        id: "Start1",
        text: 'W pogoni za Dy-Roo musisz uważać by go nie spłoszyć - może nie wygląda, ale jednak potrafi być szybki. Właśnie skradacie się wzdłuż holu, uważnie rozglądając się na boki, gdy wtem...',
        tlo: 'url("img/Korytarz.png")',
        options: [
            {
                text: 'Dalej',
                nextText: "Start2"
            }
        ]
    },
    {
        id: "Start2",
        text: 'Kakofonia dźwięków dobiega ze starego bufetu!',
        tlo: 'url("img/Hałas.png")',
        options: [
            {
                text: 'Biegnij do bufetu',
                nextText: "Start3"
            }
        ]
    },
    {
        id: "Start3",
        text: 'Widzisz Dy-Roo plądrującego szafki.',
        tlo: 'url("img/Uśmiech.png")',
        options: [
            {
                text: '"Ktoś tu jest potwornie głodny!" (rozmowa)',
                nextText: "Rozmowa_S"
            },
            {
                text: 'Pan Dyrektor! Uszanowanie! Może zechce Pan kanapkę? (daj prezent)',
                nextText: "Kanapka"
            },
            {
                text: 'Spróbuj podejść bliżej i przygotować się ataku! (skradanie)',
                nextText: "Rozmowa_S"
            },
            {
                text: 'Rzuć się na nieświadomego Dy-Roo z bronią (walka)',
                nextText: "Atak"
            }
        ]
    },
    {
        id: "Rozmowa_S",
        text: 'Skonsternowany Dy-Roo podskakuje w miejscu i obraca się w Waszą stronę. Jest wyraźnie zdziwiony, że Was widzi',
        tlo: 'url("img/Uśmiech.png")',
        options: [
            {
                text: '"Czego tu szukasz poczwaro? Nie wiesz, że bufet nie działa?" (rozmowa)',
                nextText: "Czego_szuka"
            },
            {
                text: '"Chce Pan kanapkę?" (daj prezent)',
                nextText: "Kanapka"
            },
            {
                text: '"Hahaha, taki duży ogr, a boi się uczniów!" (rozmowa)',
                nextText: "Walka"
            },
            {
                text: '"Co taki zdziwiony? Też jesteśmy głodni!" (rozmowa)',
                nextText: "Też_głodni"
            }
        ]
    },
    {
        id: "Czego_szuka",
        text: '"JAK TO <CZEGO SZUKA>? GŁODNY JESTEM! WRRRR!!!"',
        tlo: 'url("img/Atak.png")',
        options: [
            {
                text: '"Chce Pan kanapkę?" (daj prezent)',
                nextText: "Kanapka"
            },
            {
                text: '"To tak samo jak my, może znajdziemy coś razem!" (rozmowa)',
                nextText: "Też_głodni"
            },
            {
                text: '"Może masz ochotę na moją broń?" (walka)',
                nextText: "Walka"
            },
            {
                text: '"Słyszałem, że Pan Chwałowski chowa chipsy w swojej szafce w sali nr 18!" (blef)',
                nextText: "Chipsy"
            }
        ]
    },
    {
        id: "Kanapka",
        text: 'Rzucasz ogry kanapkę, co wyraźnie go cieszy. Widzisz, że jego czujność jest uśpiona.',
        tlo: 'url("img/Uśmiech.png")',
        options: [
            {
                text: '"Ohoho, widzę, że kanapeczka smakuje?" (rozmowa)',
                nextText: "Smakuje?"
            },
            {
                text: 'Zaatakuj teraz, kiedy jest mniej czujny! (walka)',
                nextText: "Atak"
            },
            {
                text: '"Zjadłeś całą? Jak mogłeś? A co dla mnie? Może masz jeszcze ochotę na moją broń?" (walka)',
                nextText: "Atak"
            },
            {
                text: '"Kto by pomyślał, że taki duży stwór naje się jedną kanapką" (rozmowa)',
                nextText: "Nienajedzony"
            }
        ]
    },
    {
        id: "Też_głodni",
        text: '"HAHAHA ŻAŁOSNE! MOŻEMY SZUKAĆ RAZEM, ALE I TAK TO JA ZJEM WSZYSTKO!"',
        tlo: 'url("img/Uśmiech.png")',
        options: [
            {
                text: '"Chce Pan kanapkę?" (daj prezent)',
                nextText: "Kanapka"
            },
            {
                text: '"Sam jesteś żałosny ogrze!" Rzuć się na przeciwnika! (walka)',
                nextText: "Walka"
            },
            {
                text: '"Może masz ochotę na moją broń?" (walka)',
                nextText: "Walka"
            },
            {
                text: '"Słyszałem, że Pan Chwałowski chowa chipsy w swojej szafce w sali nr 18!" (blef)',
                nextText: "Chipsy"
            }
        ]
    },
    {
        id: "Smakuje?",
        text: '"OJ TAAAAAK, SMAKUJE... ALE WIECIE CZEGO MI BRAKOWAŁO W TEJ KANAPCE? KRÓWEK! KOCHAM KRÓWKI. SĄ TAK DOBRE, ŻE JAK JE WIDZĘ TO NIE MOGĘ SIĘ OPANOWAĆ"',
        tlo: 'url("img/Uśmiech.png")',
        options: [
            {
                text: '"Słyszałem, że Pan Chwałowski chowa KRÓWKI w swojej szafce w sali nr 18!" (blef)',
                nextText: "Ucieczka"
            }
        ]
    },
    {
        id: "Chipsy",
        text: '"HAHAHA, MYŚLISZ, ŻE TAKI ŻAŁOSNY BLEF CIĘ URATUJE? PAN KONRAD TO SPORTOWIEC, NIE WIERZĘ, ŻE MOŻE TRZYMAĆ CHIPSY W SALI NR 18!"',
        tlo: 'url("img/Atak.png")',
        options: [
            {
                text: 'Widzisz jak Dy-Roo zaciera ręce i idzie w Twoją stronę. (panikujesz)',
                nextText: "Walka"
            }
        ]
    },
    {
        id: "Atak",
        text: 'Rzucasz się na przeciwnika z bronią, on jednak jest zawsze czujny!',
        tlo: 'url("img/Atak.png")',
        options: [
            {
                text: 'Dalej',
                nextText: "Walka"
            }
        ]
    },
    {
        id: "Nienajedzony",
        text: '"Chyba jesteście śmieszni! Tylko zaostrzyliście mój apetyt! Teraz zjem Was!"',
        tlo: 'url("img/Atak.png")',
        options: [
            {
                text: '"COOO? My Ci daliśmy kanapkę, a Ty..?" (panikujesz)',
                nextText: "Walka"
            }
        ]
    },
    {
        id: "Walka",
        text: 'Dy-Roo szykuje się do skoku na Ciebie? Co robisz?',
        tlo: 'url("img/Atak.png")',
        options: [
            {
                text: 'Wezwij Gesslerową na pomoc! (błogosławieństwo)',
                nextText: "Gessler"
            },
            {
                text: 'Rzuć w Dy-Roo garścią pieprzu! (atak)',
                nextText: "Pieprz"
            },
            {
                text: 'Rzuć w Dy-Roo garścią kuminu! (atak)',
                nextText: "Kumin"
            },
            {
                text: 'Zaatakuj Dy-Roo bronią! (walka)',
                nextText: "Broń"
            }
        ]
    },
    {
        id: "Gessler",
        text: 'Bogini Kuchennych Rewolucji ignoruje Twoje modlitwy. Widać, że nie dajesz napiwków... Dy-Roo skacze na Ciebie i pokonuje bez trudu!',
        tlo: 'url("img/Atak.png")',
        options: [
            {
                text: 'Przegrałeś, zagraj ponownie',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Pieprz",
        text: 'Sypiesz w Dy-Roo pieprzem, ale on tylko dodaje mu siły! "PRZECIEŻ JA KOCHAM PIEPRZ! Dy-Roo skacze na Ciebie i pokonuje bez trudu!',
        tlo: 'url("img/Atak.png")',
        options: [
            {
                text: 'Przegrałeś, zagraj ponownie',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Pieprz",
        text: 'Sypiesz w Dy-Roo kuminem, ale on dmucha na Ciebie! Od kuminu zaczynasz płakać! Dy-Roo skacze na Ciebie i pokonuje bez trudu!',
        tlo: 'url("img/Atak.png")',
        options: [
            {
                text: 'Przegrałeś, zagraj ponownie',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Broń",
        text: 'Atakujesz Dy-Roo obijając mu nos. Niestety tylko rozwścieczasz go bardziej! Dy-Roo skacze na Ciebie i pokonuje bez trudu!',
        tlo: 'url("img/Atak.png")',
        options: [
            {
                text: 'Przegrałeś, zagraj ponownie',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Ucieczka",
        text: 'Ledwo skończyłeś zdanie, a Dy-Roo wybiega. Takiej prędkości jeszcze nie widziałeś, nawet nie ma co go gonić...',
        tlo: 'url("img/Ucieczka.png")',
        options: [
            {
                text: 'Przeżyłeś! Kliknij aby zagrać jeszcze raz!',
                nextText: "Start1"
            }
        ]
    }
]

startGame()