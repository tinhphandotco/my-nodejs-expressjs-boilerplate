const REQUEST_STATUSES = {
    BAD_REQUEST: {
        code: 400,
        description: 'The server cannot or will not process the request due to an apparent client error'
    },
    FORBIDDEND: {
        code: 403,
        description: 'The request was valid, but the server is refusing action'
    },
    NOT_FOUND: {
        code: 404,
        description: 'The requested resource could not be found but may be available in the future'
    },
    CONFLICT: {
        code: 409,
        description: 'A conflict of data exists, even with valid information'
    },
    UNAUTHORIZED: {
        code: 401,
        description: 'An access token isn’t provided, or is invalid'
    },
    LOW_AUTHORIZED: {
        code: 403,
        description: 'An access token is valid, but requires more privileges'
    },
    OK: {
        code: 200,
        description: 'Everything is okay'
    }
}

module.exports = {
    REQUEST_STATUSES
}
