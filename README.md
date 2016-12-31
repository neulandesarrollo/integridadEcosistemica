## Detailed setup using LXD

Create LXC container using LXD. Mounts folders between host and container for sharing setting configuration files, fixtures, and other assets that do not belong in git.

````bash
# lxc-01.sh
#!/bin/bash

# Container variables
CONTAINER_NAME="geeky"
HOME_PATH="/home/ubuntu" # default created by LXD
ROOT_PATH="$HOME_PATH/$CONTAINER_NAME"
CODE_PATH="$ROOT_PATH/code/"
VOLATILE_PATH="$ROOT_PATH/volatile/"

# Host variables
VOLATILE_HOST_PATH="/path/to/settings/host"
CODE_HOST_PATH="/path/to/code/host/"

echo "(1/5) Creating new LXD container $CONTAINER_NAME."
lxc launch ubuntu:16.04 $CONTAINER_NAME -c security.privileged=true #-p default -p docker

echo "(2/5) Adding shared drives between container and host."
lxc config device add $CONTAINER_NAME volatile disk path=$VOLATILE_PATH source=$VOLATILE_HOST_PATH
lxc config device add $CONTAINER_NAME code disk path=$CODE_PATH source=$CODE_HOST_PATH

echo "\nSuccess. Finished setting up LXC. To proceed, please execute the commands below.\n $ lxc exec $CONTAINER_NAME -- /bin/bash\n $ su ubuntu \n $ chmod +x ${VOLATILE_PATH}scripts/deploy/lxc-02.sh\n $ ${VOLATILE_PATH}scripts/deploy/lxc-02.sh\n"

````

Setup container with necessary tools and users

````bash
# lxc-03.sh
#!/bin/bash

SSH_EMAIL="marvin@unplugged.im"
GIT_NAME="Marvin Arnold"

echo "(3/5) Setting up container environment."
sudo chown -R ubuntu $HOME_PATH

sudo apt update
sudo apt upgrade -y
sudo apt install -y curl emacs build-essential python2.7 python # docker.io

ssh-keygen -t rsa -b 4096 -C $SSH_EMAIL # Should accept default location and no password

echo "(4/5) Copy the generated key to Github (https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/):\n"
cat ~/.ssh/id_rsa.pub
echo "\n[Enter any key to confirm completion.]"
read input_variable

curl https://install.meteor.com/ | sh

echo "(5/5) Getting the code in order."
cd $CODE_PATH
git config --global user.name $GIT_NAME
git config --global user.email $SSH_EMAIL
git clone git@github.com:marvinmarnold/geeky.rocks.git
cd geeky.rocks/
ln -s ${VOLATILE_PATH}settings/
ln -s ${VOLATILE_PATH}scripts/
chmod +x scripts/deploy/dev.sh
meteor npm install --save
cd imports/robofy.it/lib/
ln -s ${VOLATILE_PATH}fixtures/

echo "\nSuccess. You can now run 'cd ${CODE_PATH}geeky.rocks && ./scripts/deploy/dev.sh' to start the application.\n"
echo "Container running at:\n"
ip addr show eth0
````
