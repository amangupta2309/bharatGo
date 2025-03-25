import { useState } from 'react';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { logoutUser } from '@/store/userSlice';
import CartIcon from '@/assets/shopping-cart.png'
import CartItem from './cartItem';
import { useAppDispatch } from '@/store/hooks';



const Nav = (props:any)=>{
    const user = useSelector((state:any) => state.user.user); 
    const cart = useSelector((state:any)=> state.cart);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // console.log(user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {items} = cart;

    let numberOfItems = 0;

     if(items){
        numberOfItems = items.reduce((curNumber:any, item:any) => {
            return curNumber + item.amount;
          }, 0);
     }

    const handleLogout = ()=>{
        dispatch(logoutUser());
        navigate('/');
    }
    const handleLogin = ()=>{
        navigate('/login');
    }
    const handleHome = ()=>{
        navigate('/');
    }
    const handleTriggerClick = (event:any) => {
        
        if (!user) {
          event.preventDefault();
          navigate("/login");
        } else {
          setIsDialogOpen(true);
        }
      };

    return(
        <div className='fixed left-0 right-0 flex bg-blue-300 h-16 items-center z-10'>
            <div className='ml-4 text-white text-4xl select-none cursor-pointer' onClick={handleHome}>
                Shopii
            </div>
            <div className='flex items-center space-x-4 ml-auto mr-8'>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                    <div className='ml-auto flex space-x-8 items-center' onClick={handleTriggerClick}>
                        <div className='bg-blue-400 w-44 h-12 rounded-full flex items-center pl-8 pr-8 space-x-4' onClick={props.onCartToggle}>
                            <img src={CartIcon} alt='cart icon' className='w-8' ></img>
                            <div className='bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center'>{numberOfItems}</div>
                        </div>
                    </div>
                    </DialogTrigger>
                    <DialogContent>
                    <div className='sticky top-0 flex justify-center items-center h-[2rem] text-2xl z-[40] border-b-4 border-red-900'>
                        Your Cart
                    </div>
                        <div className='h-[22rem] overflow-auto'>
                        <CartItem items={cart.items}/>
                        </div>
                        <div className='flex justify-between pr-8 text-2xl h-[2rem] border-t-4 border-red-900'>
                            <div>Total Amount</div>
                            <div>$ {cart.totalAmount}  <Button> Order </Button></div>
                        </div>
                    </DialogContent>
                </Dialog>
                {user && <DropdownMenu>
                                <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={()=> navigate('/profile')}>Profile</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>}
                {!user && <Button onClick={handleLogin} variant='ghost'> Login </Button>}
            </div>
        </div>
    )
}

export default Nav;