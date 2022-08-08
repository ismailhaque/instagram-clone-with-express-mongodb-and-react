
// create error controller
const createError = (status, msg) => {

    const err = new Error();

    err.status = status;
    err.message = msg;

    return err;

}

// export error controller
export default createError;