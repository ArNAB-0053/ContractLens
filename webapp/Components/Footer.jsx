"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePath } from "@/hooks/use-pathname";
import { cn } from "@/lib/utils";
import { Linkedin, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const {pageName} = usePath()
  return (
    <footer className={cn("bg-gray-100 py-12 lg:px-20",
      pageName === '' ? '' : 'hidden'
    )}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="lg:w-[80%]">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                About ContractLens
              </h3>
              <p className="text-gray-600 mb-6">
                ContractLens is your smart assistant for contract comparison and
                analysis. Simplify legal processes with clarity and efficiency.
              </p>
              <form className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none"
                />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Linkedin />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Twitter />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Facebook />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          © 2025 ContractLens. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
