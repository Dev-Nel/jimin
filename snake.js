document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeModalIcon = document.getElementById('closeModalIcon');

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

    // Optional: Expose show modal function if needed in game logic
    window.showGameOverModal = showModal;
});
