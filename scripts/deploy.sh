#!/bin/bash

echo "Syncing to server..."
rsync -a -e "ssh -o StrictHostKeyChecking=no" --delete build/ matey@man.ubuntu-mate.net:guide.ubuntu-mate.org/
rsync -a -e "ssh -o StrictHostKeyChecking=no" --delete build/ matey@yor.ubuntu-mate.net:guide.ubuntu-mate.org/

echo "Clearing CDN cache..."
ssh -o StrictHostKeyChecking=no matey@yor.ubuntu-mate.net /home/matey/post-deploy-actions.sh "guide.ubuntu-mate.org"
