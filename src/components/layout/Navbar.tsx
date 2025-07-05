import Logo from "@/assets/logo.png";
import { useNavigate } from "react-router";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Book, Home, Menu, NotepadText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const links = [
        { id: 1, label: "Home", path: "/", icon: Home },
        { id: 2, label: "All Books", path: "/books", icon: Book },
        { id: 3, label: "Add Book", path: "/create-book", icon: Plus },
        { id: 4, label: "Borrow Summary", path: "/borrow-summary", icon: NotepadText },
    ]
    return (
        <nav className='p-2 lg:p-5 shadow'>
            <div className="container mx-auto flex items-center justify-between">
                <div onClick={() => navigate("/")} className="cursor-pointer">
                    <img src={Logo} alt="logo" className="w-32" />
                </div>
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        {links.map(link => (
                            <NavigationMenuItem key={link.id}>
                                <Button variant="outline" className="cursor-pointer" onClick={() => navigate(link.path)}>
                                    {link.icon && <link.icon />}
                                    {link.label}
                                </Button>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Menu size={30} className="hover:bg-gray-100 transition duration-500 rounded-xl w-12 h-12 p-2 cursor-pointer" color="#3E2C20" />
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] p-5">

                            <nav >
                                <div className="cursor-pointer" onClick={() => {
                                    navigate("/");
                                    setOpen(false);
                                }}>
                                    <img src={Logo} alt="logo" className="w-32 -ml-5" />
                                </div>
                                <div className="flex flex-col gap-4 mt-4">
                                    {links.map(link => (
                                        <Button variant="outline" className="cursor-pointer" onClick={() => {
                                            navigate(link.path);
                                            setOpen(false)
                                        }}>
                                            {link.icon && <link.icon />}
                                            {link.label}
                                        </Button>))}
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;