/*import fs from 'fs';
import csv from 'csv-parser';
const INDEX_FILE = './test-data/currentIndex.json';

export async function getOrderId() {
  const rows: any[] = [];

  await new Promise<void>((resolve) => {
   fs.createReadStream('./test-data/orders.csv')
      

      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve());
  });

  let currentIndex = JSON.parse(
    fs.readFileSync(INDEX_FILE, 'utf-8')
  ).currentIndex;

  if (currentIndex >= rows.length) {
    currentIndex = 0; // Start from first data row again
  }

  const selectedRow = rows[currentIndex];
  console.log("Selected Row:", selectedRow);

  const nextIndex =
    currentIndex + 1 >= rows.length ? 0 : currentIndex + 1;

  fs.writeFileSync(
    INDEX_FILE,
    JSON.stringify({ currentIndex: nextIndex }, null, 2)
  );

  return {
    orderId: selectedRow.OrderId,
    jd: selectedRow.JD,
    username: selectedRow.UserName,
    password: selectedRow.Password,
    
  };
}
  */

import fs from 'fs';
import csv from 'csv-parser';

const INDEX_FILE = './test-data/currentIndex.json';

export async function getTestData() {
  const orderRows: any[] = [];
  const userRows: any[] = [];

  // Read Orders CSV (with headers)
  await new Promise<void>((resolve) => {
    fs.createReadStream('./test-data/orders.csv')
      .pipe(csv())
      .on('data', (row) => orderRows.push(row))
      .on('end', () => resolve());
  });

  // Read Users CSV (without headers)
  await new Promise<void>((resolve) => {
    fs.createReadStream('./test-data/users.csv')
      .pipe(
        csv({
          headers: ['username1', 'password1']
        })
      )
      .on('data', (row) => userRows.push(row))
      .on('end', () => resolve());
  });

  let currentIndex = JSON.parse(
    fs.readFileSync(INDEX_FILE, 'utf-8')
  ).currentIndex;

  // Reset if either file is exhausted
  const maxRows = Math.min(orderRows.length, userRows.length);

  if (currentIndex >= maxRows) {
    currentIndex = 0;
  }

  const selectedOrder = orderRows[currentIndex];
  const selectedUser = userRows[currentIndex];

  console.log('Selected Order:', selectedOrder);
  console.log('Selected User:', selectedUser);

  const nextIndex =
    currentIndex + 1 >= maxRows ? 0 : currentIndex + 1;

  fs.writeFileSync(
    INDEX_FILE,
    JSON.stringify({ currentIndex: nextIndex }, null, 2)
  );

  return {
    orderId: selectedOrder.OrderId,
    jd: selectedOrder.JD,
    username1: selectedUser.username1,
    password1: selectedUser.password1,
  };
}