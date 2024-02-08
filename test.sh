npx tsc &&
	touch messager.sqlite &&
	sqlite3 messager.sqlite <createMessager.sql &&
	npm test
rm messager.sqlite
