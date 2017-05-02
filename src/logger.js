module.exports = {
    buildLog: (message, error) => {
        const toLog = {};
        if (error) {
            toLog.status = 'error';
            toLog.message = error.message;

        } else {
            toLog.status = 'success';
            toLog.message = 'Message sent successfully!';
        }
        const payload = Object.assign({}, message);
        delete payload.text;
        delete payload.html;
        toLog.payload = payload;
        return toLog;
    }
};
