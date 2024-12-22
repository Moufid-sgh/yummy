import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl bg-red-500 text-slate-100 py-2 px-6">PAGE NOT FOUND</p>

        <Link to="/" className="flex items-center space-x-2 group mt-8">
        <p className="text-lg px-5 py-2.5 mt-8 bg-orange hover:bg-[#31363F3B] active:bg-black duration-500 text-white rounded-[3px] w-full group overflow-hidden font-medium">العودة إلى الصفحة الرئيسية</p>
        </Link>
    </div>
  )
}

export default NotFound