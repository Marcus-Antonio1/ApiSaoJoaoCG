const API = 'http://localhost:8080/api';

const POLO_IMAGES = { 
  1: 'img/parque-do-povo.jpg', 
  2: 'img/vila-sitio-sao-joao.jpg.webp', 
  3: 'img/vila-do-artesao.jpg', 
  4: 'img/Carvalheira-na-fogueira.webp', 
  5: 'img/default-polo.jpg', 
  6: 'img/Arraiá-de-cumpade.jpg', 
  7: 'img/Campestre.jpg', 
  8: 'img/default-polo.jpg' 
};

const POLO_BG    = { 1:'polo-bg-1', 2:'polo-bg-2', 3:'polo-bg-3', 4:'polo-bg-4', 5:'polo-bg-5', 6:'polo-bg-6', 7:'polo-bg-7', 8:'polo-bg-8' };
const TIPO_ATRACAO = {
  ARTESANATO:       { icon:'🪔', label:'Artesanato',  color:'rgba(255,183,0,.15)',   text:'var(--gold)' },
  CULINARIA:        { icon:'🍖', label:'Culinária',   color:'rgba(255,107,0,.15)',   text:'var(--orange)' },
  DANCA:            { icon:'💃', label:'Dança',       color:'rgba(192,57,43,.15)',   text:'#f1948a' },
  EXPOSICAO:        { icon:'🖼️', label:'Exposição',   color:'rgba(41,128,185,.15)',  text:'#85c1e9' },
  PARQUE_DIVERSOES: { icon:'🎠', label:'Diversões',   color:'rgba(39,174,96,.15)',   text:'#6ee7a0' },
  CULTURAL:         { icon:'🎭', label:'Cultural',    color:'rgba(142,68,173,.15)',  text:'#d7bde2' },
};