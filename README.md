# Sacramento campaign finance

Pull data from the City and County's campaign finance websites and display the total raised along with all of the donors per candidate in each race.

[![Update campaign finance data](https://github.com/jeremiak/sacramento-campaign-finance/actions/workflows/update-data.yml/badge.svg)](https://github.com/jeremiak/sacramento-campaign-finance/actions/workflows/update-data.yml)

## Configuration



## Scraper methodology

Runs from `scripts/index.js`, which calls out to the other files in `scripts/`. It:
1. downloads a single year, usually the current year, from the two portals as a ZIP archive (`download.js`)
2. unzips the downloaded file into an Excel file (`extract.js`)
3. convert that Excel file into a series of `.json` files within `data/` (`transform.js`) - the files are stored here so that we only have to download a single year's worth of data to update
4. loads the data into a SQL lite database so we can do some subsequent aggregation (`loads.js`)
5. create `$lib/data.json` with the data needed for the body route (`aggregate.js`)