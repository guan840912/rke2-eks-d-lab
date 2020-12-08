set -xe
set -o pipefail

sleep 30

curl -sfL https://get.rke2.io | INSTALL_RKE2_VERSION=v1.18.12-beta1+rke2r2 sh -

sleep 10 

sudo apt-get update -y

sudo apt-get install python3-venv python3-wheel python3-pip jq -y

cd ~/

python3 -m venv ~/python3

. ~/python3/bin/activate

git clone https://github.com/rancher/rke2.git

cd rke2/contrib/custom-image-kubelet

pip install -r requirements.txt


sleep 10

~/python3/bin/python genconfig.py --release-url https://distro.eks.amazonaws.com/kubernetes-1-18/kubernetes-1-18-eks-1.yaml

systemctl enable rke2-server

systemctl start rke2-server


# start to install kubectl 
echo "start to install kubectl" 
apt-get update -y && apt-get install  apt-transport-https gnupg2 curl -y
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update -y
sudo apt-get install kubectl -y

echo 'export KUBECONFIG=/etc/rancher/rke2/rke2.yaml' >> /etc/bash.bashrc
echo 'export PATH=$PATH:/var/lib/rancher/rke2/bin' >> /etc/bash.bashrc
kubectl completion bash >/etc/bash_completion.d/kubectl
sleep 10
echo 'alias k=kubectl' >> /etc/bash.bashrc
echo 'complete -F __start_kubectl k' >> /etc/bash.bashrc
echo 'source <(kubectl completion bash)' >> /etc/bash.bashrc

#sleep 20 
#ENDPOINT=$(curl http://169.254.169.254/latest/meta-data/public-hostname)
#sed -i s/127.0.0.1/$ENDPOINT/ /etc/rancher/rke2/rke2.yaml