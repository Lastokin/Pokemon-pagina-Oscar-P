const TYPE_COLORS = {
    normal: { name: 'Normal', color: '#A8A77A' },
    fire: { name: 'Fuego', color: '#EE8130' },
    water: { name: 'Agua', color: '#6390F0' },
    electric: { name: 'Electrico', color: '#F7D02C' },
    grass: { name: 'Planta', color: '#7AC74C' },
    ice: { name: 'Hielo', color: '#96D9D6' },
    fighting: { name: 'Lucha', color: '#C22E28' },
    poison: { name: 'Veneno', color: '#A33EA1' },
    ground: { name: 'Tierra', color: '#E2BF65' },
    flying: { name: 'Volador', color: '#A98FF3' },
    psychic: { name: 'Psiquico', color: '#F95587' },
    bug: { name: 'Bicho', color: '#A6B91A' },
    rock: { name: 'Roca', color: '#B6A136' },
    ghost: { name: 'Fantasma', color: '#735797' },
    dragon: { name: 'Dragon', color: '#6F35FC' },
    steel: { name: 'Acero', color: '#B7B7CE' },
    fairy: { name: 'Hada', color: '#D685AD' },
    dark: { name: 'Siniestro', color: '#705746' }
};

const ABILITY_TRANSLATIONS = {
    'overgrow': 'Espesura',
    'chlorophyll': 'Clorofila',
    'blaze': 'Mar Llamas',
    'solar-power': 'Poder Solar',
    'torrent': 'Torrente',
    'rain-dish': 'Cura Lluvia',
    'shield-dust': 'Polvo Escudo',
    'run-away': 'Fuga',
    'shed-skin': 'Mudar',
    'compound-eyes': 'Ojo Compuesto',
    'tinted-lens': 'Cromolente',
    'swarm': 'Enjambre',
    'sniper': 'Francotirador',
    'keen-eye': 'Vista Lince',
    'guts': 'Agallas',
    'static': 'Electricidad Estatica',
    'lightning-rod': 'Pararrayos',
    'sand-veil': 'Velo Arena',
    'poison-point': 'Punto Toxico',
    'cute-charm': 'Gran Encanto',
    'magic-guard': 'Muro Magico',
    'flash-fire': 'Absorbe Fuego',
    'levitate': 'Levitacion',
    'synchronize': 'Sincronia',
    'pressure': 'Presion',
    'thick-fat': 'Sebo',
    'immunity': 'Inmunidad',
    'adaptability': 'Adaptable'
};

const POKEMON_BACKUP = [
    {
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        types: ['electric'],
        abilities: ['static', 'lightning-rod'],
        description: 'Cuando se enfada descarga energia de sus mejillas',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
    },
    {
        id: 4,
        name: 'charmander',
        height: 6,
        weight: 85,
        types: ['fire'],
        abilities: ['blaze', 'solar-power'],
        description: 'La llama de su cola indica su fuerza vital',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
    },
    {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        types: ['grass', 'poison'],
        abilities: ['overgrow', 'chlorophyll'],
        description: 'Lleva una semilla en su lomo desde que nace',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
    },
    {
        id: 7,
        name: 'squirtle',
        height: 5,
        weight: 90,
        types: ['water'],
        abilities: ['torrent', 'rain-dish'],
        description: 'Dispara chorros de agua a gran presion',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png'
    },
    {
        id: 94,
        name: 'gengar',
        height: 15,
        weight: 405,
        types: ['ghost', 'poison'],
        abilities: ['levitate'],
        description: 'Se oculta en las sombras de la noche',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png'
    },
    {
        id: 133,
        name: 'eevee',
        height: 3,
        weight: 65,
        types: ['normal'],
        abilities: ['run-away', 'adaptability'],
        description: 'Puede evolucionar a multiples formas diferentes',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png'
    },
    {
        id: 143,
        name: 'snorlax',
        height: 21,
        weight: 4600,
        types: ['normal'],
        abilities: ['immunity', 'thick-fat'],
        description: 'Come 400 kg diarios y duerme casi todo el dia',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png'
    },
    {
        id: 150,
        name: 'mewtwo',
        height: 20,
        weight: 1220,
        types: ['psychic'],
        abilities: ['pressure'],
        description: 'Fue creado mediante ingenieria genetica avanzada',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png'
    }
];

const CONFIG = {
    TOTAL_POKEMON: 151,
    COIN_REWARD: 10,
    COIN_PENALTY: 5,
    INITIAL_COINS: 0,
    AUTO_NEXT_SECONDS: 3
};

let allPokemonCatalog = [];
let currentTarget = null;
let currentOptions = [];
let isRoundActive = true;
let countdownTimer = null;
let soundEnabled = true;

