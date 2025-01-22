"use client";

import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { usePath } from "@/hooks/use-pathname";

const tools = [
  {
    title: "Text Extractor",
    href: "/tools/text-extractor",
    description: "Extract text from PDFs or images using OCR efficiently.",
  },
  {
    title: "Text Preprocessing",
    href: "/tools/text-preprocessing",
    description: "Clean and normalize text with advanced preprocessing tools.",
  },
  {
    title: "Chat with PDF",
    href: "/tools/chat-with-pdf",
    description: "Converse and interact with your PDF documents easily.",
  },
  {
    title: "Similarity Checker",
    href: "/tools/similarity-checker",
    description: "Identify similarities and differences between texts.",
  },
  {
    title: "Summarizer",
    href: "/tools/summarizer",
    description: "Generate concise summaries for lengthy documents.",
  },
  {
    title: "Keyword Extractor",
    href: "/tools/keyword-extractor",
    description: "Extract key topics and themes from your text.",
  },
];

const Header = () => {
  const {pageName} = usePath()
  // console.log(pageName)
  return (
    <header className={cn("border-b  backdrop-blur-md bg-white/40 select-none px-8 z-50 w-screen md:px-16 lg:px-28", 
      pageName === '' || pageName === 'text-extractor' ? 'fixed' : 'flex items-center justify-center'
    )}>
      <nav className="container mx-auto py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-gray-800" />
            <span className="text-xl font-bold text-gray-800">
              ContractLens
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-6">
          <NavigationMenu className='max-lg:hidden'>
            <NavigationMenuList>
              <NavigationMenuItem className='bg-transparent'>
                <NavigationMenuTrigger className='bg-transparent'>Other Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[500px] md:grid-cols-2 lg:grid-cols-2 ">
                    {tools.map((tool) => (
                      <ListItem
                        key={tool.title}
                        title={tool.title}
                        href={tool.href}
                      >
                        {tool.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href="/about"
            className="text-gray-600 hover:text-gray-800 transition-colors max-lg:hidden"
          >
            <Button variant="ghost" className=''>About</Button>
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-gray-800 transition-colors max-lg:hidden"
          >
            <Button variant="ghost" className=''>Contact</Button>
          </Link>

          <Link href="/compare-contract">
            <Button className="rounded-md">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

const ListItem = ({ title, href, children }) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
);

export default Header;
