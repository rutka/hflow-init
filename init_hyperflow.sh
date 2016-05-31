#!/bin/sh
grep `hostname` /etc/hosts | awk '{print $1}' > ~/.hyperflow/ip_hyperflow
export PATH=$PATH:~/.hyperflow/node_modules/.bin:~/.hyperflow/node-v0.12.2-linux-x64/bin/

echo "start redis server"
~/.hyperflow/redis-3.0.1/src/redis-server &
sleep 1
echo "start hyperflow server"
echo $PORT
echo $WORKDIR
AMQP_URL=amqp://`cat ~/.hyperflow/ip` hflow start-server &

sleep $PBS_WALLTIME
