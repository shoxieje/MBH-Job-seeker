

const db = require('./db');

async function addSeasonality(season) {

    const result = await db.query(

        `INSERT INTO seasonality(id, district_fk, crop_na, jan, feb, mar, apr, may, jun, july, aug, sep, oct, nov, s_dec) VALUES 
        (${season.id}, ${season.district_fk}, "${season.crop_na}", ${season.jan}, ${season.feb}, ${season.mar}, ${season.apr}, 
        ${season.may}, ${season.jun}, ${season.july}, ${season.aug}, ${season.sep}, ${season.oct}, ${season.nov}, ${season.dec})`

    )

    let msg = 'Error in creating seasonality';

    if(result.affectedRows) {

        msg = 'Seasonality created successfully';

    }

    return {msg};

}

async function retrieveSeasonality() {

    const result = await db.query(

        `SELECT * FROM seasonality`

    )

    return result

}

module.exports = {

    addSeasonality,
    retrieveSeasonality

}
