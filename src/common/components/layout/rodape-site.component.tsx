interface ILinkRodape {
  href: string
  rotulo: string
  ehExterno?: boolean
}

interface IProps {
  nome: string
  ano: number
  textoDireitos: string
  links: ILinkRodape[]
  voltarAoTopo: ILinkRodape
}

export function RodapeSite({ nome, ano, textoDireitos, links, voltarAoTopo }: Readonly<IProps>) {
  return (
    <footer className="border-border border-t">
      <div className="moldura flex flex-col gap-6 py-10 text-muted-foreground text-sm md:flex-row md:items-center md:justify-between">
        <p className="numeros-tabulares">
          © {ano} {nome}. {textoDireitos}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                {...(link.ehExterno ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="transition-colors hover:text-foreground"
              >
                {link.rotulo}
              </a>
            </li>
          ))}
          <li>
            <a href={voltarAoTopo.href} className="transition-colors hover:text-foreground">
              {voltarAoTopo.rotulo}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
