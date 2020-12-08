import { readFileSync } from 'fs';
import * as path from 'path';
import * as ec2 from '@aws-cdk/aws-ec2';
import { App, Construct, Stack, StackProps, CfnOutput, Duration } from '@aws-cdk/core';
import * as spot from 'cdk-spot-one';
export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    const vpc = ec2.Vpc.fromLookup(this, 'defaultVpc', {
      isDefault: true,
    });
    const ee = new spot.SpotFleet(this, 'node1', {
      defaultInstanceType: new ec2.InstanceType('t3.large'),
      vpc,
      customAmiId: ec2.MachineImage.lookup({
        name: '*ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server*',
        owners: ['099720109477'],
        filters: {
          ['root-device-type']: ['ebs'],
        },
      }).getImage(this).imageId,
      additionalUserData: [readFileSync(path.join(__dirname, './user-data.sh')).toString()],
      blockDeviceMappings: [
        {
          deviceName: '/dev/sda1',
          ebs: {
            volumeSize: 60,
          },
        },
      ],
    });
    new CfnOutput(this, 'instanceId', {
      value: ee.instanceId,
    });
    // after cdk deploy 6 hours ,spot instance will stop.
    ee.expireAfter(Duration.hours(6));
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'my-stack-dev', { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();