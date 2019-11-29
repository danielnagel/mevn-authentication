import app from './app';

/*
    "husky": {
        "hooks": {
            "pre-commit": "tsc --noEmit && lint-staged"
        }
    },
    "lint-staged": {
        "*.{js,ts,tsx}": [
            "eslint . --fix",
            "git add"
        ]
    },
    */
app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`);
});
