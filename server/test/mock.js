const ADLER32 = require("adler-32");

const group = {
  _id: "123456789",
  groupName: 'testGroup',
  password: "testPassword",
};

const mockGroup = {
  groupName: "testgroup",
  password: ADLER32.str(Date.now().toString())
};

const mockExpense = { 
  title: "newexpense", 
  value: 300, 
  currency: "USD", 
  tag: "casa", 
  payer: "testUID", 
  payerName: "gabriele" 
};


module.exports = { group, mockGroup, mockExpense };
