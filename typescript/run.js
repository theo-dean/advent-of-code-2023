const enquirer = require('enquirer')

enquirer.prompt([
    {
        type: 'input',
        name: 'day',
        message: 'Which day?',
        validate(value) {
            const parsed = parseInt(value)
            return parsed !== "NaN" && parsed > 0 && parsed <= 25
        }
    },
    {
        type: 'input',
        name: 'part',
        message: 'Which part?',
        validate(value) {
            const parsed = parseInt(value)
            return parsed >= 1 && parsed <= 2;
        }
    }
]).then(dayAndPart => {
    import('execa').then(({execa}) => {
        execa("ts-node", [`./day${dayAndPart.day}/part${dayAndPart.part}.ts`, `day${dayAndPart.day}/input`])
            .then(({stdout}) => {
                console.log(stdout);
            });
    })
});
