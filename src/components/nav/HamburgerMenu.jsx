'use client'

import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Suspense, useState, useRef, useTransition, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import ThumbComponent from "../ThumbComponent";
import { useNavigate } from "react-router-dom";


const HamburgerMenu = ({ data }) => {


    const [isPending, startTransition] = useTransition()

    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState({
        recipes: [],
        tips: []
    });

    const [noResults, setNoResults] = useState(true);


    const handleSearch = () => {
        startTransition(async () => {
            try {
                const response = await fetch(`https://yahalawa.net/api/orange/search?searchQuery=${encodeURIComponent(searchQuery.trim())}`);

                if (!response.ok) {
                    throw new Error('Erreur de recherche');
                }

                const data = await response.json();
                setResults(data);

                // dispaly message for no results
                if (results.recipes.length == 0 && results.tips.length == 0) {
                    setNoResults(false)
                };

            } catch (error) {
                console.error('Erreur lors de la recherche :', error);
            }
        })
    };


    const handleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleSearch();
        }
    };

    const searchRef = useRef()

    const resetSearch = () => {
        searchRef.current.value = ''
        setSearchQuery('')
        setResults('')
        setNoResults(true)
    }

    // handle no result message
    useEffect(() => {
        if (searchQuery === "") {
            setNoResults(true)
        }
    }, [searchQuery])


    //handle sheet close
    const [isOpen, setIsOpen] = useState(false);

    const handleSheetClose = () => {
        setIsOpen(false)
        setResults('')
        setSearchQuery('')
        searchRef.current.value = ''
        setNoResults(true)
    };


    const handleSheetStateChange = (open) => {
        setIsOpen(open);

        if (!open) {
            setResults('');
            setNoResults(true)
            searchRef.current.value = ''
            setSearchQuery('')
        }
    };


    const navigate = useNavigate();

    //redirect user to recipe page 
    const gotToRecipe = (id) => {
        navigate(`/recipe/${id}`)
        handleSheetClose()
    };


    //redirect user to category page 
    const gotToCategory = (id) => {
        navigate(`/category/${id}`)
        setIsOpen(false)
    };

    //redirect user to selected page 
    const gotToSelectedPage = (route) => {
        navigate(`${route}`)
        setIsOpen(false)
    };


    return (
        <div className="lg:hidden w-1/3">
            <Sheet open={isOpen} onOpenChange={handleSheetStateChange}>
                <SheetTrigger className="space-y-1">
                    <p className="bg-blue w-8 h-1.5 rounded-xl"></p>
                    <p className="bg-red w-8 h-1.5 rounded-xl"></p>
                </SheetTrigger>

                <SheetContent className="w-[85%] h-screen overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="mb-6"></SheetTitle>

                        <div dir="rtl" className="flex flex-col items-start pb-6 space-y-5">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>كاتوات وحلويات وفازات</AccordionTrigger>
                                    <AccordionContent className="flex flex-col items-start">
                                        {
                                            Array.isArray(data) && data[1].subtitle.map(el => {
                                                return (
                                                    <p onClick={() => gotToCategory(el.title)}
                                                        key={el.id}
                                                        className="my-1 hover:text-orange text-[18px] duration-300 cursor-pointer"
                                                    >
                                                        {el.title}
                                                    </p>
                                                )
                                            })
                                        }
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-2">
                                    <AccordionTrigger>تصنيف ومالح وشيخات</AccordionTrigger>
                                    <AccordionContent className="flex flex-col items-start">
                                        {
                                            Array.isArray(data) && data[2].subtitle.map(el => {
                                                return (
                                                    <p onClick={() => gotToCategory(el.title)}
                                                        key={el.id}
                                                        className="my-1 hover:text-orange duration-300 cursor-pointer"
                                                    >
                                                        {el.title}
                                                    </p>
                                                )
                                            })
                                        }
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>


                            <p onClick={() => gotToSelectedPage('/MyRecipes')} className="text-[20px] font-medium hover:underline cursor-pointer">
                                الموندو متاعي
                            </p>

                            <p onClick={() => gotToSelectedPage('/notifications')} className="text-[20px] font-medium hover:underline cursor-pointer">
                                إشعاراتي
                            </p>

                            <p onClick={() => gotToSelectedPage('/compte')} className="text-[20px] font-medium hover:underline cursor-pointer">
                                حسابي
                            </p>

                        </div>



                        <div className="relative">
                            <input
                                dir="rtl"
                                ref={searchRef}
                                className="border-b border-black w-full outline-none py-2 px-8"
                                placeholder="البحث بالاسم، أو المكونات، أو الفئة"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />

                            <svg className="mr-6 absolute top-2 right-[-20px]" width="16" height="16" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="black" d="M18.778 17.6595L14.0564 12.9379C15.3431 11.3642 15.9757 9.35623 15.8234 7.32922C15.6711 5.30222 14.7455 3.41129 13.2381 2.04757C11.7308 0.683849 9.75687 -0.0483305 7.72479 0.00247793C5.69271 0.0532864 3.75789 0.883195 2.32054 2.32054C0.883195 3.75789 0.0532864 5.69271 0.00247793 7.72479C-0.0483305 9.75687 0.683849 11.7308 2.04757 13.2381C3.41129 14.7455 5.30222 15.6711 7.32922 15.8234C9.35623 15.9757 11.3642 15.3431 12.9379 14.0564L17.6595 18.778C17.8086 18.922 18.0085 19.0018 18.2159 19C18.4233 18.9982 18.6217 18.915 18.7683 18.7683C18.915 18.6217 18.9982 18.4233 19 18.2159C19.0018 18.0085 18.922 17.8086 18.778 17.6595ZM7.93549 14.2636C6.6839 14.2636 5.46042 13.8925 4.41976 13.1971C3.37911 12.5018 2.56801 11.5135 2.08905 10.3572C1.61009 9.20084 1.48477 7.92847 1.72895 6.70093C1.97312 5.47339 2.57581 4.34583 3.46082 3.46082C4.34583 2.57581 5.47339 1.97312 6.70093 1.72895C7.92847 1.48477 9.20084 1.61009 10.3572 2.08905C11.5135 2.56801 12.5018 3.37911 13.1971 4.41976C13.8925 5.46042 14.2636 6.6839 14.2636 7.93549C14.2617 9.61323 13.5944 11.2217 12.4081 12.4081C11.2217 13.5944 9.61323 14.2617 7.93549 14.2636Z" />
                            </svg>

                            <p onClick={resetSearch} className="absolute top-2 text-black cursor-pointer">&#10005;</p>
                        </div>


                        <section className="mt-10">
                            {isPending ?
                                <div className="flex items-center justify-center h-[400px]">
                                    <div className="loader"></div>
                                </div>
                                :
                                <ScrollArea dir="rtl" className="h-[500px]">
                                    {
                                        Array.isArray(results.recipes) && results.recipes.map(el => {
                                            return (
                                                <div onClick={() => gotToRecipe(el.id)} key={el.id} className="relative group flex items-center my-2.5 cursor-pointer">

                                                    <div className="w-[105px] h-[110px] overflow-hidden rounded-[5px] cardBorder">
                                                        <ThumbComponent src={el.imgPath} className="object-cover w-full h-full" />
                                                    </div>

                                                    <div className="space-y-2 w-full  text-start mr-6">
                                                        <Suspense fallback={<Skeleton className="h-2.5 w-[250px] rounded-[10px]" />}>
                                                            <p className="line-clamp-1">{el.title}</p>
                                                        </Suspense>
                                                        <Suspense fallback={<Skeleton className="h-2.5 w-[250px] rounded-[10px]" />}>
                                                            <p className="categoryTitle">{el.category && el.category[0].title}</p>
                                                        </Suspense>
                                                        <p className="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 absolute left-6 bottom-6">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 64 64"><path fill="currentColor" d="M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30s30-13.432 30-30S48.568 2 32 2m17 35.428H30.307V48L15 32l15.307-16v11.143H49z" /></svg>
                                                        </p>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }

                                    {
                                        !noResults &&
                                        (<p dir="rtl" className="bg-[#5684EB] text-white rounded-[4px] mt-6 p-2 ">
                                            سامحنا ! ما لقيناش نتائج تطابق مع البحث متاعك.
                                            يمكن الاسم ولا الكتيبة فيهم حاجة ناقصة ولا زايدة.
                                            زيد ثبت، ساعات تصليحة صغيرة تحل المشكلة الكل!
                                        </p>)
                                    }
                                </ScrollArea>}
                        </section>




                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default HamburgerMenu