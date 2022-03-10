How to build:
* install sass
* `sass _assc.scss assc.css`
* `open index.html`

How to set up a new laptop:
* Log into digital ocean to open droplet
* Create an SSH key on laptop and add the public key to `~/.ssh/authorized_keys`
* Add an entry on laptop to `~/.ssh/config`
* Add a git remote for the site (`git remote add`)

How to deploy:
* push to website:master
* see it on https://antisarahshader.club

This is done through a git post-receive hook.
