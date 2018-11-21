<div align="center">
  <h1>Donatello</h1>  
  <sup>Document based Content Management System with <a href="//github.com/angular/angular" target="_blank">Angular 6</a></sup>
</div>

<br>

*WIP (Work in Progress): This project is under heavy construction. Please, use with caution. It is planned to develope a modular static page generator for developer novices to maintain there own website. It is recommended to use it together with [nls-lumen-webhook](//github.com/nextlevelshit/nls-lumen-webhook) for automated deployments.*

<br>

## Getting Started

### Rquirements

- [Install **Node.js** via package manager](//nodejs.org/en/download/package-manager/)
- [Install **Angular CLI** via npm](//angular.io/guide/quickstart)
- [Install **GraphicsMagick** on your OS](//gist.github.com/witooh/089eeac4165dfb5ccf3d)

### Usefull Scripts

| command          | description                                                     |
|------------------|-----------------------------------------------------------------|
| `npm run start`  | start development server on `http://localhost:4200/`            |
| `npm run build`  | build production application and save to `./dist`               |

### Development server

Download dependencies with `npm i` or `yarn`.

Run `npm run start` for a dev server. Browser opens and navigates automatically to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build for Distribution

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Recommended git hooks (optional)

Create inside `.git/hooks/` a new hook `post-merge`.

```bash
#!/bin/bash
# Install node package modules
npm i
# Build project
npm run build
```

Git hooks have to be executables, so change the permissions to.

```bash
chmod a+x ~/.git/hooks/post-merge
```

## Meta Information

*Informations about the motivation, authors and license*

## Author

The author of this software is [Michael Czechowski](//dailysh.it), web developer based in Stuttgart and Berlin, Germany. Only with the support of [Sarah Esser](//sarahesser.de), artist and sculptress based in Berlin, this project could be realized. We are proud to call our software free and open.

## Contributors

- Michael Czechowski (<mail@dailysh.it>)

## License

Copyright (C) 2018 Michael Czechowski

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; version 2.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

