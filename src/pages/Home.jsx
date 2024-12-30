import Rubrique from "@/components/Rubrique"
import GetRandomRecipes from "@/components/GetRandomRecipes"
import ErrorBoundary from "@/components/ErrorBoundary"

const Home = () => {


  return (
    <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 lg:py-8 py-4">

      <Rubrique />

      {/* أكيد باش يعجبوك --------------------------------------------------------- */}
      <section className="w-full mb-16">
        <div className='text-end'>
          <p className='text-orange text-3xl mb-2'>ما نحيروش في التصنيف</p>
          <p className='rubriqueTitle'></p>
        </div>
        <ErrorBoundary>
          <GetRandomRecipes />
        </ErrorBoundary>
      </section>

    </main>
  )
}

export default Home