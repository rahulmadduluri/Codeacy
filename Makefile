start:
	PORT=80 \
	MONGOHQ_URL='mongodb://codeacy.com:27017/code-game-db' \
	node app

.PHONY: test db start