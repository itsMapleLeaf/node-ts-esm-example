import { oraPromise } from "ora"
import { formatGists, getGists } from "./gists"

const gists = await oraPromise(getGists(), { text: "Fetching gists..." })
console.log(formatGists(gists))
