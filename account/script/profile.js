document.addEventListener('DOMContentLoaded', function() {
   
    // Copy wallet address
    document.getElementById('copyWalletBtn').addEventListener('click', function() {
      const walletAddress = document.getElementById('walletAddress').textContent;
      navigator.clipboard.writeText(walletAddress)
        .then(() => {
          showToast('Wallet address copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          showToast('Failed to copy address');
        });
    });

    // Menu item click handlers
    document.getElementById('securityBtn').addEventListener('click', function() {
      console.log('Security clicked');
      alert('Security screen would open');
    });

    document.getElementById('notificationsBtn').addEventListener('click', function() {
      console.log('Notifications clicked');
      alert('Notifications screen would open');
    });

    document.getElementById('paymentMethodsBtn').addEventListener('click', function() {
      console.log('Payment Methods clicked');
      alert('Payment Methods screen would open');
    });

    document.getElementById('preferencesBtn').addEventListener('click', function() {
      console.log('Preferences clicked');
      alert('Preferences screen would open');
    });

    document.getElementById('helpBtn').addEventListener('click', function() {
      console.log('Help clicked');
      alert('Help screen would open');
    });

    document.getElementById('logoutBtn').addEventListener('click', function() {
      if (confirm('Are you sure you want to logout?')) {
        console.log('User logged out');
        alert('Logging out - would redirect to login screen in real app');
      }
    });
  });

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }