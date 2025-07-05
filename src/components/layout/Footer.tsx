import {Facebook, Instagram, Linkedin, Twitter} from "lucide-react"
const Footer = () => {
    return (
        <footer>
            <div className="bg-[#111111] py-10">
                <div className="text-white flex justify-center gap-5">
                    <a href="#" className="hover:-translate-y-1.5 transition"><Facebook size={50}/></a>
                    <a href="#" className="hover:-translate-y-1.5 transition"><Instagram size={50}/></a>
                    <a href="#" className="hover:-translate-y-1.5 transition"><Linkedin size={50}/></a>
                    <a href="#" className="hover:-translate-y-1.5 transition"><Twitter size={50}/></a>
                </div>
                <p className="text-center text-white lg:text-2xl font-bold mt-3 lg:mt-10">Check out my social media</p>
            </div>
            <div className="bg-black text-white py-5 text-sm md:text-base">
                <p className="text-center">
                    &copy; {new Date().getFullYear()} Library Manager. All rights reserved.
                </p>
                <p className="text-center">
                    Developed by <b>Margub Murshed</b>
                </p>
            </div>
        </footer>
    );
};

export default Footer;