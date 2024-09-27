# Catalog Assignment - Saurabh Paryani

## LIVE LINK: https://catalog-assignment-saurabhparyani.vercel.app

## Features
- Fullscreen mode
- Compare button that compares current coin (named it Catalog coin) with top 5 coins (BTC, ETH, USDT, BNB, SOL)
- Statistics tab that shows a market cap distribution of top 5 coins, and a 7-day price trend
- Fetched crypto news in the Analysis tab with live links
- Deployed the app

## Technologies/Libraries Used:
- React + Typescript (Used Vite to set up React)
- TailwindCSS
- ShadcnUI
- Recharts.js
- vite-plugin-svgr to import SVGs as React Components

## APIs Used:
- CoinGecko API for coins
- Cryptocurrency News (Bitcoinist) - RapidAPI


-----------------------------------------------------------------------------


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
