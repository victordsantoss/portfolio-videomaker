import 'server-only'

import { z } from 'zod'

const esquemaEnvServidor = z.object({
  /** URL pública do site. Na Vercel, cai para o domínio de produção do projeto. */
  URL_SITE: z.url().default('http://localhost:3000'),
})

/** Variáveis de ambiente do servidor, validadas na subida. Leia sempre por aqui. */
export const envServidor = esquemaEnvServidor.parse({
  URL_SITE: process.env.URL_SITE ?? urlProducaoVercel(),
})

/** Domínio de produção que a Vercel injeta no build e no runtime. */
function urlProducaoVercel(): string | undefined {
  const dominio = process.env.VERCEL_PROJECT_PRODUCTION_URL
  return dominio ? `https://${dominio}` : undefined
}
