import "./OAUTH.css";

function OAUTH({ text }) {
  return (
    <>
      <div className="line-break"></div>
      <a className="oauth" href={`${window.origin}/api/auth/oauth_login`}>
        <img src="/images/google_logo.png" alt="google-logo" />
        <span>{text} with Google</span>
      </a>
    </>
  );
}

export default OAUTH;
