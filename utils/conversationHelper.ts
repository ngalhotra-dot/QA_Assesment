import { Page } from '@playwright/test';
import { getTestData } from './csvUtils';
import { chatBotLocators } from '../locators/chatBotLocators';

export async function continueConversationUntilTarget(
  page: Page | undefined,
  targetText: string,
  nextCommand: string
)  

{
     if (!page) {
    throw new Error("Page is undefined");
  }

    const { orderId, jd } = await getTestData();

const MAX_ATTEMPTS = 20;

const YES_KEYWORDS = [
  "Would you like me to",
  "Please provide",
  "Does this accurately",
  "Does that Describe",
  "Does that reflect",
  "Would you like me",
  "Could you confirm"
];

const CUSTOMER_STATEMENT_KEYWORDS = [
  "Would you please provide",
  "Could you provide",
  "Could you describe",
  "Please provide the job description"
];

const NUMBER_ONE_KEYWORDS = [
  "Please select",
  "Let me know the number",
  "Please specify the number"
];

const TARGET_TEXT =
  "Would you like me to search TPIs for any of these jobs or match all jobs for this Workshop Order with available vehicle diagnostic data?";

const CUSTOMER_STATEMENT =
  jd;

async function getBotResponse(page: Page): Promise<string> {
  const messages = await chatBotLocators.chatBotResponse(page).textContent() || '';
  console.log("messages", messages);

  return messages;
}

async function sendMessage(page: Page, message: string) {

  await chatBotLocators.agentTextArea(page).fill(message);
  await page.keyboard.press("Enter");
}

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
  const response = await getBotResponse(page);

  console.log(`Attempt ${attempt}`);
  console.log(`Bot Response: ${response}`);

  // Stop condition
  if (response.includes(TARGET_TEXT)) {
    console.log("Target text found.");

    await sendMessage(page, "Search TPI for Job 2");

    break;
  }

  let reply = "Yes"; // Fallback

  // Customer statement logic
  if (
    CUSTOMER_STATEMENT_KEYWORDS.some(keyword =>
      response.toLowerCase().includes(keyword.toLowerCase())
    )
  ) {
    reply = CUSTOMER_STATEMENT;
  }

  // Number selection logic
  else if (
    NUMBER_ONE_KEYWORDS.some(keyword =>
      response.toLowerCase().includes(keyword.toLowerCase())
    )
  ) {
    reply = "1";
  }

  // Yes logic
  else if (
    YES_KEYWORDS.some(keyword =>
      response.toLowerCase().includes(keyword.toLowerCase())
    )
  ) {
    reply = "Yes";
  }

  console.log(`Sending Reply: ${reply}`);

  await sendMessage(page, reply);

  // Wait for next assistant response
  await page.waitForTimeout(3000);
}
}
