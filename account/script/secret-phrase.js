  // Show selected form and update tabs
  function showForm(formType) {
    document.getElementById('pinForm').classList.remove('active');
    document.getElementById('phraseForm').classList.remove('active');
    document.querySelectorAll('.login-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(`${formType}Form`).classList.add('active');
    document.querySelector(`.login-tab[onclick="showForm('${formType}')"]`).classList.add('active');
}

// Word counter for secret phrase
document.getElementById('secretPhrase').addEventListener('input', function() {
    const words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCounter = document.getElementById('wordCounter');
    wordCounter.textContent = `${words.length}/12 words`;
    
    if (words.length !== 12) {
        wordCounter.classList.add('invalid');
    } else {
        wordCounter.classList.remove('invalid');
    }
});

// Form submission for phrase login
document.getElementById('phraseLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const phrase = document.getElementById('secretPhrase').value.trim();
    const words = phrase.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length !== 12) {
        alert('Please enter a valid 12-word secret phrase');
        document.getElementById('secretPhrase').classList.add('shake');
        setTimeout(() => {
            document.getElementById('secretPhrase').classList.remove('shake');
        }, 500);
        return;
    }
    
    // Simulate wallet recovery
    document.getElementById('recoverBtn').innerHTML = 'Recovering Wallet...';
    document.getElementById('recoverBtn').disabled = true;
    
    setTimeout(() => {
        alert('Wallet recovered successfully!');
        // window.location.href = 'wallet-dashboard.html';
        
        // Reset form
        document.getElementById('recoverBtn').innerHTML = 'Recover Wallet';
        document.getElementById('recoverBtn').disabled = false;
    }, 2000);
});

// Form submission for PIN login
document.getElementById('pinLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('pinUsername').value;
    const pin = document.getElementById('pin').value;
    
    if (!username) {
        alert('Please enter your email or username');
        return;
    }
    
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        alert('Please enter a valid 6-digit PIN');
        document.getElementById('pin').classList.add('shake');
        setTimeout(() => {
            document.getElementById('pin').classList.remove('shake');
        }, 500);
        return;
    }
    
    // Simulate login
    // alert(`Login successful!\nUsername: ${username}\nPIN: ${pin}`);
    window.location.href = 'dashboard.html';
});