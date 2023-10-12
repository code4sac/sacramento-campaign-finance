# Sacramento campaign finance

Pull data from the City and County's campaign finance websites and display the total raised along with all of the donors per candidate in each race.

[![Update campaign finance data](https://github.com/code4sac/sacramento-campaign-finance/actions/workflows/update-data.yml/badge.svg)](https://github.com/code4sac/sacramento-campaign-finance/actions/workflows/update-data.yml)

## Getting started

This project relies on Node and the associated package manager, `npm`. We recommend using [`nvm`](https://github.com/nvm-sh/nvm/blob/master/README.md) to get the proper version of Node set up on your machine.

Once you have `nvm` installed, change into the project directory and run `nvm use`. That should activate the proper version of Node for the project.

Next, install the dependencies needed with `npm install`. This might take a few minutes.

You can now run two different commands, depending on what you'd like to do. If you want to run the web app for development use `npm run dev`. By default, the application runs at [http://127.0.0.1:3000/](http://127.0.0.1:3000/).

The application is built using [SvelteKit](https://kit.svelte.dev). If you're unfamiliar with the syntax or project structure we recommend you go through the "Getting Started" and "Core Concepts" sections in [the SvelteKit documentation](https://kit.svelte.dev/docs/introduction).

## Data generation

You'll need Node installed if you'd like to run the scraper. Once you're ready to go, run the command `node scripts/index.js`.

### Scraper methodology

Runs from `scripts/index.js`, which calls out to the other files in `scripts/`. It:
1. downloads a single year, usually the current year, from the two portals as a ZIP archive (`download.js`)
2. unzips the downloaded file into an Excel file (`extract.js`)
3. convert that Excel file into a series of `.json` files within `data/` (`transform.js`) - the files are stored here so that we only have to download a single year's worth of data to update
4. loads all the data in-memory so we can do some subsequent aggregation (`loads.js`)
5. create `$lib/data.json` by filtering the data for any of the committees that show up in the `config.js` file (both candidates and elected officials)
