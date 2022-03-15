import { rest } from "msw"
import { setupServer } from "msw/node"
import { afterAll, beforeAll, beforeEach, expect, test } from "vitest"
import { formatGists, getGists, Gist } from "./gists"

const gists: Gist[] = [
  { id: "1", description: "Gist 1", url: "https://gist.github.com/1" },
  { id: "2", description: "Gist 2", url: "https://gist.github.com/2" },
]

const server = setupServer(
  rest.get("https://api.github.com/gists/public", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(gists))
  }),
)

beforeAll(() => server.listen())
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

test("getGists", async () => {
  expect(await getGists()).toEqual(gists)
})

test("formatGists", () => {
  const output = formatGists(gists)
  for (const gist of gists) {
    expect(output).toContain(gist.description)
    expect(output).toContain(gist.url)
  }
})
