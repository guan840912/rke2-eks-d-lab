const { AwsCdkTypeScriptApp } = require('projen');

const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.77.0',
  name: 'rke2lab',
  cdkDependencies: [
    '@aws-cdk/aws-ec2',
  ],
  deps: [
    'cdk-spot-one@0.6.100',
  ],
  dependabot: false,
});
project.gitignore.exclude(['kube-config.yml']);
project.synth();
