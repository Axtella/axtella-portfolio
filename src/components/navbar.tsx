"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  disabled?: boolean;
}

const navItems: NavItem[] = [
  { label: "HOME", href: "/", hasDropdown: false },
  { label: "ABOUT", href: "/about", hasDropdown: false },
  {
    label: "WHAT WE DO",
    href: "#",
    hasDropdown: true,
    dropdownItems: [
      { label: "Telecommunication Solutions", href: "/services/telecommunication-solutions" },
      { label: "Information Technology", href: "/services/information-technology" },
      { label: "Internet of Things (IoT)", href: "/services/internet-of-things" },
      { label: "ELV Systems", href: "/services/elv-systems" },
      { label: "BMS & Smart Building", href: "/services/bms-smart-building" },
      { label: "Electro Mechanical Works", href: "/services/electro-mechanical-works" },
      { label: "Civil & General Construction", href: "/services/civil-general-construction" },
      { label: "Managed Services", href: "/services/managed-services" },
      { label: "Fleet Management Solutions", href: "/services/fleet-management" },
    ]
  },
  { label: "BLOGS", href: "/blogs", hasDropdown: false, disabled: true },
  { label: "CONTACT", href: "/contact", hasDropdown: false, disabled: true },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Use both window.scrollY and document.documentElement.scrollTop for Lenis compatibility
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      // Ensure navbar is visible immediately, then animate
      navRef.current.style.opacity = "1";

      gsap.fromTo(
        navRef.current,
        { y: -20 },
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-md py-1 lg:py-1 xl:py-2" : "bg-transparent py-2 lg:py-2 xl:py-3"
      )}
      style={{ opacity: 1, visibility: "visible" }}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[50px] lg:h-[56px] xl:h-[68px]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/logo1.png"
              alt="Axtella Global"
              width={260}
              height={70}
              className="h-10 sm:h-12 lg:h-12 xl:h-16"
              style={{ width: "auto", background: "transparent" }}
              priority
            />
          </a>

          {/* Desktop Navigation - Centered Pill */}
          <div
            className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 px-4 xl:px-6 absolute left-1/2 -translate-x-1/2"
            style={{
              background: "#1A1A1A",
              boxShadow: "0px 4px 43px 1px rgba(0, 0, 0, 0.08)",
              borderRadius: "53px",
              height: "clamp(45px, 3.8vw, 65px)",
            }}
          >
            {navItems.map((item) => {
              const hasDropdownItems = item.hasDropdown && item.dropdownItems;
              const isItemActive = isActive(item.href) || (hasDropdownItems && item.dropdownItems?.some(d => pathname === d.href));

              if (item.disabled) {
                return (
                  <div key={item.label} className="relative group">
                    <span
                      className="px-3 xl:px-4 py-2 font-medium flex items-center whitespace-nowrap cursor-not-allowed"
                      style={{
                        fontSize: "14px",
                        color: "rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      {item.label}
                      {hasDropdownItems && (
                        <svg
                          className="inline-block ml-1 w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-white/50 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      Coming Soon
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdownItems && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {hasDropdownItems ? (
                    <button
                      type="button"
                      className="px-3 xl:px-4 py-2 font-medium transition-colors duration-300 flex items-center whitespace-nowrap hover:text-[#F5A623]"
                      style={{
                        fontSize: "14px",
                        color: isItemActive ? "#F5A623" : "rgba(255, 255, 255, 0.9)",
                      }}
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    >
                      {item.label}
                      <svg
                        className={cn(
                          "inline-block ml-1 w-3 h-3 transition-transform duration-200",
                          activeDropdown === item.label && "rotate-180"
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="px-3 xl:px-4 py-2 font-medium transition-colors duration-300 flex items-center whitespace-nowrap hover:text-[#F5A623]"
                      style={{
                        fontSize: "14px",
                        color: isItemActive ? "#F5A623" : "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                  {/* Dropdown Menu */}
                  {hasDropdownItems && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2 min-w-[200px]">
                      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <a
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className={cn(
                              "block px-4 py-3 text-sm font-medium transition-colors",
                              pathname === dropdownItem.href
                                ? "text-[#F5A623] bg-white/5"
                                : "text-white/80 hover:text-[#F5A623] hover:bg-white/5"
                            )}
                          >
                            {dropdownItem.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Get In Touch CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <span
              className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-sm cursor-not-allowed"
              style={{
                background: "rgba(245, 166, 35, 0.3)",
                color: "rgba(8, 13, 26, 0.5)",
                fontFamily: "var(--font-plus-jakarta)",
              }}
            >
              Get In Touch
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10 mt-4">
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => {
              const hasDropdownItems = item.hasDropdown && item.dropdownItems;
              const isItemActive = isActive(item.href) || (hasDropdownItems && item.dropdownItems?.some(d => pathname === d.href));
              const isMobileDropdownOpen = mobileDropdown === item.label;

              if (item.disabled) {
                return (
                  <div key={item.label}>
                    <span
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg cursor-not-allowed text-white/30"
                    >
                      {item.label}
                      <span className="text-xs text-white/20">Coming Soon</span>
                    </span>
                  </div>
                );
              }

              return (
                <div key={item.label}>
                  {hasDropdownItems ? (
                    <button
                      type="button"
                      onClick={() => setMobileDropdown(isMobileDropdownOpen ? null : item.label)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                        isItemActive ? "text-[#F5A623]" : "text-white/80"
                      )}
                    >
                      {item.label}
                      <svg
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isMobileDropdownOpen && "rotate-180"
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-white/10",
                        isItemActive ? "text-[#F5A623]" : "text-white/80 hover:text-[#F5A623]"
                      )}
                    >
                      {item.label}
                    </a>
                  )}
                  {hasDropdownItems && isMobileDropdownOpen && (
                    <div className="mt-1 ml-4 border-l border-white/10 pl-4 space-y-1">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <a
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className={cn(
                            "block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors hover:bg-white/10",
                            pathname === dropdownItem.href
                              ? "text-[#F5A623]"
                              : "text-white/60 hover:text-[#F5A623]"
                          )}
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <span
              className="block w-full mt-4 text-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-not-allowed"
              style={{
                background: "rgba(245, 166, 35, 0.3)",
                color: "rgba(8, 13, 26, 0.5)",
                fontFamily: "var(--font-plus-jakarta)",
              }}
            >
              Get In Touch
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
