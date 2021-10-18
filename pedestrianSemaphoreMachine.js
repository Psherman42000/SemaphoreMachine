const { createMachine } = require('xstate');

const machine = createMachine({
    id: 'pedestrianSemaphoreMachine',
    initial: 'red',
    states: {
        green: {
            on:{
                change: 'red'
            }
        },
        red: {
            on:{
                change: 'green'
            }
        }
    }
});

module.exports = {machine};