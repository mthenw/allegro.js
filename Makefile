TESTS_FILES = $(shell find test -name "*.js")

lint:
	@./node_modules/.bin/jshint .

test:
	@./node_modules/.bin/mocha --reporter spec $(TESTS_FILES)

.PHONY: lint test
