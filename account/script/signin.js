 // PIN input handling
 const pinInputs = document.querySelectorAll('.pin-input');
        
 pinInputs.forEach((input, index, inputs) => {
     // Auto-focus next input when a digit is entered
     input.addEventListener('input', function() {
         if (this.value.length === 1) {
             if (index < inputs.length - 1) {
                 inputs[index + 1].focus();
             } else {
                 document.getElementById('loginBtn').focus();
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
 document.getElementById('loginForm').addEventListener('submit', function(e) {
     e.preventDefault();
     
     // Get values
     const username = document.getElementById('username').value;
     const pin1 = document.getElementById('pin1').value;
     const pin2 = document.getElementById('pin2').value;
     const pin3 = document.getElementById('pin3').value;
     const pin4 = document.getElementById('pin4').value;
     
     // Combine PIN digits
     const pin = pin1 + pin2 + pin3 + pin4 
     
     // Validation
     if (!username) {
         alert('Please enter your email or username');
         return;
     }
     
     if (pin.length !== 4) {
         alert('Please enter your 4-digit PIN');
         document.getElementById('pinContainer').classList.add('shake');
         setTimeout(() => {
             document.getElementById('pinContainer').classList.remove('shake');
         }, 500);
         return;
     }
     
     // Simulate login processing
     document.getElementById('loginBtn').innerHTML = 'Signing In...';
     document.getElementById('loginBtn').disabled = true;
     
     // This would be replaced with actual authentication
     setTimeout(() => {
         // For demo purposes, accept any 6-digit PIN
        //  alert(`Login successful!\nUsername: ${username}\nPIN: ${pin}`);
          window.location.href = 'dashboard.html';
         
         // Reset form
         document.getElementById('loginBtn').innerHTML = 'Sign In';
         document.getElementById('loginBtn').disabled = false;
     }, 1500);
 });

 // Focus first PIN field when username is entered
 document.getElementById('username').addEventListener('keydown', function(e) {
     if (e.key === 'Enter') {
         e.preventDefault();
         document.getElementById('pin1').focus();
     }
 });