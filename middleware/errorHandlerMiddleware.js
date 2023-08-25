function errorHandler(err, req, res, next) {
    console.error(err); // Log the error for debugging purposes

    // Check if the error has a status code set (e.g., from a custom error)
    const statusCode = err.statusCode || 500;

    // Respond with an error message and status code
    res.status(statusCode).json({
        error: {
            message: err.message || "Internal Server Error",
            status: statusCode,
        },
    });
}

export default errorHandler;
