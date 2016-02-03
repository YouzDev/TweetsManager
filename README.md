# TweetsManager
## Commands
### Build
`docker build -t TweetsManager .`
### Run locally
`docker run --rm -ti -p 8080:8080 -e "IP=<# YOUR IP ADDRESS #>" -v "$PWD":/usr/src/app node:onbuild`
### Run on production
`docker run --rm -ti -p 8080:8080 -e "IP=<# YOUR IP ADDRESS #>" TweetsManager`
