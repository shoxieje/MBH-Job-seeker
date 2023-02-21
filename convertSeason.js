
const fs = require("fs")
const axios = require("axios")

function readFile() {

    fs.readFile("./CropsDistricts.json", (err, data) => {

        if(err) throw err;

        let crops = JSON.parse(data)

        let temp_crop = []

        for(const c of crops) {

            if(!temp_crop.includes(c.S_CROP_NAME)) {
                temp_crop.push(c.S_CROP_NAME)
            }

            // axios.post(`http://localhost:8082/seasonality`, new URLSearchParams({  

            //     id: c.ID,
            //     district_fk: c.FK_DISTRICT,
            //     crop_na: c.S_CROP_NAME,
            //     jan: c.I_JAN,
            //     feb: c.I_FEB,
            //     mar: c.I_MAR,
            //     apr: c.I_APR,
            //     may: c.I_MAY,
            //     jun: c.I_JUN,
            //     july: c.I_JUL,
            //     aug: c.I_AGO,
            //     sep: c.I_SEP,
            //     oct: c.I_OCT,
            //     nov: c.I_NOV,
            //     dec: c.I_DEC,

            // }),
            // {
            //     Accept: "application/x-www-form-urlencoded",
            //     "Content-Type": "application/x-www-form-urlencoded",
            // })
        }
        
        for(let t of temp_crop) {

            axios.post(`http://localhost:8082/crop`, new URLSearchParams({

                name: t

            }))

        }

    })


}

readFile()