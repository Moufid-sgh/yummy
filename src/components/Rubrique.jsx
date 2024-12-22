import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import RecipeCarousel from './RecipeCarousel'
import ErrorBoundary from './ErrorBoundary';

const Rubrique = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://yahalawa.net/api/orange/topic');

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
        <div className='w-full overflow-hidden'>
            <ErrorBoundary>
                {data?.topic?.map((el, index) => {

                    return (
                        <section key={index} className="w-full mt-6">

                            <div className='text-end'>
                                <p className='text-orange text-3xl mb-2'>{el.title}</p>
                                <p className='rubriqueTitle'></p>
                            </div>

                            {/* recipe card---------------------------------------------------- */}
                            <RecipeCarousel recipes={el.recipe} />


                            {/* TAGS PART--------------------------------------------------------- */}
                            {/* {index === 1 && (
                            <>
                                <div>
                                    <div className='text-end mb-6'>
                                        <p className='text-orange text-3xl mb-2'>أفكار عطاير</p>
                                        <p className='rubriqueTitle'></p>
                                    </div>

                                    <div dir="rtl" className="flex items-center justify-center flex-wrap space-x-2 lg:space-x-3 mb-10">

                                        {data?.randomTags.slice(0, 26).map((el) => {
                                            return (
                                                <Link key={el.id} to={`/tags/${el.id}`} className="tag-item bg-red text-white py-3 px-6 mx-3 rounded-sm my-4 hover:bg-blue duration-300">
                                                    {el.title}
                                                </Link>
                                            )
                                        })
                                        }
                                    </div>

                                </div>
                            </>
                        )} */}
                        </section>
                    )
                })}
            </ErrorBoundary>
        </div>
    )
}

export default Rubrique