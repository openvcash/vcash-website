# Contributing
:deciduous_tree: Thank you for taking the time to help and improve the website!

If you've noticed a bug or have a question, search the
[issue tracker](https://github.com/openvcash/vcash-website/issues) to see if
someone else in the community has already submitted an issue. If not, go ahead
and [submit one](https://github.com/openvcash/vcash-website/issues/new)! If
it's something you think you can fix, improve or implement by yourself, then
[fork](https://help.github.com/articles/fork-a-repo) the repository and create
a branch with a descriptive name that includes the issue number (e.g. #42).

    git checkout -b 42-add-japanese-translations

Next, install [Node.js](https://nodejs.org/en/download/current/) dependencies
in the local clone of your fork using `npm install`. After the dependency
installation is completed, create a `.www.json` file in the cloned directory
and use the default config below. This file contains the server and client
hostnames and protocols being used during SSR.

```
{
  "client": "http://localhost:3000",
  "server": "http://localhost:3000"
}
```

You can now start the website in development mode using `npm run dev`, or in
production mode by first building it using `npm run build` and then starting it
using `npm start`.

    npm run dev
    npm run build
    npm start

The Express server will be listening on `http://localhost:3000` in both modes.

You're now ready to implement your fix or feature. Make sure that your code
lints by using `npm run lint` and to format it using `npm run format` before
creating the pull request.

    npm run lint
    npm run format

### Code style
This repository uses [prettier](https://github.com/prettier/prettier) and
[standard](https://standardjs.com/) to maintain code style and consistency,
and to avoid bike-shedding.

### Add new translation
Follow and complete the steps above, then create a copy of the `en-US/`
directory in `static/locales/` and construct the first part of the copied
directory name by using the `ISO 639-1 Code`
[language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
and the second part by using the `ISO 3166 Alpha-2 code`
[country code](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes).
Delimit the two parts with a dash `-`.

The final step is to open `src/utilities/common.js` and add your
translation to the
[languages](https://github.com/openvcash/vcash-website/blob/master/src/utilities/common.js#L21-L22)
array. Please add it in alphabetical order (by name) and use 2 spaces to indent
the line.

    { language: 'languageCode-countryCode', name: 'Language' },

You can now select your translation on the website and begin translating the
strings in `common.json` and `network.json`.

**Note:** Please use an editor that will open and save files in UTF-8
(e.g. [Atom](https://atom.io/)).

### Create a pull request
You should now switch back to your master branch and make sure it's up-to-date
with the upstream master branch.

    git remote add upstream git@github.com:openvcash/vcash-website.git
    git checkout master
    git pull upstream master

Then update your feature branch from your local copy of master, and push it.

    git checkout 42-add-japanese-translations
    git rebase master
    git push --set-upstream origin 42-add-japanese-translations

Finally, go to [GitHub](https://github.com/openvcash/vcash-website) and create
a [pull request](https://help.github.com/articles/creating-a-pull-request).
