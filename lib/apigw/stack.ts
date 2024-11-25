import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as apigatewayv2Integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Stack, type StackProps } from "aws-cdk-lib";
import type { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import type { Construct } from "constructs";

interface IApiGatewayProps extends StackProps {
    remixLambda: NodejsFunction;
}

export class ApiGatewayStack extends Stack {
    public readonly remixHttpApi: apigatewayv2.HttpApi;

    constructor(scope: Construct, id: string, props: IApiGatewayProps) {
        super(scope, id, props);

        const remixLambdaIntegration =
            new apigatewayv2Integrations.HttpLambdaIntegration(
                "remixLambdaProxy",
                props.remixLambda,
            );

        this.remixHttpApi = new apigatewayv2.HttpApi(this, "remixHttpApi", {
            defaultIntegration: remixLambdaIntegration,
        });
    }
}