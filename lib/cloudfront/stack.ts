import type * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import { Duration, Stack, type StackProps } from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import type { IBucket } from "aws-cdk-lib/aws-s3";
import type { Construct } from "constructs";

interface CloudFrontProps extends StackProps {
    staticBucket: IBucket;
    remixHttpApi: apigatewayv2.HttpApi;
}

export class CloudFrontStack extends Stack {
    constructor(scope: Construct, id: string, props: CloudFrontProps) {
        super(scope, id, props);

        const cachePolicy = new cloudfront.CachePolicy(this, "cachePolicy", {
            cookieBehavior: cloudfront.CacheCookieBehavior.all(),
            defaultTtl: Duration.seconds(0),
            minTtl: Duration.seconds(0),
            maxTtl: Duration.days(10),
            queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
            enableAcceptEncodingGzip: true,
            enableAcceptEncodingBrotli: true,
            headerBehavior: cloudfront.CacheHeaderBehavior.allowList(
                "authorization",
                "x-origin-verify",
            ),
        });

        new cloudfront.Distribution(this, "remixDistribution", {
            defaultBehavior: {
                allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
                cachePolicy,
                // biome-ignore lint/style/noNonNullAssertion: Lets say it exists for now..
                origin: new origins.HttpOrigin(props.remixHttpApi?.url!.split("/")[2]),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            additionalBehaviors: {
                "/static/*": {
                    origin: new origins.S3Origin(props.staticBucket),
                    viewerProtocolPolicy:
                        cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                },
            },
        });
    }
}