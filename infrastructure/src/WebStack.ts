import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as cf from "@aws-cdk/aws-cloudfront";
import * as s3Deploy from "@aws-cdk/aws-s3-deployment";
import * as apigateway from "@aws-cdk/aws-apigateway";

export interface WebStackProps extends cdk.StackProps {
  audience: string;
  websiteDistPath: string;
}

export class WebStack extends cdk.Stack {
  private websiteBucket: s3.IBucket;
  private originAccessId: cf.OriginAccessIdentity;
  private api: apigateway.IRestApi;

  constructor(
    scope: cdk.Construct,
    id: string,
    private readonly props: WebStackProps
  ) {
    super(scope, id, props);

    this.createOriginAccessId();
    this.createWebsiteBucket();
    this.deployWebsite();
    this.lookupApiGateway();
    this.createWebDistribution();
  }

  private createOriginAccessId() {
    this.originAccessId = new cf.OriginAccessIdentity(
      this,
      "WebAppCFOriginAcessId",
      {
        comment: `OAI for ${this.props.audience} Web App`,
      }
    );
  }

  private createWebsiteBucket() {
    this.websiteBucket = new s3.Bucket(this, "WebAppWebsiteBucket", {
      bucketName: `${this.account}-${this.props.audience}-web-app-website-bucket`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    this.websiteBucket.grantRead(this.originAccessId);
  }

  private deployWebsite() {
    new s3Deploy.BucketDeployment(this, "WebAppDeployToS3", {
      destinationBucket: this.websiteBucket,
      sources: [s3Deploy.Source.asset(this.props.websiteDistPath)],
      retainOnDelete: false,
    });
  }

  private lookupApiGateway() {
    this.api = apigateway.RestApi.fromRestApiId(
      this,
      "WebAppApiGateway",
      "ivfrzm62j1"
    );
  }

  private createWebDistribution() {
    new cf.CloudFrontWebDistribution(this, "WebAppDistribution", {
      comment: `CF Distribution from ${this.props.audience} Web App`,
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: this.websiteBucket,
            originAccessIdentity: this.originAccessId,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
        {
          customOriginSource: {
            domainName: `${this.api.restApiId}.execute-api.${this.region}.amazonaws.com`,
          },
          originPath: "/prod",
          behaviors: [
            {
              pathPattern: "/api/*",
              allowedMethods: cf.CloudFrontAllowedMethods.ALL,
            },
          ],
        },
      ],
      viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    });
  }
}
