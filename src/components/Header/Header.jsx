import React, { useState } from "react";
import { Container, LogoutBtn, Logo } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeToggle from "../ThemeToggle";
import { Menu, X, Home, LogIn, UserPlus, FileText, PenSquare } from "lucide-react";
import { Button } from "../ui/button";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const { userRole } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      icon: Home,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: LogIn,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: UserPlus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: FileText,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus && (userRole === 'author' || userRole === 'admin'),
      icon: PenSquare,
    },
  ];

  const isActive = (slug) => {
    if (slug === '/') return location.pathname === '/';
    return location.pathname.startsWith(slug);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="hover:opacity-70 transition-opacity"
            aria-label="Apogee Home"
          >
            <Logo size="default" />
          </Link>
          
          {/* Desktop Navigation - Clean & Simple */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`
                      text-base font-medium transition-colors duration-200
                      ${isActive(item.slug)
                        ? 'text-foreground'
                        : 'text-foreground/60 hover:text-foreground'
                      }
                    `}
                    aria-label={item.name}
                    aria-current={isActive(item.slug) ? 'page' : undefined}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            
            {/* Theme Toggle */}
            <li>
              <ThemeToggle />
            </li>
            
            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground hover:bg-muted rounded-lg transition-colors focus-ring"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden py-4 border-t border-border animate-fade-in"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-1">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setMobileMenuOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg
                        transition-all duration-200 focus-ring
                        ${isActive(item.slug)
                          ? 'text-primary bg-primary/10'
                          : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                        }
                      `}
                      aria-current={isActive(item.slug) ? 'page' : undefined}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="pt-2 border-t border-border">
                  <LogoutBtn className="w-full" />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;