// Form navigation
function nextStep(currentStep) {
    if (validateStep(currentStep)) {
        document.getElementById(`step${currentStep}-form`).classList.remove('active');
        document.getElementById(`step${currentStep+1}-form`).classList.add('active');
        document.getElementById(`step${currentStep}-indicator`).classList.remove('active');
        document.getElementById(`step${currentStep+1}-indicator`).classList.add('active');
    }
}

function prevStep(currentStep) {
    document.getElementById(`step${currentStep}-form`).classList.remove('active');
    document.getElementById(`step${currentStep-1}-form`).classList.add('active');
    document.getElementById(`step${currentStep}-indicator`).classList.remove('active');
    document.getElementById(`step${currentStep-1}-indicator`).classList.add('active');
}

// Form validation
function validateStep(step) {
    if (step === 1) {
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        if (!fullName) {
            alert('Please enter your full name');
            return false;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }
    } else if (step === 2) {
        const country = document.getElementById('country').value;
        const state = document.getElementById('state').value;
        const phone = document.getElementById('phone').value.trim();
        if (!country) {
            alert('Please select your country');
            return false;
        }
        if (!state && stateSelect.options.length > 1) { // Skip if no states available
            alert('Please select your state/region');
            return false;
        }
        if (!phone || !/^\d{8,15}$/.test(phone)) {
            alert('Please enter a valid phone number (8-15 digits)');
            return false;
        }
    }
    return true;
}

// PIN input handling
document.querySelectorAll('.pin-input').forEach((input, index, inputs) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

// Form submission
function submitForm() {
    const pin = Array.from({ length: 4 }, (_, i) => 
        document.getElementById(`pin${i+1}`).value).join('');
    const confirmPin = Array.from({ length: 4 }, (_, i) => 
        document.getElementById(`confirmPin${i+1}`).value).join('');
    const terms = document.getElementById('terms').checked;

    if (pin.length !== 4 || confirmPin.length !== 4) {
        alert('Please enter a complete 4-digit PIN');
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

    document.getElementById('submitBtn').innerHTML = 'Creating Wallet...';
    document.getElementById('submitBtn').disabled = true;
    setTimeout(() => {
        alert('Wallet created successfully!');
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Country/State Data
const countrySelect = document.getElementById('country');
const stateSelect = document.getElementById('state');
const phonePrefix = document.getElementById('phonePrefix');
let countriesData = {};

// Fetch countries
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Network response was not ok');
        const countries = await response.json();

        console.log(countries);

        countrySelect.innerHTML = '<option value="" disabled selected>Select your country</option>';
        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

        countries.forEach(country => {
            const countryCode = country.cca2;
            const phoneCode = (country.idd.root || '') + (country.idd.suffixes?.[0] || '');
            countriesData[countryCode] = { phoneCode };

            const option = document.createElement('option');
            option.value = countryCode;
            option.textContent = country.name.common;
            countrySelect.appendChild(option);
        });

        countrySelect.disabled = false;
    } catch (error) {
        console.error('Failed to fetch countries:', error);
        countrySelect.innerHTML = '<option value="" disabled selected>Error loading countries</option>';
    }
}

// Fetch states (GeoNames)
async function fetchStates(countryCode) {
    const username = 'YOUR_GEONAMES_USERNAME'; // Replace this!
    const apiUrl = `https://secure.geonames.org/childrenJSON?geonameId=1&country=${countryCode}&username=${username}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('GeoNames API failed');
        const data = await response.json();

        stateSelect.innerHTML = '<option value="" disabled selected>Select your state</option>';
        if (data.geonames?.length > 0) {
            data.geonames.forEach(state => {
                const option = document.createElement('option');
                option.value = state.adminName1 || state.name;
                option.textContent = state.adminName1 || state.name;
                stateSelect.appendChild(option);
            });
        } else {
            stateSelect.innerHTML = '<option value="" disabled selected>No states available</option>';
        }
        stateSelect.disabled = false;
    } catch (error) {
        console.error('Failed to fetch states:', error);
        stateSelect.innerHTML = '<option value="" disabled selected>Error loading states</option>';
        stateSelect.disabled = false; // Allow form submission
    }
}

// Event listeners
countrySelect.addEventListener('change', function() {
    const countryCode = this.value;
    if (!countryCode) return;

    phonePrefix.textContent = countriesData[countryCode]?.phoneCode || '+__';
    stateSelect.innerHTML = '<option value="" disabled selected>Loading states...</option>';
    stateSelect.disabled = true;
    fetchStates(countryCode);
});

// Initialize
fetchCountries();