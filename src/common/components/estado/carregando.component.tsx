interface IProps {
  texto: string
}

/** Estado de carregamento discreto: uma linha fina que pulsa. */
export function Carregando({ texto }: Readonly<IProps>) {
  return (
    <div role="status" className="moldura flex min-h-[50dvh] items-center">
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true" className="relative h-px w-24 overflow-hidden bg-border">
        <span className="absolute inset-y-0 left-0 w-1/3 bg-foreground motion-safe:animate-pulse" />
      </span>
    </div>
  )
}
