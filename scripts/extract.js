import fs from 'fs'
import path from 'path'
import {fileURLToPath} from "url"
import {pipeline} from 'stream/promises'

import yauzl from 'yauzl-promise'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const downloadPath = path.join(__dirname, "../tmp")

export default async function extract({agencyId, year}) {
    const zipFileName = `${year}_${agencyId}`
    const inputFile = path.join(downloadPath, `${zipFileName}.zip`)
    const zip = await yauzl.open(inputFile)
    try {
        for await (const entry of zip) {
            const filePath = path.join(downloadPath, entry.filename)
            if (entry.filename.endsWith('/')) {
                await fs.promises.mkdir(filePath, {recursive: true})
            } else {
                const readStream = await entry.openReadStream()
                const writeStream = fs.createWriteStream(filePath)
                await pipeline(readStream, writeStream)
            }
        }
    } finally {
        await zip.close()
    }
}