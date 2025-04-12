import { test, expect } from '@playwright/test';
import LoginActions from '../tests/pom/object/loginAction';
import fs from 'fs';
import path from 'path';

test.describe('Login Test', () => {
  let login;

  // Buat folder screenshots otomatis jika belum ada
  const screenshotDir = path.join(__dirname, 'screenshots');
  test.beforeAll(() => {
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  });

  test.beforeEach(async ({ page }) => {
    login = new LoginActions(page);
    await login.goto();
  });

  test('TC-001: should login successfully with valid credentials', async ({ page }) => {
    await login.validLogin();
  });

  test('TC-002: should show error when password is incorrect', async ({ page }) => {
    await login.invalidLogin('admin@example.com', 'pass', 'Login Gagal! Kata sandi salah.');
  });

  test('TC-003: should show error when account does not exist', async ({ page }) => {
    await login.invalidLogin('fakhri.dargawireja2@gmail.com', 'password', 'Login Gagal! Akun tidak ada.');
  });

  test.afterEach(async ({ page }, testInfo) => {
    const status = testInfo.status === 'failed' ? 'fail' : 'pass';
    const title = testInfo.title.match(/TC-\d{3}/)?.[0] || 'TC-000';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    const screenshotName = `${title}-${status}-${timestamp}.png`;
    const screenshotPath = path.join(screenshotDir, screenshotName);

    await page.screenshot({ path: screenshotPath, fullPage: true });
  });
});
