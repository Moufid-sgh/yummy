import RandomRecipeCard from "./RandomRecipeCard";
import { useState, useEffect } from "react";

const GetRandomRecipes = () => {


  //get recipes
  const [data, setData] = useState(); 
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://yahalawa.net/api/orange/randomRecipes');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result); 
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);



    return (
        <div dir="rtl" className="flex items-center justify-center flex-wrap w-full">
            {Array.isArray(data) && data.map((el) => {
                return <RandomRecipeCard key={el.id} el={el} />
            })}
        </div>
    )
}

export default GetRandomRecipes