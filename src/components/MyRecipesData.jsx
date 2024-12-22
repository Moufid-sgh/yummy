
import { useEffect, useState } from 'react'
import RecipeCard from "@/components/RecipeCard"


const MyRecipesData = () => {


    //get user id-------------------------------------------//
  const [userId, setUserId] = useState()

  useEffect(() => {
    const id = localStorage.getItem("id")
    setUserId(id)
  }, [])
  

  //get my saves
  const [data, setData] = useState()

  useEffect(() => {

    if (!userId) return;

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
      }
    };

    getMySaves()

  }, [userId])

  
  //handle category
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredData = selectedCategory
    ? data.filter((item) => item.category === selectedCategory)
    : data;

    return (
        <>
            <section className="flex items-center justify-end space-x-4 w-full mt-6">
                <p className="border border-black rounded-[4px] py-2 px-6">
                    وصفاتي شيلة بيلا
                </p>

                <p className="border border-black rounded-[4px] py-2 px-6">
                    كاتوات وحلويات وفازات
                </p>

                <p className="border border-black rounded-[4px] py-2 px-6">
                    تصنيف ومالح وشيخات
                </p>
            </section>



            {/* recipes--------------------------------------------------------------------------------- */}

            <section className="flex flex-wrap justify-center items-start w-full my-6">
                {
                    Array.isArray(data) && data.map((el) => {
                        return (
                            <RecipeCard key={el.id} el={el} />
                        )
                    })
                }
            </section>


            {
               Array.isArray(data) && data.length === 0 &&
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