import googlePlay from "/googlePlay.svg"
import appStore from "/appStore.svg"
import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <footer dir='rtl' className="footerBg w-full text-white px-3 md:px-8 lg:px-32 py-8">
      <section>
        <p className="text-sm mb-4">تلشرجي توا طبيقة يامي صنافة !</p>
        <div className="flex items-center mt-8 lg:mt-0">
          <Link to="" className="hover:scale-[1.03] duration-300">
            <img
              src={appStore}
              alt="icon"
              className="ml-4"
            />
          </Link>

          <Link to="" className="hover:scale-[1.03] duration-300">
            <img
              src={googlePlay}
              alt="icon"
            />
          </Link>
        </div>
      </section>

      <section className="flex mt-8">
        <a href="mailto:hello@yummysanafa.com" className="border-l border-darkblue pl-2 md:pl-4 hover:text-orange duration-300">إتصل بنا</a>
        <Link to="/about_us" className="border-l border-darkblue px-2 md:px-4 hover:text-orange duration-300">معلومات عنا</Link>
        <Link to="/terms" className="px-2 md:px-4 hover:text-orange duration-300">سياسة الخصوصية</Link>
      </section>

      <section className="text-sm mt-8 space-y-2">
        <Link to="/yummy_terms" className="hover:text-orange duration-300">الشروط العامة للبيع والإستخدام خدمة “ Yummy صنافة ” من أورنج.</Link>
        <p>يمكنك إلغاء إشتراكك في خدمة “ Yummy صنافة ”  من أورنج بإرسال STOP إلى 85523.</p>
        <p>جميع حقوق النشر محفوظة لموقع “ Yummy صنافة ”. “ Yummy صنافة ”, علامة ليدر بوب <span>{new Date().getFullYear()}-2024©</span></p>
      </section>
    </footer>
  )
}

export default Footer