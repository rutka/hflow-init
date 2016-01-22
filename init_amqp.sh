#!/bin/sh

module add erlang
mgr/rabbitmq_server-3.5.1/sbin/rabbitmq-server &

mkdir -p .hyperflow
grep `hostname` /etc/hosts | awk '{print $1}' > .hyperflow/ip

sleep $PBS_WALLTIME
