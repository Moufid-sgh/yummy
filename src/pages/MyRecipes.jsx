import MyRecipesData from "@/components/MyRecipesData"


const MyRecipes = () => {


  return (
    <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">


      <div className='w-full'>
        <div className='text-end'>
          <p className='text-orange text-3xl mb-2'>الموندو متاعي</p>
          <p className='rubriqueTitle'></p>
        </div>
        <p className="bg-blueTitle w-full h-[1px]"></p>
      </div>

      <MyRecipesData />

    </main>
  )
}

export default MyRecipes