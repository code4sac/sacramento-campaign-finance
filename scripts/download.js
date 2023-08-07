import path from "path"
import { fileURLToPath } from "url"

import puppeteer from "puppeteer"

const __filename = fileURLToPath(
    import.meta.url)
const __dirname = path.dirname(__filename)
const downloadPath = path.join(__dirname, "../tmp")

const timeout = 120000

export default async function downloadNetfile({ agencyId, year }) {
    const downloadPageUrl = `https://public.netfile.com/pub2/Default.aspx?aid=${agencyId}`
    console.log({ downloadPageUrl })
    const browser = await puppeteer.launch({ timeout })
    const page = await browser.newPage()

    async function goto() {
        await page.goto(downloadPageUrl, { timeout })
    }

    await goto()

    if (page.url() !== downloadPageUrl) {
        await page.goto(downloadPageUrl, { timeout })
    }

    console.log('xx')

    const client = await page.target().createCDPSession()

    await client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath,
    })
    await page.waitForSelector("#ctl00_phBody_DateSelect")
    await page.select("#ctl00_phBody_DateSelect", year)
    await page.click("#ctl00_phBody_GetExcelAmend")

    // instead of trying to figure out if the file is done
    // downloading, let's just wait 5 seconds and see if
    // that works for now. shrug
    // const fileName = `${aid}-${year}.zip`
    await page.waitForTimeout(7000)
    await browser.close()
    return
}