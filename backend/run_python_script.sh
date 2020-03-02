#!/bin/bash
# Runs a python script in a docker dock.
# grading script MUST include a line at the bottom that starts the student's function. Example would be adding:
# def student(potential args) {
#this script will add the missing "}"
if [ "$1" == "-h" ]
then
    echo "Use with grading script for arg 1, student's submission as arg 2, username for arg 3"
    exit 1
elif [ "$#" != "3" ]
then
    echo "Incorrect amount of arguments. use -h for help"
    exit 1
fi
#lines=$(wc -l < $2)
#counter=1
#while [ $counter -le $lines ]
#do
#    sed -i $counter's/^/\t/g' $2
#    ((counter++))
#done

#sed -r 's/  /   /g' $2
#6969 is user id. $3 is lesson_number
cat $1 $2 > "users/"$3"/pcode/script.py"
echo -e "if __name__ == \"__main__\":\n  grade()" >> "users/"$3"/pcode/script.py"
#docker build -t python-$3 --build-arg USER=$3 .
#docker run python-$3
#Run the newly generated file in virtual env here
python "users/"$3"/pcode/script.py"
exit 0
