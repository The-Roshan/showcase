import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Youtube,
  Dribbble,
  Facebook,
  Twitch,
  Globe
} from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="bg-card py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Portfolio<span className="text-primary">.</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              A collection of my finest work and creative projects.
            </p>
            <div className="flex flex-wrap gap-2">
              <a href="#" className="social-icon" aria-label="GitHub"><Github size={18} /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="social-icon" aria-label="YouTube"><Youtube size={18} /></a>
              <a href="#" className="social-icon" aria-label="Dribbble"><Dribbble size={18} /></a>
              <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" className="social-icon" aria-label="Twitch"><Twitch size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Project Categories</h3>
            <ul className="space-y-2">
              <li><a href="#projects?type=web" className="text-muted-foreground hover:text-primary transition-colors">Web Development</a></li>
              <li><a href="#projects?type=mobile" className="text-muted-foreground hover:text-primary transition-colors">Mobile Apps</a></li>
              <li><a href="#projects?type=design" className="text-muted-foreground hover:text-primary transition-colors">UI/UX Design</a></li>
              <li><a href="#projects?type=branding" className="text-muted-foreground hover:text-primary transition-colors">Branding</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="flex items-center space-x-3 mb-4">
              <Mail size={16} className="text-primary" />
              <span className="text-muted-foreground">hello@example.com</span>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <Globe size={16} className="text-primary" />
              <span className="text-muted-foreground">www.myportfolio.com</span>
            </div>
            <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full mt-2">
                Get in Touch
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
