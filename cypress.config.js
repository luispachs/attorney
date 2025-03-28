import {defineConfig} from 'cypress';

export default defineConfig({
    viewportHeight:900,
    viewportWidth:1200,
    defaultCommandTimeout:10000,
    video:true,
    screenshotOnRunFailure:true,
    screenshotsFolder:"cypress/screenshots",
    videosFolder:"cypress/records",
    fixturesFolder:"cypress/fixture",
    responseTimeout:30000,
    e2e:{
        baseUrl: "http://localhost:3000"
    },
    component:{

    }
});