const dom = {
    coins: document.getElementById('coins-count'),
    streak: document.getElementById('streak-count'),
    diffBadge: document.getElementById('difficulty-badge'),
    audioBtn: document.getElementById('audio-toggle-btn'),
    resetBtn: document.getElementById('reset-stats-btn'),
    imageLoader: document.getElementById('image-loader'),
    pokedexTag: document.getElementById('pokedex-tag'),
    pokemonImg: document.getElementById('pokemon-img'),
    clueTypes: document.getElementById('clue-types'),
    clueHeight: document.getElementById('clue-height'),
    clueWeight: document.getElementById('clue-weight'),
    clueAbilities: document.getElementById('clue-abilities'),
    clueDescription: document.getElementById('clue-description'),
    itemType: document.getElementById('clue-item-type'),
    itemHeight: document.getElementById('clue-item-height'),
    itemWeight: document.getElementById('clue-item-weight'),
    itemAbility: document.getElementById('clue-item-ability'),
    optionsContainer: document.getElementById('options-container'),
    resultBanner: document.getElementById('result-banner'),
    resultText: document.getElementById('result-text'),
    btnNext: document.getElementById('btn-next'),
    timerText: document.getElementById('timer-text'),
    floatingContainer: document.getElementById('floating-container')
};

let audioCtx = null;
function getAudioContext() {
    if (!audioCtx) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) audioCtx = new AudioClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playSound(type) {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        if (type === 'victory') {
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.09);
                gain.gain.setValueAtTime(0, now + idx * 0.09);
                gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.09 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.25);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + idx * 0.09);
                osc.stop(now + idx * 0.09 + 0.26);
            });
        } else if (type === 'defeat') {
            [330, 260, 195].forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, now + idx * 0.12);
                gain.gain.setValueAtTime(0.18, now + idx * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.18);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + idx * 0.12);
                osc.stop(now + idx * 0.12 + 0.2);
            });
        } else if (type === 'coin') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(987.77, now);
            osc.frequency.setValueAtTime(1318.51, now + 0.08);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'click') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(550, now);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.05);
        }
    } catch (e) {
        console.warn('Audio no disponible', e);
    }
}

function getCoins() {
    const val = localStorage.getItem('oscar_pokedolares');
    return val !== null ? parseInt(val, 10) : CONFIG.INITIAL_COINS;
}

function setCoins(val) {
    const amount = Math.max(0, val);
    localStorage.setItem('oscar_pokedolares', amount);
    if (dom.coins) dom.coins.textContent = amount;
}

function getStreak() {
    const val = localStorage.getItem('oscar_streak');
    return val !== null ? parseInt(val, 10) : 0;
}

function setStreak(val) {
    const amount = Math.max(0, val);
    localStorage.setItem('oscar_streak', amount);
    if (dom.streak) dom.streak.textContent = amount;
    applyDifficulty(amount);
}

function applyDifficulty(streak) {
    if (streak >= 9) {
        if (dom.diffBadge) dom.diffBadge.textContent = 'Dificultad Experto';
        if (dom.itemHeight) dom.itemHeight.style.display = 'none';
        if (dom.itemWeight) dom.itemWeight.style.display = 'none';
        if (dom.itemAbility) dom.itemAbility.style.display = 'none';
        if (dom.itemType) dom.itemType.style.display = 'none';
        if (isRoundActive) dom.pokemonImg.style.visibility = 'hidden';
    } else if (streak >= 6) {
        if (dom.diffBadge) dom.diffBadge.textContent = 'Dificultad Dificil';
        if (dom.itemHeight) dom.itemHeight.style.display = 'none';
        if (dom.itemWeight) dom.itemWeight.style.display = 'none';
        if (dom.itemAbility) dom.itemAbility.style.display = 'none';
        if (dom.itemType) dom.itemType.style.display = 'none';
        dom.pokemonImg.style.visibility = 'visible';
    } else if (streak >= 3) {
        if (dom.diffBadge) dom.diffBadge.textContent = 'Dificultad Media';
        if (dom.itemHeight) dom.itemHeight.style.display = 'none';
        if (dom.itemWeight) dom.itemWeight.style.display = 'none';
        if (dom.itemAbility) dom.itemAbility.style.display = 'flex';
        if (dom.itemType) dom.itemType.style.display = 'flex';
        dom.pokemonImg.style.visibility = 'visible';
    } else {
        if (dom.diffBadge) dom.diffBadge.textContent = 'Dificultad Facil';
        if (dom.itemHeight) dom.itemHeight.style.display = 'flex';
        if (dom.itemWeight) dom.itemWeight.style.display = 'flex';
        if (dom.itemAbility) dom.itemAbility.style.display = 'flex';
        if (dom.itemType) dom.itemType.style.display = 'flex';
        dom.pokemonImg.style.visibility = 'visible';
    }
}

