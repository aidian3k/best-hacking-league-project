import React from 'react';

const Footer = () => {
  return (
      <footer className="bg-gray-700 text-white py-6 mt-auto">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-center md:text-left text-sm">&copy; {new Date().getFullYear()} Skill
            Spotter. All rights reserved.</p>
          <div className="flex items-center">
            <p className="mr-4 text-sm hidden md:block">Visit us on GitHub:</p>
            <a href="https://github.com/dobdaw" target="_blank"
               rel="noopener noreferrer"
               className="text-white hover:text-gray-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"
                   viewBox="0 0 24 24">
                <path fillRule="evenodd"
                      d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.798 8.207 11.387.6.11.793-.261.793-.577 0-.285-.01-1.039-.015-2.038-3.338.724-4.042-1.611-4.042-1.611-.547-1.388-1.336-1.758-1.336-1.758-1.092-.745.083-.73.083-.73 1.206.085 1.839 1.24 1.839 1.24 1.07 1.835 2.805 1.304 3.488.998.108-.776.42-1.305.766-1.604-2.676-.305-5.486-1.338-5.486-5.962 0-1.317.47-2.39 1.241-3.236-.125-.307-.54-1.528.117-3.182 0 0 1.012-.322 3.315 1.233.962-.267 1.992-.4 3.015-.405 1.023.005 2.053.138 3.018.405 2.302-1.555 3.313-1.233 3.313-1.233.659 1.654.244 2.875.119 3.182.773.846 1.24 1.919 1.24 3.236 0 4.639-2.815 5.652-5.489 5.952.431.373.81 1.108.81 2.233 0 1.611-.015 2.905-.015 3.293 0 .32.19.695.8.575C20.566 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                      clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
  );
}

export default Footer;