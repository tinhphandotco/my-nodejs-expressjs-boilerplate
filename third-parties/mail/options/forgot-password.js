module.exports = ({ name, email, appOrigin, token }) => ({
    from: 'LiveX Support Team',
    to: email,
    subject: 'LIVE-X Notification - Reset your password',
    html: `
        <div>
            <p>Dear <b>${name}</b>,</p>

            <p>
                You are receiving this email because we recieved a password reset request for your account.
            </p>

            <p>
                Please click on <a href="${appOrigin}/reset-password/${token}">here</a> to reset your password.
            </p>
            <p>Note: Reset link will expire on 5min.</p>
            

            <p>If you did not request a password reset, no further action is required.</p>

            <br>

            <p>LiveX Support Team</p>
        </div>

    `
})
