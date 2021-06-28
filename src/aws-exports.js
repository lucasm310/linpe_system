const {
  REACT_APP_AWS_REGION,
  REACT_APP_BASE_URL,
  REACT_APP_IDENT_ID,
  REACT_APP_USERPOOL_ID,
  REACT_APP_CLIENT_ID,
  REACT_APP_OAUTHDOMAIN,
} = process.env;

const awsmobile = {
  aws_project_region: REACT_APP_AWS_REGION,
  aws_cognito_identity_pool_id: REACT_APP_IDENT_ID,
  aws_cognito_region: REACT_APP_AWS_REGION,
  aws_user_pools_id: REACT_APP_USERPOOL_ID,
  aws_user_pools_web_client_id: REACT_APP_CLIENT_ID,
  oauth: {
    domain: REACT_APP_OAUTHDOMAIN,
    scope: [
      "phone",
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin",
    ],
    redirectSignIn: REACT_APP_BASE_URL,
    redirectSignOut: REACT_APP_BASE_URL,
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
};

export default awsmobile;
