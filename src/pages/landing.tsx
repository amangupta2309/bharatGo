import { useRef, useState, useEffect } from "react";
import { fetchData } from "@/services/api";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// import Input from "@/components/input";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cartSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state
  const enteredAmount = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchData("products");
        setProducts(data);
        setFilteredProducts(data);
      } catch (err:any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products) {
      filterProducts(selectedCategory, searchQuery); // Pass search query to filter
    }
  }, [selectedCategory, products, searchQuery]); // Add searchQuery to dependency array

  const filterProducts = (category: string, query: string) => {
    let filtered = products;

    if (category !== "all") {
      if(filtered){
        filtered = filtered.filter(
          (product: any) => product.category.slug.toLowerCase() === category.toLowerCase()
        );
      } 
    }

    if (query) {
      filtered = filtered?.filter((product: any) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const submitHandler = (product: any) => {
    // event.preventDefault();
    // console.log("triggered");
    // console.log(product)
    if(!user){
      navigate('/login');
      return;
    }
  
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        amount: 1,
        image: product.images[0],
      };
  
      dispatch(cartActions.add(cartItem));
      setAmountIsValid(true);
  };

  if (loading) return <p>Loading...</p>;
  if (!products) return null;

  const categories = ["All", "Clothes", "Electronics", "Furnitures", "Toys"];

  return (
    <div>
      <div className="bg-gray-800 text-white pl-8 flex justify-between items-center">
        <nav>
          <ul className="flex space-x-4">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryClick(category.toLowerCase())}
                  className={selectedCategory === category.toLowerCase() ? "underline" : ""}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-gray-700 text-white p-2 rounded ml-4"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-8 py-4">
        {filteredProducts.length>0 ? (
          filteredProducts?.map((product: any) => (
            <Card key={product.id}>
              <CardContent>
                <img src={product.images[0]} alt="product image" />
              </CardContent>
              <CardFooter>
                <div className="flex">
                  <div>{product.title}</div>
                  
                </div>
                
                <div>
                  <Button 
                  className="text-xl text-red-700 border-2 rounded-full p-1 mt-1 w-28 hover:text-white hover:bg-red-700"
                  onClick={() => submitHandler(product)}
                  >
                    + Add
                  </Button>
                  {/* <form
                    className="form ml-auto"
                    onSubmit={(event) => submitHandler(event, product)}
                  >
                    
                    <label htmlFor="amount">Amount</label>
                    <input 
                      id="amount"
                      ref={enteredAmount}
                      type="number" 
                      step="1"
                      min="1"   
                      max="10"
                      defaultValue="1"   
                    />
                    <button
                      type="submit"
                      className="text-xl text-red-700 border-2 rounded-full p-1 mt-1 w-28 hover:text-white hover:bg-red-700"
                    >
                      
                    </button>
                    {!amountIsValid && <p>Please enter a valid amount (1-10).</p>}
                  </form> */}
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div>No items found.</div>
        )}
      </div>
    </div>
  );
};

export default Landing;