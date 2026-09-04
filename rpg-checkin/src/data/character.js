// Personagem pixel art do herói dev — cada camada é uma matriz de caracteres
// sobre uma grade de GRID_W x GRID_H. Cada letra vira um pixel colorido (PALETTE);
// "." é transparente. As camadas são compostas na ordem definida em LEVEL_STAGES.

export const GRID_W = 24;
export const GRID_H = 27;

// Paleta base (letra -> cor). "b"/"B"/"L" (hoodie) são sobrescritos por nível.
export const PALETTE = {
  k: "#17141f", // contorno/escuro
  s: "#e9b489", // pele
  S: "#d19a6e", // sombra da pele
  h: "#2a1c14", // cabelo escuro cacheado
  H: "#43301f", // brilho do cabelo
  e: "#201d2b", // olhos
  w: "#f8f8ff", // brilho do olho
  m: "#c96f5e", // boca
  n: "#262230", // camiseta preta (nível 1)
  y: "#d7dce8", // lente clara dos óculos
  p: "#46425a", // calça
  P: "#343048", // sombra da calça
  o: "#2a2635", // sapatos
  g: "#d4af37", // ouro
  G: "#f5e7b2", // ouro claro
  r: "#e63946", // rubi
  c: "#4cc9f0", // ciano (telas/hologramas)
  f: "#7a5230", // café
  F: "#f0e6d2", // espuma
  N: "#c3bdd4", // cinza claro (caneca, base do laptop)
  x: "#00e07f", // verde terminal
  b: "#9a93ad", // hoodie principal (dinâmico por nível)
  B: "#6f6982", // sombra do hoodie (dinâmico)
  L: "#bcb6cb", // brilho do hoodie (dinâmico)
};

// Cria uma grade GRID_H x GRID_W com as linhas posicionadas a partir de `top`.
function makeLayer(top, rows) {
  const grid = Array.from({ length: GRID_H }, () => ".".repeat(GRID_W));
  rows.forEach((row, i) => {
    grid[top + i] = row;
  });
  return grid;
}

export const LAYERS = {
  skin: makeLayer(4, [
    "........ssssssss........",
    ".......ssssssssss.......",
    "......ssssssssssss......",
    "......ssssssssssss......",
    "......ssssssssssss......",
    "......ssssssssssss......",
    "......ssssssssssss......",
    ".......ssssssssss.......",
    "........ssSSSSss........",
  ]),
  hair: makeLayer(1, [
    ".........h.h.hh.........",
    "........hhhhhhhh........",
    ".......hhhhhhhhhh.......",
    "......hhhhhhhhhhhh......",
    "......hHHhhhhhhHHh......",
    "......hhhhhhhhhhhh......",
    "......hh........hh......",
    "......hh........hh......",
  ]),
  face: makeLayer(7, [
    "........................",
    "........ew....ew........",
    "...........mm...........",
  ]),
  // Óculos redondos de armação escura com lente clara (estilo do herói).
  glasses: makeLayer(7, [
    ".......kkk....kkk.......",
    "......kyyykkkkyyyk......",
    ".......kkk....kkk.......",
  ]),
  // Bigode + cavanhaque no tom do cabelo.
  facial: makeLayer(9, [
    "..........h..h..........",
    "..........hhhh..........",
    "...........hh...........",
  ]),
  headset: makeLayer(2, [
    "........kkkkkkkk........",
    ".......k........k.......",
    "......k..........k......",
    "......k..........k......",
    "......k..........k......",
    ".....kkk........kkk.....",
    ".....kNk........kNk.....",
    ".....kkk........kkk.....",
  ]),
  tee: makeLayer(13, [
    "......nnnnkkkknnnn......",
    "....nnnnnnnnnnnnnnnn....",
    "....nnnnnnnnnnnnnnnn....",
    "....ssnnnnnnnnnnnnss....",
    "....ssnnnnnnnnnnnnss....",
    "....ssnnnnnnnnnnnnss....",
    "...ssnnnnnnnnnnnnnnss...",
  ]),
  hoodie: makeLayer(13, [
    "......bbbbkkkkbbbb......",
    "....bbbbbbbbbbbbbbbb....",
    "....bbbLLbbbbbbLLbbb....",
    "....bbbbbbbbbbbbbbbb....",
    "....bbbLLbbbbbbLLbbb....",
    "....BBbbbbbbbbbbbbBB....",
    "...sbbbbbbbbbbbbbbbbs...",
  ]),
  legs: makeLayer(20, [
    ".......pppp..pppp.......",
    ".......pppp..pppp.......",
    ".......PPPP..PPPP.......",
    "......oooo...oooo.......",
    "......oooo...oooo.......",
  ]),
  laptop: makeLayer(16, [
    "......kkkkkkkkkkkk......",
    "......kcgcggcgcgck......",
    "......kggccggccggk......",
    "....NNNNNNNNNNNNNNNN....",
  ]),
  coffee: makeLayer(8, [
    "....................N...",
    ".....................N..",
    "...................FFF..",
    "...................NNNk.",
    "...................NfNk.",
    "...................NNN..",
  ]),
  keyboard: makeLayer(14, [
    "..................kkkkkk",
    "..................kgcrcg",
    "..................kcggcr",
  ]),
  terminal: makeLayer(11, [
    "..kkkkkkkk..............",
    "..kxxx.x.k..............",
    "..kx.xx..k..............",
    "..kkkkkkkk..............",
  ]),
  glyphs: makeLayer(0, [
    "................c..c..c.",
    "...............c....c..c",
    "................c....cc.",
  ]),
  diagram: makeLayer(0, [
    ".................kkkk...",
    ".................kggk...",
    ".................kkkk...",
    "....................c...",
    "....................c...",
  ]),
  crown: makeLayer(0, [
    "........g..g..g.........",
    "........gGgGgGg.........",
    "........grggrgg.........",
  ]),
};

