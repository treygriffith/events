SRC = $(wildcard lib/*.js)

build: components $(SRC)
        @component build --dev

dist: components
        @component build --standalone events --name events --out dist
        @uglifyjs dist/events.js -o dist/events.min.js_
        @cp dist/events.min.js_ dist/events.min.js
        @gzip dist/events.min.js
        @mv dist/events.min.js_ dist/events.min.js

components: component.json
        @component install --dev

clean:
        rm -fr build components template.js dist

test: build
        open test/index.html

.PHONY: clean events test