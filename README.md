# guide.ubuntu-mate.org

![CI](https://github.com/ubuntu-mate/guide.ubuntu-mate.org/workflows/CI/badge.svg)

An online publication of the [Ubuntu MATE Guide].


## Building

This repository contains assets and code to convert the Ubuntu MATE Guide from
docbook format to a styled HTML document for the website.

The actual guide is stored in the [ubuntu-mate-guide] repository in DocBook format.

To build, install `pandoc`, obtain a copy of the guide and run the build script:

    sudo apt install pandoc
    git clone https://github.com/ubuntu-mate/ubuntu-mate-guide --depth=1
    ./scripts/build.py

The result will be output to the `build` folder ready for viewing or deployment.


## License

The contents of this repository is licensed under the GNU General Public License v3.

Ubuntu MATE Guide is licensed under [CC-BY-SA-4.0](https://github.com/ubuntu-mate/ubuntu-mate-guide/blob/master/LICENSE).


[Ubuntu MATE Guide]: https://github.com/ubuntu-mate/ubuntu-mate-guide
[ubuntu-mate-guide]: https://github.com/ubuntu-mate/ubuntu-mate-guide
