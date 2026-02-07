const USER_STATUS = {
    approved: "APPROVED",
    pending: "PENDING",
    rejected: "REJECTED"
}

const USER_ROLE = {
    customer: "CUSTOMER",
    admin: "ADMIN",
    client: "CLIENT"
}

const STATUS_CODES = {
    ok: 200,
    INTERNAL_SERVER_ERROR:500,
    CREATED: 201,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    BAD_REQUEST: 400,
    ALLREADY_EXIST: 409,
    FORBIDDEN: 403,
}

export  {USER_STATUS,USER_ROLE,STATUS_CODES as STATUS};