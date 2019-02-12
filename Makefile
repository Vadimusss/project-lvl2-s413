install:
	npm install
start:
	npx babel-node -- src/bin/gendiff.js
publish:
	npx publish
lint:
	npx eslint
test:
    npm run test