const myFunc = () => {
    const text = document.getElementById("text-input").value;
    const result = document.getElementById("result");

    if (!text) {
        alert("Please input a value")
    }

    const cleanText = text.toLowerCase().replace(/[^\w]*_*/g,'').replace(/\s/g,'');

    console.log(cleanText)

    checker(cleanText) 
    ? result.innerHTML = `<b>${text}</b> is a palindrome!`
    : result.innerHTML = `<b>${text}</b> is not a palindrome.`;
    return 
}

const checker = (string) => {
    return string === string.split("").reverse().join("");
}