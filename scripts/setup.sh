#!/bin/sh

if [ $# -ne 6 ]; then
	echo "Usage $0 workerCount walltime port workdir"
	echo $#
else 

	WORKER_COUNT=$1
	WALLTIME=$2
	PORT=$3
	WORKDIR=$4
	SCRIPTDIR=$5
	GRANT=$6
	
	ECHO $SCRIPTDIRinit

	echo $PORT > ~/.hyperflow/env/port

	echo "Initiating Queue and HyperFlow"
	HYPERFLOW_JOB_ID=$(~/.hyperflow/scripts_kopia/hyperflow_pilot_job.sh $WALLTIME ~/.hyperflow/scripts_kopia/init_hflow_main.sh $GRANT $PORT $WORKDIR)
	echo $HYPERFLOW_JOB_ID > ~/.hyperflow/env/hyperflow_job_id
	while [ `qstat -f $HYPERFLOW_JOB_ID | grep 'job_state' | awk '{print $3}'` = "Q" ]
	do
		sleep 1
	done

	rm -f ~/.hyperflow/env/executors_job_id
	for i in $(seq 1 $WORKER_COUNT);
	do
		echo "Initiating executor " $i
		EXECUTOR_JOB_ID=$(~/.hyperflow/scripts_kopia/hyperflow_pilot_job.sh $WALLTIME ~/.hyperflow/scripts_kopia/init_executor.sh $GRANT)
		echo $EXECUTOR_JOB_ID >> ~/.hyperflow/env/executors_job_id 
	done

	sleep 1

	echo "HyperFlow is running on http://"`cat ~/.hyperflow/env/ip_hyperflow`":"`cat ~/.hyperflow/env/port`
fi