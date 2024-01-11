<div align="center">
  <h1 align="center" id="top">Y</h1>
  
  [![Next][Next.js]][Next-url] [![React][React.js]][React-url]

  <a href="#About">About</a> ▪️ 
  <a href="#Installation">Installation</a> ▪️ 
  <a href="#How it works">How it works</a> ▪️ 
  <a href="#Roadmap">Roadmap</a> ▪️ 
  <a href="#Contributing">Contributing</a>
  
</div>

## About

![Y login page screenshot](https://github.com/peterjunpark/y/assets/115042610/18596434-8c80-4ba5-81f1-e23f71d67304)

Description here

### Built with

These are the main technologies used to build Crosswordfish. Have a look at the `package.json` file for a full list of dependencies.

* [React](https://react.dev)
* [Next.js 13 (App router)](https://nextjs.org)
* [NextAuth.js / Auth.js](https://next-auth.js.org)
* [shadcn/ui](https://ui.shadcn.com) with [TailwindCSS](https://tailwindcss.com)

<p align="right">(<a href="#top">back to top</a>)</p>

## Installation

First, get the things you'll need:

### Prerequisites

* Install [Node.js](https://nodejs.org)
* Install [pnpm](https://pnpm.io/installation)
  ```sh
  npm i -g pnpm
  ```
* Obtain client IDs and secrets for Y's supported [OAuth](https://next-auth.js.org/configuration/providers/oauth) providers.
  * [Discord](https://discord.com/developers/applications)
  * [GitHub](https://github.com/settings/apps)
  * [Kakao](https://developers.kakao.com/docs/latest/en/kakaologin/common)
  * [Osu!](https://osu.ppy.sh/home/account/edit#new-oauth-application)

### Getting started

Now, complete these steps:

1. Clone the repo
   ```sh
   git clone https://github.com/peterjunpark/crosswordfish.git
   ```
2. Install dependencies via pnpm
   ```sh
   cd crosswordfish
   pnpm i
   ```
3. Create a `.env` file in the root directory and add your OpenAI API key.
   ```
   OPEN_AI_API_KEY= ...
   ```
4. Start the development server
   ```sh
   pnpm dev
   ```

You should now be able to navigate to `http://localhost:3001` and play some crosswords 😁.

<p align="right">(<a href="#top">back to top</a>)</p>

## Roadmap

A running list of the main features to be added to Crosswordfish.

- [x] Add crossword grid generation
    - [ ] Support for American-style grids 
    - [x] Support for freeform crossword grids     
- [x] Add crossword clues generation using GPT-3.5
    - [x] Support for American-style crossword clues
    - [ ] Support for cryptic (British-style) crossword clues
- [x] Add keyboard controls
- [x] Add grid reset, word reveal, dark mode, and confetti.
- [ ] Add ability to save, share, download, and print crosswords
- [ ] Add crossword creation and publishing
- [ ] Improve responsive design for mobile
- [ ] Add PWA features
- [ ] Improve performance (AI completion fetching, data parsing, grid generation)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

This project will likely not be updated. I intend to rebuild Crosswordfish using the lessons learned here.
> The best way to build something is to build it twice. --- Someone

Feel free to fork the project for your own purposes.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
