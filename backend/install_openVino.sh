#!/bin/bash

# Installs open vino on linux mint plus usb driver for linux
sudo apt update
sudo apt install curl
curl -fsSL https://apt.repos.intel.com/openvino/2020/GPG-PUB-KEY-INTEL-OPENVINO-2020 | sudo apt-key add -
sudo add-apt-repository "deb https://apt.repos.intel.com/openvino/2020 all main"
sudo apt update
sudo apt upgrade
sudo apt install intel-openvino-dev-ubuntu18-2020.1.023 
source /opt/intel/openvino/bin/setupvars.sh
cd /opt/intel/openvino/install_dependencies
./install_NCS_udev_rules.sh
sudo -E ./install_openvino_dependencies.sh
sudo -E apt install build-essential python3-pip virtualenv cmake libcairo2-dev libpango1.0-dev libglib2.0-dev libgtk2.0-dev libswscale-dev libavcodec-dev libavformat-dev libgstreamer1.0-0 gstreamer1.0-plugins-base
sudo apt autoremove
cd /opt/intel/openvino/deployment_tools/model_optimizer/install_prerequisites
sudo ./install_prerequisites_tf.sh
sudo usermod -a -G users "$(whoami)"
sudo cp /opt/intel/openvino/inference_engine/external/97-myriad-usbboot.rules /etc/udev/rules.d/
sudo udevadm control --reload-rules
sudo udevadm trigger
sudo ldconfig
#cd /opt/intel/openvino/deployment_tools/demo
#this demo is for no compute stick plugged in
#./demo_squeezenet_download_convert_run.sh
#this is for when a compute stick is plugged in
#./demo_squeezenet_download_convert_run.sh -d MYRIAD
