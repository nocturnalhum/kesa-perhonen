const ResetPasswordEmailTemplate = (resetLink: string) => {
  return `<div>
      <h2>Kesä Perhonen</h2>
      <h3>Password Reset</h3>
      <p>
        You requested to reset your password. Click the following link to do so:
      </p>
      <a href=${resetLink} style="text-decoration: underline; font-size:18px; font-weight:strong">Click here to reset your password</a>
      <br/><br/>
      <p>
        If you cannot click the link, copy and paste the following link into your
        browser:
      </p>
      <p style="text-decoration: underline; font-weight:strong">${resetLink}</p>
      <br/>
      <p>If you did not request a password reset, please ignore this email.</p>
      <p>Best regards,</p>
      <h3>Kesä Perhonen</h3>
      <hr style="width: 100%;height:1px;background-color:rgb(203 213 225);border:none;"/>
      <a href='https://www.kesa-perhonen-shop.vercel.app'>
        www.kesa-perhonen-shop.vercel.app
      </a>
    </div>`;
};
export default ResetPasswordEmailTemplate;
