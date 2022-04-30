export default function splitPayments(payments) {
  const people = Object.keys(payments);
  const valuesPaid = Object.values(payments);

  const sum = valuesPaid.reduce((acc, curr) => curr + acc);
  const mean = sum / people.length;

  const sortedPeople = people.sort(
    (personA, personB) => payments[personA] - payments[personB]
  );
  const sortedValuesPaid = sortedPeople.map(
    (person) => payments[person] - mean
  );

  let i = 0;
  let j = sortedPeople.length - 1;
  let debt;
  let owesArr = [];
  while (i < j) {
    debt = Math.min(-sortedValuesPaid[i], sortedValuesPaid[j]);
    sortedValuesPaid[i] += debt;
    sortedValuesPaid[j] -= debt;

    owesArr.push(
      `${sortedPeople[i]} owes ${sortedPeople[j]} €${debt.toFixed(2)}`
    );

    if (sortedValuesPaid[i] === 0) {
      i++;
    }

    if (sortedValuesPaid[j] === 0) {
      j--;
    }
  }
  setOwes(owesArr);
}