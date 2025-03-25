import React from 'react';
import { cartActions } from '@/store/cartSlice';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';


// Define the type for the Item
interface Item {
  id: number;
  title: string;
  price: number;
  amount: number;
  image: string;
  // Add other properties as needed
}



// Define the type for the CartItem props
interface CartItemProps {
  items: Item[];
}

const CartItem: React.FC<CartItemProps> = (props) => {
  const dispatch = useDispatch();
  const submit = (type: string, item:Item)=>{
    // console.log("submi");
    // console.log(type);
    // console.log(item);
    if(type === "add"){
      dispatch(cartActions.add({
        id: item.id,
        title: item.title,
        amount: 1,
        price: item.price,
        image: item.image
      }))
    }
    else{
      dispatch(cartActions.remove({ id: item.id }));
    }
  }
  const Items = props.items.map((item:Item) => {
    return (
      <div key={item.id} className="flex p-4 border-2 m-2 items-center">
  <div
    className="relative p-4 w-full"
    style={{
      position: "relative",
      padding: "20px",
    }}
  >
    {/* Background Image with 40% Visibility */}
    <div
      className="absolute inset-0 bg-cover bg-no-repeat opacity-40"
      style={{ backgroundImage: `url(${item.image})` }}
    ></div>

    {/* Content with Full Visibility */}
    <div className="relative z-10">
      <div className="text-2xl">{item.title}</div>
      <div className="flex">
        <div className="pr-16">$ {item.price}</div>
        <div className="border-2 pl-2 pr-2">× {item.amount}</div>
      </div>
    </div>
  </div>

  {/* Buttons */}
  <div className="flex ml-auto p-2">
    <Button className="m-2 cursor-pointer" onClick={() => submit("add", item)}> + </Button>
    <Button className="m-2 cursor-pointer" onClick={() => submit("remove", item)}> - </Button>
  </div>
</div>
    );
  });

  return <div>{Items}</div>;
};

export default CartItem;