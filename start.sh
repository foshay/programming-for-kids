sudo create_ap -n $(iwgetid | sed 's/ .*//') 'learn cs' & npx npm-run-all --parallel client server
