// Ejercicio 13 · Tarjeta de crédito.
// Escribe aquí tu solución. Consulta los requisitos en README.md.
document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('payment-form');
    let payButton = document.getElementById('payButton');
    let formMessage = document.getElementById('form-message');
    let flipCardBtn = document.getElementById('flip-card');



    let inputs = {
        cardNumber: document.getElementById('cardNumber'),
        username: document.getElementById('username'),
        expireDate: document.getElementById('expireDate'),
        cvc: document.getElementById('cvc')
    };

    let cardElements = {
        number: document.getElementById('cardNumber-card'),
        username: document.getElementById('username-card'),
        expireDate: document.getElementById('expireDate-card'),
        cvc: document.getElementById('cvc-card'),
        name: document.getElementById('cardName'),
        logo: document.getElementById('logo-front'),
        frontFace: document.getElementById('flip-card-front'),
        backFace: document.getElementById('flip-card-back')
    };

    let DEFAULTS = {
        number: '•••• •••• •••• ••••',
        username: 'NOMBRE DEL TITULAR',
        expireDate: 'MM/AA',
        cvc: '•••',
        cardName: 'Tarjeta'


    };

    let BRANDS = {

        masterCard: {
            regex: /^5[1-5]\d{14}$/,
            name: 'Mastercard',
            class: 'mastercard',
            logo: './src/images/masterCard.png'
        },
        visa: {
            regex: /^4(\d{12}|\d{15})$/,
            name: 'Visa',
            class: 'visa',
            logo: './src/images/visa.png'
        },
        american: {
            regex: /^3[47]\d{13}$/,
            name: 'American Express',
            class: 'american',
            logo: './src/images/american.png'
        }
    };

    let REGEX_USERNAME = /^[\p{L} ]{1,20}$/u
    let REGEX_CVC = /^\d{3}$/;


    function getCardBrand(number) {
        for (let brandKey in BRANDS) {
            if (BRANDS[brandKey].regex.text(number)) {
                return BRANDS[brandKey];
            }
        }
        return null;
    }


    function validateExpireDate(value) {
        if (!value) return false;
        let [yearStr, monthStr] = value.split('-');
        let year = parseInt(yearStr, 10);
        let month = parseInt(monthStr, 10);

        let now = new Date();
        let currentyear = now.getFullYear();
        let currentMonth = now.getMonth();


        if (year > currentyear) return true;
        if (year === currentyear && month >= currentMonth) return true;
        return false;
    }

    function validateField(fieldId, value) {
        let trimmedValue = value.trim();
        switch (fieldId) {

            case 'username': {
                if (!trimmedValue) return { isValid: false, message: 'El titular es obligatorio.' };
                if (!REGEX_USERNAME.test(trimmedValue)) {
                    return { isValid: false, message: 'Solo letras y espacios (máximo 20 caracteres).' };
                }
                return { isValid: true, message: '' };
            }
            case 'cardNumber': {
                if (!trimmedValue) return { isValid: false, message: 'El número de tarjeta es obligatorio.' };
                if (/\s|-|[^\d]/.test(value)) return { isValid: false, message: 'Solo se admiten dígitos sin espacios ni guiones.' };
                const brand = getCardBrand(value);
                if (!brand) return { isValid: false, message: 'Número de tarjeta no válido o no soportado.' };
                return { isValid: true, message: '' };
            }
            case 'expireDate': {
                if (!value) return { isValid: false, message: 'La fecha de caducidad es obligatoria.' };
                if (!validateExpireDate(value)) return { isValid: false, message: 'La tarjeta está caducada o la fecha es inválida.' };
                return { isValid: true, message: '' };
            }
            case 'cvc': {
                if (!value) return { isValid: false, message: 'El CVC es obligatorio.' };
                if (!REGEX_CVC.test(value)) return { isValid: false, message: 'El CVC debe contener exactamente 3 dígitos.' };
                return { isValid: true, message: '' };
            }
            default:
                return { isValid: false, message: '' };
        }
    }

    function updateFieldUI(input, isValid, message) {
        const errorEl = document.getElementById(`${input.id}-error`);

        if (isValid) {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
            input.removeAttribute('aria-invalid');
            if (errorEl) errorEl.textContent = '';
        } else {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            input.setAttribute('aria-invalid', 'true');
            if (errorEl) errorEl.textContent = message;
        }
    }

    function resetCardBrandUI() {
        Object.values(BRANDS).forEach(b => {
            cardElements.frontFace.classList.remove(b.class);
            cardElements.backFace.classList.remove(b.class);
        });
        cardElements.name.textContent = DEFAULTS.cardName;
        cardElements.logo.src = '';
        cardElements.logo.hidden = true;
    }

    function updateCardPreview(fieldId, value, isValid) {
        switch (fieldId) {
            case 'username':
                cardElements.username.textContent = isValid ? value.trim().toUpperCase() : DEFAULTS.username;
                break;

            case 'cardNumber':
                if (isValid) {
                    const brand = getCardBrand(value);
                    cardElements.number.textContent = value.replace(/(.{4})/g, '$1 ').trim();
                    cardElements.name.textContent = brand.name;
                    cardElements.logo.src = brand.logo;
                    cardElements.logo.hidden = false;

                    resetCardBrandUI();
                    cardElements.frontFace.classList.add(brand.class);
                    cardElements.backFace.classList.add(brand.class);
                    cardElements.name.textContent = brand.name;
                } else {
                    cardElements.number.textContent = DEFAULTS.number;
                    resetCardBrandUI();
                }
                break;

            case 'expireDate':
                if (isValid && value) {
                    const [year, month] = value.split('-');
                    cardElements.expireDate.textContent = `${month}/${year.slice(-2)}`;
                } else {
                    cardElements.expireDate.textContent = DEFAULTS.expireDate;
                }
                break;

            case 'cvc':
                cardElements.cvc.textContent = isValid ? value : DEFAULTS.cvc;
                break;
        }
    }

    function checkFormValidity() {
        const isFormValid = Object.keys(inputs).every(key => {
            const input = inputs[key];
            return validateField(key, input.value).isValid;
        });

        payButton.disabled = !isFormValid;
        return isFormValid;
    }

    function handleInputEvent(e) {
        const input = e.target;
        const fieldId = input.id;
        const { isValid, message } = validateField(fieldId, input.value);

        if (input.value === '' && e.type !== 'blur') {
            input.classList.remove('is-valid', 'is-invalid');
            input.removeAttribute('aria-invalid');
            const errorEl = document.getElementById(`${fieldId}-error`);
            if (errorEl) errorEl.textContent = '';
            updateCardPreview(fieldId, '', false);
        } else {
            updateFieldUI(input, isValid, message);
            updateCardPreview(fieldId, input.value, isValid);
        }

        checkFormValidity();
    }


    Object.values(inputs).forEach(input => {
        input.addEventListener('input', handleInputEvent);
        input.addEventListener('blur', handleInputEvent);
    });


    function toggleCardFlip() {
        const isFlipped = flipCardBtn.classList.toggle('is-flipped');
        flipCardBtn.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
    }

    flipCardBtn.addEventListener('click', toggleCardFlip);


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let allValid = true;
        Object.keys(inputs).forEach(key => {
            const input = inputs[key];
            const { isValid, message } = validateField(key, input.value);
            updateFieldUI(input, isValid, message);
            if (!isValid) allValid = false;
        });

        if (allValid) {
            formMessage.style.color = '#79d8a0';
            formMessage.textContent = 'Pago simulado correctamente. No se ha realizado ningún cargo.';
        } else {
            formMessage.style.color = '#ffaaaa';
            formMessage.textContent = 'Por favor, corrige los errores antes de continuar.';
            payButton.disabled = true;
        }
    });

    form.addEventListener('reset', () => {
        setTimeout(() => {
            Object.values(inputs).forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
                input.removeAttribute('aria-invalid');
                const errorEl = document.getElementById(`${input.id}-error`);
                if (errorEl) errorEl.textContent = '';
            });

            cardElements.number.textContent = DEFAULTS.number;
            cardElements.username.textContent = DEFAULTS.username;
            cardElements.expireDate.textContent = DEFAULTS.expireDate;
            cardElements.cvc.textContent = DEFAULTS.cvc;
            resetCardBrandUI();

            flipCardBtn.classList.remove('is-flipped');
            flipCardBtn.setAttribute('aria-pressed', 'false');

            formMessage.textContent = '';
            payButton.disabled = true;
        }, 0);
    });







})
