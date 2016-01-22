#!/bin/sh

if [ $# -ge 2 ]; then
    qsub -l walltime=$1 $2
else
    echo "Usage $0 walltime script_name"
fi

