const fs = require('fs');
const path = require('path');

// Load HTML
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('Evaluación Web App', () => {
    beforeEach(() => {
        // Setup document body
        document.documentElement.innerHTML = html.toString();
        
        // Clear localStorage mock
        localStorage.clear();
        
        // Mock Date to have a consistent test for the date
        const mockDate = new Date(2026, 5, 20); // 20 Junio 2026
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
        
        // Require script (must be required after setting up document to run DOMContentLoaded properly)
        // Since we are using addEventListener('DOMContentLoaded'), we need to manually trigger it
        require('../script.js');
        document.dispatchEvent(new Event('DOMContentLoaded'));
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetModules();
    });

    test('should load default name and id on initial load', () => {
        const displayName = document.getElementById('display-name');
        const displayId = document.getElementById('display-id');
        
        expect(displayName.textContent).toBe('Kevin Alexander Méndez López');
        expect(displayId.textContent).toBe('22-20286');
    });

    test('should update name, id, and localStorage when form is submitted', () => {
        // Get elements
        const inputName = document.getElementById('input-name');
        const inputId = document.getElementById('input-id');
        const updateForm = document.getElementById('update-form');
        const displayName = document.getElementById('display-name');
        const displayId = document.getElementById('display-id');

        // Simulate user input
        inputName.value = 'Nuevo Nombre Prueba';
        inputId.value = '99-99999';

        // Submit form
        updateForm.dispatchEvent(new Event('submit', { cancelable: true }));

        // Check if display updated
        expect(displayName.textContent).toBe('Nuevo Nombre Prueba');
        expect(displayId.textContent).toBe('99-99999');

        // Check if localStorage updated
        expect(localStorage.getItem('studentName')).toBe('Nuevo Nombre Prueba');
        expect(localStorage.getItem('studentId')).toBe('99-99999');
    });
});
