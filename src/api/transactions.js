import { createTransactionsFixture } from '../mock/transactions';

export const getTransactions = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve({ ok: true, data: createTransactionsFixture() });
      } catch (error) {
        reject(error);
        return;
      }
    }, 1200);
  });
};

/**
 * Uncomment below to test other states
 */

// ERROR ❌
// export const getTransactions = async () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         throw new Error('Error');
//         resolve({ ok: true, data: createTransactionsFixture() });
//       } catch (error) {
//         reject(error);
//         return;
//       }
//     }, 1200);
//   });
// };

// EMPTY 📦
// export const getTransactions = async () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         resolve({ ok: true, data: [] || createTransactionsFixture() });
//       } catch (error) {
//         reject(error);
//         return;
//       }
//     }, 1200);
//   });
// };
