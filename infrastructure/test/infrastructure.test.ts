import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import { WebSiteStack } from "../src/WebSiteStack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new WebSiteStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
