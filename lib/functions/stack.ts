import { Duration, Stack, type StackProps } from "aws-cdk-lib";
import { RemovalPolicy } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import type { Construct } from "constructs";

interface IFunctionsProps extends StackProps {}

export class FunctionsStack extends Stack {
  public readonly remixLambda: NodejsFunction;

  constructor(scope: Construct, id: string, props: IFunctionsProps) {
    super(scope, id, props);

    this.remixLambda = new NodejsFunction(this, "remixLambda", {
      currentVersionOptions: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
      entry: "./application/apps/remix-app/build/index.js",
      logRetention: RetentionDays.THREE_DAYS,
      memorySize: 1023,
      timeout: Duration.seconds(10),
    });
  }
}
