// usuwanie elementu z tablicy o danym id

// idToRemove = DESIRED_ID;

// myArr = myArr.filter(function(item) {
//     return item.Id != idToRemove;
// });

import pkg from "@tilework/opus";
const { client, Query } = pkg;
// import { client, Query } from "@tilework/opus";

client.setEndpoint("http://localhost:4000/");
const productsAllMinQuery = new Query("categories", true).addFieldList([
  "name, products{id, name, gallery, prices{amount, currency{symbol}} }",
]);

const productsAllMin = await client.post(productsAllMinQuery);

console.log(productsAllMin);
console.log(productsAllMin.categories[0].products);
console.log(productsAllMin.categories[1].products);
console.log(productsAllMin.categories[2].products);

// -----------------------------------------------------------------------------------------------------------------

// const original = [
//   {
//     id: 1,
//     name: "A",
//     children: [
//       {
//         id: 2,
//         name: "B",
//         children: [
//           {
//             id: 3,
//             name: "C",
//           },
//           {
//             id: 4,
//             name: "D",
//           },
//         ],
//       },
//     ],
//   },
// ];

// const prices = {
//   prices: [
//     {
//       currency: {
//         label: "USD",
//         symbol: "$",
//       },
//       amount: 144.69,
//     },
//     {
//       currency: {
//         label: "GBP",
//         symbol: "£",
//       },
//       amount: 104,
//     },
//     {
//       currency: {
//         label: "AUD",
//         symbol: "A$",
//       },
//       amount: 186.65,
//     },
//     {
//       currency: {
//         label: "JPY",
//         symbol: "¥",
//       },
//       amount: 15625.24,
//     },
//     {
//       currency: {
//         label: "RUB",
//         symbol: "₽",
//       },
//       amount: 10941.76,
//     },
//   ],
// };

// const modified = prices.map((stu) => {
//   return {
//     student: {
//       id: stu.id,
//       name: stu.name,
//     },
//     children: stu.children,
//   };
// });

// console.log(modified);

//----------------------------------------------------

// let path = [];

// let parent = "";

// function getParent(path, json, value) {
//   for (let key in json) {
//     if (typeof json[key] === "object") {
//       path.push(key.toString());
//       getParent(path, json[key], value);
//       console.log(path);
//       path.pop();
//     } else {
//       if (json[key] == value) {
//         parent = path[0];
//       }
//     }
//   }
// }

// const mainObject = {
//   FIRST: {
//     key1: {
//       key11: "value1",
//     },
//     key2: "value2",
//   },
//   SECOND: {
//     key3: "value3",
//     key4: "value4",
//   },
// };

// const prices = {
//   prices: [
//     {
//       currency: {
//         label: "USD",
//         symbol: "$",
//       },
//       amount: 144.69,
//     },
//     {
//       currency: {
//         label: "GBP",
//         symbol: "£",
//       },
//       amount: 104,
//     },
//     {
//       currency: {
//         label: "AUD",
//         symbol: "A$",
//       },
//       amount: 186.65,
//     },
//     {
//       currency: {
//         label: "JPY",
//         symbol: "¥",
//       },
//       amount: 15625.24,
//     },
//     {
//       currency: {
//         label: "RUB",
//         symbol: "₽",
//       },
//       amount: 10941.76,
//     },
//   ],
// };

// getParent(path, prices, "AUD");

// console.log(parent.prices);
