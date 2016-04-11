#!/bin/sh
export PATH=$PATH:~/.hyperflow/node_modules/.bin:~/.hyperflow/node-v0.12.2-linux-x64/bin/
~/.hyperflow/redis-3.0.1/src/redis-server &
sleep 1
cd ~/.hyperflow/ellipsoids/js/
AMQP_URL=amqp://`cat ~/.hyperflow/ip` WORKDIR=/tmp hflow run amqpwf.json