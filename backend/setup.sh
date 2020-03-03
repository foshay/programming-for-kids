#!/bin/bash
sudo apt update
sudo apt upgrade
sudo apt install python-pip
pip install --user pipenv
pip install --user setuptools
pip install --user virtualenv