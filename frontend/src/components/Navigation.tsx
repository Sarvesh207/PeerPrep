import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Code,
  MessageSquare,
  Moon,
  Search,
  Sun,
  User,
  UserPen,
  LogOut,
  Settings,
  ChevronDown,
  BellDot 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import AuthForm from "./AuthForm";
import { useTheme } from "./ThemeProvider";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authApi from "@/services/auth.api";
import { removeUser } from "@/store/slices/userSlice";

const Navigation = () => {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, setTheme } = useTheme();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutService = async () => {
    try {
      const response = await authApi.logout();
      if (response.status === 200) {
        dispatch(removeUser());
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <Code className="h-6 w-6 text-codemate-purple" />
          <span className="text-xl font-bold gradient-text">PeerPrep</span>
        </Link>

        {location.pathname === "/" && (
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </a>
            <a
              href="#success-stories"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Success Stories
            </a>
            <a
              href="#faq"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </a>
          </nav>
        )}

        {user ? (
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <BellDot className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setShowDropDown((prev) => !prev)}
            >
              <User className="h-5 w-5" />
            </Button>

            {showDropDown && (
              <div
                ref={dropdownRef}
                className="absolute top-12 right-16 border border-slate-600 dark:bg-[#020617] bg-white rounded-lg"
              >
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content   rounded-md z-1 mt-3 w-40 px-2"
                >
                  <li className="mb-2 dark:hover:bg-slate-700 hover:bg-slate-100 py-2 px-3 rounded-sm cursor-pointer">
                    <Link to="/complete-profile" className=" flex gap-3">
                      <span>
                        <UserPen />
                      </span>
                      Profile
                    </Link>
                  </li>
                  <li className="mb-2 dark:hover:bg-slate-700 hover:bg-slate-100 py-2 px-3 rounded-sm cursor-pointer">
                    <Link to="" className="flex gap-3">
                      <span>
                        <Settings />
                      </span>
                      Settings
                    </Link>
                  </li>
                  <li className="mb-2 dark:hover:bg-slate-700 hover:bg-slate-100 py-2 px-3 rounded-sm cursor-pointer text-red-500">
                    <Link to="" className="flex gap-3" onClick={logoutService}>
                      {" "}
                      <span>
                        <LogOut />
                      </span>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Dialog open={openLogin} onOpenChange={setOpenLogin}>
              <DialogTrigger asChild>
                <Button variant="outline">Log in</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <AuthForm mode="login" onSuccess={() => setOpenLogin(false)} />
              </DialogContent>
            </Dialog>

            <Dialog open={openSignup} onOpenChange={setOpenSignup}>
              <DialogTrigger asChild>
                <Button>Join Now</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <AuthForm
                  mode="signup"
                  onSuccess={() => setOpenSignup(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
