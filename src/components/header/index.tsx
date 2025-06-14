"use client";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="container m-auto p-4 sm:pt-6">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">Logo Livres</div>

        <nav className="hidden md:flex space-x-4">
          <a href="/" className="hover:underline">
            Inicio
          </a>
          <a href="/about" className="hover:underline">
            Sobre
          </a>
          <a href="/contact" className="hover:underline">
            Contato
          </a>
          <a href="/location" className="hover:underline">
            Localização
          </a>
        </nav>

        <button
          className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 ">
          <div className="flex flex-col space-y-2 pt-4 items-center">
            <a
              href="/"
              className="hover:underline py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </a>
            <a
              href="/about"
              className="hover:underline py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </a>
            <a
              href="/contact"
              className="hover:underline py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
            <a
              href="/location"
              className="hover:underline py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Localização
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
