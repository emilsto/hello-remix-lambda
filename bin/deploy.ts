import * as cdk from "aws-cdk-lib";
import { RemixStack } from "../lib/remix-stack";

const app = new cdk.App();

new RemixStack(app, "remixStack", {});
