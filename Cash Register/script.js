let price = 19.5;

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currency = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
let isOpen = true;
const cashEl = document.getElementById("cash");
const changeDueEl = document.getElementById("change-due");
const priceEl = document.getElementById('price');
const money = document.getElementById("money");
const purchaseBtn = document.getElementById('purchase-btn');

priceEl.innerHTML = `Item Price: ${price}`;
displayer(cid);

// Main function
const calculate = () => {
  let cash = parseFloat(cashEl.value);
  let closed = false;
  
  if (cash === price) {
    changeDueEl.innerHTML = "No change due - customer paid with exact cash";
    return;
  }
  else if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  let change = +(cash - price).toFixed(2); 
  let isPositive;
  let hasEnough;
  let changeAmountObj = {};

  for (let i = currency.length - 1; i >= 0; i--) {
    
    if (change < currency[i]) {
      continue;
    }
    if (change > getTotal(cid.slice(0, i + 1))) {
      changeDueEl.innerHTML = '<span class="red">Status: INSUFFICIENT_FUNDS</span>';
      return;
    }

    isPositive = (change - currency[i]) >= 0;
    hasEnough  = (cid[i][1] - currency[i]) >= 0;

    while (isPositive && hasEnough) {
      change    = +(change - currency[i]).toFixed(2);
      cid[i][1] = +(cid[i][1] - currency[i]).toFixed(2);
      changeAmountObj[cid[i][0]] ? changeAmountObj[cid[i][0]] += currency[i] : changeAmountObj[cid[i][0]] = currency[i];
      isPositive = (change - currency[i]) >= 0;
      hasEnough  = (cid[i][1] - currency[i]) >= 0;
    }

    if (getTotal(cid.slice(0, i + 1)) === 0) {
      closed = true;
      break;
    }
  }

  changeAmountObj = formatter(changeAmountObj);
  const text = displayChange(changeAmountObj);

  changeDueEl.innerHTML = `
    <span class="red">Status: ${closed ? "CLOSED" : "OPEN"}</span>
    <div>${text}</div>
  `; 

  displayer(cid);
  return;
};



/**
 * Displays the money in the drawer
 */
function displayer(cid) {
  money.innerHTML = "";
  cid.forEach((el) => {
    money.innerHTML += `
    <li>${
      el[0].endsWith("Y") 
      ? el[0][0] + el[0].substr(1,el[0].length-2).toLowerCase() + "ies"
      : el[0][0] + el[0].substr(1).toLowerCase() + "s"
    } 
    : $${el[1]}
    </li>
    `;
  })
};

/**
 *  Helper function returns the total amount of cash in drawer
 */
const getTotal = (cid) => {
  return cid.reduce((total, val) => {
    return total + val[1]
  }, 0)
}

/**
 * Helper function returns a string with the change
 */
function displayChange(changeAmountObj) {
  let text = "";
  for (let [currency, amount] of Object.entries(changeAmountObj)) {
    text += `<p>${currency}: $${amount}</p>`;
  }
  return text;
}

/**
 * Helper function. Formats change object to be returned
 */
function formatter(changeAmountObj) {
  for (const amount in changeAmountObj) {
    changeAmountObj[amount] = +(changeAmountObj[amount].toFixed(2));
  }
  return changeAmountObj;
}


purchaseBtn.addEventListener('click', calculate);
cashEl.addEventListener('keyup', e => {
  if (e.key === "Enter") {
    purchaseBtn.click();
  }
});