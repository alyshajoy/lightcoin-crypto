class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let total = 0;
    for (let transaction of this.transactions) {
      total += transaction.value;
    }
    return total;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
      this.time = new Date();
      this.account.addTransaction(this);
  }

}

class Withdrawal extends Transaction {

  get value() {
    return this.amount * -1;
  }

  isAllowed() {
    return this.amount <= this.account.balance;
  }

  commit() {
    if (this.isAllowed()){
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

ta = new Deposit(75.00, myAccount);
ta.commit();
console.log("ta", ta);
console.log("balance1:", myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);
console.log("balance2:", myAccount.balance);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);
console.log("balance3", myAccount.balance);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log("transaction 3:", t3);
console.log("balance4", myAccount.balance);

console.log("balance", myAccount.balance);
