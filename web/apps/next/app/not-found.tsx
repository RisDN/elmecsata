"use client";
import { Button } from "@/lib/ui/button";
import Meteors from "@/lib/ui/magicui/meteors";
import { ArrowLeft, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ToggleThemeButton";

export default function NotFound() {
    return (
        <div className="relative min-h-screen w-full flex flex-col">

            <div className="absolute top-0 z-[-2] h-screen w-screen overflow-x-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.4),rgba(255,255,255,0))] dark:bg-[radial-gradient(100%_150%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
                <Meteors number={30} />
            </div>

            <main className="flex-1 flex flex-col items-center justify-center px-4">

                <div className="text-center space-y-6 max-w-md">
                    <div className="flex justify-center">
                        <Image
                            src="/imgs/logo.png"
                            alt="ElmeCsata"
                            width={120}
                            height={120}
                            className="dark:invert"
                        />
                    </div>

                    <h1 className="text-7xl font-bold text-black dark:text-white animate-bounce">404</h1>

                    <h2 className="text-2xl font-semibold text-black dark:text-white">
                        Az oldal nem található
                    </h2>

                    <p className="text-muted-foreground">
                        A keresett oldal nem létezik vagy eltávolításra került. Ellenőrizd a címet, vagy térj vissza a főoldalra.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button
                            variant="outline"
                            className="group rounded-full bg-black/15 transition-all dark:bg-primary/30 hover:bg-primary/15 dark:hover:bg-primary/40 text-black dark:text-white border-2 border-transparent dark:border-primary/50"
                            asChild
                        >
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Vissza a főoldalra
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="group rounded-full bg-black/15 transition-all dark:bg-primary/30 hover:bg-primary/15 dark:hover:bg-primary/40 text-black dark:text-white border-2 border-transparent dark:border-primary/50"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Vissza az előző oldalra
                        </Button>
                    </div>
                </div>
            </main>

            <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} ElmeCsata. Minden jog fenntartva.
            </footer>
            <div className='absolute bottom-4 right-4 z-30'>
                <ModeToggle />
            </div>
        </div>
    );
}