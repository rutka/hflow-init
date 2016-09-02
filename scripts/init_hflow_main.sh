#!/bin/sh

grep `hostname` /etc/hosts | awk '{print $1}' > ~/.hyperflow/ip_hyperflow
module add erlang
export PATH=$PATH:~/.hyperflow/node_modules/.bin:~/.hyperflow/node-v0.12.2-linux-x64/bin/
~/.hyperflow/rabbitmq_server-3.5.1/sbin/rabbitmq-server &
~/.hyperflow/redis-3.0.1/src/redis-server &
sleep 1

hflow start-server -p  hyperflow-monitoring-plugin &
sleep $PBS_WALLTIME
