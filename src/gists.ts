import chalk from "chalk"
import fetch from "node-fetch"

export type Gist = {
  id: string
  description: string
  url: string
}

export async function getGists() {
  const response = await fetch(`https://api.github.com/gists/public`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
  return response.json() as Promise<Gist[]>
}

export function formatGists(gists: Gist[]) {
  return gists
    .map((gist) => {
      const description =
        gist.description || chalk.dim.italic("(no description)")

      return `${description} ${chalk.dim(`(${gist.url})`)}`
    })
    .join("\n")
}
