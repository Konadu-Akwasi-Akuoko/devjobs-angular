# CI/CD

TO use this CI/CD pipeline you need to have an AWS account and a github account. Then you need to run the cloudformation templates in this directory to create the necessary resources in your AWS account. We will first create an IAM role for the github actions to assume in your AWS account and then we will create an OIDC identity provider in your AWS account so that github actions can assume the role and create resources for you. After that we will lastly create an ECR public repository in your AWS account to store the docker images that will be built by the github actions.

Personally when running cfn templates I prefer to use the aws console because it is easier to fill in the parameters and see the outputs. But if you prefer to use the aws cli, you can run the commands below to create the resources in your AWS account.

Also replace the values in the parameters with your own values. I used default values in most of the parameters. Such as the name of the repository, the name of the user or organization that owns the repo, the environment tag, the user tag and the unit tag. If you fork this repo and don't change the values in the parameters, you can't use github actions because the name of your repo and and the name of the user or organization that owns the repo is different from mine.

Also I don't know why but this works in only `us-east-1` region. I tried to create the resources in `eu-west-2` region but it didn't work. I got this error `An error occurred (ValidationError) when calling the ValidateTemplate operation: Template format error: Unrecognized resource types: [AWS::ECR::PublicRepository]`. Check out this [issue on Github](https://github.com/awsdocs/aws-cloudformation-user-guide/issues/956#issuecomment-813360276).

Replace {your-repo-name} with the name of your repository, like `"my-repo-name"`. Replace {your-github-username} with your github username or organization name, like `"my-github-username"`. And on and on for the other parameters.

## Table of Contents

- [Create IAM Role](#create-iam-role)
- [Create OIDC Identity Provider](#create-oidc-identity-provider)
- [Create ECR Public Repository](#create-ecr-public-repository)

## Create IAM Role

1. Check the [create-role.yaml](create-role.yaml) and run this cloudformation template in your AWS account to create an IAM role for github actions to assume in your AWS account.

- This template creates an IAM role in your AWS account.
- After it is created you can now use github actions to assume this role in your AWS account and create resources.
- Also try and fill in the parameters with the correct values, I used default values in most of them.
- Keep in mind that if you fork this repo and don't change the values in the parameters, you can't use github actions because the name of your repo and and the name of the user or organization that owns the repo is different from mine.
  
    Run this command using the aws cli to create the IAM role (replace the values in the parameters with your own):

    ```bash
    aws cloudformation create-stack --stack-name create-iam-role-github --template-body file://create-role.yaml --parameters
    ParameterKey=GithubOrg,ParameterValue={your-user/org-name} 
    ParameterKey=GithubRepository,ParameterValue={your-repo-name} 
    ParameterKey=EnvironmentTag,ParameterValue={your-environment-tag} 
    ParameterKey=UserTag,ParameterValue={your-user-tag}
    ParameterKey=UnitTag,ParameterValue={your-unit-tag}
    --output table
    ```

## Create OIDC Identity Provider

1. Check the [create-oidc-github.yaml](create-oidc-github.yaml) and run this cloudformation template in your AWS account to create an OIDC identity provider so that github actions can assume a role in your AWS account and create resources for you.

- This template creates an OIDC identity provider in your AWS account.
- After it is created you can now use github actions to assume a role in your AWS account and create resources.
- Also try and fill in the parameters with the correct values, I used default values in most of them.
- Keep in mind that if you fork this repo and don't change the values in the parameters, you can't use github actions because the name of your repo and and the name of the user or organization that owns the repo is different from mine.
  
    Run this command using the aws cli to create the OIDC identity provider (replace the values in the parameters with your own):

    ```bash
    aws cloudformation create-stack --stack-name create-oidc-github --template-body file://create-oidc-github.yaml --parameters 
    ParameterKey=RepositoryName,ParameterValue={your-repo-name} 
    ParameterKey=GithubOrg,ParameterValue={your-github-username}
    ParameterKey=EnvironmentTag,ParameterValue={your-environment-tag} 
    ParameterKey=UserTag,ParameterValue={your-user-tag}
    ParameterKey=UnitTag,ParameterValue={your-unit-tag}
    --output table
    ```

## Create ECR Public Repository

1. Check the [create-ecr.yaml](create-ecr.yaml) and run this cloudformation template in your AWS account to create an ECR public repository to store the docker images that will be built by the github actions.

- This template creates an ECR public repository in your AWS account.
- After it is created you can now use github actions to push docker images to this repository.
- Also try and fill in the parameters with the correct values, I used default values in most of them.
- Keep in mind that if you fork this repo and don't change the values in the parameters, you can't use github actions because the name of your repo and and the name of the user or organization that owns the repo is different from mine.
  
    Run this command using the aws cli to create the ECR public repository (replace the values in the parameters with your own):

    ```bash
    aws cloudformation create-stack --stack-name create-ecr --template-body file://create-ecr.yaml --parameters
    ParameterKey=RepositoryName,ParameterValue={your-repo-name} 
    ParameterKey=AboutText,ParameterValue={your-about-text} 
    ParameterKey=OperatingSystem,ParameterValue={your-os-you-like-to-use} 
    ParameterKey=Architecture,ParameterValue={your-architecture} 
    ParameterKey=RepositoryDescription,ParameterValue={your-repo-description}
    ParameterKey=EnvironmentTag,ParameterValue={your-environment-tag} 
    ParameterKey=UserTag,ParameterValue={your-user-tag} ParameterKey=UnitTag,
    ParameterValue={your-unit-tag}
    --output table
    ```
