import { test, expect } from '@playwright/test';

test.describe('Example tests', () => {
  test.beforeEach(async ({ page }) => {
    // Visita la URL base antes de cada prueba
    await page.goto('/');
  });

  test('F1 Verficicar que la pagina carga y los links funcionan', async ({ page }) => {
    // Verifica que la página de inicio se cargue correctamente y que el URL sea válido
    await expect(page).toHaveURL('https://microsegurosfrontsandbox.z19.web.core.windows.net/#home');
    
    // Prueba los enlaces, desactivamos el slowmotion para no retrasar la prueba
    await page.getByText('DESCUBRE TENKU', { exact: true }).click();
    // await page.waitForTimeout(1000);
    await expect(page).toHaveURL('https://microsegurosfrontsandbox.z19.web.core.windows.net/#discover');
    await expect(page.locator('p.chakra-text.css-1tjodgs')).toHaveText('Descubre Tenku'); 

    await page.getByText('MEMBRESÍAS', { exact: true }).click();
    // await page.waitForTimeout(1000);
    await expect(page).toHaveURL('https://microsegurosfrontsandbox.z19.web.core.windows.net/#membership');
    await expect(page.locator('p.chakra-text.css-1twmq9i')).toHaveText('ELIGE TU MEMBRESÍA'); 


    await page.getByRole('banner').getByText('CONTRATA AQUÍ').click();
    // await page.waitForTimeout(1000);
    await expect(page).toHaveURL('https://microsegurosfrontsandbox.z19.web.core.windows.net/#contract');
    await expect(page.locator('p.chakra-text.css-18uxciw')).toHaveText('ESTÁS A UN PASO DE ESTAR PROTEGIDO'); 


    await page.getByText('INICIO', { exact: true }).click();
    // await page.waitForTimeout(1000);
    await expect(page).toHaveURL('https://microsegurosfrontsandbox.z19.web.core.windows.net/#home');
    await expect(page.locator('button.chakra-button.css-xvh104')).toHaveText('CONTRATA AQUÍ');
  });

  test('F2 Visualizar las membresías', async ({ page }) => {
    await page.getByText('MEMBRESÍAS', { exact: true }).click();

    await expect(page.locator('#membership').getByText('230')).toBeVisible();
    await expect(page.locator('#membership').getByText('$30,000mxn').first()).toBeVisible();
    await expect(page.locator('#membership').getByText('$30,000mxn').nth(1)).toBeVisible();
    await expect(page.locator('#membership').getByText('$30,000mxn').nth(2)).toBeVisible();

    await expect(page.getByText('450')).toBeVisible();
    await expect(page.getByText('$50,000mxn')).toBeVisible();
    await expect(page.getByText('$100,000mxn').first()).toBeVisible();
    await expect(page.getByText('$100,000mxn').nth(1)).toBeVisible();

    await expect(page.getByText('900')).toBeVisible();
    await expect(page.getByText('$100,000mxn').nth(2)).toBeVisible();
    await expect(page.getByText('$500,000mxn').first()).toBeVisible();
    await expect(page.getByText('$500,000mxn').nth(1)).toBeVisible();
  });

  test('F3 Cotizacion del seguro', async ({ page }) => {
    await page.getByRole('banner').getByText('CONTRATA AQUÍ').click();
    //cotizamos basico
    await page.getByText('Básico').click();
    await expect(page.locator('#contract').getByText('230')).toBeVisible();
    // cotizamos plus
    await page.locator('div').filter({ hasText: /^Plus$/ }).first().click();
    await expect(page.locator('#contract').getByText('450')).toBeVisible();
    //cotizamos pro
    await page.locator('div').filter({ hasText: /^Pro$/ }).first().click();
    await expect(page.locator('#contract').getByText('900')).toBeVisible();
  });

  test('F4 Validacion del proceso de compra y llenado de formulario paquete basico', async ({ page }) => {
    await page.getByRole('banner').getByText('CONTRATA AQUÍ').click();
  
    await page.getByPlaceholder('Nombre(s)').fill('VICTOR');
    await page.getByPlaceholder('Apellido Paterno').fill('AVIÑA');
    await page.getByPlaceholder('Apellido Materno').fill('ARAIZA');
    await page.getByPlaceholder('0000000000').fill('123123123123');
    await page.getByPlaceholder('00000', { exact: true }).fill('28219');
    await page.getByPlaceholder('usuario@correo.com').fill('TROLLHUNTER@GMAIL.COM');
    await page.getByText('Básico').click();
    await page.getByRole('button', { name: 'Contrata', exact: true }).click();
    await page.waitForSelector('text="Registro completado"', { state: 'visible' });
  });

  test('F5 Manejo de errores', async ({ page }) => {
    //NOTA EL BOTON DE CONTRATAR NO SE DESBLOQUEA AL NO TENER LOS DATOS NUMERICOS CORRECTOS
    // PERO AUN ASI PUEDE RECIBIR NUMEROS EN EL NOMBRE, NO HAY UN MENSAJE DE ERROR AL RECIBIRLOS
    // TAMPOCO ES POSIBLE PROBAR EL MENSAJE DE FALLO POR LA IMPOSIBILIDAD DEL CLICK AL BOTON
    await page.getByRole('banner').getByText('CONTRATA AQUÍ').click();
  
    await page.getByPlaceholder('Nombre(s)').fill('121212');
    await page.getByPlaceholder('Apellido Paterno').fill('121212');
    await page.getByPlaceholder('Apellido Materno').fill('121212');
    await page.getByPlaceholder('0000000000').fill('123123123123');
    await page.getByPlaceholder('00000', { exact: true }).fill('28219');
    await page.getByPlaceholder('usuario@correo.com').fill('TROLLHUNTER@GMAIL.COM');
    await page.getByText('Básico').click();
    await page.getByRole('button', { name: 'Contrata', exact: true }).click();
    await page.waitForSelector('text="Registro completado"', { state: 'visible' });
  });
  
});
