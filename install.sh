#!/bin/sh

mkdir -p ~/.hyperflow

cd ~/.hyperflow

# install node
wget http://nodejs.org/dist/v0.12.2/node-v0.12.2-linux-x64.tar.gz
tar zxvf node-v0.12.2-linux-x64.tar.gz 

# install redis
wget http://download.redis.io/releases/redis-3.0.1.tar.gz
tar zxvf redis-3.0.1.tar.gz
cd redis-3.0.1
make
cd ..

# install RabbitMQ
wget https://www.rabbitmq.com/releases/rabbitmq-server/v3.5.1/rabbitmq-server-generic-unix-3.5.1.tar.gz
tar zxvf rabbitmq-server-generic-unix-3.5.1.tar.gz

# install hyperflow
./node-v0.12.2-linux-x64/bin/npm install https://github.com/dice-cyfronet/hyperflow/archive/develop.tar.gz

export PATH=$PATH:~/.hyperflow/node_modules/.bin:~/.hyperflow/node-v0.12.2-linux-x64/bin/

# enable guest login from remote machines
echo "[{rabbit, [{loopback_users, []}]}]." > rabbitmq_server-3.5.1/etc/rabbitmq/rabbitmq.config

mkdir tests
git clone https://github.com/malawski/ellipsoids.git
cd ellipsoids/
g++ ellipsoids-openmp.cpp -fopenmp -o ellipsoids-openmp
g++ mean-pack-ell.cpp -fopenmp -o mean-pack-ell
cd js/
~/.hyperflow/node-v0.12.2-linux-x64/bin/npm install

node generator_template.js ~/.hyperflow/tests/ ~/.hyperflow/ellipsoids/ellipsoids-openmp 3 ~/.hyperflow/ellipsoids/mean-pack-ell > wf.json
node generator_template.js ~/.hyperflow/tests/ ~/.hyperflow/ellipsoids/ellipsoids-openmp 3 ~/.hyperflow/ellipsoids/mean-pack-ell amqpCommand > amqpwf.json

cd ../..

wget https://github.com/dice-cyfronet/hyperflow-amqp-executor/archive/develop.zip
unzip develop.zip 
cd hyperflow-amqp-executor-develop/

module add ruby/2.0.0-p247
gem install -g Gemfile --install-dir ~/.gem/ruby/2.0.0/

