import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const projectRoot = resolve(process.cwd())
const xdg = join(projectRoot, '.wrangler')
mkdirSync(xdg, { recursive: true })
process.env.XDG_CONFIG_HOME = xdg

const args = process.argv.slice(2)
if (!args.length) {
  process.stderr.write('Missing wrangler args\n')
  process.exit(1)
}

const bin = process.platform === 'win32' ? 'wrangler.cmd' : 'wrangler'
const wranglerBin = join(projectRoot, 'node_modules', '.bin', bin)

const child = spawn(wranglerBin, args, { stdio: 'inherit', env: process.env, shell: process.platform === 'win32' })
child.on('exit', (code) => process.exit(code ?? 1))
