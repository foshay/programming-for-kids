#!/bin/bash
if [ "$1" == "-h" ]
then
    echo "Use with username for arg 1"
    exit 1
elif [ "$#" != "1" ]
then
    echo "Incorrect amount of arguments. use -h for help"
    exit 1
fi

mkdir "users/"$1 && mkdir "users/"$1"/pcode"

echo "Success"

exit 0