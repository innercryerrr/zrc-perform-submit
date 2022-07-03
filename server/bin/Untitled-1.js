

    async function createApp () {

        console.log('\n >>> Creating adMob app \n')
        console.log('   1. Launching new app')

        {
            const targetPage = page;
            const frame = targetPage.mainFrame();
            const promise = targetPage.waitForNavigation();
            const element = await frame.waitForSelector("aria/Adicionar aplicativo");
            await element.click();
            await promise;
        }

        {
            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector("app-creation > app-creation-form > form > start-setup > section > form-card:nth-child(1) material-radio:nth-child(1)");
            await element.click();
        }

        {
            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector("app-creation > app-creation-form > form > start-setup > section > form-card:nth-child(2) material-radio:nth-child(2)");
            await element.click();
        }
        {
            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector("aria/CONTINUAR");
            await element.click();
        }

        console.log('   2. Typing app name')

        await page.waitForTimeout(1500)

        {
            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector("form-card.app-name label.input-container input.input");
            await element.click();
            await page.waitForTimeout(1500);
            await element.type(_appFullName);
        }

        await page.waitForTimeout(3500)

        console.log('   3. Adding new app')

        {
            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector("aria/ADICIONAR APLICATIVO");
            await element.click();
        }

        console.log('\n --- new adMob app created successfully')
        
        await page.waitForTimeout(3000)
    }

    async function createAdBanner () {

        console.log('\n >>> Creating banner adBlock \n')

        {
            const targetPage = page;
            const frame = targetPage.mainFrame();
            const promise = targetPage.waitForNavigation();
            const element = await frame.waitForSelector("aria/CRIAR BLOCO DE ANÚNCIOS");
            await element.click();
            await promise;
        }

        console.log('   1. Clicking to select add banner block')

        await page.waitForTimeout(1500)

        {
            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector(".ad-format-card material-button[aria-label='Banner']");
            await element.click();
            await page.waitForTimeout(1500)
        }

        {
            console.log('   2. Typing banner adBlock name')
            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector("aria/Digite o nome do bloco de anúncios");
            await element.type("banner");
        }

        {
            console.log('   3. Adding banner adBlock')

            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector("div.creator-button material-button.btn-yes");
            await element.click();
            await page.waitForTimeout(3000)

            console.log('\n --- Banner ad block created successfully')
            console.log('\n >>> Getting and saving appAdID and first adBlockID (banner)')

            await getAndSaveAppAdID()
            await getAndSaveAdBlockID('banner')

            console.log('\n --- appAdID and banner ID saved on data.js')

            await page.waitForTimeout(3000)
        }
    }

    async function createAdVideoReward (_blockName, _rewardDescr) {

        console.log('\n >>> Creating new videoReward adBlock \n')

        {
            console.log('   1. Typing adBlock name:', _blockName)

            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector("aria/Digite o nome do bloco de anúncios");
            await element.type(_blockName);
            await page.waitForTimeout(3000)
        }

        {
            console.log('   2. Typing adBlock reward description', _blockName)

            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector("aria/Insira o item do prêmio");

            await element.click({ clickCount: 3 }); // in order to DELETE preset text
            await element.type(_rewardDescr)
            await page.waitForTimeout(3000)
        }

        {
            console.log('   3. Submitting new adBlock:', _blockName)

            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector("div.creator-button material-button.btn-yes");
            await element.click();
            await page.waitForTimeout(3000)
            
            console.log('\n --- videoReward adBlock created successfully')

            await getAndSaveAdBlockID(_blockName)
            await page.waitForTimeout(3000)
        }
    }

    async function createAdInterstitial (_blockName) {
        
        console.log('\n >>> Creating new Interstitial adBlock \n')

        {
            console.log('   1. Typing adBlock name:', _blockName)
            
            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector("aria/Digite o nome do bloco de anúncios");
            await element.type(_blockName);
            await page.waitForTimeout(3000)
        }

        {
            console.log('   2. Submitting new adBlock:', _blockName)
            
            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector("div.creator-button material-button.btn-yes");
            await element.click();
            await page.waitForTimeout(3000)
            
            console.log('\n --- Interstitial adBlock created successfully')

            await getAndSaveAdBlockID(_blockName)
            await page.waitForTimeout(3000)
        }
    }

    async function startOtherAdBlock (_type) {

        console.log('\n >>> Starting another adBlock:', _type, '\n')

        {
            console.log('   1. Goto to new adBlock type choose')

            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector("aria/Criar outro bloco de anúncios");
            await element.click();

            await page.waitForTimeout(3000);
        }

        console.log('   2. Clicking new ' + _type)
        
        if (_type === 'videoReward') {
            
            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector(".ad-format-card material-button[aria-label='Premiado']");
            await element.click();
            
            await page.waitForTimeout(3000)
        }

        if (_type === 'insterstitial') {

            const targetPage = page;
            const frame = targetPage.mainFrame();
            const element = await frame.waitForSelector(".ad-format-card material-button[aria-label='Intersticial']");
            await element.click();
            
            await page.waitForTimeout(3000)
        }
    }

    async function getAndSaveAppAdID () {

        console.log('\n >>> Storing new App ID \n')
        
        console.log('   1. Getting appAdID')

        const targetPage = page;
        const frame = targetPage.mainFrame();
        const element = await frame.waitForSelector("div.instruction-card div.instructions ol li:nth-child(1) > div > div > div");
        
        let __appAdID = await targetPage.evaluate(el => el.textContent, element)

        console.log(`   2. Saving appAdID:`, __appAdID)

        _appAdID = __appAdID

        await page.waitForTimeout(3000)

        console.log('\n --- appAdID saved successfully')
    }

    async function getAndSaveAdBlockID (_adBlockName) {

        console.log('\n >>> Storing new adBlock:', _adBlockName, '\n')
        
        console.log(`   1. Getting ${_adBlockName} ID`)

        const targetPage = page;
        const frame = targetPage.mainFrame()
        const element = await frame.waitForSelector("div.instruction-card div.instructions ol li:nth-child(2) > div > div > div")
        
        let __adBlockID = await targetPage.evaluate(el => el.textContent, element)

        console.log(`   2. Saving ${_adBlockName}: ${__adBlockID}`)

        _adBlocks[_adBlockName] = __adBlockID

        await page.waitForTimeout(3000)

        console.log('\n --- adBlockID saved successfully')
    }

    async function _finish () {

        console.log('\n --- adMob app setup finished successfully')
        console.log('\n >>> Redirecting to adBlocks list page')

        await page.waitForTimeout(2500)

        const targetPage = page;
        const frame = targetPage.mainFrame();
        const element = await frame.waitForSelector("confirmation material-button.btn-yes");
        await element.click();

        await page.waitForTimeout(2500)

        console.log(' >>> Closing browser')

        await browser.close()
        
        console.log('\n --- New adMob app setup successfully')
    }