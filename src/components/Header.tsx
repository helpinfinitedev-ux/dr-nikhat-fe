import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { path: "/", display: "Home", isRoute: true },
  { path: "#treatments", display: "Treatments", isRoute: false },
  { path: "#about", display: "About", isRoute: false },
  { path: "/products", display: "Products", isRoute: true },
  { path: "/blog", display: "Blog", isRoute: true },
  { path: "/testimonials", display: "Testimonials", isRoute: true },
  { path: "/book-appointment", display: "Contact", isRoute: true },
];

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        headerRef.current?.classList.add("sticky__header");
      } else {
        headerRef.current?.classList.remove("sticky__header");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, isRoute: boolean) => {
    if (!isRoute) {
      e.preventDefault();
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="flex items-center h-20 leading-[80px] bg-background/95 backdrop-blur-sm z-50 transition-all duration-300" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-heading">Dr. Nikhat</span>
              <span className="text-xs text-secondary font-medium -mt-1">Homeopathy</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  {link.isRoute ? (
                    <Link
                      to={link.path}
                      className="text-text font-medium hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
                      {link.display}
                    </Link>
                  ) : (
                    <a
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path, link.isRoute)}
                      className="text-text font-medium hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
                      {link.display}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/book-appointment" className="btn h-14 btn-primary flex items-center gap-2">
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden z-50 p-2 rounded-lg hover:bg-muted transition-colors" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6 text-heading" /> : <Menu className="w-6 h-6 text-heading" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 bg-foreground/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={toggleMenu}>
          <div
            className={`absolute top-0 right-0 w-[280px] h-full bg-background shadow-xl transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}>
            <div className="pt-20 px-6">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    {link.isRoute ? (
                      <Link to={link.path} onClick={() => setIsMenuOpen(false)} className="block py-3 text-lg text-text font-medium hover:text-primary transition-colors border-b border-border">
                        {link.display}
                      </Link>
                    ) : (
                      <a
                        href={link.path}
                        onClick={(e) => handleNavClick(e, link.path, link.isRoute)}
                        className="block py-3 text-lg text-text font-medium hover:text-primary transition-colors border-b border-border">
                        {link.display}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <Link to="/book-appointment" onClick={() => setIsMenuOpen(false)} className="btn btn-primary w-full text-center mt-6 block">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
