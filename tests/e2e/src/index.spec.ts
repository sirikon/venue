import { test, expect } from "@playwright/test";
import { EVENT_NAME, INDEX_URL, TALKS } from "./_common";

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
    await expect(talks.nth(i)).toHaveAttribute(
      "href",
      `/talk/${TALKS[i].slug}`
    );
    await expect(
      talks.nth(i).locator(".x-talk-list-item-title > span")
    ).toHaveText(TALKS[i].title);
    await expect(
      talks.nth(i).locator(".x-talk-list-item-info-speaker")
    ).toHaveText(TALKS[i].speaker.name);
    await expect(
      talks.nth(i).locator(".x-talk-list-item-info-track")
    ).toHaveText(TALKS[i].track);
    await expect(
      talks.nth(i).locator(".x-talk-list-item-info-when")
    ).toHaveText(TALKS[i].when);
  }
});
