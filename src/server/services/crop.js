

const db = require('./db');

async function addCrop(crop) {

    const result = await db.query(

        `INSERT INTO crop(c_name) VALUES ("${crop.name}")`

    )

    let msg = 'Error in creating crop';

    if(result.affectedRows) {

        msg = 'Crop created successfully';

    }

    return {msg};

}

async function retrieveCrop() {

    const result = await db.query(

        `SELECT (c_name) FROM crop`

    )

    return result

}

module.exports = {

    addCrop,
    retrieveCrop

}