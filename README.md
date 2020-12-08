# this is rke2 feat eks-d cdk sample project.

# set ENV
- Clone project 
- open gitpod  [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/guan840912/rke2-eks-d-lab)

# Clone project
- you need install tools 
  - [node](https://nodejs.org/zh-tw/download/)
  - [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
  - [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
  - [aws cdk](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_install)
```bash
git clone https://github.com/guan840912/rke2-eks-d-lab.git
```

# setting aws credentials
```bash
aws configure
```

# install cdk dependency
```bash
cd rke2-eks-d-lab/
npx projen
```

# To list stack
```bash
cdk ls
```

# To deploy
```bash
cdk deploy 
```

# To destroy 
```bash
cdk destroy
```

source from: https://rancher.com/blog/2020/rke2-supports-amazon-eks-distro

see more rke2: https://docs.rke2.io/install/quickstart/

see more rke2 source code: https://github.com/rancher/rke2
