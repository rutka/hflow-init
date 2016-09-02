#!/bin/sh

if [ $# -eq 2 ]; then
	echo $a
elif [ $# -gt 2 ]; then
	echo "more than 2 arguments"
	echo $@
else 
	echo "Usage $0 workerCount walltime port workdir"
fi

WORKER_COUNT=$1
WALLTIME=$2
PORT=$3
WORKDIR=$4

echo $PORT > ~/.hyperflow/port

echo "Init Queue and HyperFlow"
HYPERFLOW_JOB_ID=$(~/.hyperflow/scripts_kopia/hyperflow_pilot_job.sh $WALLTIME ~/.hyperflow/scripts_kopia/init_hflow_main.sh  $PORT $WORKDIR)
echo $HYPERFLOW_JOB_ID > ~/.hyperflow/env/hyperflow_job_id
while [ `qstat -f $HYPERFLOW_JOB_ID | grep 'job_state' | awk '{print $3}'` = "Q" ]
do
	sleep 1
done

rm -f ~/.hyperflow/env/executors_job_id
echo "Init Executor(s)"
for i in $(seq 1 $WORKER_COUNT);
do
	echo "Executor " $i
	EXECUTOR_JOB_ID=$(~/.hyperflow/scripts_kopia/hyperflow_pilot_job.sh $WALLTIME ~/.hyperflow/scripts_kopia/init_executor.sh)
	echo $EXECUTOR_JOB_ID >> ~/.hyperflow/env/executors_job_id 
done

sleep 1

echo "HyperFlow is running on http://"`cat ~/.hyperflow/ip_hyperflow`":"`cat ~/.hyperflow/port`
