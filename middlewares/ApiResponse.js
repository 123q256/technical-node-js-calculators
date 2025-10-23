class ApiResponse {
    constructor(payload, status = "success") {
        this.status = status
        this.payload = payload
    }
}


module.exports = { ApiResponse };