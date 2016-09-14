import { Accounts } from 'meteor/std:accounts-ui';
import { FlowRouter } from 'meteor/kadira:flow-router';

///////////////////////////
// Patch to fix https://github.com/studiointeract/accounts-ui/issues/60
class Field extends Accounts.ui.Field {
  triggerUpdate () {
    const { onChange } = this.props
    if (this.input) {
      onChange({ target: { value: this.input.value } })
    }
  }
}

Accounts.ui.Field = Field

export { Accounts, STATES }
export default Accounts
////////////////////////////

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
  minimumPasswordLength: 6,

  loginPath: '/login',
  signUpPath: '/login',
  // resetPasswordPath: '/reset-password',
  // profilePath: '/profile',
  onSignedInHook: () => FlowRouter.go('/integridad-ecosistemica'),
  onSignedOutHook: () => FlowRouter.go('/integridad-ecosistemica'),

});

Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: false
});
