# TweetsManager
## Commands
### In development
#### Install modules
`npm install`
#### Run
`docker run --rm -ti -p 8080:8080 -e "IP=<# YOUR IP ADDRESS #>" -v "$PWD":/usr/src/app node:onbuild npm install`
### In production
#### Build
`docker build -t tweets-manager .`
#### Run
`docker run --rm -ti -p 8080:8080 -e "IP=<# YOUR IP ADDRESS #>" tweets-manager`

##### Note
The `-e "IP=<# YOUR IP ADDRESS #>"` option is optional, if it's not precised, `localhost` will be used.
