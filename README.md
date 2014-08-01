pointy.js website
===========================================

This website is built using Jekyll, and produces all static content. It is hosted at http://vistaprint.github.io/PointyJS.

Documentation for individual pointy.js libraries are in markdown, in /site/*.md.

## Building the site
To build the site:
* Make edits
* Run ```grunt```
* Test the site in /site/_site

## Deploying the site
To deploy:
* On Mac/*nix: ./publish-site.sh
* On Windows: ./publish-site.ps1

## Installation of dependencies

* Install [Ruby](http://rubyinstaller.org/downloads/)
 * Add ruby bin dir to your PATH environment variable
 * Mac users should have Ruby installed already

* Install RubyDevKit on Windows
 * On windows, use [RubyDevKit](http://rubyinstaller.org/downloads/)
 * Follow the [installation instructions](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit) 

* Install Python 2.7
 * Mac users should ensure they have python 2.7+ installed.
 * Windows users should use the [Python 2.7.5 Windows X86-64 Installer](http://www.python.org/getit/). *On windows, add C:\Python27;C:\Python27\Scripts to your PATH*

*  Install python easy_install
 * Mac installation (use setuptools 1.1): https://pypi.python.org/pypi/setuptools
 * Windows installation: https://pypi.python.org/pypi/setuptools/1.1#windows

Note: Jekyll uses Pygments for syntax coloring.  Pygments requires Python and Ruby, and can be installed via easy_install.

* Install [Pygments](http://pygments.org/download/) (Python)
 * Run ```easy_install Pygments```

* Install [Jekyll](http://jekyllrb.com/docs/installation/)
 * Windows: ```gem install jekyll```
 * Mac: ```sudo gem install jekyll```
 * _If you need to uninstall pygments 5.2 and install 5.0:_
 * *http://stackoverflow.com/questions/17364028/jekyll-on-windows-pygments-not-working*
 * ```gem uninstall pygments.rb --version "=0.5.2"```
 * ```gem install pygments.rb --version "=0.5.0"```

* Install node:
 * http://nodejs.org/download/

* Install grunt
 * You can install grunt by using npm, run the following command: 
 * ```npm install -g grunt-cli```

* Install NPM packages
 * ```npm install```

# Notes
* Debugging:
 * Use node-inspector
 * ```node-inspector --web-port=8081```

* Debug grunt: 
 * Run ```node --debug-brk C:\Users\{username}\AppData\Roaming\npm\node_modules\grunt-cli\bin\grunt```

