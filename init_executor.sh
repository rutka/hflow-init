#!/bin/sh

export PATH=$PATH:~/.hyperflow/node_modules/hyperflow/examples/Montage_v3.3_patched_4/bin
module add intel
module add ruby/2.0.0-p247
AMQP_URL=amqp://`cat ~/.hyperflow/ip` ~/.hyperflow/hyperflow-amqp-executor-develop/bin/hyperflow-amqp-executor

