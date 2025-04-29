/* Converter function without recursion 
const intToRom = (number) => {
    const nums = {
        'M': 1000, 
        'CM': 900, 
        'D': 500, 
        'CD': 400, 
        'C': 100, 
        'XC': 90, 
        'L': 50, 
        'XL': 40, 
        'X': 10, 
        'IX': 9, 
        'V': 5, 
        'IV': 4, 
        'I': 1
    };

    const roman = "";
    for (let key in nums) {
        while (number >= nums[key]) {
            roman += key;
            number -= nums[key];
        }
    }
    return roman;
};
*/
const nums = {
    'M': 1000, 
    'CM': 900, 
    'D': 500, 
    'CD': 400, 
    'C': 100, 
    'XC': 90, 
    'L': 50, 
    'XL': 40, 
    'X': 10, 
    'IX': 9, 
    'V': 5, 
    'IV': 4, 
    'I': 1
};

const getRom = (num) => {
    let converted = "";
    // Recursive converter function
    const recursiveIntToRom = (number) => {
        if (number <= 0) {
            return converted;
        }
        for (const [rom, int] of Object.entries(nums)) {
            if (int <= number) {
                converted += rom;
                return recursiveIntToRom(number - int)
            }
        }
    };
    return recursiveIntToRom(num);
};


const handleInput = () => {
    let input = document.getElementById('number').value;
    let output = document.getElementById('output');
    let message = '';
    output.classList.add('out-alert')

    if (!input || isNaN(input)) {
        message = "Please enter a valid number.";
    }
    else {
        let intin = parseInt(input);
        if (intin < 1) {
            message = "Please enter a number greater than or equal to 1.";
        }
        else if (intin > 3999) {
            message = "Please enter a number less than or equal to 3999.";
        }
        else {
            output.classList.remove('out-alert')
            output.classList.add('out-display')
            output.textContent = getRom(intin);
            return;
        }
    }
    // Display the message for any of the constraints 
    output.textContent = message;
};

document.getElementById('convert-btn').addEventListener('click', handleInput);