import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-panel border-t border-main py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                            Digitally.
                        </span>
                        <p className="mt-4 text-text/60 text-sm leading-relaxed">
                            The future of digital agencies is here. We combine elite human creativity with advanced artificial intelligence to build empires.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-text mb-6">Services</h4>
                        <ul className="space-y-4 text-sm text-text/60">
                            <li><a href="/#marketing" className="hover:text-primary transition-colors cursor-pointer">Digital Marketing</a></li>
                            <li><a href="/#web-dev" className="hover:text-primary transition-colors cursor-pointer">Web Development</a></li>
                            <li><a href="/#seo" className="hover:text-primary transition-colors cursor-pointer">SEO Dominance</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-text mb-6">AI Lab</h4>
                        <ul className="space-y-4 text-sm text-text/60">
                            <li><a href="/#roast" className="hover:text-primary transition-colors cursor-pointer">Website Roaster</a></li>
                            <li><a href="/#resume-tool" className="hover:text-primary transition-colors cursor-pointer">ATS Resume Tool</a></li>
                            <li><a href="/#qualify" className="hover:text-primary transition-colors cursor-pointer">Growth Plan AI</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-text mb-6">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-panel border border-main flex items-center justify-center text-text/60 hover:text-primary hover:border-primary transition-all"><Github className="h-5 w-5" /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-panel border border-main flex items-center justify-center text-text/60 hover:text-primary hover:border-primary transition-all"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-panel border border-main flex items-center justify-center text-text/60 hover:text-primary hover:border-primary transition-all"><Linkedin className="h-5 w-5" /></a>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-main text-center text-text/40 text-sm">
                    &copy; {new Date().getFullYear()} Digitally Agency. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
