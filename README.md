# guide.ubuntu-mate.org

An online publication of the Ubuntu MATE Guide.


> [!IMPORTANT]
> This repository was merged with the [ubuntu-mate-guide] repository.
>
> The original code used from 2020 to 2024 remains archived here, designed for
> use with the 20.04 version of pandoc.
>
> For the latest guide.ubuntu-mate.org code, visit the [ubuntu-mate-guide] repository.
>


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

See [LICENSE](https://github.com/ubuntu-mate/ubuntu-mate-guide/blob/master/LICENSE) from the [ubuntu-mate-guide] repository for the guide's content license.


[ubuntu-mate-guide]: https://github.com/ubuntu-mate/ubuntu-mate-guide
