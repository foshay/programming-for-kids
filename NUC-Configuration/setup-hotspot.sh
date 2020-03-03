#!/bin/bash
cd ~
git clone https://github.com/oblique/create_ap
cd ./create_ap
sudo make install
create_ap wlan0 eth0 CS_Hotspot