//let balance = 500.00;

class Account { // Account class that will keep track of the user and their balance.

  constructor(username) { // constructor method is an important part of creating objects in JavaScript and is used to set up the initial state of the object when it is created.
    this.username = username;
    this.transactions = [];
  }

  get balance() { // Calculate the balance using the transaction objects.
    let balance = 0;
    for (let sum of this.transactions) {
      balance += sum.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction { //Superclass - core information, here we use it for Deposit & Withdrawal

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() { //'commit()' method is used to execute the transaction by updating the balance in the account.
    if (!this.isAllowed()) {
      return false;
    }
    this.time = new Date();//Keep track of the time of the transaction
    this.account.addTransaction(this);
    return true;
  }

}

class Deposit extends Transaction { // Deposit is a subclass. extends - keyword for inherit behaviour (Deposit inherit Transaction constructor)

  get value() {
    return this.amount;
  }

  isAllowed() { //always allowed
    return true;
  }

}


class Withdrawal extends Transaction { // Withdrawal is a subclass. extends - keyword for inherit behaviour (Withdrawal inherit Transaction constructor)

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patro');

console.log('Starting Account Balance: ', myAccount.balance);

t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Transaction 1:', t1);
console.log('Account Balance: ', myAccount.balance);

t2 = new Deposit(120.00, myAccount);
console.log('Commit result:', t2.commit());
console.log('Transaction 2:', t2);
console.log('Account Balance: ', myAccount.balance);

t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());
console.log('Transaction 3:', t3);
console.log('Account Balance: ', myAccount.balance);

console.log('Account Transaction History: ', myAccount.transactions);

