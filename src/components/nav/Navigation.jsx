import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"


const Navigation = ({ data }) => {


    return (
        <div className="hidden lg:flex items-center justify-center text-lg mt-2 z-50">

            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <div className="group">
                            <NavigationMenuTrigger>تصنيف ومالح وشيخات</NavigationMenuTrigger>
                            <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-orange transition-all duration-500 group-hover:w-full group-hover:right-0"></span>
                        </div>
                        <NavigationMenuContent dir="rtl">
                            {
                               Array.isArray(data) &&  data[1].subtitle.map(el => {
                                    return (
                                        <NavigationMenuLink key={el.id} className="my-1">
                                            <Link to={`/category/${el.title}`}
                                                className="hover:text-orange duration-300"
                                            >
                                                {el.title}
                                            </Link>
                                        </NavigationMenuLink>
                                    )
                                })
                            }
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>

                <NavigationMenuList>
                    <NavigationMenuItem>
                        <div className="group">
                            <NavigationMenuTrigger>كاتوات وحلويات وفازات</NavigationMenuTrigger>
                            <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-orange transition-all duration-500 group-hover:w-full group-hover:right-0"></span>
                        </div>
                        <NavigationMenuContent dir="rtl">
                            {
                              Array.isArray(data) &&  data[2].subtitle.map(el => {  
                                    return (
                                        <NavigationMenuLink key={el.id} className="my-1">
                                            <Link to={`/category/${el.title}`}
                                                className="hover:text-orange duration-300"
                                            >
                                                {el.title}
                                            </Link>
                                        </NavigationMenuLink>
                                    )
                                })
                            }
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

        </div>
    )
}

export default Navigation