// This is the main Node.js source code file of your actor.
// It is referenced from the "scripts" section of the package.json file,
// so that it can be started by running "npm start".

// Import Apify SDK. For more information, see https://sdk.apify.com/
const Apify = require('apify');

Apify.main(async () => {
    // Get input of the actor (here only for demonstration purposes).
    // If you'd like to have your input checked and have Apify display
    // a user interface for it, add INPUT_SCHEMA.json file to your actor.
    // For more information, see https://docs.apify.com/actors/development/input-schema
    const input = await Apify.getInput();
    console.log('Input:');
    console.dir(input);

    if (!input || !input.url) throw new Error('Input must be a JSON object with the "url" field!');

    console.log('Launching Puppeteer...');
    const browser = await Apify.launchPuppeteer();




    console.log(`Opening page ${input.url}...`);
    const page = await browser.newPage();
    await page.goto(input.url);
    const title = await page.title();
    console.log(`Title of the page "${input.url}" is "${title}".`);
    
    await page.type('#ctl00_generalContentPlaceHolder_SearchControl_txtLicenceNo', '1317628');
    await page.click('#ctl00_generalContentPlaceHolder_SearchControl_btnSearch');
    
    var BusinessNameValue, BusinessAddressValue, TradingNameValue, MRCategoryValue, ABNValue, ACNValue = "";
    try{
        const BusinessNameElement = await page.waitForSelector('#ctl00_generalContentPlaceHolder_LicenceInfoControl1_lbLicenceName', { "timeout": 2000});
        BusinessNameValue = await BusinessNameElement.evaluate(el => el.textContent);
    } catch(err){
        console.log(err);
    }
    
    try {
        const BusinessAddressElement = await page.waitForSelector('#ctl00_generalContentPlaceHolder_LicenceInfoControl1_lbBusinessAddress', { "timeout": 2000});
        BusinessAddressValue = await BusinessAddressElement.evaluate(el => el.textContent);
    } catch(err){
        console.log(err);
    }
    
    try {
        const TradingNameElement = await page.waitForSelector('#ctl00_generalContentPlaceHolder_LicenceInfoControl1_lbTradingName', { "timeout": 2000 });
        TradingNameValue = await TradingNameElement.evaluate(el => el.textContent);
    } catch(err){
        //console.log(err);
    }

    try {
        const MRCategoryElement = await page.waitForSelector('#ctl00_generalContentPlaceHolder_LicenceInfoControl1_lblAATOCategory', { "timeout": 2000});
        MRCategoryValue = await MRCategoryElement.evaluate(el => el.textContent);
    } catch(err){
        //console.log(err);
    }
    
    try {
        const ABNElement = await page.waitForSelector('#ctl00_generalContentPlaceHolder_LicenceInfoControl1_lblABN', { "timeout": 2000});
        ABNValue = await ABNElement.evaluate(el => el.textContent);
    } catch(err){
        //console.log(err);
    }
    
    try {
        const ACNElement = await page.waitForSelector('#ctl00_generalContentPlaceHolder_LicenceInfoControl1_lblACN', { "timeout": 2000});
        ACNValue = await ACNElement.evaluate(el => el.textContent);
    } catch(err){
        //console.log(err);
    }
    results = {
        "BusinessNameValue": BusinessNameValue, 
        "BusinessAddressValue": BusinessAddressValue, 
        "TradingNameValue": TradingNameValue,
        "MRCategoryValue": MRCategoryValue,
        "ABNValue": ABNValue, 
        "ACNValue": ACNValue,
        "html": await page.evaluate(() => document.body.outerHTML)
    };
    console.log(results);

    await Apify.pushData(results);
    // UNCOMMENT HERE!!!
    // await page.click('#ctl00_generalContentPlaceHolder_LicenceInfoControl1_btnRelatedEntities');
    // await page.waitForNavigation();
    // SEE IF WE CAN NAVIGATE TO RELATED ENTITIES
    // try {
    //     const RelatedEntitiesElement = await page.waitForSelector('#ctl00_generalContentPlaceHolder_LicenceInfoControl1_btnRelatedEntities', { "timeout": 1000 });
    //     //RelatedEntitiesValue = await TradingNameElement.evaluate(el => el.textContent);
    //     await page.click(RelatedEntitiesElement);
    //     await page.waitForNavigation();
    //     console.log("MADE IT?");
    // } catch(err){
    //     console.log("NO RELATED ENTITIES TO FOLLOW");
    //     //console.log(err);
    // }
    // UNCOMMENT ABOVE HERE!!!



    // try {
    //     await page.waitForSelector("#ctl00_generalContentPlaceHolder_LicenceInfoControl1_lbLicenceName", { timeout: 5000 })
    // // ...
    // } catch (error) {
    //     console.log("The element didn't appear.")
    // }
    // Get all "Did you know" items from the page.
    // console.log('Getting "Did you know" items from the page.');
    // let [someResult, anotherResult] = await Promise.all([page.$$eval('#ctl00_generalContentPlaceHolder_LicenceInfoControl1_lbLicenceName'), page.$$eval('#ctl00_generalContentPlaceHolder_LicenceInfoControl1_lbBusinessAddress')]);
    // // try{
    // //     const lbLicenceName = ;
    // // }
    // console.log(someResult);
    // console.log(anotherResult);

    // await Apify.utils.puppeteer.injectJQuery(page);
    // const data = await page.evaluate(pageFunction);
    //const lbBusinessAddress = await ;
    //const lblAATOCategory = await page.$$eval('#ctl00_generalContentPlaceHolder_LicenceInfoControl1_lblAATOCategory');
    //const lblABN = await page.$$eval('#ctl00_generalContentPlaceHolder_LicenceInfoControl1_lblABN');
    //console.log(lbLicenceName, lbBusinessAddress, lblAATOCategory, lblABN);
    //console.log(data);
    // Save all the items to the Apify dataSet.
    // await Apify.pushData(results);
    // console.log('Actor finished.');


    // Busines Name - 
    // Licence Address - 
    // MR Category - ctl00_generalContentPlaceHolder_LicenceInfoControl1_lblAATOCategory
    // ABN - 

    // console.log("GETTING INPUT");
    // await page.waitForNavigation();

    // console.log('Saving output...');
    // await Apify.setValue('OUTPUT', {
    //     title,
    // });


    console.log('Closing Puppeteer...');
    // await browser.close();

    console.log('Done.');
});