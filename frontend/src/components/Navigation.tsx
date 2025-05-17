
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, MessageSquare, Moon, Search, Sun, User } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuthForm from "./AuthForm";
import { useTheme } from "./ThemeProvider";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <Code className="h-6 w-6 text-codemate-purple" />
          <span className="text-xl font-bold gradient-text">PeerPrep</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">How it works</a>
          <a href="#success-stories" className="text-muted-foreground hover:text-foreground transition-colors">Success Stories</a>
          <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
        </nav>
        
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
            
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Log in</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <AuthForm mode="login" onSuccess={() => setIsLoggedIn(true)} />
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>Join Now</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <AuthForm mode="signup" onSuccess={() => setIsLoggedIn(true)} />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
