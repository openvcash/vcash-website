# Vcash Next.js website
[![Gitter](https://badges.gitter.im/openvcash/vcash.svg)](https://gitter.im/openvcash/vcash?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Community website for [Vcash](https://vcash.info/), with contents from the
original website, docs and white papers.

## Table of Contents
- [Install from source](#install-from-source)
- [Use Nginx as a reverse proxy](#use-nginx-as-a-reverse-proxy)
- [Development and production modes](#development-and-production-modes)
- [Contributing](#contributing)
- [License](#license)

--------------------------------------------------------------------------------

## Install from source
Make sure you have installed `git` and the latest version of
[Node.js](https://nodejs.org/en/download/current/), then clone this repository,
move to the cloned directory and install Node.js dependencies.

    git clone https://github.com/openvcash/vcash-website.git
    cd vcash-website/
    npm install

After the dependency installation is completed, create a `.www.json` file in the
cloned directory and use the default config below. This file contains the
server and client hostnames and protocols being used during SSR.

```
{
  "client": "http://localhost:3000",
  "server": "http://localhost:3000"
}
```

You can start the website in either development or production mode,
as described below.

## Development and production modes
You can start the website in development mode using `npm run dev`, or in
production mode by first building it using `npm run build` and then starting it
using `npm start`.

    npm run dev
    npm run build
    npm start

The Express server will be listening on `http://localhost:3000` in both modes.

## Use Nginx as a reverse proxy
You can use this simple configuration to have Nginx act as a reverse proxy
for the website, by proxying from `localhost:3000` to `hostname:80`.

The configuration file is found at `/etc/nginx/sites-available/default`.

```
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name localhost;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

You can change the protocol and hostname being used by changing the `client`
value in `.www.json`. By default it's set to `http://localhost:3000`. In production
it should be changed to `//domain.tld` so the resources will be correctly
fetched on the client side.

## Contributing
Thank you for taking the time to help and improve the website! Please read the
[contributing guide](https://github.com/openvcash/vcash-website/blob/master/.github/CONTRIBUTING.md).


## License
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
