import { expect, test } from '@playwright/test'

test.describe('navegação', () => {
  test('a raiz leva ao português', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/pt$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Histórias visuais.')
  })

  test('a página inicial mostra trabalhos, sobre e contato', async ({ page }) => {
    await page.goto('/pt')
    await expect(page.getByRole('heading', { name: 'Trabalhos selecionados' })).toBeVisible()
    await expect(page.locator('#trabalhos article')).toHaveCount(6)
    await expect(page.locator('#sobre')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Vamos criar algo com significado.' }),
    ).toBeVisible()
  })

  test('abre o detalhe de um projeto pelo slug', async ({ page }) => {
    await page.goto('/pt')
    await page.locator('#trabalhos').getByRole('link', { name: /Norte/ }).click()
    await expect(page).toHaveURL(/\/pt\/projetos\/norte$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Norte' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Próximo projeto/ })).toBeVisible()
  })

  test('carrega o player só depois do clique', async ({ page }) => {
    await page.goto('/pt/projetos/norte')
    await expect(page.locator('iframe')).toHaveCount(0)
    await page.getByRole('button', { name: /Assistir/ }).click()
    await expect(page.locator('iframe')).toHaveAttribute('src', /youtube-nocookie\.com/)
  })

  test('mostra a página não encontrada no idioma certo', async ({ page }) => {
    const resposta = await page.goto('/en/nada-aqui')
    expect(resposta?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'This page has left the frame.',
    )
  })

  test('slug inexistente responde 404', async ({ page }) => {
    const resposta = await page.goto('/pt/projetos/nao-existe')
    expect(resposta?.status()).toBe(404)
  })
})

test.describe('preferências', () => {
  test('troca o idioma mantendo a página e o tema', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/pt/projetos/frequencia')
    await expect(page.locator('html')).not.toHaveClass(/dark/)

    await page.getByRole('link', { name: 'English' }).click()
    await expect(page).toHaveURL(/\/en\/projetos\/frequencia$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('heading', { level: 1, name: 'Frequency' })).toBeVisible()
    await expect(page.locator('html')).not.toHaveClass(/dark/)
  })

  test('segue o tema do sistema na primeira visita', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/pt')
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('guarda o tema escolhido entre visitas e idiomas', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/pt')
    await page.getByRole('button', { name: 'Usar tema claro' }).click()
    await expect(page.locator('html')).not.toHaveClass(/dark/)

    await page.reload()
    await expect(page.locator('html')).not.toHaveClass(/dark/)

    await page.goto('/en')
    await expect(page.locator('html')).not.toHaveClass(/dark/)
    await expect(page.getByRole('button', { name: 'Use dark theme' })).toBeVisible()
  })
})

test.describe('mobile', () => {
  test.skip(({ isMobile }) => !isMobile, 'só em telas pequenas')

  test('o menu abre, navega e fecha', async ({ page }) => {
    await page.goto('/pt')
    await page.getByRole('button', { name: 'Abrir menu' }).click()
    const menu = page.getByRole('dialog')
    await expect(menu).toBeVisible()
    await menu.getByRole('link', { name: 'Contato' }).click()
    await expect(menu).toBeHidden()
    await expect(page).toHaveURL(/#contato$/)
  })

  test('não há rolagem horizontal', async ({ page }) => {
    for (const caminho of ['/pt', '/en/projetos/norte']) {
      await page.goto(caminho)
      const largura = await page.evaluate(() => document.documentElement.scrollWidth)
      const janela = await page.evaluate(() => window.innerWidth)
      expect(largura).toBeLessThanOrEqual(janela)
    }
  })
})
