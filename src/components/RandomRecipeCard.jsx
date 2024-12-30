import { Link } from "react-router-dom"
import Save from "./Save"
import ImageComponent from "./ImageComponent"


const RandomRecipesCard = ({ el, session }) => {

    const userId = session?.user?.id
    const recipeId = el.id



    return (
        <div dir="rtl" className="relative w-[280px] h-[350px] mx-10 my-6 group overflow-hidden cardShadow">
            <Link to={(el.is_paying === 'T-Telecom' ) ? '/login' : `/recipe/${el.id}`}>

                <ImageComponent src={el.imgPath} className="object-cover w-[280px] h-[350px] rounded-sm cardBorder group-hover:scale-[1.02] transition-all duration-500" />

                <Save recipeId={recipeId} userId={userId} />
            </Link>

            <div className="absolute bottom-0  text-white p-2 w-full bgDescCard">
                    <p className="mr-10 text-[22px] w-56 line-clamp-2">{el.title}</p>
            </div>
        </div>
    )
}

export default RandomRecipesCard