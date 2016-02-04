# TweetsManager
## Commands
### In development
#### Install modules
`npm install`
#### Run
`docker run --rm -ti -p 8080:8080 -e "IP=<# YOUR IP ADDRESS #>" -v "$PWD":/usr/src/app node:onbuild`
### In production
#### Build
`docker build -t TweetsManager .`
#### Run
`docker run --rm -ti -p 8080:8080 -e "IP=<# YOUR IP ADDRESS #>" TweetsManager`
