import type { ICreditoModel } from '@/common/models/projeto.model'

interface IProps {
  creditos: ICreditoModel[]
  titulo: string
}

export function CreditosProjeto({ creditos, titulo }: Readonly<IProps>) {
  if (creditos.length === 0) return null

  return (
    <section
      aria-labelledby="creditos-titulo"
      className="moldura grid gap-8 pb-24 md:grid-cols-12 md:pb-32"
    >
      <h2 id="creditos-titulo" className="text-muted-foreground text-sm md:col-span-4">
        {titulo}
      </h2>
      <dl className="md:col-span-8">
        {creditos.map((credito) => (
          <div
            key={`${credito.funcao}-${credito.nome}`}
            className="grid grid-cols-1 gap-1 border-border border-t py-4 sm:grid-cols-2 sm:gap-6"
          >
            <dt className="text-muted-foreground">{credito.funcao}</dt>
            <dd>{credito.nome}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
