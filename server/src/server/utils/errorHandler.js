/**
 * Handle errors and send response code with message to client
 */
module.exports = (err, req, res, next) => {
    console.log(err.message)
    res.status(err.code).send(err.message);
};
