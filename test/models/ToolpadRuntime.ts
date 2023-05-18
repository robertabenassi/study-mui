import { Page } from '@playwright/test';
import { gotoIfNotCurrent } from './shared';

export interface ToolpadRuntimeOptions {
  prod: boolean;
}

export class ToolpadRuntime {
  readonly page: Page;

  readonly options: ToolpadRuntimeOptions;

  constructor(page: Page, options: Partial<ToolpadRuntimeOptions> = {}) {
    this.page = page;
    this.options = {
      prod: false,
      ...options,
    };
  }

  getPrefix() {
    return this.options.prod ? '/prod' : '/preview';
  }

  async goto() {
    await gotoIfNotCurrent(this.page, this.getPrefix());
  }

  async gotoPage(pageName: string) {
    await gotoIfNotCurrent(this.page, `${this.getPrefix()}/pages/${pageName}`);
  }

  async gotoPageById(appId: string, pageId: string) {
    await this.page.goto(`${this.getPrefix()}/pages/${pageId}`);
  }

  async waitForNavigation() {
    await this.page.waitForURL((url) => url.pathname.startsWith(`${this.getPrefix()}/pages`));
  }
}
