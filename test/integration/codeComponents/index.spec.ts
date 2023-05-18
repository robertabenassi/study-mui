import * as path from 'path';
import * as fs from 'fs/promises';
import { ToolpadRuntime } from '../../models/ToolpadRuntime';
import { expect, test } from '../../playwright/localTest';
import { ToolpadEditor } from '../../models/ToolpadEditor';

test.use({
  localAppConfig: {
    template: path.resolve(__dirname, './fixture'),
    cmd: 'dev',
  },
});

test('custom components can use external libraries', async ({ page }) => {
  const runtimeModel = new ToolpadRuntime(page);
  await runtimeModel.gotoPage('page');

  const test1 = page.getByText('Page D');
  await expect(test1).toBeVisible();
});

test('can create new custom components', async ({ page, localApp }) => {
  const editorModel = new ToolpadEditor(page);

  await editorModel.goto();

  await editorModel.pageRoot.waitFor();

  const newComponentPath = path.resolve(localApp.dir, './toolpad/components/MyInspector.tsx');
  await fs.writeFile(
    newComponentPath,
    `import * as React from 'react';
import { createComponent } from '@mui/toolpad/browser';
import { Inspector } from 'react-inspector';

interface MyInspectorProps {
  data: any;
}

function MyInspector({ data }: MyInspectorProps) {
  return <Inspector data={data} />;
}

export default createComponent(MyInspector, {
  argTypes: {
    data: { type: 'object' },
  },
});
    `,
    { encoding: 'utf-8' },
  );

  await editorModel.componentCatalog.hover();
  await expect(editorModel.getComponentCatalogItem('MyInspector')).toBeVisible();

  await editorModel.dragNewComponentToAppCanvas('MyInspector');

  await editorModel.componentEditor.getByRole('button', { name: 'data' }).click();

  const jsonEditorDialog = page.getByRole('dialog', { name: 'edit json' });
  const jsonEditor = jsonEditorDialog.locator('.monaco-editor');
  await jsonEditor.click();
  await page.keyboard.type('{ "content": "Hello everyone!" }');
  await jsonEditorDialog.getByRole('button', { name: 'save' }).click();

  await expect(editorModel.appCanvas.getByText('Hello everyone!')).toBeVisible();
});
