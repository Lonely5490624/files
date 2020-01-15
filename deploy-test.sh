#!/bin/bash
echo "====== DEPLOY START ====="
scp -r build/* zjm@192.168.1.98:/www/lexuemao
echo "====== DEPLOY END ====="