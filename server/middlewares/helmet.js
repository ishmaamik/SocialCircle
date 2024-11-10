import helmet from "helmet";

const helmetConfig= helmet({
    crossOriginOpenerPolicy:{
        policy: 'same-origin'
    },
    crossOriginResourcePolicy:{
        policy: 'same-origin'
    },
    contentSecurityPolicy:{
        useDefaults: false,
        directives:{
            defaultSrc: ["'self'"],
            objectSrc: ["'none'"],
            scriptSrc: ["'self'", "www.example.com"],
            upgradeInsecureRequests: [],
        }
    },

    referrerPolicy:{
        policy: ["no-referrer-when-downgrade", "origin-when-cross-origin", "strict-origin-when-cross-origin"],
    },

})

export default helmetConfig;