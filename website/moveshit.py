import os

for root, dirs, files in os.walk("upload"):
    for filename in files:
        print(filename)
~
