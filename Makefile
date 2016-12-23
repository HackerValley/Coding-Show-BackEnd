PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
dist := dist
branch := develop
now := $(shell date '+%Y%m%d%H%M%S')

#.RECIPEPREFIX +=

all: tag pull build run

tag:
	git tag bak_$(now)

install:
	cnpm install

pull:
	git pull origin $(develop)

build:
	babel server -d $(dist)

test:
	mocha --recursive $(dist)/test/mocha

run:
	pm2 startOrReload process.json --env production

clean:
	rm -rf $(dist)

.PHONY: install pull build test run clean
