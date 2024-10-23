let display = document.getElementById('result');
let easterEgg = document.getElementById('easter-egg');
display.value = '0';

// Generate terminal background text
function generateTerminalText() {
    const terminalText = document.getElementById('terminalText');
    const hackerTexts = [
        "ACCESS_GRANTED CALCULATING_SEQUENCE DEBUG_MODE",
        "01100101 10101010 11001100 BINARY_OVERFLOW",
        "WE ARE UNDER ATTACK!!!!!!!!!!!!",
        "EXECUTING_CALCULATIONS MEMORY_DUMP STACK_TRACE",
        "BUFFER_OVERFLOW SEGMENTATION_FAULT CORE_DUMP",
        "INITIALIZING_MATRIX DECRYPTING_DATA FIREWALL_BREACH",
        "ROOT_ACCESS_GRANTED SYSTEM_OVERRIDE KERNEL_PANIC",
        "MEMORY_SCAN_COMPLETE BACKDOOR_DETECTED TRACE_ROUTE",
        "ENCRYPTION_KEY_FOUND PORT_SCAN_COMPLETE SSH_TUNNEL",
        ">_ sudo rm -rf / >_ chmod 777 >_ ssh root@localhost",
        "BRUTE_FORCE_ATTACK SQL_INJECTION CROSS_SITE_SCRIPT"
    ];

    // Create multiple lines of text at different positions
    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'text-line';
        line.style.top = `${i * 5}vh`;
        line.style.left = `${Math.random() * 100}%`;
        line.style.animationDuration = `${15 + Math.random() * 10}s`;
        line.textContent = hackerTexts[Math.floor(Math.random() * hackerTexts.length)];
        terminalText.appendChild(line);
    }
}

// Check for easter egg
function checkEasterEgg() {
    if (display.value === '80085') {
        easterEgg.textContent = '( . )Y( . )';
        easterEgg.classList.add('visible');
    } else {
        easterEgg.textContent = '';
        easterEgg.classList.remove('visible');
    }
}

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
    checkEasterEgg();
}

function appendOperator(op) {
    playKeySound();
    if (display.value !== '0') {
        display.value += op;
    }
    checkEasterEgg();
}

function clearDisplay() {
    playKeySound();
    display.value = '0';
    checkEasterEgg();
}

function deleteChar() {
    playKeySound();
    if (display.value.length === 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
    checkEasterEgg();
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
    checkEasterEgg();
}

// Initialize with a "boot sequence"
window.onload = function() {
    generateTerminalText();
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

// Regenerate terminal text periodically
setInterval(() => {
    const terminalText = document.getElementById('terminalText');
    terminalText.innerHTML = '';
    generateTerminalText();
}, 20000);
