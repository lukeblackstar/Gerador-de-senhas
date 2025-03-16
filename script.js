const passwordDisplay = document.getElementById('password');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const toast = document.getElementById('toast');

lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function generatePassword() {
    let password = '';
    let charPool = '';
    
    if (uppercaseCheckbox.checked) charPool += uppercaseChars;
    if (lowercaseCheckbox.checked) charPool += lowercaseChars;
    if (numbersCheckbox.checked) charPool += numberChars;
    if (symbolsCheckbox.checked) charPool += symbolChars;
    
    if (charPool === '') {
        alert('Por favor, selecione pelo menos uma opção!');
        return '';
    }
    
    const length = parseInt(lengthSlider.value);
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool.charAt(randomIndex);
    }
    
    return password;
}

function evaluatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    if (strength <= 2) {
        strengthBar.className = 'weak';
        strengthText.textContent = 'Fraca';
    } else if (strength <= 4) {
        strengthBar.className = 'medium';
        strengthText.textContent = 'Média';
    } else {
        strengthBar.className = 'strong';
        strengthText.textContent = 'Forte';
    }
}

generateBtn.addEventListener('click', () => {
    const newPassword = generatePassword();
    if (newPassword) {
        passwordDisplay.textContent = newPassword;
        evaluatePasswordStrength(newPassword);
    }
});

copyBtn.addEventListener('click', () => {
    const password = passwordDisplay.textContent;
    if (password === 'Clique em gerar') {
        return;
    }
    
    navigator.clipboard.writeText(password).then(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    });
});

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const anyChecked = [uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox]
            .some(cb => cb.checked);
        
        if (!anyChecked) {
            checkbox.checked = true;
            alert('Pelo menos uma opção deve estar selecionada!');
        }
    });
});