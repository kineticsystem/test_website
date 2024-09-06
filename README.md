# itHub pages example  <!-- omit from toc -->

## Table of Contents   <!-- omit from toc -->
- [Introduction](#introduction)
- [Development infrastructure](#development-infrastructure)
  - [Node.js](#nodejs)
  - [nvm](#nvm)
  - [npm](#npm)
  - [pnpm](#pnpm)
  - [vite](#vite)
- [How to run the website locally](#how-to-run-the-website-locally)
- [Project structure](#project-structure)
- [How to deploy the website](#how-to-deploy-the-website)

## Introduction

This is a dynamic website to be deployed on GitHub pages.

## Development infrastructure

### Node.js

Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code outside of a web browser. It provides the necessary environment and tools for modern JavaScript development.

Using Node.js allows us to easily manage dependencies for our React project.

### nvm

`nvm` (Node Version Manager) is a tool that allows you to easily install, manage, and switch between different versions of Node.js on your system.

To install it, follow this tutorial:

https://github.com/nvm-sh/nvm#install--update-script

To install the LTS version of Node.js, run these commands:

```bash
nvm install --lts
nvm ls-remote --lts
nvm use --lts
```

### npm

`npm` (Node Package Manager) is a tool that comes bundled with Node.js. 

React and its ecosystem (libraries, plugins, etc.) are distributed through npm, which comes bundled with Node.js.

### pnpm

`pnpm` (Performant npm) is a fast, efficient package manager for JavaScript, designed as an alternative to npm and yarn. It is also used to create, compile and run our React application locally.

To install pnpm run this command:

```bash
npm install --global pnpm
```

### vite

`vite` is a modern build tool and development server for web applications, particularly optimized for frontend frameworks like React.

This project was created using the following command:

```bash
pnpm create vite crm --template react-ts
```

## How to run the website locally

To install all required dependencies and run the website run the following commands:

```bash
cd crm
pnpm install
pnpm dev
```

## Project structure

* `public`\
  This folder contains static assets used by the website such as images or HTML files.

* `src`\
  This folder contains the React application's source code.

* `.env`\
  This file is used to define environment variables.

* `.npmrc`\
  This is a configuration file for npm and pnpm. It contains various settings related to npm's functionality, such as registry URLs, authentication tokens, package versioning rules, and other preferences.

* `.prettierrc`\
  This is a configuration file used by Prettier, an opinionated code formatter that ensures consistent formatting for your code.

## How to deploy the website

The website will be deployed at the following URL:

 https://crm.github.io