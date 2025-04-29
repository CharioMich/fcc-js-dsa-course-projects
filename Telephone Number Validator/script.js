const input = document.getElementById('user-input');
const output = document.getElementById('results-div');
const checkbtn = document.getElementById('check-btn');
const clearbtn = document.getElementById('clear-btn');

const clear = () => {
    output.innerHTML = '';
    return;
};

const case1 = /^1\s[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/;
const case2 = /^1\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{4}$/;
const case37 = /^1?\s?\([0-9]{3}\)\s?[0-9]{3}\-[0-9]{4}$/;
const case4 = /^1\s[0-9]{3}\s[0-9]{3}\s[0-9]{4}$/;
const case5 = /^[0-9]{10}$/;
const case6 = /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/;

const cases = [case1, case2, case37, case4, case5, case6];
const clen = cases.length;

const checker = () => {
    if (!input.value) {
        alert("Please provide a phone number");
        return;
    }
    else {
        var bool = false;
    
        for (let i = 0; i < clen; i++) {
            if (cases[i].test(input.value.trim())) {
                bool = true;
                break
            }
        }
        if (bool) {
            output.innerHTML += `Valid US number: ${input.value}` + '<br>';
            return;
        }
        else {
            output.innerHTML += `Invalid US number: ${input.value}` + '<br>';
            return;
        }
    }
};

document.getElementById('clear-btn').addEventListener('click', clear);
document.getElementById('check-btn').addEventListener('click', checker);