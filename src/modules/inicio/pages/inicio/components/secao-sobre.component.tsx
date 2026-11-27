import { Quadro } from '@/common/components/quadro/quadro.component'
import type { IPerfilModel } from '@/common/models/perfil.model'
import { Ancoras } from '@/common/utils/rotas.util'

interface IProps {
  nome: string
  especialidade: string
  sobre: IPerfilModel['sobre']
  titulo: string
}

export function SecaoSobre({ nome, especialidade, sobre, titulo }: Readonly<IProps>) {
  return (
    <section
      id={Ancoras.SOBRE}
      aria-labelledby="sobre-titulo"
      className="moldura grid gap-12 py-24 md:grid-cols-12 md:gap-6 md:py-36"
    >
      <Quadro
        imagem={sobre.foto}
        sizes="(min-width: 48rem) 36vw, 100vw"
        className="aspect-[4/5] md:col-span-5 lg:col-span-4"
      />
      <div className="flex flex-col md:col-span-6 md:col-start-7 lg:col-start-6 lg:col-span-6 lg:pl-10">
        <h2 id="sobre-titulo" className="text-muted-foreground text-sm">
          {titulo}
        </h2>
        <p className="titulo-cinema mt-6 text-[clamp(2.25rem,5vw,4rem)]">{nome}</p>
        <p className="mt-3 text-muted-foreground">{especialidade}</p>
        <div className="mt-10 flex max-w-xl flex-col gap-5 text-[1.125rem] text-texto-apoio leading-relaxed">
          {sobre.paragrafos.map((paragrafo) => (
            <p key={paragrafo}>{paragrafo}</p>
          ))}
        </div>
        {sobre.fatos.length > 0 ? (
          <dl className="mt-auto grid gap-6 border-border border-t pt-6 sm:grid-cols-3 md:mt-16">
            {sobre.fatos.map((fato) => (
              <div key={fato.rotulo}>
                <dt className="text-muted-foreground text-sm">{fato.rotulo}</dt>
                <dd className="mt-1">{fato.valor}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  )
}
