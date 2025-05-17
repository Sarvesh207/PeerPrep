
import { Code } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4 md:max-w-xs">
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-codemate-purple" />
              <span className="text-xl font-bold gradient-text">PeerPrep</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Connect with developers who share your goals. Find the perfect partner for interview preparation, pair programming, and project collaboration.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="font-medium">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Success Stories</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Interview Questions</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Project Ideas</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Learning Paths</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t text-center md:text-left text-sm text-muted-foreground">
          <p>&copy; {currentYear} PeerPrep. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
