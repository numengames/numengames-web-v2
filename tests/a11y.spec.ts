import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const paths = ['/es/', '/en/', '/es/experiencias/', '/es/legal/cookies/'];

for (const path of paths) {
  test(`axe WCAG 2.2 AA — ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      /* Exclusión justificada (única): el «+10» flotante vive <1 s y su
         fundido de salida mezcla el color con el fondo, así que axe lo
         caza a mitad de animación según el timing (solo Firefox lo vio).
         Su color BASE cumple AA y la puntuación real es accesible por el
         aria-valuetext de la barra. Excluir aquí es honesto; ocultarlo
         con aria-hidden no lo sería (el contraste es un problema visual,
         no de lector de pantalla, y axe lo seguiría marcando igual). */
      .exclude('.pts-float')
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test('el skip link recibe foco con teclado', async ({ page }) => {
  await page.goto('/es/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
});

/* Paridad entre los dos motores de scroll (ADR 0006): Chromium resuelve la
   panorámica con `animation-timeline` nativo y Firefox/WebKit con el motor
   de reserva de `viewport.ts`. El resultado visible debe ser el mismo, así
   que se afirma sobre el desplazamiento, no sobre quién lo calcula. */
test('la panorámica se desplaza en horizontal al avanzar el scroll', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/es/');

  const translateX = () =>
    page.locator('.journey-panorama').evaluate((el) => {
      const t = getComputedStyle(el).transform;
      return t === 'none' ? 0 : new DOMMatrixReadOnly(t).m41;
    });

  await page.evaluate(() => window.scrollTo(0, 0));
  const inicio = await translateX();

  await page.evaluate(() => {
    const j = document.querySelector<HTMLElement>('.journey-h');
    if (!j) throw new Error('falta .journey-h');
    window.scrollTo(0, j.offsetTop + j.offsetHeight - window.innerHeight);
  });

  /* Se afirma sobre el avance relativo, no sobre valores absolutos: el
     desplazamiento exacto depende del ancho del viewport y del número de
     paneles. Con 4 paneles el recorrido completo son -3 × 100vw. */
  await expect.poll(translateX).toBeLessThan(inicio - 500);
});

/* Con el guion cargado, el motor de escena (ADR 0008) retira las secciones
   clásicas del camino — y con ellas <journey-choice> — y las elecciones
   pasan a <escena-eleccion> (ADR 0009), con el mismo contrato: botones con
   aria-pressed, consecuencia revelada al elegir y persistencia en
   numen.journey.v1. */
test('la elección de la escena revela su consecuencia y persiste', async ({ page }) => {
  await page.goto('/es/');
  /* Con el tecleo progresivo, los beats se revelan al escribirse; el
     jugador (y el test) puede completar todo con un clic en la caja. */
  const dialogo = page.locator('escena-dialogo', { has: page.locator('escena-eleccion') }).first();
  await dialogo.scrollIntoViewIfNeeded();
  await dialogo.click({ position: { x: 10, y: 10 } });
  const btn = dialogo.locator('escena-eleccion button[data-option="0"]').first();
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await expect(btn).toHaveAttribute('aria-pressed', 'true');
  await expect(
    page.locator('escena-eleccion .eleccion-consecuencia.is-elegida').first(),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator('escena-eleccion button[data-option="0"]').first()).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});
