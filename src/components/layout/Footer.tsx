import { Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full max-w-7xl mx-auto py-8 px-4 flex justify-start items-center gap-8">
            <a
                href="mailto:bakaredavid007@gmail.com"
                className="flex items-center gap-2 text-sub hover:text-text transition-colors text-sm group"
            >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>contact</span>
            </a>
            <a
                href="https://github.com/3akare/monkeyread"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sub hover:text-text transition-colors text-sm group"
            >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>github</span>
            </a>
            <a
                href="https://www.linkedin.com/posts/3akare_saw-this-youtube-short-and-thought-it-was-activity-7419405515199299585-knEd"
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
