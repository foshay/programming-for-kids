nmcli con add type wifi ifname $(iwgetid | sed 's/ .*//') con-name Hotspot autoconnect yes ssid Hotspot
nmcli con modify Hotspot 802-11-wireless.mode ap 802-11-wireless.band bg ipv4.method shared
nmcli con modify Hotspot wifi-sec.key-mgmt wpa-psk
nmcli con modify Hotspot wifi-sec.psk "Learning CS"
nmcli con up Hotspot
