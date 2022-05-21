const Inventory = require("./../models/inventory");

class InventoryService {
    constructor(req) {
        this.body = req?.body || {};
        this.headers = req?.headers || {};
    }

    getInventory() {
        // const query = {
        //     text: 'SELECT * FROM inventory WHERE country= $1',
        //     values: [country],
        // }
        const errorToThrow = {
            message: 'service_not_reachable',
            statusCode: 500
        }

        return new Promise((resolve, reject) => {
            try {
                resolve({ Inventory })
            }
            catch (error) {
                return reject({ ...errorToThrow });
            }
        })
    }
}

module.exports = InventoryService;
