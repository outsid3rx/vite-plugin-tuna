export class CommandBuilder {
  private command = ['tuna http']

  public addHost(host: string, port: number): this {
    this.command.push(`${host}:${port}`)

    return this
  }

  public addDomain(domain?: string): this {
    if (domain) {
      this.command.push(`--subdomain=${domain}`)
    }

    return this
  }

  public getCommand() {
    return this.command.join(' ')
  }
}
