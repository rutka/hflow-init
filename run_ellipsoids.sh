#!/bin/sh


mgr/redis-3.0.1/src/redis-server &
sleep 1
cd mgr/ellipsoids/js/
AMQP_URL=amqp://`cat ~/.hyperflow/ip` WORKDIR=/tmp hflow run amqpwf.json