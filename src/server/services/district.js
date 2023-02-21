
const db = require('./db');

async function addDistrict(district) {

    const result = await db.query(

        `INSERT INTO district(id, district_name, postcode, state) VALUES (${district.id}, "${district.name}", ${district.postcode}, "${district.state}")`

    )

    let msg = 'Error in creating district';

    if(result.affectedRows) {

        msg = 'District created successfully';

    }

    return {msg};

}


async function retrieveDistrict() {

    const result = await db.query(

        `SELECT * FROM district`

    )

    return result

}

module.exports = {

    addDistrict,
    retrieveDistrict

}