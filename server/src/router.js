import passport from "passport";
import {
  signin,
  signup,
  verifyEmail,
  resendVerification
} from "./controllers/authController";
import {
  resetPassword,
  verifyResetPassword,
  resetPasswordNew
} from "./controllers/resetPasswordController";
import {
  fetchEntries,
  fetchUserEntries,
  makeEntry,
  makeEntryCsv
} from "./controllers/entryController";
import { fetchStats, fetchUserStats } from "./controllers/statsController";
import passportService from "./services/passport";

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

const router = app => {
  app.get("/", fetchEntries);
  app.get("/stats", fetchStats);
  app.get("/user", requireAuth, fetchUserEntries);
  app.get("/user/stats", requireAuth, fetchUserStats);
  app.post("/new", requireAuth, makeEntry);
  app.post("/new/csv", requireAuth, makeEntryCsv);
  app.post("/signup", signup);
  app.post("/signup/verify-email", verifyEmail);
  app.post("/resend-verify-code", resendVerification);
  app.post("/signin", requireSignin, signin);
  app.post("/reset-password", resetPassword);
  app.post("/reset-password/verify", verifyResetPassword);
  app.post("/reset-password/new", resetPasswordNew);
};

export default router;
