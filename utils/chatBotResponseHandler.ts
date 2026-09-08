import { Page } from '@playwright/test';
import { chatBotLocators } from '../locators/chatBotLocators';

export class ChatBotHandler {

    constructor(private page: Page) {}

    private readonly MAX_RESPONSES = 20;

    // =====================================================
    // Send Message to Chatbot
    // =====================================================
    async sendMessage(message: string): Promise<void> {

        const chatInput = chatBotLocators.agentTextArea(this.page); //  locator
        await chatInput.fill(message);
        await chatInput.press('Enter');

        console.log(`Sent: ${message}`);
    }

    // =====================================================
    // Get Latest Bot Response
    // =====================================================
    async getLatestResponse(): Promise<string> {

        // wait for chatbot response
        await this.page.waitForTimeout(10000);
      
       const responses = await chatBotLocators.chatBotResponse(this.page).allTextContents();

            console.log('responses', responses);
            

        const latestResponse =
            responses[responses.length - 1]?.trim() || '';

             

        console.log(`Bot: ${latestResponse}`);
     

        return latestResponse;
    }

    // =====================================================
    // Generic Bot Handling Logic
    // =====================================================
    async handleBotResponse(
        response: string,
        customerStatement: string
    ): Promise<void> {

        const lowerResponse = response.toLowerCase();

        // ----------------------------
        // Send Customer Statement
        // ----------------------------

        const customerStatementKeywords = [
            'would you please provide',
            'could you provide',
            'could you describe',
            'please provide the job description'
        ];

        if (
            customerStatementKeywords.some(keyword =>
                lowerResponse.includes(keyword)
            )
        ) {
            await this.sendMessage(customerStatement);
            return;
        }

        // ----------------------------
        // Send 1
        // ----------------------------

        const oneKeywords = [
            'please select',
            'let me know the number',
            'please specify the number'
        ];

        if (
            oneKeywords.some(keyword =>
                lowerResponse.includes(keyword)
            )
        ) {
            await this.sendMessage('1');
            return;
        }

        // ----------------------------
        // Send Yes
        // ----------------------------

        const yesKeywords = [
            'would you like me to',
            'please provide',
            'does this accurately',
            'does that describe',
            'does that reflect',
            'would you like me',
            'could you confirm'
        ];

        if (
            yesKeywords.some(keyword =>
                lowerResponse.includes(keyword)
            )
        ) {
            await this.sendMessage('Yes');
            return;
        }

        // ----------------------------
        // Fallback
        // ----------------------------

        await this.sendMessage('Yes');
    }

    // =====================================================
    // Main Flow
    // =====================================================
    async processTPIFlow(
        customerStatement: string
    ): Promise<void> {

        const searchTPIQuestion =
            'Would you like me to search TPIs for any of these jobs or match all jobs for this Workshop Order with available vehicle diagnostic data?';

        const recommendationQuestion =
            'Would you like a recommendation for a TPI';

        const successMessage =
            'TPI recommendation has been successfully';

        // =====================================================
        // STEP 1
        // Wait for Search TPI Question
        // =====================================================

        let searchTPIFound = false;

        for (let i = 0; i < this.MAX_RESPONSES; i++) {

             console.log(`IterationS ${i}`);

            const response =
                await this.getLatestResponse();
               
               // console.log('response123', response);
                
                     //console.log("abce",searchTPIQuestion);

            if (
                response.includes(searchTPIQuestion)
            ) {

                searchTPIFound = true;

                await this.sendMessage(
                    'Search TPI for Job 2'
                );

                // wait for chatbot response
                await this.getLatestResponse();

                await this.sendMessage(
                    'Refine TPI'
                );

               break;
            }

            await this.handleBotResponse(
                response,
                customerStatement
            );
        }

        if (!searchTPIFound) {
            throw new Error(
                'Search TPI question not found.'
            );
        }

        // =====================================================
        // STEP 2
        // Monitor next 20 responses
        // =====================================================

        let recommendationFound = false;

        for (let i = 0; i < this.MAX_RESPONSES; i++) {
            console.log(`IterationR ${i}`);

            const response =
                await this.getLatestResponse();

            // Success Found
            if (
                response.includes(successMessage)
            ) {

                console.log(
                    'Recommendation completed.'
                );

                return;
            }

            // Recommendation Question Found
            if (
                response.includes(recommendationQuestion)
            ) {

                recommendationFound = true;

                await this.sendMessage(
                    'Recommend TPI'
                );

                break;
            }

            await this.handleBotResponse(
                response,
                customerStatement
            );
        }

        // =====================================================
        // STEP 3
        // Recommendation Question Not Found
        // =====================================================

        if (!recommendationFound) {

            await this.sendMessage(
                'Recommend TPI'
            );
        }

        // =====================================================
        // STEP 4
        // Wait for Success Message
        // =====================================================

        for (let i = 0; i < this.MAX_RESPONSES; i++) {
            console.log(`IterationSu ${i}`);

            const response =
                await this.getLatestResponse();

            if (
                response.includes(successMessage)
            ) {

                console.log(
                    'TPI recommendation created successfully.'
                );

                return;
            }

            await this.handleBotResponse(
                response,
                customerStatement
            );
        }

     /*   throw new Error(
            'Success message not found after Recommend TPI.'
        );
        */
    }
}