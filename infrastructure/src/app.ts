import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { WebStack } from "./WebStack";
import { APIStack } from "./APIStack";

interface StackProps extends cdk.StackProps {
  audience: string;
}

const app = new cdk.App();
const props: StackProps = {
  audience: process.env.AUDIENCE as string,
  env: {
    account: process.env.AWS_ACCOUNT as string,
    region: process.env.AWS_REGION as string,
  },
};

const webStack = new WebStack(app, "WebAppWebStack", {
  stackName: `${props.audience}-web-app-web`,
  websiteDistPath: "../modules/website/build",
  ...props,
});

const apiStack = new APIStack(app, "WebAppAPIStack", {
  stackName: `${props.audience}-web-app-api`,
  customerLambdaPath: "../modules/customer/dist/customer.zip",
  ...props,
});
