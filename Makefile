PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
dist := dist
branch := develop

#.RECIPEPREFIX +=

all: pull build run

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
