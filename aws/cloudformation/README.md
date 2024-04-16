# CI/CD

TO use this CI/CD pipeline you need to have an AWS account and a github account. Then you need to run the cloudformation templates in this directory to create the necessary resources in your AWS account. Note that if you don't follow the steps below it will probably not work for you, so here are the steps to follow:

1. Run the [github-actions-oidc-federation-and-role.yaml](./github-actions-oidc-federation-and-role.yaml) cloudformation template to create the necessary resources in your AWS account. This template creates an OIDC identity provider and a role that can be assumed by the github actions runner. We are only allowing this github actions runner to assume the role, that it can use to deploy docker images to ECR. When running this template take note of the RoleName. Because you will need this RoleName to attach the policy to the ECR repository as a Principal that can push docker images to the ECR repository.

2. Run the [create-ecr.yaml](./create-ecr.yaml) cloudformation template to create the necessary resources in your AWS account. This template creates an ECR repository that can be used to store docker images. The template also creates a policy that allows the github actions runner to push docker images to the ECR repository. The policy is attached to the ECR repository.

    After you have created the repo, go into your ECR repo and copy the URI of the repo. You will need this URI to push docker images to the repo.

    - You can find the URI in the `View push commands` section of the ECR repo. Specifically you will need the commands in bullet point 2, 3 and 4. Copy these commands and replace them in the[github actions workflow file](../../.github/workflows/push-to-ecr.yaml) (Line 38 to 40).

3. After creating the above resources, you need to create an ECS cluster and a task definition. In the task definition you can specify the image we build in the [push-to-ecr.yaml](../../.github/workflows/push-to-ecr.yaml) workflow file.

4. I choose to use dynamic port mapping for the ecs service, so I also created an Application Load Balancer and a target group. The target group is used to route traffic to the ecs service.
