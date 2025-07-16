

const adminMiddleware = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const userRole = req.user?.role;

            if (!userRole) {
                return res.status(403).json({ message: "Access denied: No role provided" });
            }

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: "Access denied: Unauthorized role" });
            }

            next();
        } catch (error) {
            console.error("Error while verifying user role:", error);
            res.status(500).json({ message: "Server error in role middleware" });
        }
    };
};

module.exports = adminMiddleware;
