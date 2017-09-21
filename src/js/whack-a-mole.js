import styles from '../scss/whack-a-mole.scss';

const gameTime = 30000;
let timeRemaining = 30;
let score = 0;
let timeUp = false;
let lastHole;

const $qs = document.querySelector.bind(document);
const scoreboard = $qs('.score');
const moles = document.querySelectorAll('.mole');
const congrats = $qs('.congrats');
const button = $qs('button');
const timer = $qs('.timer');

const popupTime = (min, max) => (
  Math.round(Math.random() * (max - min) + min)
);

const getHole = (holes) => {
  const holeToUse = Math.ceil(Math.random() * holes.length);
  const hole = $qs(`.mole:nth-child(${holeToUse})`);
  if ( hole === lastHole ) {
    return getHole(holes);
  }
  lastHole = hole;
  return hole;
};

const showMole = () => {
  const time = popupTime(300,1250); // hide the mole in anywhere from 300ms to 1.25sec
  const hole = getHole(moles);
  hole.classList.add('bg-open');
  setTimeout(() => {
    moles.forEach(mole => (mole.classList.remove('bg-open', 'bg-hit')) );
    if ( !timeUp ) showMole();
  }, time);
};

const handleHit = (e={}) => {
  if ( e.target.classList.contains('bg-open') ) {
    e.target.classList.add('bg-hit');
    score++;
    scoreboard.querySelector('span').textContent = score;
  }
}

const reset = () => {
  score = 0;
  timeUp = false;
  timeRemaining = 30;
  scoreboard.classList.remove('text-red');
  scoreboard.querySelector('span').textContent = 0;
  congrats.textContent = '';
  timer.querySelector('span').textContent = 30;
};

const updateTimer = () => {
  setTimeout(() => {
    timeRemaining--;
    timer.querySelector('span').textContent = timeRemaining;
    if ( !timeUp ) updateTimer();
  },1000);
};

const start = () => {
  reset();
  showMole();
  // start the timer!
  updateTimer();
  setTimeout(() => {
   timeUp = true; 
   scoreboard.classList.add('text-red');
   if ( score < 5 ) {
    congrats.textContent='Uh-oh! Sad Trombone! Try again?';
   } else {
    congrats.textContent='Congrats! Play again?';
   }
  }, gameTime);
};

moles.forEach(mole => mole.addEventListener('click', handleHit));
button.addEventListener('click', start);
