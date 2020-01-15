#!/bin/bash
echo "====== DEPLOY START ====="
scp -r build/* root@47.103.138.57:/www/wwwroot/lexuemao
echo "====== DEPLOY END ====="