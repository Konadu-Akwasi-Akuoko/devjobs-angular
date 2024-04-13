# CI/CD

To use github actions to do CI/CD actions like creating resources in AWS, you need to create an OIDC identity provider in AWS and create a role that can be assumed by the OIDC identity provider.

## Create OIDC Identity Provider

1. Check the [create-oidc-github.yaml](create-oidc-github.yaml) and run this cloudformation template in your AWS account to create an OIDC identity provider so that github actions can assume a role in your AWS account and create resources for you.

- This template creates an OIDC identity provider in your AWS account.
- After it is created you can now use github actions to assume a role in your AWS account and create resources.
- Also try and fill in the parameters with the correct values, I used default values in most of them because I was lazy to fill them in.
- Keep in mind that if you fork this repo and don't change the values in the parameters, you can't use github actions because the name of your repo and and the name of the user or organization that owns the repo is different from mine.
