interface IItemFicha {
  rotulo: string
  valor: string
}

interface IProps {
  itens: IItemFicha[]
}

/** Ficha técnica curta logo abaixo do título, como os créditos de abertura de um filme. */
export function FichaProjeto({ itens }: Readonly<IProps>) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-border border-t pt-6 md:grid-cols-4">
      {itens.map((item) => (
        <div key={item.rotulo}>
          <dt className="text-muted-foreground text-sm">{item.rotulo}</dt>
          <dd className="numeros-tabulares mt-1">{item.valor}</dd>
        </div>
      ))}
    </dl>
  )
}
