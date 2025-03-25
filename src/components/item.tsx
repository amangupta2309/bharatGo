// import React, { useState, useRef } from 'react';
// // import CartContext from '../../store/cartContext';

// // Define the type for the props of the Item component
// interface ItemProps {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
// }


// const Item: React.FC<ItemProps> = (props) => {
// //   const cartcxt = useContext(CartContext) as CartContextType;
//   const [amountIsValid, setAmountIsValid] = useState(true);
//   const enteredAmount = useRef<HTMLInputElement>(null);

//   const submitHandler = (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!enteredAmount.current) return;

//     const amount = enteredAmount.current.value;
//     const amountNumber = +amount;

//     if (
//       amount.trim().length === 0 ||
//       amountNumber < 1 ||
//       amountNumber > 10
//     ) {
//       setAmountIsValid(false);
//       return;
//     }

//     // cartcxt.addItem({
//     //   id: props.id,
//     //   name: props.name,
//     //   amount: amountNumber,
//     //   price: props.price,
//     // });
//     setAmountIsValid(true);
//   };

//   return (
//     <div className="flex m-2 p-4 border-2">
//       <div className="">
//         <div className="text-xl">{props.name}</div>
//         <div>{props.description}</div>
//         <div className="text-xl text-red-700">{props.price}</div>
//       </div>
//       <form className="form ml-auto" onSubmit={submitHandler}>
//         {/* <Input
//           label="Amount"
//           ref={enteredAmount}
//           input={{
//             type: 'number',
//             step: '1',
//             min: '1',
//             max: '10',
//             defaultValue: '1',
//           }}
//         /> */}
//         <button
//           type="submit"
//           className="text-xl text-red-700 border-2 rounded-full p-1 mt-1 w-28 hover:text-white hover:bg-red-700"
//         >
//           + Add
//         </button>
//         {!amountIsValid && <p>Please enter a valid amount (1-10).</p>}
//       </form>
//     </div>
//   );
// };

// export default Item;