// Combina as camadas na ordem dada (as últimas pintam por cima).
export function composeLayers(layerNames) {
  const grid = Array.from({ length: GRID_H }, () => Array(GRID_W).fill("."));
  for (const name of layerNames) {
    const layer = LAYERS[name];
    if (!layer) continue;
    layer.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const ch = row[x];
        if (ch !== ".") grid[y][x] = ch;
      }
    });
  }
  return grid.map((row) => row.join(""));
}

// Um estágio visual por nível (1-10). O hoodie muda de cor e novos
// equipamentos aparecem conforme o dev sobe de patente.
export const LEVEL_STAGES = {
  1: {
    layers: ["skin", "hair", "glasses", "face", "facial", "tee", "legs"],
    quote: "Toda lenda começa com um simples git init…",
  },
  2: {
    layers: ["skin", "hair", "glasses", "face", "facial", "hoodie", "legs"],
    hoodie: { b: "#4a7dc9", B: "#3a639f", L: "#7fa5e0" },
    quote: "Primeiro hoodie desbloqueado: modo dev ativado!",
  },
  3: {
    layers: ["skin", "hair", "glasses", "face", "facial", "hoodie", "legs", "laptop"],
    hoodie: { b: "#2fb3a8", B: "#238a82", L: "#66d0c7" },
    quote: "Laptop na mão: hora das primeiras linhas de código.",
  },
  4: {
    layers: [
      "skin", "hair", "glasses", "face", "facial", "headset", "hoodie", "legs",
      "laptop",
    ],
    hoodie: { b: "#7a5fd0", B: "#5f49a8", L: "#a08ae0" },
    quote: "Headset no pescoço: bem-vindo ao modo foco absoluto.",
  },
  5: {
    layers: [
      "skin", "hair", "glasses", "face", "facial", "headset", "hoodie", "legs",
      "laptop",
      "coffee",
    ],
    hoodie: { b: "#2ecc71", B: "#22a258", L: "#74e39f" },
    quote: "Café carregado. Bugs, podem vir!",
  },
  6: {
    layers: [
      "skin", "hair", "glasses", "face", "facial", "headset", "hoodie", "legs",
      "laptop",
      "coffee", "keyboard",
    ],
    hoodie: { b: "#e63946", B: "#b52b37", L: "#ff7d87" },
    quote: "Teclado mecânico desbloqueado: cada tecla é um feitiço.",
  },
  7: {
    layers: [
      "skin", "hair", "glasses", "face", "facial", "headset", "hoodie", "legs",
      "laptop",
      "coffee", "keyboard", "diagram",
    ],
    hoodie: { b: "#5d5fef", B: "#4749bd", L: "#8f90ff" },
    quote: "Agora você desenha os mapas que outros devs seguem.",
  },
  8: {
    layers: [
      "skin", "hair", "glasses", "face", "facial", "headset", "hoodie", "legs",
      "laptop",
      "coffee", "keyboard", "glyphs",
    ],
    hoodie: { b: "#8b2fd6", B: "#6c22a8", L: "#b26ae8" },
    aura: "violet",
    quote: "Aura lendária desbloqueada: seu código brilha no repo!",
  },
  9: {
    layers: [
      "skin", "hair", "glasses", "face", "facial", "headset", "hoodie", "legs",
      "laptop",
      "coffee", "terminal", "glyphs",
    ],
    hoodie: { b: "#d63384", B: "#a82567", L: "#ea6fae" },
    aura: "violet-strong",
    quote: "O terminal responde aos seus comandos. Quase um mestre…",
  },
  10: {
    layers: [
      "skin", "hair", "glasses", "face", "facial", "headset", "hoodie", "legs",
      "laptop",
      "coffee", "terminal", "glyphs", "crown",
    ],
    hoodie: { b: "#d4af37", B: "#a8872a", L: "#f0d878" },
    aura: "gold",
    quote: "Guardião do Código: a taverna tem um novo herói!",
  },
};
