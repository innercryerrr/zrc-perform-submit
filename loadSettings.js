const gsettings = {
    cashoutOptions: [ 100, 500, 1000, 1500 ],
    cashoutOptionsBar: [ 2500, 3000, 6000 ]
}

const devSettings = {
    cashoutBarChances: 50,
    desktopAgentChances: 50,
    landingPageUrl: ' https://doelivre-doncarty-space.herokuapp.com/', // provisorio
    puppeteerDataDirPath: '/Users/xtronda/zrc_PuppeterUserData_mimicDonation/'
}

const depSettings = {
    cashoutBarChances: 7,
    desktopAgentChances: 10,
    landingPageUrl: 'http://localhost:11110',
    puppeteerDataDirPath: '$naoseiaindaopatdoVPS/zrc_PuppeterUserData_mimicDonation/'
}

var settings;

if (process.env.NODE_ENV === 'development') {
    settings = devSettings;
}

if (process.env.NODE_ENV === 'deployment') {
    settings = depSettings;
}

loadSettings();

function loadSettings () {
    global.sett = { 
        ...settings, 
        ...gsettings 
    }
}