
const fs = require("fs")
const readline = require("readline")
const axios = require("axios")

function readFile() {

    fs.readFile("./DistrictsDetails.json", (err, data) => {

        if(err) throw err;

        let district = JSON.parse(data)

        for(const d of district) {

            axios.post(`http://localhost:8082/district`, new URLSearchParams({  

                id: d.ID,
                name: d.S_NAME,
                postcode: d.I_POSTCODE,
                state: d.S_STATE

            }),
            {
                Accept: "application/x-www-form-urlencoded",
                "Content-Type": "application/x-www-form-urlencoded",
            })
        }
        

    })


}

readFile()