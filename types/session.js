const session = function(alive, sessionId) {
    if (alive) {
        return {
            alive,
            serverTime: Date.now()
        }
    }
    return {
        status: "error",
        reason: `Invalid session id: ${sessionId}`,
        details: `Invalid session id: ${sessionId}`
    }
}

module.exports = session
