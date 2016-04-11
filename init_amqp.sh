#!/bin/sh

module add erlang
~/.hyperflow/rabbitmq_server-3.5.1/sbin/rabbitmq-server &

grep `hostname` /etc/hosts | awk '{print $1}' > .hyperflow/ip

sleep $PBS_WALLTIME
