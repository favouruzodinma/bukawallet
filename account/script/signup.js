   // Form navigation
   function nextStep(currentStep) {
    if (validateStep(currentStep)) {
        document.getElementById(`step${currentStep}-form`).classList.remove('active');
        document.getElementById(`step${currentStep+1}-form`).classList.add('active');
        
        // Update progress indicators
        document.getElementById(`step${currentStep}-indicator`).classList.remove('active');
        document.getElementById(`step${currentStep+1}-indicator`).classList.add('active');
    }
}

function prevStep(currentStep) {
    document.getElementById(`step${currentStep}-form`).classList.remove('active');
    document.getElementById(`step${currentStep-1}-form`).classList.add('active');
    
    // Update progress indicators
    document.getElementById(`step${currentStep}-indicator`).classList.remove('active');
    document.getElementById(`step${currentStep-1}-indicator`).classList.add('active');
}

// Form validation
function validateStep(step) {
    let isValid = true;
    
    if (step === 1) {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        
        if (!fullName) {
            alert('Please enter your full name');
            isValid = false;
        }
        
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address');
            isValid = false;
        }
    }
    else if (step === 2) {
        const country = document.getElementById('country').value;
        const state = document.getElementById('state').value;
        const phone = document.getElementById('phone').value;
        
        if (!country) {
            alert('Please select your country');
            isValid = false;
        }
        
        if (!state) {
            alert('Please select your state/region');
            isValid = false;
        }
        
        if (!phone || phone.length < 8) {
            alert('Please enter a valid phone number');
            isValid = false;
        }
    }
    
    return isValid;
}

// PIN input handling
document.querySelectorAll('.pin-input').forEach((input, index, inputs) => {
    // Auto-focus next input when a digit is entered
    input.addEventListener('input', function() {
        if (this.value.length === 1) {
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }
    });
    
    // Handle backspace to move to previous input
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && this.value.length === 0) {
            if (index > 0) {
                inputs[index - 1].focus();
            }
        }
    });
});

// Form submission
function submitForm() {
    // Get PIN values
    const pin1 = document.getElementById('pin1').value;
    const pin2 = document.getElementById('pin2').value;
    const pin3 = document.getElementById('pin3').value;
    const pin4 = document.getElementById('pin4').value;
    
    const confirmPin1 = document.getElementById('confirmPin1').value;
    const confirmPin2 = document.getElementById('confirmPin2').value;
    const confirmPin3 = document.getElementById('confirmPin3').value;
    const confirmPin4 = document.getElementById('confirmPin4').value;
    
    const terms = document.getElementById('terms').checked;
    
    // Combine PIN digits
    const pin = pin1 + pin2 + pin3 + pin4 ;
    const confirmPin = confirmPin1 + confirmPin2 + confirmPin3 + confirmPin4 ;
    
    // Validation
    if (pin.length !== 4) {
        alert('Please enter a complete 6-digit PIN');
        return;
    }
    
    if (confirmPin.length !== 4) {
        alert('Please confirm your 4-digit PIN');
        return;
    }
    
    if (pin !== confirmPin) {
        alert('PINs do not match');
        return;
    }
    
    if (!terms) {
        alert('You must agree to the terms and conditions');
        return;
    }
    
    // Simulate form processing
    document.getElementById('submitBtn').innerHTML = 'Creating Wallet...';
    document.getElementById('submitBtn').disabled = true;
    
    setTimeout(() => {
        alert('Wallet created successfully with PIN: ' + pin);
         window.location.href = 'dashboard.html';
    }, 1500);
}

// Update phone prefix based on country
document.getElementById('country').addEventListener('change', function() {
    const country = this.value;
    const prefixElement = document.getElementById('phonePrefix');
    
    const prefixes = {
        'US': '+1',
        'UK': '+44',
        'CA': '+1',
        'AU': '+61'
    };
    
    prefixElement.textContent = prefixes[country] || '+1';
    
    // Update states based on country
    const stateSelect = document.getElementById('state');
    stateSelect.innerHTML = '<option value="" disabled selected>Select your state</option>';
    
    if (country === 'US') {
        const usStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado'];
        usStates.forEach(state => {
            stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
        });
    } else if (country === 'UK') {
        const ukRegions = ['England', 'Scotland', 'Wales', 'Northern Ireland'];
        ukRegions.forEach(region => {
            stateSelect.innerHTML += `<option value="${region}">${region}</option>`;
        });
    }
});