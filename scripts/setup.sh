#!/bin/sh

if [ $# -ne 6 ]; then
	echo "Usage $0 workerCount walltime port workdir scriptdir grant"
	echo $#
else 

	WORKER_COUNT=$1
	WALLTIME=$2
	PORT=$3
	WORKDIR=$4
	SCRIPTDIR=$5
	GRANT=$6

	rm -f ~/.hyperflow/env/*

	echo "Initiating Queue and HyperFlow"
	HYPERFLOW_JOB_ID=$( { "${SCRIPTDIR}"hyperflow_pilot_job.sh $WALLTIME "${SCRIPTDIR}"init_hflow_main.sh $GRANT $PORT $WORKDIR; } 2>&1 )

	if [[ "$HYPERFLOW_JOB_ID" != *.batch.grid.cyf-kr.edu.pl ]]
	then
		echo "Error in initiating Queue and HyperFlow: " 
		echo $HYPERFLOW_JOB_ID
		exit
	fi

	echo $HYPERFLOW_JOB_ID > ~/.hyperflow/env/hyperflow_job_id
	while [ `qstat -f $HYPERFLOW_JOB_ID | grep 'job_state' | awk '{print $3}'` = "Q" ]
	do
		sleep 1
	done

	rm -f ~/.hyperflow/env/executors_job_id
	for i in $(seq 1 $WORKER_COUNT);
	do
		echo "Initiating Executor " $i
		EXECUTOR_JOB_ID=$( { "${SCRIPTDIR}"hyperflow_pilot_job.sh $WALLTIME "${SCRIPTDIR}"init_executor.sh $GRANT; }  2>&1 )

		if [[ "$EXECUTOR_JOB_ID" != *.batch.grid.cyf-kr.edu.pl ]]
		then
			echo "Error in initiating Executor: "
			echo $EXECUTOR_JOB_ID
			exit
		fi
		
		echo $EXECUTOR_JOB_ID >> ~/.hyperflow/env/executors_job_id 
	done

	sleep 1

	echo "HyperFlow is running on http://"`cat ~/.hyperflow/env/ip_hyperflow`":"$PORT
fi