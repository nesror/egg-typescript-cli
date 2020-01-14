#!/bin/bash
npm i
nodeinstall --install-alinode v5.13.0
npm run tsc
NODE_LOG_DIR=/data/html/logs/wxmiddleware/alinode ENABLE_NODE_LOG=YES npm start