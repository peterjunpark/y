<div align="center">
  <h1 align="center" id="top">Y</h1>
  
  [![Next][Next.js]][Next-url] [![React][React.js]][React-url]

  <a href="#About">About</a> ▪️ 
  <a href="#Installation">Installation</a>
  
</div>

## About

![Y login page screenshot](https://github.com/peterjunpark/y/assets/115042610/18596434-8c80-4ba5-81f1-e23f71d67304)

A Twitter clone that supports text posts, comments, user profiles, follows, threads, bookmarks, and likes.

I built Y as an exercise to get comfortable using Next.js' new, hyped features at the time: the stable release of the App router with Server Actions.

### Built with

These are the main technologies used to build Y.

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
* Setup [Neon](https://console.neon.tech/app/projects).
  > If you're not using Neon Postgres, you'll need to redefine your Prisma schema in `y/prisma/schema.prisma` to support your database.
* Obtain client IDs and secrets for Y's supported [OAuth](https://next-auth.js.org/configuration/providers/oauth) providers.
  * [Discord](https://discord.com/developers/applications)
  * [GitHub](https://github.com/settings/apps)
  * [Kakao](https://developers.kakao.com/docs/latest/en/kakaologin/common)
  * [Osu!](https://osu.ppy.sh/home/account/edit#new-oauth-application)

### Getting started

Now, complete these steps:

1. Clone the repo
   ```sh
   git clone https://github.com/peterjunpark/y.git
   ```
2. Install dependencies via pnpm
   ```sh
   cd y
   pnpm i
   ```
3. Create a `.env` file in the root directory and add your database URLs and OAuth client ids and secrets. If you're not hosting on Vercel, you'll also need to add a [NEXTAUTH_URL](https://next-auth.js.org/configuration/options).
   ```
   # OAuth providers
   DISCORD_ID=...
   DISCORD_SECRET=...
   GITHUB_ID=...
   GITHUB_SECRET=...
   KAKAO_ID=...
   KAKAO_SECRET=...
   OSU_ID=...
   OSU_SECRET=...
   # NextAuth
   NEXTAUTH_SECRET=...
   # Database
   NEON_DATABASE_URL=...
   SHADOW_DATABASE_URL=...
   ```
4. Migrate your Prisma schema to your db, then generate your [Prisma Client](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client).
   ```
   pnpm db:migrate
   pnpm generate
   ```
6. Start the development server
   ```sh
   pnpm dev
   ```

The app should now be up and running at `http://localhost:3000`.

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
