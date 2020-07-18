#!/bin/bash
#
# Runs tests for validation errors.
#
# 'html-proofer' RubyGem provided by:
# https://github.com/gjtorikian/html-proofer
#
# This script contains two tests:
#
# <no parameters>   Check internal links, images and HTML output.
# --external        All of the above, plus external links.
#

cd "$(dirname $0)/../"

function check_for_error() {
    if [ $1 != 0 ]; then
        exit 1
    fi
}

echo "Proofing HTML..."
htmlproofer \
    --assume-extension \
    --check-html \
    --check-img-http \
    --disable-external \
    ./build/

check_for_error $?
