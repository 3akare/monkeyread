import { Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full max-w-7xl mx-auto py-8 px-4 flex justify-start items-center gap-8">
            <a
                href="mailto:contact@example.com"
                className="flex items-center gap-2 text-sub hover:text-text transition-colors text-sm group"
            >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>contact</span>
            </a>
            <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sub hover:text-text transition-colors text-sm group"
            >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>github</span>
            </a>
            <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sub hover:text-text transition-colors text-sm group"
            >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>linkedin</span>
            </a>
        </footer>
    );
};

export default Footer;
