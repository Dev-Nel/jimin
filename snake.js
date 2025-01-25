document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('startGameJimin');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeModalIcon = document.getElementById('closeModalIcon');

    // Start Game Button Alert
    startGameBtn.addEventListener('click', () => {
        alert('Game Starting!');
        // Your existing game start logic would go here
    });

    // Function to show modal
    function showModal() {
        modal.style.display = 'flex';
    }

    // Function to hide modal
    function hideModal() {
        modal.style.display = 'none';
    }

    // Close modal when close button is clicked
    closeModalBtn.addEventListener('click', hideModal);
    closeModalIcon.addEventListener('click', hideModal);

    // Close modal if user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });

    // Expose show modal function for game over scenario
    window.showGameOverModal = showModal;
});
