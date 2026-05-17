import { cp, mkdir, readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(currentDir, '..')
const sourceDir = path.resolve('D:/Source/github.com/blog')
const targetDir = path.resolve(projectRoot, 'src/content/blog')

async function main() {
  const entries = await readdir(sourceDir, { withFileTypes: true })
  const markdownFiles = entries.filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.md'))

  await rm(targetDir, { recursive: true, force: true })
  await mkdir(targetDir, { recursive: true })

  await Promise.all(
    markdownFiles.map((entry) =>
      cp(path.join(sourceDir, entry.name), path.join(targetDir, entry.name), { force: true }),
    ),
  )

  console.log(`Synced ${markdownFiles.length} blog markdown files.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
