import { test, expect } from "@playwright/test";
import { EVENT_NAME, BASE_URL, TALKS } from "./_common";

const TALK = TALKS[0];

for (const TALK of TALKS) {
  test.describe(`talk: ${TALK.slug}`, async () => {
    test("has title and footer", async ({ page }) => {
      await page.goto(BASE_URL + "/talk/" + TALK.slug);
      await expect(page).toHaveTitle(`${TALK.title} | ${EVENT_NAME}`);
      await expect(page.locator(".x-header h1")).toHaveText(EVENT_NAME);
      await expect(page.locator(".x-footer .x-body > span")).toHaveText(
        EVENT_NAME
      );
    });

    test("has all the talk information", async ({ page }) => {
      await page.goto(BASE_URL + "/talk/" + TALK.slug);
      await expect(page.locator(".x-talk-title")).toHaveText(TALK.title);
      await expect(page.locator(".x-talk-info-track")).toHaveText(TALK.track);
      await expect(page.locator(".x-talk-info-when")).toHaveText(TALK.when);
      await expect(page.locator(".x-talk-description p")).toHaveText(
        TALK.description
      );
      await expect(page.locator(".x-talk-speaker-info-name")).toHaveText(
        TALK.speaker.name
      );
      await expect(page.locator(".x-talk-speaker-info-title")).toHaveText(
        TALK.speaker.title
      );
    });
  });
}