function showFloatingScore(text, isPositive) {
    if (!dom.floatingContainer) return;
    const el = document.createElement('div');
    el.className = `floating-score ${isPositive ? 'plus' : 'minus'}`;
    el.textContent = text;
    dom.floatingContainer.appendChild(el);
    setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
    }, 1200);
}

async function initCatalog() {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${CONFIG.TOTAL_POKEMON}`);
        if (!res.ok) throw new Error('Error');
        const data = await res.json();
        allPokemonCatalog = data.results.map((p, idx) => ({
            id: idx + 1,
            name: p.name
        }));
    } catch (err) {
        allPokemonCatalog = POKEMON_BACKUP.map(p => ({ id: p.id, name: p.name }));
    }
}

async function fetchPokemonDetails(id) {
    try {
        const [pokeRes, specRes] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).catch(() => null)
        ]);

        if (!pokeRes.ok) throw new Error('Error');
        const pokeData = await pokeRes.json();
        const specData = specRes && specRes.ok ? await specRes.json() : null;

        let desc = 'Analiza su descripcion y caracteristicas para adivinar';
        if (specData && specData.flavor_text_entries) {
            const esEntry = specData.flavor_text_entries.find(e => e.language.name === 'es') ||
                            specData.flavor_text_entries.find(e => e.language.name === 'en');
            if (esEntry) {
                let cleaned = esEntry.flavor_text.replace(/[\n\f\r]/g, ' ').replace(/\s+/g, ' ').trim();
                const regex = new RegExp(`\\b${pokeData.name}\\b`, 'gi');
                cleaned = cleaned.replace(regex, 'este pokemon');
                desc = cleaned;
            }
        }

        return {
            id: pokeData.id,
            name: pokeData.name,
            height: pokeData.height,
            weight: pokeData.weight,
            types: pokeData.types.map(t => t.type.name),
            abilities: pokeData.abilities.map(a => a.ability.name),
            image: pokeData.sprites.other['official-artwork'].front_default || pokeData.sprites.front_default,
            description: desc
        };
    } catch (error) {
        return POKEMON_BACKUP.find(p => p.id === id) || POKEMON_BACKUP[Math.floor(Math.random() * POKEMON_BACKUP.length)];
    }
}

async function startRound(targetPokemonId = null) {
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }

    if (dom.imageLoader) dom.imageLoader.classList.remove('hidden');
    resetRoundUI();

    const targetId = targetPokemonId || Math.floor(Math.random() * CONFIG.TOTAL_POKEMON) + 1;
    const distractorIds = new Set();
    while (distractorIds.size < 3) {
        const randId = Math.floor(Math.random() * CONFIG.TOTAL_POKEMON) + 1;
        if (randId !== targetId) distractorIds.add(randId);
    }

    currentTarget = await fetchPokemonDetails(targetId);

    const options = [{ id: currentTarget.id, name: currentTarget.name, isCorrect: true }];
    distractorIds.forEach(id => {
        const found = allPokemonCatalog.find(p => p.id === id);
        options.push({
            id: id,
            name: found ? found.name : `Pokemon ${id}`,
            isCorrect: false
        });
    });

    currentOptions = shuffleArray(options);
    renderGame(currentTarget, currentOptions);

    if (dom.imageLoader) dom.imageLoader.classList.add('hidden');
    isRoundActive = true;
    applyDifficulty(getStreak());
}

function renderGame(pokemon, options) {
    dom.pokedexTag.textContent = 'Numero';
    dom.pokemonImg.src = pokemon.image;
    dom.pokemonImg.className = 'pokemon-img silhouette';

    dom.clueTypes.innerHTML = '';
    pokemon.types.forEach(t => {
        const typeInfo = TYPE_COLORS[t] || { name: t, color: '#777' };
        const badge = document.createElement('span');
        badge.className = 'type-badge';
        badge.style.backgroundColor = typeInfo.color;
        badge.textContent = typeInfo.name;
        dom.clueTypes.appendChild(badge);
    });

    dom.clueHeight.textContent = `${(pokemon.height / 10).toFixed(1)} m`;
    dom.clueWeight.textContent = `${(pokemon.weight / 10).toFixed(1)} kg`;
    dom.clueAbilities.textContent = pokemon.abilities.map(a => ABILITY_TRANSLATIONS[a] || capitalize(a.replace(/-/g, ' '))).join(', ');
    dom.clueDescription.textContent = pokemon.description;

    const buttons = dom.optionsContainer.querySelectorAll('.btn-pokemon');
    options.forEach((opt, idx) => {
        if (buttons[idx]) {
            const btn = buttons[idx];
            btn.className = 'btn-pokemon';
            btn.disabled = false;
            btn.dataset.correct = opt.isCorrect ? 'true' : 'false';
            btn.dataset.index = idx;
            btn.textContent = capitalize(opt.name);
            btn.onclick = () => handleChoice(opt, btn, buttons);
        }
    });

    applyDifficulty(getStreak());
}

function handleChoice(selectedOption, clickedBtn, allButtons) {
    if (!isRoundActive) return;
    isRoundActive = false;

    playSound('click');
    allButtons.forEach(btn => btn.disabled = true);

    dom.pokemonImg.style.visibility = 'visible';
    dom.pokemonImg.classList.remove('silhouette');
    dom.pokemonImg.classList.add('revealed');
    dom.pokedexTag.textContent = `Numero ${currentTarget.id}`;

    if (selectedOption.isCorrect) {
        clickedBtn.classList.add('correct');
        clickedBtn.textContent = capitalize(selectedOption.name);

        playSound('victory');
        setTimeout(() => playSound('coin'), 250);

        setCoins(getCoins() + CONFIG.COIN_REWARD);
        showFloatingScore(`+${CONFIG.COIN_REWARD}`, true);
        setStreak(getStreak() + 1);

        dom.resultBanner.className = 'result-banner victory';
        dom.resultBanner.style.display = 'block';
        dom.resultText.innerHTML = `Correcto es ${capitalize(currentTarget.name)} has ganado ${CONFIG.COIN_REWARD} Pokedolares`;
        dom.btnNext.textContent = 'Siguiente';
    } else {
        clickedBtn.classList.add('wrong');
        clickedBtn.textContent = capitalize(selectedOption.name);

        allButtons.forEach(btn => {
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
                btn.textContent = btn.textContent;
            }
        });

        playSound('defeat');

        const currentCoins = getCoins();
        const deducted = Math.min(currentCoins, CONFIG.COIN_PENALTY);
        setCoins(Math.max(0, currentCoins - CONFIG.COIN_PENALTY));
        showFloatingScore(`-${deducted}`, false);
        setStreak(0);

        dom.resultBanner.className = 'result-banner defeat';
        dom.resultBanner.style.display = 'block';
        dom.resultText.innerHTML = `Fallaste el Pokemon era ${capitalize(currentTarget.name)} pierdes ${CONFIG.COIN_PENALTY} Pokedolares`;
        dom.btnNext.textContent = 'Reintentar';
    }

    startAutoRestart(CONFIG.AUTO_NEXT_SECONDS);
}

function startAutoRestart(seconds) {
    let remaining = seconds;
    dom.timerText.textContent = `Siguiente en ${remaining} segundos`;

    countdownTimer = setInterval(() => {
        remaining -= 1;
        if (remaining > 0) {
            dom.timerText.textContent = `Siguiente en ${remaining} segundos`;
        } else {
            clearInterval(countdownTimer);
            countdownTimer = null;
            startRound();
        }
    }, 1000);
}

function resetRoundUI() {
    dom.resultBanner.style.display = 'none';
    dom.resultBanner.className = 'result-banner';
    dom.timerText.textContent = '';
    dom.pokemonImg.classList.remove('revealed');
    dom.pokemonImg.classList.add('silhouette');
    dom.pokedexTag.textContent = 'Numero';
}

function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

document.addEventListener('DOMContentLoaded', async () => {
    setCoins(getCoins());
    setStreak(getStreak());

    const defaultTarget = POKEMON_BACKUP[0];
    currentTarget = defaultTarget;
    currentOptions = [
        { id: 25, name: 'pikachu', isCorrect: true },
        { id: 4, name: 'charmander', isCorrect: false },
        { id: 1, name: 'bulbasaur', isCorrect: false },
        { id: 7, name: 'squirtle', isCorrect: false }
    ];
    renderGame(defaultTarget, currentOptions);

    dom.audioBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) playSound('click');
    });

    dom.resetBtn.addEventListener('click', () => {
        setCoins(CONFIG.INITIAL_COINS);
        setStreak(0);
        playSound('coin');
    });

    dom.btnNext.addEventListener('click', () => {
        if (countdownTimer) {
            clearInterval(countdownTimer);
            countdownTimer = null;
        }
        startRound();
    });

    document.addEventListener('keydown', (e) => {
        if (!isRoundActive) return;
        if (['1', '2', '3', '4'].includes(e.key)) {
            const idx = parseInt(e.key, 10) - 1;
            const buttons = dom.optionsContainer.querySelectorAll('.btn-pokemon');
            if (buttons[idx]) buttons[idx].click();
        }
    });

    await initCatalog();
});
