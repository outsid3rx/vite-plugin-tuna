import { ChildProcess, exec } from 'node:child_process'
import pc from 'picocolors'
import type { Plugin, ResolvedConfig } from 'vite'

import { CommandBuilder } from './command-builder'

const URL_REGEX = /https:\/\/[a-zA-Z0-9-.]+(tuna.am)/gm
const DEFAULT_PORT = 5173

interface IConfig {
  domain?: string
}

const tunaPlugin = (pluginConfig?: IConfig): Plugin => {
  let process: ChildProcess
  let url = ''

  return {
    name: 'vite-plugin-tuna',
    apply: (_, config) => config.command === 'serve' && config.mode !== 'test',
    async configResolved(config: ResolvedConfig) {
      const {
        url: tunaUrl,
        hostname,
        process: tunaProcess,
      } = await runTuna(config.server.port || DEFAULT_PORT, pluginConfig)

      url = tunaUrl
      process = tunaProcess

      if (config.server.allowedHosts === true) return

      const hosts = Array.isArray(config.server.allowedHosts)
        ? config.server.allowedHosts
        : []
      config.server.allowedHosts = [...hosts, hostname]
    },
    configureServer(server) {
      const { config, printUrls } = server

      if (url) {
        server.printUrls = () => {
          printUrls()
          config.logger.info(
            `  ${pc.magenta('➜')}  ${pc.magenta('tuna')}:   ${pc.cyan(url)}`,
          )
        }
      }

      server.httpServer?.on('close', () => process?.kill(0))
    },
  } satisfies Plugin
}

const runTuna = (port: number, config?: IConfig) =>
  new Promise<{ url: string; hostname: string; process: ChildProcess }>(
    (resolve, reject) => {
      const command = new CommandBuilder()
        .addHost('localhost', port)
        .addDomain(config?.domain)
        .getCommand()
      const process = exec(command)

      process.stdout?.on('data', (_) => {})
      process.stderr?.on('data', (data) => {
        const matches = data.toString().match(URL_REGEX)

        if (matches) {
          const url = String(matches[0])

          const hostname = new URL(url).hostname

          resolve({ url, hostname, process })
        }
      })
      process.on('close', (code) => {
        console.log(`Tuna exit with code: ${code}`)
      })
      process.on('exit', (code, signal) => {
        console.log(`Tuna exit with code: ${code}, and signal: ${signal}`)
      })
      process.on('error', (error) => {
        console.error(error)
        reject(error)
      })
    },
  )

export default tunaPlugin
