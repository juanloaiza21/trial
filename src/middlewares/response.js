responseData = (req, res) => {
    if (req.objects.response.info.status === 200 || req.objects.response.info.status === 201 ) {
        res.json({
            info: {
                status: 200,
                urlServices: req.headers.host,
                path: req.originalUrl,
                message: req.objects.response.info.message
            },
            data: req.objects.response.data
        });
    }
    else {
        res.status(req.objects.response.info.status).json({
            info: {
                status: req.objects.response.info.status,
                urlServices: req.headers.host,
                path: req.originalUrl,
            },
            errors: {
                descriptions: req.objects.response.errors
            }
        });
    }
}

module.exports = {
    responseData
}