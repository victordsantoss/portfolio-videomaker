interface IProjetoComparavel {
  slug: string
  categoria: string
}

interface IVizinhos<TProjeto> {
  anterior: TProjeto
  proximo: TProjeto
}

/** Projeto anterior e próximo na ordem do portfólio, voltando ao início no fim da lista. */
export function encontrarVizinhos<TProjeto extends IProjetoComparavel>(
  projetos: TProjeto[],
  slug: string,
): IVizinhos<TProjeto> | undefined {
  const indice = projetos.findIndex((projeto) => projeto.slug === slug)
  if (indice === -1 || projetos.length < 2) return undefined

  const anterior = projetos[(indice - 1 + projetos.length) % projetos.length]
  const proximo = projetos[(indice + 1) % projetos.length]
  return anterior && proximo ? { anterior, proximo } : undefined
}

/**
 * Outros projetos para sugerir no fim da página: primeiro os da mesma categoria,
 * depois os seguintes na ordem do portfólio.
 */
export function selecionarOutrosProjetos<TProjeto extends IProjetoComparavel>(
  projetos: TProjeto[],
  atual: TProjeto,
  quantidade: number,
): TProjeto[] {
  const indice = projetos.findIndex((projeto) => projeto.slug === atual.slug)
  const emOrdem = [...projetos.slice(indice + 1), ...projetos.slice(0, Math.max(indice, 0))].filter(
    (projeto) => projeto.slug !== atual.slug,
  )
  const mesmaCategoria = emOrdem.filter((projeto) => projeto.categoria === atual.categoria)
  const demais = emOrdem.filter((projeto) => projeto.categoria !== atual.categoria)
  return [...mesmaCategoria, ...demais].slice(0, quantidade)
}
