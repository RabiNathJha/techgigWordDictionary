export default (req, res, next) => {
    res.status(201).json({
        status: 'success',
        filename: req.file.filename
    })
};
