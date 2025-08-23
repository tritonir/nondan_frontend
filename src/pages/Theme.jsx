import React from 'react';
import { useTheme } from '../context/ThemeHooks';
import { Sun, Moon, Palette, Monitor } from 'lucide-react';
import ThemeToggle from '../components/ui/ThemeToggle.jsx';

const Theme = () => {
  const { isDark, toggleTheme, theme, clubThemes, setClubTheme } = useTheme();

  const handleClubThemeSelect = (themeName, themeColors) => {
    setClubTheme(themeColors);
  };

  const clearClubTheme = () => {
    setClubTheme(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Theme Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your Nondan experience with different themes and colors
          </p>
        </div>

        {/* Current Theme Display */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Current Theme
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {isDark ? 'Dark Mode' : 'Light Mode'} is currently active
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {isDark ? 'Dark' : 'Light'}
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Theme Options */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Appearance Mode
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Light Mode */}
            <button
              onClick={() => !isDark || toggleTheme()}
              className={`p-4 rounded-lg border-2 transition-all ${
                !isDark 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Sun className="h-8 w-8 text-yellow-500" />
                <span className="font-medium text-gray-900 dark:text-white">Light</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Default bright theme</span>
              </div>
            </button>

            {/* Dark Mode */}
            <button
              onClick={() => isDark || toggleTheme()}
              className={`p-4 rounded-lg border-2 transition-all ${
                isDark 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Moon className="h-8 w-8 text-blue-500" />
                <span className="font-medium text-gray-900 dark:text-white">Dark</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Easy on the eyes</span>
              </div>
            </button>

            {/* System Mode */}
            <button
              className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
              onClick={() => {
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (systemPrefersDark !== isDark) {
                  toggleTheme();
                }
              }}
            >
              <div className="flex flex-col items-center space-y-2">
                <Monitor className="h-8 w-8 text-gray-500" />
                <span className="font-medium text-gray-900 dark:text-white">System</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Follow system setting</span>
              </div>
            </button>
          </div>
        </div>

        {/* Club Theme Colors */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Club Theme Colors
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Apply club-specific color themes to enhance your experience
              </p>
            </div>
            <button
              onClick={clearClubTheme}
              className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Clear Theme
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(clubThemes).map(([themeName, themeColors]) => (
              <button
                key={themeName}
                onClick={() => handleClubThemeSelect(themeName, themeColors)}
                className="group p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                    style={{ backgroundColor: themeColors.primary }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {themeName}
                  </span>
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: themeColors.primary }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: themeColors.accent }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: themeColors.secondary }}
                    ></div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Color Palette Preview
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Primary Colors */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Primary</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-black"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Dark</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-red-600"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Accent 1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-pink-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Accent 2</span>
                </div>
              </div>
            </div>

            {/* Background Colors */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Background</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-white border border-gray-300"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Light</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-gray-800"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Dark</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-700"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Card</span>
                </div>
              </div>
            </div>

            {/* Status Colors */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Status</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-green-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Success</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-yellow-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Warning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-red-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Error</span>
                </div>
              </div>
            </div>

            {/* Text Colors */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Text</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-gray-900 dark:bg-white"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Primary</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-gray-600"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Secondary</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-gray-400"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Muted</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Information */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex">
            <Palette className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                About Themes
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                Your theme preference is saved locally and will be remembered across sessions.
                Club themes provide visual context when browsing specific community content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theme;
