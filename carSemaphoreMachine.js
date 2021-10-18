const { createMachine } = require('xstate');

const machine = createMachine({
    id: 'carSemaphoreMachine',
    initial: 'green',
    states: {
        green: {
            on:{
                change: 'yellow'
            }
        },
        yellow: {
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