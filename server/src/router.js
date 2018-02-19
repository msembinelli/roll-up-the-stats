import passport from 'passport';
import { signin, signup, verifyEmail, resendVerification } from './controllers/authController';
import { resetPassword, verifyResetPassword, resetPasswordNew } from './controllers/resetPasswordController';
import { fetchEntries, makeEntry } from './controllers/entryController';
import passportService from './services/passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = (app) => {
  app.get('/', fetchEntries);
  app.post('/new', makeEntry);
  app.post('/signup', signup);
  app.post('/signup/verify-email', verifyEmail);
  app.post('/resend-verify-code', resendVerification);
  app.post('/signin', requireSignin, signin);
  app.post('/reset-password', resetPassword);
  app.post('/reset-password/verify', verifyResetPassword);
  app.post('/reset-password/new', resetPasswordNew);
};

export default router;
