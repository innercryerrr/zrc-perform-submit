import puppeteer from 'puppeteer-extra';
import ppdevices from 'puppeteer/DeviceDescriptors';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
///////////////////////////////// externalize in ... ?!
import UserAgent from 'user-agents';
import Chance from 'chance';
import generate from 'gerador-validador-cpf';
import { faker } from '@faker-js/faker';

puppeteer.use(StealthPlugin());

faker.locale = 'pt_BR';

// ...ideia?!
// get proxy
// get ua - ok 
// get location coz must match cuscounty/cusstate
// use they to pollyfill puppt daemon

// before spoofing puppeter web env 
// ...and manipuate headers
function dataProvisions (ccinf) {

    // used at bottom props for 
    // ...faking customer data
    const chanc = new Chance();

    // gen cus related data
    let firstName = faker.name.firstName(),
        midName = faker.name.lastName(),
        lastName = faker.name.lastName(),
        name = firstName + ` ${midName} ` + lastName,
        holdername = name.toUpperCase(),
        cpf = genValidCPF(),
        email = faker.internet.email(firstName, lastName),
        address = faker.address.streetAddress(true),
        phone = faker.phone.phoneNumber('(##) #####-####'),
        city = faker.address.city(),
        state = faker.address.state(),
        stateAbbr = faker.address.stateAbbr(state),
        cep = faker.address.zipCode(stateAbbr);
    
    // ...all actuaclly used below
    const amountBrl = chanc.integer({ 
        min: sett.minCashout, 
        max: sett.maxCashout
    })

    // important var
    const RPDevice = chanc.pickone(ppdevices);

    const actionsMap = [

        { // ----------------------------- *
            elementsel: 'firstnameinput',
            action: 'type',
            value: firstName
        },
        {
            elementsel: 'secondnameinput',
            action: 'type',
            value: midName
        },
        {
            elementsel: 'lastnameinput',
            action: 'type',
            value: lastName
        },
        
        { // ----------------------------- *
            elementsel: 'cusemailinput'
        },
        {
            elementsel: 'amountbrlinput'
        },
        
        { // ----------------------------- *
            elementsel: 'cardnumberinput'
        },
        {
            elementsel: 'cardmonthinput'
        },
        {
            elementsel: 'cardyearinput'
        },
        {
            elementsel: 'cardcvvinput'
        },

        // -------- extrainfo ---------- *
        {
            elementsel: 'inputextraaddr'
        },
        {
            elementsel: 'inputextracep'
        },
        {
            elementsel: 'inputextrastate'
        },
        {
            elementsel: 'inputextracity'
        },
        {
            elementsel: 'inputextraphone'
        },
        {
            elementsel: 'inputextracpf'
        }
    ]

    // ...all lil helper for case above.
    function genValidCPF () {
        let _cpgen;
        while (!_cpgen) {
            _cpgen = generate() /// genvalicpf
        }; return _cpgen;
    }

    // helper...
    function genConnectType () {
        return chanc.pickone([
            'lte', '4g', 
            '3g', 'wifi' 
        ])
    }
}






async function webDriverPerforms () {


    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--start-maximized']
    })

    let page = await browser.newPage();

    await page.emulate(chanc.pickone(ppdevices));

    const targetPage = page,
          frame = targetPage.mainFrame(),
          promise = targetPage.waitForNavigation(),
          element = await frame.waitForSelector(`${}`);

    await element.click();
    await element.type()
    await promise;










}

export default webDriverPerforms
