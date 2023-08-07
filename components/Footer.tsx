import Link from 'next/link';
import React from 'react';
import { SocialIcon } from 'react-social-icons';
import social from '../constants/socialLinks.json';
import womens from '../constants/womenLinks.json';
import company from '../constants/companyLinks.json';
import supportors from '../constants/supportorsLinks.json';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="px-4 divide-y text-cascade-700 dark:bg-background-secondary dark:text-text-color-primary bg-white-linen max-w-6xl mx-auto ">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <Logo />
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase font-medium">
              For Supportors
            </h3>
            <ul className="space-y-1 flex flex-col">
              {supportors.map((section, idx) => {
                const { name, href } = section;
                return (
                  <Link key={idx} href={href}>
                    {name}
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase font-medium">Company</h3>
            <ul className="space-y-1 flex flex-col">
              {company.map((section, idx) => {
                const { name, href } = section;
                return (
                  <Link key={idx} href={href}>
                    {name}
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase font-medium">For Womens</h3>
            <ul className="space-y-1 flex flex-col">
              {womens.map((section, idx) => {
                const { name, href } = section;
                return (
                  <Link key={idx} href={href}>
                    {name}
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase font-medium">Social media</div>
            <div className="flex justify-start space-x-3">
              {social.map((social, idx) => {
                return (
                  <SocialIcon
                    className="h-5 w-5"
                    fgColor="#FFFFFF"
                    bgColor="#84a59d"
                    href={social}
                    key={idx}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center">
        © {new Date().getFullYear()} SheConfident. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
