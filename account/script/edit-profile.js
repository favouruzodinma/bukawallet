 // Enable save button when changes are made
 const inputs = document.querySelectorAll('input, textarea, select');
 const saveBtn = document.getElementById('saveBtn');
 
 inputs.forEach(input => {
     input.addEventListener('input', () => {
         saveBtn.disabled = false;
         saveBtn.textContent = 'Save';
     });
 });
 
 // Character counter for bio
 const bio = document.getElementById('bio');
 const charCount = document.getElementById('charCount');
 
 bio.addEventListener('input', () => {
     charCount.textContent = bio.value.length;
 });
 
 // Delete account confirmation
 const deleteConfirmation = document.getElementById('deleteConfirmation');
 const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
 
 deleteConfirmation.addEventListener('input', () => {
     confirmDeleteBtn.disabled = deleteConfirmation.value !== 'DELETE';
 });

 // Profile picture upload simulation
 const profilePic = document.getElementById('profilePic');
 const editPicBtn = document.querySelector('.edit-pic-btn');
 
 editPicBtn.addEventListener('click', () => {
     // In a real app, this would open the file picker
     alert('Profile picture upload functionality would appear here');
 });