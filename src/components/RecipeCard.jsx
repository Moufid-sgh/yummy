
import { Link } from "react-router-dom"
import Save from "./Save"
import ImageComponent from "./ImageComponent"

const RecipeCard = ({ el }) => {

    const recipeId = el.id


    return (
        <div dir="rtl" className="relative w-[280px] mx-10 my-6 group">

            <Link to={`/recipe/${el.id}`}>
                <div className="relative cardShadow overflow-hidden">
                
                    <ImageComponent src={el.imgPath} className="object-cover w-[280px] h-[350px] cardBorder group-hover:scale-[1.02] transition-all duration-500" />

                    <Save recipeId={recipeId} />
                </div>
            </Link>

            <div className="p-2">
                <p className="text-[22px] w-64 overflow-hidden line-clamp-2 leading-7 mt-2">{el.title}</p>

                <Link to={`/recipe_category/${el.category[0]?.title}`}
                    className="categoryTitle text-lg mt-1.5 block hover:opacity-70 duration-300 w-fit"
                >
                    {el.category && el.category[0]?.title}
                </Link>

                <div className="flex items-center categoryTitle mt-0.5">
                    <div className="flex items-center w-20">
                        <svg className="block mb-[0.27rem] md:mb-0" width="17" height="16" viewBox="0 0 15 14" fill="#00010099" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.08472 2C6.09581 2 5.12911 2.29324 4.30687 2.84265C3.48462 3.39206 2.84376 4.17295 2.46532 5.08658C2.08688 6.00021 1.98787 7.00555 2.18079 7.97545C2.37372 8.94535 2.84992 9.83627 3.54918 10.5355C4.24845 11.2348 5.13936 11.711 6.10927 11.9039C7.07917 12.0969 8.0845 11.9978 8.99813 11.6194C9.91176 11.241 10.6927 10.6001 11.2421 9.77785C11.7915 8.9556 12.0847 7.98891 12.0847 7C12.0833 5.67436 11.556 4.40342 10.6187 3.46605C9.6813 2.52868 8.41036 2.00143 7.08472 2ZM7.08472 11.1667C6.26063 11.1667 5.45505 10.9223 4.76984 10.4645C4.08464 10.0066 3.55059 9.35587 3.23522 8.59451C2.91986 7.83315 2.83734 6.99538 2.99811 6.18712C3.15889 5.37887 3.55572 4.63644 4.13844 4.05372C4.72116 3.471 5.46359 3.07417 6.27184 2.91339C7.0801 2.75262 7.91787 2.83514 8.67923 3.1505C9.44059 3.46587 10.0913 3.99992 10.5492 4.68512C11.007 5.37033 11.2514 6.17591 11.2514 7C11.2502 8.1047 10.8108 9.1638 10.0297 9.94494C9.24852 10.7261 8.18941 11.1655 7.08472 11.1667Z" fill="#00010099" />
                            <path d="M7.08472 4.08333C6.95579 4.08333 6.83215 4.13455 6.74098 4.22571C6.64982 4.31688 6.59861 4.44052 6.59861 4.56944V6.67187L4.95992 7.69854C4.85034 7.767 4.77244 7.87619 4.74336 8.00208C4.71427 8.12798 4.7364 8.26027 4.80486 8.36986C4.87331 8.47945 4.9825 8.55735 5.1084 8.58643C5.2343 8.61551 5.36659 8.59339 5.47618 8.52493L7.34284 7.35826C7.41337 7.31407 7.47137 7.25252 7.51129 7.17949C7.55121 7.10646 7.57171 7.0244 7.57083 6.94118V4.56944C7.57083 4.44052 7.51961 4.31688 7.42845 4.22571C7.33729 4.13455 7.21364 4.08333 7.08472 4.08333Z" fill="#00010099" />
                        </svg>
                        <div>
                            <span className="mx-1">{el.total_time}</span>
                            <span>دق</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RecipeCard