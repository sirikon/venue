import * as crypto from "crypto";
import { test, expect } from "@playwright/test";
import { BASE_URL, TALKS } from "./_common";

const TALK = TALKS[0];
const RANDOM_QUESTIONS = [
  crypto.randomBytes(20).toString("hex"),
  crypto.randomBytes(20).toString("hex"),
  crypto.randomBytes(20).toString("hex"),
];

test("questions work", async ({ page }) => {
  await page.goto(BASE_URL + "/talk/" + TALK.slug);
  const questionForm = page.locator('[data-section="question"] form');
  for (const randomQuestion of RANDOM_QUESTIONS) {
    await questionForm.locator("textarea").fill(randomQuestion);
    await questionForm.locator("input[type=submit]").click();
    await expect(page.locator(".x-talk-notification")).toHaveText([
      "¡Gracias por su pregunta!",
    ]);
  }

  await page.goto(BASE_URL + "/login");
  await page.locator("#id_username").fill("admin");
  await page.locator("#id_password").fill("admin");
  await page.locator("input[type=submit]").click();

  await expect(page.locator(".x-admin-menu-item")).toHaveText(["Hello admin!"]);
  await page.locator(`a[data-talk-slug="${TALK.slug}"]`).click();
  await page.locator('.x-admin-menu-link[href$="/questions"]').click();
  for (const randomQuestion of RANDOM_QUESTIONS) {
    await expect(
      page.locator(".x-talk-question-list-item").getByText(randomQuestion)
    ).toBeVisible();
  }

  await expect(page.locator("#see_fav_only")).toBeChecked({ checked: false });

  const questionParagraph = page.getByText(RANDOM_QUESTIONS[0]);
  const questionItem = page
    .locator(".x-talk-question-list-item")
    .filter({ has: questionParagraph });
  await questionItem.locator(".x-talk-question-list-item-actions-fav").click();
  await page.locator("#see_fav_only").click();
  await expect(page.locator("#see_fav_only")).toBeChecked({ checked: true });
  await expect(
    page.locator(".x-talk-question-list-item").getByText(RANDOM_QUESTIONS[0])
  ).toBeVisible();
  await expect(page.locator(".x-talk-question-list-item:visible")).toHaveCount(
    1
  );
});
