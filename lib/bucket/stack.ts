import { RemovalPolicy, Stack, type StackProps } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as S3Deployment from "aws-cdk-lib/aws-s3-deployment";
import type { Construct } from "constructs";

interface IBucketProps extends StackProps {}

export class BucketStack extends Stack {
	public readonly staticBucket: s3.Bucket;

	constructor(scope: Construct, id: string, props: IBucketProps) {
		super(scope, id, props);

		this.staticBucket = new s3.Bucket(this, "staticBucket", {
			publicReadAccess: false,
			blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
			removalPolicy: RemovalPolicy.DESTROY, // TODO: handle production code
			autoDeleteObjects: true, // TODO: handle production code
		});

		new S3Deployment.BucketDeployment(this, "staticBucketDeployment", {
			sources: [
				S3Deployment.Source.asset(
					"./application/apps/remix-app/public",
				),
			],
			destinationBucket: this.staticBucket,
		});
	}
}
