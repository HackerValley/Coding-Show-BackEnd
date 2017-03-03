PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
dist := dist
branch := develop
now := $(shell date '+%Y%m%d%H%M%S')
user := $(shell whoami)

#.RECIPEPREFIX +=

all: tag pull build run

check:
	@if [ "$(user)" = "root" ]; then echo -e "\033[31myou are using root!\033[0m" && exit 1; else echo "using $(user)"; fi

tag:check
	git tag bak_$(now)

install:check
	cnpm install

pull:check
	git pull origin $(branch)

build:check
	babel server -d $(dist);cp -R server/views dist/views;cp -R server/public dist/public

test:check
	mocha --recursive $(dist)/test/mocha

run:check
	pm2 startOrReload process.json --env production

clean:
	rm -rf $(dist)

.PHONY: check install pull build test run clean
