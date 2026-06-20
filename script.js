document.addEventListener('DOMContentLoaded', () => {
    // Default values
    const defaultName = "Kevin Alexander Méndez López";
    const defaultId = "22-20286";
    
    // Get elements
    const displayName = document.getElementById('display-name');
    const displayId = document.getElementById('display-id');
    const displayDate = document.getElementById('display-date');
    const displayCat = document.getElementById('display-cat');
    
    const inputName = document.getElementById('input-name');
    const inputId = document.getElementById('input-id');
    const inputCat = document.getElementById('input-cat');
    const updateForm = document.getElementById('update-form');

    // Set today's date
    const setTodayDate = () => {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        displayDate.textContent = today.toLocaleDateString('es-ES', options);
    };

    // Load data from localStorage or use defaults
    const loadData = () => {
        const savedName = localStorage.getItem('studentName') || defaultName;
        const savedId = localStorage.getItem('studentId') || defaultId;
        const savedCat = localStorage.getItem('studentCat') || "Ingresa un gato";
        
        displayName.textContent = savedName;
        displayId.textContent = savedId;
        displayCat.textContent = savedCat;
        
        inputName.value = savedName;
        inputId.value = savedId;
        inputCat.value = savedCat === "Ingresa un gato" ? "" : savedCat;
    };

    // Update data
    const updateData = (e) => {
        e.preventDefault();
        
        const newName = inputName.value.trim();
        const newId = inputId.value.trim();
        const newCat = inputCat.value.trim();
        
        if (newName && newId && newCat) {
            // Save to localStorage (Local DB alternative)
            localStorage.setItem('studentName', newName);
            localStorage.setItem('studentId', newId);
            localStorage.setItem('studentCat', newCat);
            
            // Update display
            displayName.textContent = newName;
            displayId.textContent = newId;
            displayCat.textContent = newCat;

            // SCROLL FEATURE
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });

            // Visual feedback
            const card = document.querySelector('.glass');
            card.classList.add('success-anim');
            setTimeout(() => card.classList.remove('success-anim'), 400);

            // Change button text temporarily
            const btn = document.getElementById('update-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>¡Actualizado! ✓</span>';
            btn.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
            }, 2000);
        }
    };

    // Reset data
    const resetData = () => {
        localStorage.removeItem('studentName');
        localStorage.removeItem('studentId');
        localStorage.removeItem('studentCat');
        loadData();

        // Visual feedback
        const btn = document.getElementById('reset-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>¡Restaurado! ↺</span>';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    };

    // Initialize
    setTodayDate();
    loadData();

    // Event Listeners
    updateForm.addEventListener('submit', updateData);
    document.getElementById('reset-btn').addEventListener('click', resetData);
});

// Export functions for testing (only if running in Node/Jest environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Here we could export functions for testing if they were isolated
    };
}
