const sendResponse = (
    res,
    status = false,
    statusCode = 200,
    statusMessage = "ok",
    data = null,
    totalRecords
) =>{
    const resSchema = {
        status,
        statusCode,
        statusMessage,
        totalRecords : totalRecords ? totalRecords : 0,
    };
    if(data !=null)
    resSchema.data = data;

    return res.status(statusCode).json(resSchema);
};

module.exports = sendResponse;