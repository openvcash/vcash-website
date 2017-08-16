# Vcash website

[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Standard style guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

:honeybee: Vcash community website built using
[Next.js](https://github.com/zeit/next.js/), with content from the original
website and whitepapers.

## Table of Contents
- [Install from source](#install-from-source)
- [Development and production modes](#development-and-production-modes)
- [Contributing](#contributing)
- [License](#license)

--------------------------------------------------------------------------------

## Install from source
Make sure you have installed `git` and the latest version of
[Node.js](https://nodejs.org/en/download/current/). Then clone this repository
using `git clone`, move to the cloned directory using `cd vcash-website/` and
install Node.js dependencies using `npm install`.

    git clone https://github.com/whphhg/vcash-website.git
    cd vcash-website/
    npm install

After the dependency installation is completed you can start the website in
either development or production mode, as described below.

## Development and production modes
You can start the website in development mode using `npm run dev`.

    npm run dev

To start it in production mode, first build it using `npm run build` and then
start it using `npm start`.

    npm run build
    npm start

The Express server will be listening on `http://localhost:3000` in both modes.

## Contributing
Thank you for taking the time to help and improve the website! Please read the
[contributing guide](https://github.com/whphhg/vcash-website/blob/master/.github/CONTRIBUTING.md).


## License
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
