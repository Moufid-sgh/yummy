import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { useAuth } from "@/components/authContext"

const Page = () => {

    const { setIsAuthenticated, setCurrentName } = useAuth();

    const [showPassword, setShowPassword] = useState(false)

    const [isPending, startTransition] = useTransition()

    const [phone_number, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [isChecked, setIsChecked] = useState(false);

    //redirection after login
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    function handleSignIn(e) {
        e.preventDefault();

        startTransition(async () => {

            if (!phone_number || !password) {
                return toast.info('من فضلك، تأكد من ملء جميع الحقول لإكمال تسجيل الدخول')
            }

            if (!isChecked) {
                return toast.error('يجب قراءة وقبول الشروط والأحكام الخاصة بالاستخدام')
            }

            else {
                try {
                    const response = await fetch("https://yahalawa.net/api/orange/auth", {
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify({ phone_number, password }),
                    });



                    const data = await response.json();
                    console.log(data)

                    if(data.status === "error") {
                        return toast.error("بيانات اعتماد غير صالحة");
                    }

                    if (response.ok) {
                        setCurrentName(data.user.name);
                        localStorage.setItem("name", data.user.name);
                        localStorage.setItem("phone", data.user.phone_number);
                        localStorage.setItem("id", data.user.id);
                        localStorage.setItem('token', data.token);
                        setIsAuthenticated(true);
                        navigate(from, { replace: true });
                    } 

                } catch (error) {
                    console.log(error)
                }
            }
        })
    };



    return (
        <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">


            <div className="flex items-center w-full">
                <p className="bg-[#18315366] w-full h-[1px]"></p>
                <h1 dir="rtl" className="text-[#5E5DC0] text-2xl mx-8 whitespace-nowrap"> مرحبا بيك ! </h1>
                <p className="bg-[#18315366] w-full h-[1px]"></p>
            </div>


            <form dir="rtl" className="mt-8 w-full flex justfiy-start">
                <section className="lg:w-72">
                    <div className="relative mt-5">
                        <label className="text-[#262F82]" htmlFor="number">رقم الجوال Ooredoo</label>
                        <input
                            id="number"
                            type="number"
                            name="phone_number"
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="رقم الجوال Ooredoo"
                            className="bg-[#007AFF0D] border border-[#262F82] rounded-[3px] py-3 px-4 mt-1 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue"
                        />
                        <svg className="absolute left-4 top-[45px] text-[#262F82] size-4" width="12" height="19" viewBox="0 0 12 19" fill="#262F82" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.25 18.2852H3.75C1.68225 18.2852 0 16.6029 0 14.5352V4.03516C0 1.96741 1.68225 0.285156 3.75 0.285156H8.25C10.3177 0.285156 12 1.96741 12 4.03516V14.5352C12 16.6029 10.3177 18.2852 8.25 18.2852ZM3.75 1.78516C2.5095 1.78516 1.5 2.79466 1.5 4.03516V14.5352C1.5 15.7757 2.5095 16.7852 3.75 16.7852H8.25C9.4905 16.7852 10.5 15.7757 10.5 14.5352V4.03516C10.5 2.79466 9.4905 1.78516 8.25 1.78516H3.75ZM7.5 14.5352C7.5 14.1212 7.164 13.7852 6.75 13.7852H5.25C4.836 13.7852 4.5 14.1212 4.5 14.5352C4.5 14.9492 4.836 15.2852 5.25 15.2852H6.75C7.164 15.2852 7.5 14.9492 7.5 14.5352Z" fill="#262F82" />
                        </svg>
                    </div>

                    <div className="relative mt-5">
                        <label className="text-[#262F82]" htmlFor="pwd">كلمة المرور </label>
                        <input
                            id="pwd"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="كلمة المرور"
                            className="bg-[#007AFF0D] border border-[#262F82] rounded-md py-3 px-4 mt-1 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue"
                        />
                        <div onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-[41px] text-[#262F82] cursor-pointer">
                            {showPassword ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M8.25 12a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0M12 9.75a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5" /><path d="M4.323 10.646c-.419.604-.573 1.077-.573 1.354s.154.75.573 1.354c.406.583 1.008 1.216 1.77 1.801C7.62 16.327 9.713 17.25 12 17.25s4.38-.923 5.907-2.095c.762-.585 1.364-1.218 1.77-1.801c.419-.604.573-1.077.573-1.354s-.154-.75-.573-1.354c-.406-.583-1.008-1.216-1.77-1.801C16.38 7.673 14.287 6.75 12 6.75s-4.38.923-5.907 2.095c-.762.585-1.364 1.218-1.77 1.801m.856-2.991C6.91 6.327 9.316 5.25 12 5.25s5.09 1.077 6.82 2.405c.867.665 1.583 1.407 2.089 2.136c.492.709.841 1.486.841 2.209s-.35 1.5-.841 2.209c-.506.729-1.222 1.47-2.088 2.136c-1.73 1.328-4.137 2.405-6.821 2.405s-5.09-1.077-6.82-2.405c-.867-.665-1.583-1.407-2.089-2.136C2.6 13.5 2.25 12.723 2.25 12s.35-1.5.841-2.209c.506-.729 1.222-1.47 2.088-2.136" /></g></svg>
                                :
                                <svg width="24" height="24" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.4566 8.58794C18.7795 7.47923 17.9255 6.48888 16.9283 5.65619L19.0283 3.55619C19.165 3.41474 19.2405 3.22529 19.2388 3.02864C19.2371 2.83199 19.1583 2.64388 19.0192 2.50483C18.8801 2.36577 18.692 2.28689 18.4954 2.28518C18.2987 2.28348 18.1093 2.35907 17.9678 2.49569L15.6841 4.78244C14.2684 3.94156 12.6499 3.50329 11.0033 3.51494C6.36008 3.51494 3.71408 6.69344 2.55008 8.58794C2.19048 9.16957 2 9.83987 2 10.5237C2 11.2075 2.19048 11.8778 2.55008 12.4594C3.22715 13.5681 4.0812 14.5585 5.07833 15.3912L2.97833 17.4912C2.9067 17.5604 2.84957 17.6431 2.81026 17.7346C2.77095 17.8261 2.75026 17.9246 2.7494 18.0241C2.74853 18.1237 2.76751 18.2225 2.80522 18.3147C2.84293 18.4068 2.89862 18.4906 2.96904 18.561C3.03946 18.6314 3.1232 18.6871 3.21537 18.7248C3.30754 18.7625 3.4063 18.7815 3.50589 18.7806C3.60547 18.7798 3.70388 18.7591 3.79539 18.7198C3.88689 18.6805 3.96965 18.6233 4.03883 18.5517L6.32783 16.2627C7.74178 17.1034 9.35834 17.5425 11.0033 17.5324C15.6466 17.5324 18.2926 14.3539 19.4566 12.4594C19.8162 11.8778 20.0067 11.2075 20.0067 10.5237C20.0067 9.83987 19.8162 9.16957 19.4566 8.58794ZM3.82808 11.6742C3.61444 11.3285 3.50127 10.9301 3.50127 10.5237C3.50127 10.1173 3.61444 9.71891 3.82808 9.37319C4.82858 7.74869 7.08983 5.01494 11.0033 5.01494C12.2485 5.00796 13.4763 5.30807 14.5778 5.88869L13.0681 7.39844C12.348 6.92039 11.4848 6.70619 10.6248 6.79217C9.76475 6.87816 8.96098 7.25904 8.34984 7.87019C7.73869 8.48134 7.35781 9.28511 7.27182 10.1451C7.18583 11.0051 7.40004 11.8684 7.87808 12.5884L6.14558 14.3209C5.22691 13.5782 4.44296 12.6829 3.82808 11.6742ZM13.2533 10.5237C13.2533 11.1204 13.0163 11.6927 12.5943 12.1147C12.1724 12.5366 11.6001 12.7737 11.0033 12.7737C10.6692 12.7724 10.3397 12.6955 10.0396 12.5487L13.0283 9.55994C13.1751 9.86009 13.252 10.1896 13.2533 10.5237ZM8.75333 10.5237C8.75333 9.92695 8.99039 9.35466 9.41234 8.9327C9.8343 8.51074 10.4066 8.27369 11.0033 8.27369C11.3374 8.27498 11.6669 8.35191 11.9671 8.49869L8.97833 11.4874C8.83155 11.1873 8.75463 10.8578 8.75333 10.5237ZM18.1786 11.6742C17.1781 13.2987 14.9168 16.0324 11.0033 16.0324C9.75813 16.0394 8.53041 15.7393 7.42883 15.1587L8.93858 13.6489C9.65863 14.127 10.5219 14.3412 11.3819 14.2552C12.2419 14.1692 13.0457 13.7883 13.6568 13.1772C14.268 12.566 14.6489 11.7623 14.7348 10.9023C14.8208 10.0423 14.6066 9.17899 14.1286 8.45894L15.8611 6.72644C16.7798 7.46915 17.5637 8.36448 18.1786 9.37319C18.3922 9.71891 18.5054 10.1173 18.5054 10.5237C18.5054 10.9301 18.3922 11.3285 18.1786 11.6742Z" fill="#262F82" />
                                </svg>
                            }
                        </div>
                    </div>

                    <div className="mt-5 mb-4">
                        <input id="terms" type="checkbox" onChange={(e) => setIsChecked(e.target.checked)} className="w-4 h-4 cursor-pointer" required />
                        <label htmlFor="terms" className="mr-2">لقد قرأت و وافقت على </label>
                        <Link to="" className="text-[#007AFF]">الشروط العامة للبيع والإستخدام خدمة يّامي صنافة.</Link>
                    </div>


                    <Link to="" className="text-[#007AFF]">نسيت كلمة المرور ؟</Link>


                    <button onClick={handleSignIn} disabled={isPending} className="flex items-center justify-center px-5 py-2.5 mt-8 bg-orange hover:bg-[#31363F3B] active:bg-black duration-500 text-white rounded-[3px] w-full group overflow-hidden font-medium">
                        <span>الدخول</span>
                        {isPending && <p className="miniLoader mr-2"></p>}
                    </button>

                    <div className="text-[#007AFF] mt-4 ">
                        <p>تحب تستمتع بالخدمة ؟</p>
                        <p className="text-lg pt-1">إتصل بالرقم التالي #0*000*</p>
                    </div>
                </section>
            </form>

        </main>
    )
}

export default Page