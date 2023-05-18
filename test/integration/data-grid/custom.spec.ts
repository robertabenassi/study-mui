import * as path from 'path';
import { ToolpadEditor } from '../../models/ToolpadEditor';
import { test, expect } from '../../playwright/localTest';
import clickCenter from '../../utils/clickCenter';

test.use({
  localAppConfig: {
    template: path.resolve(__dirname, './fixture-custom'),
    cmd: 'dev',
  },
});

test('Code component cell', async ({ page }) => {
  const editorModel = new ToolpadEditor(page);
  editorModel.goto();

  await editorModel.waitForOverlay();

  await expect(editorModel.pageRoot.getByText('value: {"test":"value"}')).toBeVisible();
  await expect(
    editorModel.pageRoot.getByText(
      'row: {"hiddenField":true,"customField":{"test":"value"},"id":0}',
    ),
  ).toBeVisible();
  await expect(editorModel.pageRoot.getByText('field: "customField"')).toBeVisible();
});

test('Code component column selector', async ({ page }) => {
  const editorModel = new ToolpadEditor(page);
  editorModel.goto();

  await editorModel.waitForOverlay();

  const marker = editorModel.appCanvas.getByText('It worked!');

  await expect(marker).not.toBeVisible();
  await clickCenter(page, editorModel.appCanvas.locator('.MuiDataGrid-root'));
  await editorModel.componentEditor.getByRole('button', { name: 'columns' }).click();
  await page.getByRole('button', { name: 'customField' }).click();
  await page.getByRole('button', { name: 'Custom component​' }).click();
  await page.getByRole('option', { name: 'Other' }).click();
  await expect(marker).toBeVisible();
});
