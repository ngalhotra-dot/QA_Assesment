import { Page } from "@playwright/test";
import { chatBotLocators } from "../locators/chatBotLocators";

export class ChatBotHandlerRefine {
  constructor(private page: Page) {}

  private readonly MAX_RESPONSES = 20;

  async processTPIFlow(customerStatement: string): Promise<void> {
    const searchTPIText =
      "Would you like me to search TPIs for any of these jobs";

    const recommendQuestion =
      "Would you like a recommendation for a TPI";

    const successText =
      "The TPI recommendation has been successfully updated";

    const VIN = "VIN";

    let refinePhaseStarted = false;
    let recommendPhaseStarted = false;

    let refineCounter = 0;
    let recommendCounter = 0;

    while (true) {
      const response = await this.getLatestResponse();

      console.log(`Bot Response: ${response}`);

      // ==================================
      // SUCCESS CHECK
      // ==================================
      if (response.includes(successText)) {
        console.log("TPI recommendation completed.");
        return;
      }

      // ==================================
      // SEARCH TPI DETECTED
      // ==================================
      if (response.includes(searchTPIText)) {
        console.log("Sending: Search TPI for Job 2");

        await this.sendMessage("Search TPI for Job 2");

        await this.page.waitForTimeout(20000);

        console.log("Sending: Refine TPI");

        await this.sendMessage("Refine TPI");

       if(response.includes(VIN)){

        console.log("VIN");

        await this.sendMessage("WVWZZZE1ZNP027347");

       }

        // Start refine phase only once
        if (!refinePhaseStarted && !recommendPhaseStarted) {
          refinePhaseStarted = true;
          refineCounter = 0;
        }

        // If already in recommend phase,
        // DO NOT reset recommend counter
        continue;
      }

      // ==================================
      // REFINE PHASE
      // ==================================
      if (refinePhaseStarted && !recommendPhaseStarted) {
        refineCounter++;

        console.log(`Refine Counter: ${refineCounter}`);

        if (response.includes(recommendQuestion)) {
          console.log("Sending: Recommend TPI");

          await this.sendMessage("Recommend TPI");

          recommendPhaseStarted = true;
          refinePhaseStarted = false;
          recommendCounter = 0;

          continue;
        }

        if (refineCounter >= this.MAX_RESPONSES) {
          console.log(
            "Recommendation question not received within 20 responses."
          );

          console.log("Sending: Recommend TPI");

          await this.sendMessage("Recommend TPI");

          recommendPhaseStarted = true;
          refinePhaseStarted = false;
          recommendCounter = 0;

          continue;
        }
      }

      // ==================================
      // RECOMMEND PHASE
      // ==================================
      if (recommendPhaseStarted) {
        recommendCounter++;

        console.log(`Recommend Counter: ${recommendCounter}`);

        if (response.includes(successText)) {
          console.log("TPI recommendation completed.");
          return;
        }

        if (recommendCounter >= this.MAX_RESPONSES) {
          console.log(
            "20 responses completed after Recommend TPI. Exiting flow."
          );

          return;
        }
      }

      // ==================================
      // DEFAULT RESPONSE HANDLER
      // ==================================
      await this.handleBotResponse(response, customerStatement);

      await this.page.waitForTimeout(3000);
    }
  }

  private async handleBotResponse(
    response: string,
    customerStatement: string
  ): Promise<void> {
    const customerStatementPatterns = [
      "Would you please provide",
      "Could you provide",
      "Could you describe",
      "Please provide the job description",
    ];

    const answerOnePatterns = [
      "Please select",
      "Let me know the number",
      "Please specify the number",
    ];

    const yesPatterns = [
      "Would you like me to",
      "Please provide",
      "Does this accurately",
      "Does that Describe",
      "Does that reflect",
      "Would you like me",
      "Could you confirm",
    ];

    // Customer Statement
    if (
      customerStatementPatterns.some((pattern) =>
        response.includes(pattern)
      )
    ) {
      console.log(`Sending Customer Statement`);

      await this.sendMessage(customerStatement);
      return;
    }

    // Send 1
    if (
      answerOnePatterns.some((pattern) =>
        response.includes(pattern)
      )
    ) {
      console.log("Sending: 1");

      await this.sendMessage("1");
      return;
    }

    // Send Yes
    if (
      yesPatterns.some((pattern) =>
        response.includes(pattern)
      )
    ) {
      console.log("Sending: Yes");

      await this.sendMessage("Yes");
      return;
    }

    // Fallback
    console.log("Fallback: Sending Yes");

    await this.sendMessage("Yes");
  }

  async sendMessage(message: string): Promise<void> {
    await chatBotLocators.agentTextArea(this.page).fill(message);
    await this.page.keyboard.press("Enter");
  }

  async getLatestResponse(): Promise<string> {
    const responses = await chatBotLocators
            .chatBotResponse(this.page)
      .allTextContents();

    return responses[responses.length - 1] || "";
  }
}