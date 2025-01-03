import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import RecipeCard from '@/components/RecipeCard'
import ErrorBoundary from '@/components/ErrorBoundary'
import { motion, AnimatePresence } from "framer-motion";

const Category = () => {

    const { category } = useParams()

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://yahalawa.net/api/orange/recipesByCategories/${category}`);

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
    }, [category]);


    //animation   
    const AnimationSettings = {
        transition: { duration: 0.5, ease: "easeInOut" },
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };


    return (
        <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">


            <div className='text-end w-full'>
                <p className='text-orange text-3xl mb-2'>{category}</p>
                <p className='rubriqueTitle'></p>
            </div>


            <section className="flex flex-wrap justify-center items-start w-full my-6">
                <ErrorBoundary>
                    <AnimatePresence>
                        {
                            Array.isArray(data) && data.map((el) => {
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

        </main>
    )
}

export default Category