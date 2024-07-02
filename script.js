const expenseModal = document.querySelector("#add-expense-modal"); // expense modal
const modalCloseBtn = document.querySelector(".close-btn"); // expense modal close button
const addExpense = document.querySelector("#add-expense-btn"); // add expense button (main UI)
const newPersonBtn = document.querySelector("#add-person-btn") // add new person button (main UI)
const newPersonModal  = document.querySelector("#add-person-modal"); // new person modal
const detailsContainer = document.querySelector(".details-container"); // list to add the expenses.
const addExpenseSubmitBtn = document.querySelector(".add-Expense-Btn"); 

const overviewCards = document.querySelector(".overview-cards");


const personAccounts = [
    { name: "Uzair", amount: 0 },
    { name: "Afaq", amount: 0 },
    { name: "Shaheer", amount: 0 },
    { name: "Ahsan", amount: 0 },
    { name: "Junaid", amount: 0 }
];

// show modal to add expense
addExpense.addEventListener("click", function() {
    expenseModal.classList.remove("display-none");
})

// close expense modal 
modalCloseBtn.addEventListener("click", function() {
    expenseModal.classList.add("display-none");

})

// show the new person modal
newPersonBtn.addEventListener("click", function() {
    newPersonModal.classList.remove("display-none");
})

// add new person ( submit ) button clicked
document.querySelector(".add-Person-Btn").addEventListener("click", function(e) {
    e.preventDefault();

    const personName = document.querySelector("#person-name").value;


    const div = document.createElement("div");
    div.classList.add("card");
    const h3  = document.createElement("h3");
    h3.classList.add("person-account-name");
    h3.innerText = personName;
    const p = document.createElement("p");
    p.classList.add("person-account-amount");
    p.innerText = "0";

    // append h3 and p into div (card)
    div.appendChild(h3);
    div.appendChild(p);

    // append div into the overviewCards sections
    overviewCards.appendChild(div);

    personAccounts.push({name:`${personName}`, amount: 0});

    newPersonModal.classList.add("display-none");
    clearUpInputs();
})


// close the new person modal
document.querySelector(".new-person-close-btn").addEventListener("click", function() {
    newPersonModal.classList.add("display-none");
})


// enter expense
addExpenseSubmitBtn.addEventListener("click", function(e) {
    e.preventDefault();

    const amount = document.querySelector("#amount").value;
    const numPeople = document.querySelector("#num-people").value;
    const payer = document.querySelector("#payer").value;
    const description = document.querySelector("#description-input").value;

    const personsInExpense = document.querySelector("#persons-in-expenses").value; // get string from it.

    // Split the string into an array and log the result and its type
    const personsArray = personsInExpense.split(",").map(item => item.trim());

    const li = document.createElement("li");
    
    const p1 = document.createElement("p");
    let textNode = document.createTextNode(description);
    p1.classList.add("description-container");
    p1.appendChild(textNode);
    li.appendChild(p1);

    let p2 = document.createElement("p");
    const perPerson = amount / numPeople;
    textNode = document.createTextNode(perPerson);
    p2.appendChild(textNode);
    p2.innerText += " / Person";
    p2.classList.add("amount-per-person");
    li.appendChild(p2);

    let p3 = document.createElement("p");
    p3.innerText = "Paid by: " + payer;
    p3.classList.add("payer");
    li.appendChild(p3);

    detailsContainer.appendChild(li);
    expenseModal.classList.add("display-none");


    // calculations
    let payerGetMoney = false;
    personsArray.forEach(person => {
        personAccounts.forEach(p => {
            if (payer.toLowerCase() === p.name.toLowerCase() && !payerGetMoney) {
                p.amount += (amount - perPerson); // Add total amount to payer
                payerGetMoney = !payerGetMoney; 
            }
            if (p.name.toLowerCase() === person.toLowerCase() && payer.toLowerCase() !== person.toLowerCase()) {
                p.amount -= perPerson; // Deduct per person amount from others
            }
        });
    });
        
    clearUpInputs();
    renderUsers(personAccounts);
})


const clearUpInputs = () => {
    document.querySelector("#amount").value = "";
    document.querySelector("#num-people").value = "";
    document.querySelector("#payer").value = "";
    document.querySelector("#description-input").value = "";


    document.querySelector("#person-name").value = "";
}

const renderUsers = (arrayOfPersons) => {

    overviewCards.innerHTML = "";

    arrayOfPersons.forEach(person => {
        const div = document.createElement("div");
        div.classList.add("card");

        const h3 = document.createElement("h3");
        h3.classList.add("person-account-name");
        h3.innerText = person.name;

        const p = document.createElement("p");
        p.classList.add("person-account-amount");
        p.innerText = person.amount;

        p.style.color = person.amount > 1 ? "green" : person.amount < 0 ? "red" : "black";

        div.appendChild(h3);
        div.appendChild(p);
        overviewCards.appendChild(div);


    })
}

renderUsers(personAccounts);

