
const entryField = document.querySelector('.calc__screen'),
      numberField = document.querySelector('.toolbar'),
      cancelInput = numberField.querySelector('.toolbar__btn_ac');

const arithmeticSign = ['±', '%', '÷', '×', '–', '+'],
    numberBtn = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

let a = '',
    b = '',
    sign = '',
    finish = false;

function clearEntryField(elem) {
    elem.textContent = '';
    a = '';
    b = '';
    sign = '';
}


 numberField.addEventListener('click', (e) => {

        const target = e.target;
        let value = target.textContent;

        localStorage.setItem('lastKey', `${a}`);
        sessionStorage.setItem("isReloaded", "true");
        const lastOperation = localStorage.getItem('lastKey');

        if (!target.classList.contains('toolbar__btn') || target.classList.contains('toolbar__btn_ac')) return;

        if (numberBtn.includes(value)) {

           if (b === '' && sign === '') {
                a += value;
                entryField.textContent = a;
            } else if (a !== '' && b !== '' && finish) {
               b = value;
               finish = false;
               entryField.textContent = b;
           } else {
               b += value;
               entryField.textContent = b;
           }


        }

        if (arithmeticSign.includes(value)) {
            sign = value;
            entryField.textContent = sign;


        }

        if (value === '=') {
            if (b === '') b = a;

            switch (sign) {

                case '+':
                    a = +a + +b;
                    break;

                case '–':
                    a = a - b;
                    break;

                case '×':
                    a = a * b;
                    break;

                case '÷':
                    if (b === '0') {
                        entryField.textContent = 'Error';
                        a = '';
                        b = '';
                        sign = '';
                    }
                    a = a / b;
                    break;

                case '%':
                    a = (a * b) / 100;
                    break;

                case '±':
                    a = -a;
                    break;

            }
            finish = true;
            entryField.textContent = a;

            window.addEventListener('beforeunload', () => {
                if (sessionStorage.getItem('isReloaded')) {
                    entryField.textContent = lastOperation;
                }
            });

        }


 });


cancelInput.addEventListener('click', function () {
    clearEntryField(entryField);
});












