#!/bin/sh

if [ $# -eq 3 ]; then
    qsub -A $3 -l walltime=$1 $2
elif [ $# -eq 5 ]; then
    qsub -A $3 -l walltime=$1 -v PORT="$4",WORKDIR="$5" $2
else
    echo "Usage $0 walltime script_name grant [port] [workdir]"
fi

