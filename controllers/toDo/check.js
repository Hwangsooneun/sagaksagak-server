const { todo } = require('../../models')
const { verifyAccessToken } = require('../../middlewares/token')

module.exports = async (req, res) => {
    const accessToken = verifyAccessToken(req);
    if (accessToken !== null) {
        const id = req.headers["toDoId"];
        if (!id) {
            res.status(404).send({
                message: 'not found'
            })
        } else {
            await todo.update({ isDone: true },
                { where: { id: id } })
            res.status(202).send({
                message: 'ok'
            })
        }
    } else {
        res.status(403).send({
            message: 'access token expired'
        })
    }
}