#!/bin/sh

module add intel
module add ruby/2.0.0-p247
AMQP_URL=amqp://`cat ~/.hyperflow/ip` ~/.hyperflow/hyperflow-amqp-executor-develop/bin/hyperflow-amqp-executor

