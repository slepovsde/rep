const ageInput = document.querySelector('.age-input');
const button = document.querySelector('.button');
const catAgeOutput = document.querySelector('.cat-age-output');

function filterNotDigits(event) {
    const target = event.target;

    target.value = target.value
        .split('')
        .filter((letter) => letter.match(/\d/))
        .join('');
}

function getRightYearWord(number) {
    if (number === 0 || (number > 4 && number < 21) || (number - 1) % 10 > 3) {
        return 'лет';
    }
    if (number % 10 === 1) {
        return 'год';
    }
    return 'года';
}

function getRightMonthsWord(number) {
    if (number === 1) {
        return 'месяц';
    }
    if (number > 1 && number < 5) {
        return 'месяца';
    }
    return 'месяцев';
}

function calculateCatAge() {
    if (!ageInput.value) {
        return;
    }

    if (ageInput.value === '0') {
        catAgeOutput.value = '0 лет и 0 месяцев';
        return;
    }

    if (+ageInput.value > 116) {
        catAgeOutput.value = 'нет данных';
        return;
    }

    const { years, months } = catCalculator.getCatAgeObject(+ageInput.value);
    catAgeOutput.value = `${years} ${getRightYearWord(years)} и ${months} ${getRightMonthsWord(
        months
    )}`;
}

function actOnPressedEnter(event) {
    if (event.key !== 'Enter') {
        return;
    }
    calculateCatAge();
}

ageInput.addEventListener('input', filterNotDigits)
button.addEventListener('click', calculateCatAge);
ageInput.addEventListener('keypress', actOnPressedEnter);
