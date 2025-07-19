export const admin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, error: "Access denied - Admin access required" });
  }
  next();
};
