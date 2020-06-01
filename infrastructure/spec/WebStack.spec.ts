import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import { WebStack } from "../src/WebStack";
import { StackProps } from "../src/app";

const app = new cdk.App();
const props: StackProps = {
  audience: "test",
  env: {
    account: "111",
    region: "eu_west_1",
  },
};

test("WebS Stack", () => {
  // WHEN
  const stack = new WebStack(app, "MyTestStack", {
    websiteDistPath: "",
    ...props,
  });
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::S3::Bucket", {
      BucketName: "111-test-web-app-website-bucket",
    })
  );
});
