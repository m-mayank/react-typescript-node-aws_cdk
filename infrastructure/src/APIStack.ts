import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";

export interface APIStackProps extends cdk.StackProps {
  audience: string;
  customerLambdaPath: string;
}

export class APIStack extends cdk.Stack {
  private customerLambda: lambda.Function;
  private api: apigateway.Resource;

  constructor(
    scope: cdk.Construct,
    id: string,
    private readonly props: APIStackProps
  ) {
    super(scope, id, props);

    this.createCustomerLambda();
    this.createApiGateway();
    this.addCustomerResource();
  }

  private createCustomerLambda() {
    this.customerLambda = new lambda.Function(this, "WebAppCustomerLambda", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "customer.handler",
      code: lambda.Code.asset(this.props.customerLambdaPath),
      functionName: `${this.props.audience}-web-app-customer`,
    });
  }

  private createApiGateway() {
    const restApi = new apigateway.RestApi(this, "WebAppApiGateway", {
      restApiName: `${this.props.audience}-web-app-public-api`,
    });
    this.api = restApi.root.addResource("api");
  }

  private addCustomerResource() {
    const customerIntegration = new apigateway.LambdaIntegration(
      this.customerLambda
    );

    const customer = this.api.addResource("customer");
    customer.addMethod("GET", customerIntegration);
    customer.addMethod("POST", customerIntegration);

    const customerById = customer.addResource("{id}");
    customerById.addMethod("GET", customerIntegration);
    customerById.addMethod("PUT", customerIntegration);
    customerById.addMethod("DELETE", customerIntegration);
  }
}
