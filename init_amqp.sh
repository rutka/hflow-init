#!/bin/sh

grep `hostname` /etc/hosts | awk '{print $1}' > ~/.hyperflow/ip
module add erlang
~/.hyperflow/rabbitmq_server-3.5.1/sbin/rabbitmq-server &

sleep $PBS_WALLTIME
