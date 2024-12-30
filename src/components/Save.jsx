import { useEffect, useState } from "react";
import { toast } from "sonner"
import { useAuth } from "./authContext";

const Save = ({ recipeId }) => {

   const { setNeedsUpdate } = useAuth()

    const [isSaved, setIsSaved] = useState(false);

    //get user id-------------------------------------------//
    const [userId, setUserId] = useState()

    useEffect(() => {
        const id = localStorage.getItem("id")
        setUserId(id)
    }, [])


    useEffect(() => {

        if (!userId) return;

        const getUserRecipe = async () => {
            try {
                const response = await fetch("https://yahalawa.net/api/orange/getUserRecipe", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                });

                const data = await response.json();
                const saves = data.recipes.some(el => el.recipeId === recipeId)

                if (saves) {
                    setIsSaved(true)
                }
            } catch (error) {
                console.log(error)
            }
        };

        getUserRecipe()

    }, [userId, recipeId])


    //handle save---------------------------------------------//
    const handleSave = async () => {

        try {
            const response = await fetch("https://yahalawa.net/api/orange/saveRecipe", {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, recipeId }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSaved((prev) => !prev)
                setNeedsUpdate((prev) => !prev);
                if(data.saved) {
                return toast.info('برافو عليك ! الوصفة أتسجلت في دوسي الموندو متاعي !')
            } else{
                return toast.info('أهوكة الوصفة اتنحات من الموندو متاعي !')
            }
            } else {
                console.error("save failed:", data.error);
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div className="absolute bottom-0 right-2 py-[9px] px-1.5 z-50 rounded-t-[8px] bg-white hover:bg-orange hover:text-white duration-300">
            <svg onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleSave();
            }}
                className={`${isSaved ? 'text-orange hover:text-white' : ''} mb-1.5 md:mb-0 cursor-pointer`} width="20" height="17" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M8.83361 0C8.27081 0.00913273 7.72029 0.173037 7.23763 0.47516C6.75498 0.777283 6.35729 1.20693 6.08472 1.7207C5.81215 1.20693 5.41445 0.777283 4.9318 0.47516C4.44915 0.173037 3.89862 0.00913273 3.33583 0C2.43866 0.0406663 1.59338 0.450123 0.984666 1.13891C0.37595 1.82771 0.0532748 2.73984 0.0871364 3.67605C0.0871364 6.04697 2.47917 8.63637 4.48536 10.392C4.93329 10.7847 5.49963 11 6.08472 11C6.6698 11 7.23614 10.7847 7.68407 10.392C9.69026 8.63637 12.0823 6.04697 12.0823 3.67605C12.1162 2.73984 11.7935 1.82771 11.1848 1.13891C10.5761 0.450123 9.73078 0.0406663 8.83361 0ZM7.04183 9.59422C6.77393 9.82958 6.43495 9.95865 6.08472 9.95865C5.73448 9.95865 5.3955 9.82958 5.1276 9.59422C2.55964 7.34636 1.08673 5.18975 1.08673 3.67605C1.05257 3.0163 1.26984 2.36922 1.69117 1.87593C2.1125 1.38265 2.7037 1.08318 3.33583 1.04285C3.96795 1.08318 4.55915 1.38265 4.98048 1.87593C5.40181 2.36922 5.61908 3.0163 5.58492 3.67605C5.58492 3.81434 5.63758 3.94697 5.73131 4.04475C5.82504 4.14254 5.95216 4.19747 6.08472 4.19747C6.21727 4.19747 6.3444 4.14254 6.43813 4.04475C6.53186 3.94697 6.58452 3.81434 6.58452 3.67605C6.55035 3.0163 6.76762 2.36922 7.18895 1.87593C7.61028 1.38265 8.20148 1.08318 8.83361 1.04285C9.46574 1.08318 10.0569 1.38265 10.4783 1.87593C10.8996 2.36922 11.1169 3.0163 11.0827 3.67605C11.0827 5.18975 9.60979 7.34636 7.04183 9.59214V9.59422Z" />
            </svg>
        </div>
    )
}

export default Save