const BaseRouter = require("./baseRouter");
const {
    InventoryService,
} = require("./../../services");

class BudgeRouter extends BaseRouter {
    constructor() {
        super();
    }

    initializeRoutes() {
        this.getHandlers.push({
            path: "/inventory",
            handler: this.getInventory.bind(this),
        });
    }

    getInventory(req, res) {
        const params = { ...req?.params || {}, ...req?.query || {} }
        const _service = new InventoryService(req);
        _service
            .getInventory(params)
            .then((data) => {
                if (data) res.json(data?.Inventory || []);
            })
            .catch((error) => {
                console.log("getInventory error:", error);
                res.status(error?.statusCode || 500).send({ error });
            });
    }
}

module.exports = BudgeRouter;
