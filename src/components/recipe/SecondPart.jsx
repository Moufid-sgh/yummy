
import { useRef, useState } from "react"
import { Separator } from "@/components/ui/separator"



const SecondPart = ({ ingredients, ustensiles, nbr_serves, sortedSteps }) => {

    const setpsRef = useRef(null);

    const [persons, setPersons] = useState(nbr_serves);

    //handle portion
    const handlePersonsChange = (change) => {
        setPersons((prev) => Math.max(1, prev + change));
    };

    // // Recalculer les quantités en fonction du nombre de personnes
    const getUpdatedQuantity = (ingredientQuantity) => {
        return (ingredientQuantity / nbr_serves) *  persons;
    };


    // //format number decimal /entier
    function formatNumber(quantity) {
        if (quantity % 1 !== 0) {
            return quantity.toFixed(1);
        } else {
            return quantity;
        }
    };



    //display steps by catgeory
    const groupSteps = (data) => {
        return data.reduce((acc, item) => {

            const title = String(item.title).trim();

            if (!acc[title]) {
                acc[title] = []
            }
            acc[title].push(item.description)
            return acc
        }, {})
    };

    const groupedSteps = sortedSteps && groupSteps(sortedSteps);


    //dispaly  && group ingredeint by title
    const groupIngredient = (data) => {
        const grouped = data.reduce((acc, item) => {
            const title = String(item.title).trim();

            if (!acc[title]) {
                acc[title] = [];
            }

            acc[title].push({
                qte_gramme: item.qte_gramme,
                unite: item.unite,

                ingredient: item.ingredient,
            });

            return acc;
        }, {});

        return Object.keys(grouped).map(title => ({
            title,
            items: grouped[title],
        }));
    };

    const groupedIng = ingredients && groupIngredient(ingredients);



    return (
        <div className="mb-20 lg:w-[80%]">
            <section className="w-full mt-10 lg:mt-0">
                <div className="flex items-center text-[18px] md:text-[22px]">
                    <div className="border rounded-[4px] linearBlackBtn text-white px-6 py-1.5 cursor-pointer">
                        المكونات
                    </div>
                    <div
                        onClick={() => {
                            window.scrollTo({
                                top: setpsRef.current.offsetTop - 30,
                                behavior: "smooth"
                            });
                        }}
                        className="relative w-fit mr-6 cursor-pointer group">
                        <p className="border border-black rounded-[4px] px-6 py-1.5 hover:linearBlackBtn hover:text-white transition-all duration-500">الوصفة بالبا والتا</p>
                    </div>
                </div>
                <p className="h-[0.3px] w-full bg-gray"></p>

                <div className="mt-8">
                    <p className="text-[32px] text-orange mr-2">المكونات</p>
                    <p className='rubriqueTitle'></p>
                </div>

                <div className="flex items-center my-7">

                    <div className="flex flex-col lg:flex-row lg:items-center w-full">
                        <label className="flex items-center lg:w-[20%] mb-4 lg:mb-0 ml-4">
                            <p className="whitespace-nowrap">عدد الحصص</p>
                            <p className="mr-2 text-xl">{persons}</p>
                        </label>


                        <input
                            id="slider"
                            type="range"
                            min="1"
                            max="30"
                            value={persons}
                            data-value={persons}
                            onChange={(e) => handlePersonsChange(parseInt(e.target.value) - persons)}
                            className="lg:w-[80%] appearance-none inputRange"
                        />

                    </div>


                </div>


                <div className="mt-2">
                    {ingredients && groupedIng.map(({ title, items }) => (
                        <div key={title} className="mb-4">
                            {
                                (title && title !== 'null') && 
                                <div className="my-7 text-[16px] md:text-[18px]">
                                    <p className="text-[#183153CC]">{title}</p>
                                    <p className="h-0.5 w-full bg-orange"></p>
                                </div>
                            } 
                            <ul className="list-decimal marker:text-orange text-[#00235B] text-[16px] md:text-[18px]">
                                {items.map((item, index) => (
                                    <li key={index} className="flex items-center text-darkblue text-[18px] py-2 border-b border-gray space-x-2 lg:space-x-6">
                                        <p className="w-24 lg:w-20">{formatNumber(getUpdatedQuantity(item.qte_gramme))}</p>
                                        <Separator className="w-0.5 h-3.5 bg-[#00235B40]" />
                                        <p className="w-36">{item.unite}</p>
                                        <Separator className="w-[0.128rem] h-3.5 bg-[#00235B40]" />
                                        <p className="w-72">{item.ingredient}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}



                </div>
            </section>


            {/* usetnsiles----------------------------------------------------------- */}
            {(ustensiles && ustensiles.length > 0) &&
                <section className="w-full mt-16">
                <div>
                    <p className="text-[32px] text-orange mr-2">الماعون</p>
                    <p className='rubriqueTitle'></p>
                </div>

                <ol className="mt-4 mr-4 list-decimal marker:text-orange text-[18px]">
                    {
                        Array.isArray(ustensiles) && ustensiles.map((el) => {
                            return <li key={el.id} className="my-3">{el.title}</li>
                        })
                    }
                </ol>
            </section>}


            {/* steps--------------------------------------------------------------------- */}
            <section ref={setpsRef} className="w-full mt-16">
                <div>
                    <p className="text-[32px] text-orange mr-2">الوصفة بالبا والتا</p>
                    <p className='rubriqueTitle'></p>
                </div>

                <div className="mt-4 mr-4">
                    {Object.entries(groupedSteps).map(([title, descriptions]) => (
                        <div key={title} className="mb-4">
                            {title && <p className="text-lg font-semibold mb-2">{title}</p>}
                            <ol className="list-decimal marker:text-orange text-[18px]">
                                {descriptions.map((desc, index) => (
                                    <li key={index} className="text-gray-700 mt-3">{desc}</li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>


            </section>
        </div>
    )
}


export default SecondPart