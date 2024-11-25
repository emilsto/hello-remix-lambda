import { Stack } from "aws-cdk-lib";
import type { StackProps } from "aws-cdk-lib";
import type { Construct } from "constructs";

import { ApiGatewayStack } from "./apigw/stack";
import { BucketStack } from "./bucket/stack";
import { CloudFrontStack } from "./cloudfront/stack";
import { FunctionsStack } from "./functions/stack";

export interface RemixSiteProps extends StackProps {}

export class RemixStack extends Stack {
  constructor(scope: Construct, id: string, props?: RemixSiteProps) {
    super(scope, id, props);

    const { staticBucket } = new BucketStack(this, "remixStaticResources", {});
    const { remixLambda } = new FunctionsStack(this, "remixLambdaHandler", {});
    const { remixHttpApi } = new ApiGatewayStack(this, "remixApiGateway", {
      remixLambda,
    });

    new CloudFrontStack(this, "remixCloudFrontStack", {
      staticBucket,
      remixHttpApi,
    });
  }
}
