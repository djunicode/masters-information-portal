const {createLogger,transports,format} = require('winston')
const path = require("path")

// Setting the path for log file 
const filename=path.join("logDir","loggers.log")

// Creating logger
const logger = createLogger({
    
    level:"info",
    handleExceptions:true,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),  
        format.label({ label: path.basename(process.mainModule.filename) }),
        format.printf(
            info =>`${info.timestamp}  ${info.level} [${info.label}]: ${info.message}`
        )
    )
    ,
    transports: [
        new transports.Console({    
            format: format.combine(
                format.json(), format.colorize(),
                format.printf(
                    info =>`${info.timestamp}  ${info.level} [${info.label}]: ${info.message}`
                )
            )
        }),
        new transports.File({
            filename,
        })
    ]
})


module.exports=logger




