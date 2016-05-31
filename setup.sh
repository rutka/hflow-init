#!/bin/sh

if [ $# -eq 2 ]; then
	echo $a
elif [ $# -gt 2 ]; then
	echo "more than 2 arguments"
	echo $@
else 
	echo "Usage $0 workerCount walltime port workdir"
fi

echo "Init queue"
AMQP_JOB_ID=$(~/.hyperflow/scripts_kopia/hyperflow_pilot_job.sh $2 ~/.hyperflow/scripts_kopia/init_amqp.sh)

while [ `qstat -f $AMQP_JOB_ID | grep 'job_state' | awk '{print $3}'` = "Q" ]
do
	sleep 5
done

echo "Init HyperFlow" $3
echo $3 > ~/.hyperflow/port
cat ~/.hyperflow/port
HYPERFLOW_JOB_ID=$(~/.hyperflow/scripts_kopia/hyperflow_pilot_job.sh $2 ~/.hyperflow/scripts_kopia/init_hyperflow.sh $3 $4)

echo "Init Executor"
for i in $(seq 1 $1);
do
	echo "Executor " + $i
	~/.hyperflow/scripts_kopia/hyperflow_pilot_job.sh $2 ~/.hyperflow/scripts_kopia/init_executor.sh &
done

while [ `qstat -f $HYPERFLOW_JOB_ID | grep 'job_state' | awk '{print $3}'` = "Q" ]
do
	sleep 5
done

sleep 1

echo "HyperFlow is running on http://"`cat ~/.hyperflow/ip_hyperflow`":"`cat ~/.hyperflow/port`
