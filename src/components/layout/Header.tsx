"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NAV_LINKS, MAILTO } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > lastY.current + 4;
        const goingUp = y < lastY.current - 4;

        if (menuOpen) {
          setHidden(false);
        } else if (y < 80) {
          setHidden(false);
        } else if (goingDown) {
          setHidden(true);
        } else if (goingUp) {
          setHidden(false);
        }

        lastY.current = y;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!menuOpen && dialog.open) {
      dialog.close();
      document.documentElement.style.overflow = "";
    }
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-ink/8 bg-paper/85 backdrop-blur-md transition-transform duration-500 ease-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-5 sm:h-[4.5rem] sm:px-8 lg:px-12">
          <a
            href="#top"
            className="relative z-10 -m-2 block rounded-md p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Image
              src="/images/uploft-logo-main-clean.png"
              alt="Uploft Digital"
              width={917}
              height={336}
              priority
              loading="eager"
              className="h-6 w-auto sm:h-7"
            />
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative py-2 text-[0.95rem] font-medium text-ink/80 transition-colors hover:text-ink"
                  >
                    {link.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <Button
              href={MAILTO.startProject}
              variant="primary"
              className="py-2.5! px-5! text-[0.875rem]"
            >
              Start a Project
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            className="relative z-10 -m-2 flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
          >
            <span className="sr-only">Open menu</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
              <path
                d="M3.5 7H20.5M3.5 12H20.5M3.5 17H20.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        aria-label="Site navigation"
        onClose={closeMenu}
        onCancel={closeMenu}
        className="m-0 h-dvh max-h-none w-full max-w-none border-none bg-paper p-0 backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-dvh flex-col px-5 pt-5 sm:px-8">
          <div className="flex h-16 items-center justify-between sm:h-[4.5rem]">
            <Image
              src="/images/uploft-logo-main-clean.png"
              alt="Uploft Digital"
              width={917}
              height={336}
              className="h-6 w-auto"
            />
            <button
              type="button"
              onClick={closeMenu}
              className="-m-2 flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
            >
              <span className="sr-only">Close menu</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
                <path
                  d="M5 5L19 19M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav aria-label="Primary" className="mt-10 flex-1">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-ink/10 py-4">
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="font-serif text-[2.5rem] leading-none text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-5 pb-10">
            <Button
              href={MAILTO.startProject}
              variant="primary"
              magnetic={false}
              className="w-full justify-center py-4!"
            >
              Start a Project
            </Button>
            <p className="text-center text-sm text-ink/65">
              Coimbatore, India &middot; uploftdigital@gmail.com
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
