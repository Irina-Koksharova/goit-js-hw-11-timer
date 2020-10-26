import './styles.css';
import 'normalize.css';
import './js/canvas.js'

const refs = {
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),
}
    
const INTERVAL = 1000;

class CountdownTimer {
    constructor({ selector, saleTime, updateTimer }) {
        this.selector = selector;
        this.saleTime = saleTime;
        this.updateTimer = updateTimer;
    }

    start() {
        setInterval(() => {
            const { days, hours, mins, secs } = this.getTimeComponents(this.saleTime.getTime() - Date.now());
            this.updateTimer({ days, hours, mins, secs });
        }, INTERVAL)
    }
    
    getTimeComponents(time) {
        const days = this.formatTimeComponents(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.formatTimeComponents(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.formatTimeComponents(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.formatTimeComponents(Math.floor((time % (1000 * 60)) / 1000));
        return { days, hours, mins, secs };
    }

    formatTimeComponents(value) {
        return String(value).padStart(2, '0');
    }
}

function updateTimer({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`; 
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
}

const timer = new CountdownTimer({
    selector: '#timer-1',
    saleTime: new Date(2021, 0, 1),
    updateTimer,
});

timer.start();




