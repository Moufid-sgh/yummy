import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import SecondPart from '@/components/recipe/SecondPart';
import Save from "@/components/Save"
import ErrorBoundary from '@/components/ErrorBoundary';
import { Separator } from '@radix-ui/react-separator';


const Recipe = () => {

  const { id } = useParams();


    //get container height
    const containerRef = useRef()

    const [getHeight, setGetHeight] = useState(0);
  
    useEffect(() => {
      const observer = new ResizeObserver((entries) => {
        if (entries[0]) {
          setGetHeight(entries[0].contentRect.height);
        }
      });
  
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
  
      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }, []);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalLoading, setTotalLoading] = useState(false);
  

  //fetch data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://yahalawa.net/api/orange/recipe/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result)
        setTotalLoading(true)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [id]);



  const sortedSteps = data?.steps.sort((a, b) => a.step - b.step);




  return (
    <main className="flex min-h-screen flex-col px-6 md:px-8 lg:px-32 py-8">
      <div dir="rtl" ref={containerRef} className="lg:flex items-start justify-between mt-8 pb-4 w-full">
        <section className="flex-1">

          {/* video fo mobile---------------------------------------------------------------------------*/}
          <div className="lg:hidden mb-12">
            <div className="flex items-center justify-center">
              <video className="w-[338px] h-[600px]"
                poster={data?.imgPath}
                controls
                preload="metadata">
                <source src={data?.videoPath} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="mb-10 lg:mb-0">
            <div className="lg:w-[60%]">
              <h1 className="text-[32px] text-darkblue">{data?.title}</h1>
              <div className="text-[21px] w-fit categoryTitle">
                {data?.category.map(el => {
                  return (
                    <Link to={`/category/${el.title}`} key={el.id} className="hover:opacity-70 duration-300">
                      <p>{el.title}</p>
                    </Link>
                  )
                })}
              </div>


              {/* time------------------------------------------------------------------------- */}
              <div className="mt-10 mb-16">
                <div className="flex items-center mb-4">
                  <Separator className="w-0.5 h-3.5 bg-[#00235B40]" />
                  <p className="px-3 lg:px-4">{data?.difficulty}</p>

                  <Separator className="w-0.5 h-3.5 bg-[#00235B40]" />
                  <div className="flex items-center px-3 lg:px-4">
                    <p>عدد الحصص</p>
                    <p className="mr-2">{data?.nbr_serves}</p>
                  </div>
                  <Separator className="w-0.5 h-3.5 bg-[#00235B40]" />
                </div>
            

                <div className="flex items-center">
                <Separator className="w-0.5 h-3.5 bg-[#00235B40]" />
                  <div className="flex items-center px-3 lg:px-4">
                    <p>وقت التحضير</p>
                    <p className="mr-1 lg:mr-2 whitespace-nowrap">{data?.preparation_time} دق</p>
                  </div>
                  <Separator className="w-0.5 h-3.5 bg-[#00235B40]" />
                  <div className="flex items-center px-3 lg:px-4">
                    <p>الوقت الاجمالي</p>
                    <p className="mr-1 lg:mr-2 whitespace-nowrap">{data?.total_time} دق</p>
                  </div>
                  <Separator className="w-0.5 h-3.5 bg-[#00235B40]" />
                </div>
              </div>
            </div>
          </div>



          {/* ingredient & preparation & steps------------------------------------------------------------ */}
          <ErrorBoundary>
            
            {totalLoading && <SecondPart
              ingredients={data?.ingredients}
              ustensiles={data?.ustensiles}
              nbr_serves={data.nbr_serves}
              sortedSteps={sortedSteps}
              ingredient_title={data?.ingredient_title}
            />}
          </ErrorBoundary>


        </section>


        {/* video fo desktop---------------------------------------------------------------------------*/}
        <div className="hidden lg:block w-[338px]" style={{ height: getHeight }}>
          <div className="relative flex items-center justify-center lg:sticky lg:top-7">
            <video className="w-[338px] h-[600px]"
              poster={data?.imgPath}
              controls
              preload="metadata">
              <source src={data?.videoPath} type="video/mp4" />
            </video>
            <Save recipeId={data?.id} />
          </div>
        </div>
      </div>


    </main>
  )
}

export default Recipe