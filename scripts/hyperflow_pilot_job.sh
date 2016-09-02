#!/bin/sh

if [ $# -eq 2 ]; then
    qsub -A plgrutka2016b -l walltime=$1 $2
elif [ $# -gt 2 ]; then
	qsub -A plgrutka2016b -l walltime=$1 -v PORT="$3",WORKDIR="$4" $2
else
    echo "Usage $0 walltime script_name [port] [workdir]"
fi

