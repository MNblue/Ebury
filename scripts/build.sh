#!/usr/bin/env bash
set -e

# Create scratch org
#sfdx force:org:create -f config/project-scratch-def.json -a ebury_test5 -s
sfdx org create scratch -f config/project-scratch-def.json -a ebury_test5 -s

# Push changes
sfdx force:source:push


