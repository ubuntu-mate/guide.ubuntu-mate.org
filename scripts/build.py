#!/usr/bin/python3
#
# Converts the docbook and adds additional HTML to make the guide more presentable.
#
# Requires 'pandoc' to be installed.
#
# Parameters:
#   build.py {path to ubuntu-mate-guide repository}
#

import os
import sys
import shutil

# Check dependencies are installed
if not shutil.which("pandoc"):
    print("Please install 'pandoc' and try again.")
    exit(1)

# Validate guide directory
try:
    guide_path = os.path.realpath(sys.argv[1])
    docbook_path = os.path.join(guide_path, "index.docbook")
except IndexError:
    print("Please pass the path to ubuntu-mate-guide as the first parameter.")
    exit(1)

if not os.path.exists(docbook_path):
    print("Could not find the docbook. Is this the correct directory?")
    print(guide_path)
    exit(1)

# Prepare build directory
output_path = os.path.join(os.path.dirname(__file__), "..", "build")
if os.path.exists(output_path):
    shutil.rmtree(output_path)
os.mkdir(output_path)
os.chdir(output_path)

print("Generating...")

# Make a few patches before performing the conversion.
shutil.copy(docbook_path, "original.docbook")

# -- Figure images need their outer table removing, otherwise pandoc loses them.
#    A little hacky, but the docbook is consistent.
#       <informaltable frame="all">             <-- For this, skip next 5 lines.
#           <tgroup cols="1">
#             <colspec colwidth="100%" />
#             <tbody>
#               <row>
#                 <entry>
#                   <mediaobject>
#                     <imageobject>
#                       <imagedata fileref="figures/example.png" contentwidth="100%" />
#                     </imageobject>
#                     <textobject>Example</textobject>
#                   </mediaobject>              <-- Then skip next 5 lines again.
#                 </entry>
#               </row>
#             </tbody>
#           </tgroup>
#         </informaltable>

with open("original.docbook", "r") as f:
    docbook = f.readlines()

new_docbook = []
skip_lines = 0
found_table = False

for line in docbook:
    if skip_lines > 0:
        skip_lines = skip_lines - 1
        continue

    if line.strip().find('<informaltable frame="all">') != -1:
        skip_lines = 5
        found_table = True
        continue

    if line.strip().find('</mediaobject>') != -1 and found_table:
        skip_lines = 5
        found_table = False

    new_docbook.append(line)

with open("processed.docbook", "w") as f:
    f.writelines(new_docbook)

# Perform the conversion!
result = os.system("pandoc -f docbook -t html -s processed.docbook -o index.html")
if result != 0:
    print("Got non-zero exit code: {0}".format(int(result / 256)))
    exit(1)

os.remove("original.docbook")
os.remove("processed.docbook")

# Copy assets
print("Copying assets...")
shutil.copytree(os.path.join(guide_path, "apps"), "apps/")
shutil.copytree(os.path.join(guide_path, "figures"), "figures/")

# Clean up
# Load pieces and append them to index.html
print("Appending HTML...")

with open("../src/head.html", "r") as f:
    head = f.readlines()

with open("../src/guide.css", "r") as f:
    css = f.readlines()

with open("../src/body-start.html", "r") as f:
    body_start = f.readlines()

with open("../src/body-end.html", "r") as f:
    body_end = f.readlines()

with open("index.html", "r") as f:
    index = f.readlines()

new_index = []

for line in index:
    # Make HTML5 compliant
    if line.strip().startswith("<html"):
        line = "<html>"

    # Before closing the head
    if line.strip().startswith("</head>"):
        new_index.append("<style>{0}</style>".format(" ".join(css)))
        new_index.append(" ".join(head))

    # Before closing the body - add JS
    if line.strip().startswith("</body>"):
        new_index.append(" ".join(body_end))

    new_index.append(line)

    # After opening the body - add content
    if line.strip().startswith("<body>"):
        new_index.append(" ".join(body_start))

with open("index.html", "w") as f:
    f.writelines(new_index)

# Optimisation
# print("Optimising...")

print("Generation complete.")
