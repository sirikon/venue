import { test, expect } from "@playwright/test";

const INDEX_URL = "http://127.0.0.1:8000/";
const EVENT_NAME = "Event Name";

const TALKS = [
  [
    "the-mother-of-all-demos",
    "The Mother of All Demos",
    "Douglas Engelbart",
    "Main Track",
    "18:00",
  ],
  ["wat", "Wat", "Gary Bernhardt", "Main Track", "19:30"],
];

test("has title and footer", async ({ page }) => {
  await page.goto(INDEX_URL);
  await expect(page).toHaveTitle(EVENT_NAME);
  await expect(page.locator(".x-header h1")).toHaveText(EVENT_NAME);
  await expect(page.locator(".x-footer .x-body > span")).toHaveText(EVENT_NAME);
});

test("talks are in order", async ({ page }) => {
  await page.goto(INDEX_URL);
  const talks = page.locator(".x-talk-list .x-talk-list-item");
  const talksCount = await talks.count();
  for (let i = 0; i < talksCount; i++) {
    await expect(talks.nth(i)).toHaveAttribute("href", `/talk/${TALKS[i][0]}`);
    await expect(
      talks.nth(i).locator(".x-talk-list-item-title > span")
    ).toHaveText(TALKS[i][1]);
    await expect(
      talks.nth(i).locator(".x-talk-list-item-info-speaker")
    ).toHaveText(TALKS[i][2]);
    await expect(
      talks.nth(i).locator(".x-talk-list-item-info-track")
    ).toHaveText(TALKS[i][3]);
    await expect(
      talks.nth(i).locator(".x-talk-list-item-info-when")
    ).toHaveText(TALKS[i][4]);
  }
});
