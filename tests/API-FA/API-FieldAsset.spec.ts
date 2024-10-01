import { test, expect } from '@playwright/test'
import fs from 'fs';


const dcMeterData = JSON.parse(fs.readFileSync('TestData/API-FA/DC_Meter.json', 'utf8'));
const RaptorData = JSON.parse(fs.readFileSync('TestData/API-FA/Raptor.json', 'utf8'));


test.describe('Create Field Assets', () => {
    test('adding DC Meter', async ({ request }) => {
        for (const device of dcMeterData) {

            const response = await request.post("https://dev.sit.api.vantagetowers.com/resourceIoT/v1", {
                headers: {
                    "x-api-key": "YFtTVsKBUU78M7LZiMkZR2Jpq95d3j9j6i0mcnId"
                },
                data: device
            })
            console.log(response);
            await expect(await response.status()).toBe(200);
        }
    })

    test('adding Raptor', async ({ request }) => {

        const response = await request.post("https://dev.sit.api.vantagetowers.com/resourceIoT/v1", {
            headers: {
                "x-api-key": "YFtTVsKBUU78M7LZiMkZR2Jpq95d3j9j6i0mcnId"
            },
            data: RaptorData
        })
        console.log(response)
        await expect(await response.ok()).toBeTruthy();
    })

    // test('Raptor - Key-Value Pairs', async ({ request }) => {
    //     for (const [key, value] of Object.entries(RaptorData)) {
    //         // Construct a new object for the current key-value pair
    //         const DCmeter_Key1 = { [key]: 'Overview\\Dublin\\CZ-TIMS-209455\\DC Meter' };
    //         const DCmeter_Key2 = { [key]: 'Overview\\Dublin\\DE-TIMS-209455\\DC Meter' };

    //         const response = await request.post("https://dev.sit.api.vantagetowers.com/resourceIoT/v1", {
    //             headers: {
    //                 "x-api-key": "YFtTVsKBUU78M7LZiMkZR2Jpq95d3j9j6i0mcnId"
    //             },
    //             data: DCmeter_Key1, DCmeter_Key2
    //         });
    //         console.log(response);
    //         await expect(await response.ok()).toBeTruthy();
    //     }
    // });

})


