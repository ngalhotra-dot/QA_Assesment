import { Page } from '@playwright/test';

import { chatBotLocators } from '../locators/chatBotLocators';

export async function handleChatFlow(page: Page) {
       console.log('Received page:', page);

    if (!page) {
        throw new Error('Page object is undefined');
    }

    const maxIterations = 20;

    const stopStatement =
        'Would you like me to search TPIs for any of these jobs or match all jobs for this Workshop Order with available vehicle diagnostic data?';

    const yesPatterns = [
        'Would you like me to',
        'Please provide',
        'Could you provide',
        'Would you please provide',
        'Does this accurately',
        'Does that Describe',
        'Does that reflect',
        'Would you like me',
        'Could you confirm'
    ];

    const onePatterns = [
        'Please select',
        'Let me know the number'
    ];

    for (let i = 1; i <= maxIterations; i++) {
        console.log(`Iteration ${i}`);

        
        const responseText = await chatBotLocators.chatBotResponse(page).textContent() || '';

        console.log(`Response: ${responseText}`);

        // Exit condition
        if (responseText.includes(stopStatement)) {
            console.log('Final statement found. Exiting loop.');
            
            break;
        }

        let answer = 'Yes'; // fallback

        if (onePatterns.some(pattern =>
            responseText.toLowerCase().includes(pattern.toLowerCase())
        )) {
            answer = '1';
        } else if (yesPatterns.some(pattern =>
            responseText.toLowerCase().includes(pattern.toLowerCase())
        )) {
            answer = 'Yes';
        }

        console.log(`Sending answer: ${answer}`);

         await chatBotLocators.agentTextArea(page).fill(answer);
               await page.keyboard.press('Enter');
       
               // Wait for next response
               await page.waitForTimeout(3000);
    }
}