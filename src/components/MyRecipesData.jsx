
import { useEffect, useState } from 'react'
import RecipeCard from "@/components/RecipeCard"
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from './authContext';
import ErrorBoundary from './ErrorBoundary';


const MyRecipesData = () => {


  //get user id-------------------------------------------//
  const [userId, setUserId] = useState()

  useEffect(() => {
    const id = localStorage.getItem("id")
    setUserId(id)
  }, [])



  //get my saves-----------------------------------//
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  const { needsUpdate } = useAuth();

  useEffect(() => {

    if (!userId) return;
    console.log("needsUpdate", needsUpdate)

    const getMySaves = async () => {

      try {
        const response = await fetch("https://yahalawa.net/api/orange/mySaves", {
          method: "POST",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        setData(data.recipes)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    };

    getMySaves()

  }, [userId, needsUpdate])



  //fetch menu item for category--------------------------------//
  const [getCuisine, setGetCuisine] = useState()
  const [getPatisserie, setGetPatisserie] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://yahalawa.net/api/orange/menu');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setGetCuisine(result[1].subtitle?.map(el => el.title) || [])
        setGetPatisserie(result[2].subtitle?.map(el => el.title) || [])

      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);



  //handle category---------------------------------------------//
  const [activeFilter, setActiveFilter] = useState('وصفاتي شيلة بيلا');

  const categoryMapping = {
    'كاتوات وحلويات وفازات': getPatisserie,
    'تصنيف ومالح وشيخات': getCuisine,
    'وصفاتي شيلة بيلا': []
  };


  const getFilteredRecipes = () => {
    if (activeFilter === 'وصفاتي شيلة بيلا') return data;

    return data?.filter(recipe =>
      recipe.category?.some(cat =>
        categoryMapping[activeFilter]?.includes(cat?.title?.toLowerCase())
      ) || false
    );
  };

  //animation   
  const AnimationSettings = {
    transition: { duration: 0.5, ease: "easeInOut" },
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };



  return (
    <>
      <section className="flex items-center justify-end space-x-4 w-full mt-6">
        {Object.keys(categoryMapping).map((cat) => {
          return <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`border border-black rounded-[4px] py-2 px-6 transition-all duration-300 ${activeFilter === cat
              ? 'linearBlackBtn text-white'
              : 'bg-white hover:linearBlackBtn hover:text-white'
              }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        })}

      </section>


      {/* recipes--------------------------------------------------------------------------------- */}
      <section className="flex flex-wrap justify-center items-start w-full my-6">
        <ErrorBoundary>
          <AnimatePresence>
            {
              getFilteredRecipes()?.map((el) => {
                return (
                  <motion.div
                    key={el.id}
                    {...AnimationSettings}
                  >
                    <RecipeCard el={el} />
                  </motion.div>
                )
              })
            }
          </AnimatePresence>
        </ErrorBoundary>
      </section>


      {
        Array.isArray(data) && (data.length === 0 && !loading) &&
        <div className='flex justify-end  w-full mt-10'>
          <p className="text-end bg-[#5684EB] text-white rounded-[4px]  p-2 lg:w-2/3">
            حاليا، الموندو متاعك، كيفاش أنقولوها، ومن غير نبزيات ... مافيهوش وصفات.
            متنساش، الوصفات إلي يعجبوك أعمل عليهم جام، هكة يتسجللك ديراكت. أوكي
          </p>
        </div>
      }
    </>
  )
}

export default MyRecipesData