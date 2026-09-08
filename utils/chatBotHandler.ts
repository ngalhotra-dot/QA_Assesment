import { Page } from "@playwright/test";
import { chatBotLocators } from "../locators/chatBotLocators";

export class ChatBotPage {

    async sendMessage(page: Page, message: string): Promise<void> {

        await chatBotLocators.agentTextArea(page).fill(message);

        await page.keyboard.press("Enter");
    }

    async getLatestResponse(page: Page): Promise<string> {

        await page.waitForTimeout(10000);

        const responses = await chatBotLocators
            .chatBotResponse(page)
            .allTextContents();

        return responses[responses.length - 1] || "";
    }

    async processTPIFlow(
        page: Page,
        customerStatement: string
    ): Promise<void> {

        let waitingForRecommendation = false;
        await page.pause();

        for (let i = 1; i <= 20; i++) {

            const response =
                await this.getLatestResponse(page);

            console.log(`Iteration ${i}`);
            console.log(`Response: ${response}`);

            // Success
            if (
                response.includes(
                    "TPI recommendation has been successfully updated"
                )
            ) {
                return;
            }

            // Search TPI
            if (
                response.includes(
                    "Would you like me to search TPIs for any of these jobs or match all jobs for this Workshop Order with available vehicle diagnostic data?"
                )
            ) {

                await this.sendMessage(
                    page,
                    "Search TPI for Job 2"
                );

               

                await page.waitForTimeout(10000);

                await this.sendMessage(
                    page,
                    "Refine TPI"
                );
                  console.log(this.sendMessage);

                waitingForRecommendation = true;
                await page.pause();

                continue;
            }

            // Recommendation Prompt
            if (
                response.includes(
                    "Would you like a recommendation for a TPI?"
                )
            ) {

                await this.sendMessage(
                    page,
                    "Recommend TPI"
                );
  console.log(this.sendMessage);
                waitingForRecommendation = false;

                continue;
            }

            // Customer Statement
            if (
                response.includes("Would you please provide") ||
                response.includes("Could you provide") ||
                response.includes("Could you describe") ||
                response.includes("Please provide the job description")
            ) {

                await this.sendMessage(
                    page,
                    customerStatement
                );
  console.log(this.sendMessage);
                continue;
            }

            // Send 1
            if (
                response.includes("Please select") ||
                response.includes("Let me know the number") ||
                response.includes("Please specify the number")
            ) {

                await this.sendMessage(page, "1");
                  console.log(this.sendMessage);

                continue;
            }

            // Default Yes
            await this.sendMessage(page, "Yes");
              console.log(this.sendMessage);
await page.pause();
            // Last Iteration Fallback
            if (
                i === 20 &&
                waitingForRecommendation
            ) {

                await page.pause();
                await this.sendMessage(
                    page,
                    "Recommend TPI"
                );
                  console.log(this.sendMessage);
            }
        }

        
    }
}