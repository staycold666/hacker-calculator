let display = document.getElementById('result');
display.value = '0';

// Typing sound effect
function playKeySound() {
    const frequencies = [800, 1000, 1200];
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.frequency.value = frequencies[Math.floor(Math.random() * frequencies.length)];
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    
    setTimeout(() => {
        oscillator.stop();
    }, 100);
}

function appendNumber(num) {
    playKeySound();
    if (display.value === '0') {
        display.value = num;
    } else {
        display.value += num;
    }
}

function appendOperator(op) {
    playKeySound();
    if (display.value !== '0') {
        display.value += op;
    }
}

function clearDisplay() {
    playKeySound();
    display.value = '0';
}

function deleteChar() {
    playKeySound();
    if (display.value.length === 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    playKeySound();
    try {
        // Add glitch effect
        document.querySelector('.calculator').style.animation = 'none';
        document.querySelector('.calculator').offsetHeight;
        document.querySelector('.calculator').style.animation = null;
        
        // Safely evaluate the expression
        const sanitizedExpression = display.value.replace(/[^0-9+\-*/.%]/g, '');
        const result = Function('"use strict";return (' + sanitizedExpression + ')')();
        
        display.value = Number.isFinite(result) ? result : 'ERR0R';
    } catch (error) {
        display.value = 'ERR0R';
    }
}

// Initialize with a "boot sequence"
window.onload = function() {
    const bootSequence = ['INITIALIZING...', 'LOADING SYSTEMS...', 'READY'];
    let i = 0;
    
    const bootInterval = setInterval(() => {
        display.value = bootSequence[i];
        playKeySound();
        i++;
        
        if (i >= bootSequence.length) {
            clearInterval(bootInterval);
            setTimeout(() => {
                display.value = '0';
            }, 1000);
        }
    }, 800);
};
