import os
import requests
import urllib.parse
import mimetypes
import argparse


FILE_EXTENSIONS = (".css", ".html", ".svg", ".jpg")
CONVEX_SITE_URL = "https://lovely-pelican-692.convex.site"


def main(args):
    files_to_serve = []
    for root, dirnames, filenames in os.walk("."):
        for filename in filenames:
            if filename.endswith(FILE_EXTENSIONS):
                files_to_serve.append(os.path.relpath(
                    os.path.join(root, filename), "."))
    for file_to_serve in files_to_serve:
        print(f"Uploading {file_to_serve}")
        mimetype = mimetypes.guess_type(file_to_serve)[0]
        upload_url = "{}/uploadFile?name={}".format(
            CONVEX_SITE_URL, urllib.parse.quote(file_to_serve))
        response = requests.post(upload_url, data=open(file_to_serve, 'rb'),
                                 headers={'content-type': mimetype, "X-Assc-Upload-Secret": args.upload_secret })
        print(response.text)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("upload_secret")
    main(parser.parse_args())

# cd ..
# GIT_DIR=.git/ git checkout -f master
# cp ~/assc/*.* /var/www
