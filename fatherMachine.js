const pedestrianMachine = require('./pedestrianSemaphoreMachine');
const carMachine = require('./carSemaphoreMachine');
const { createMachine, send, actions: { pure }, interpret } = require('xstate');
let service;

const machine = createMachine({
    id: 'fatherMachine',
    initial: 'switch',
	invoke: [
		{id: 'carMachine', src: carMachine.machine},
		{id: 'pedestrianMachine', src: pedestrianMachine.machine}
	],
    states: {
			switch: {
				entry: ['doChange'],
				after: {
					1000: 'switch'
				}
			},
    }

},
{
	actions: {
		'doChange': changeSemaphore(),
	}
});

function changeSemaphore(){
	return pure(() => 
			send('change', {to: 'carMachine'})	
	);
};

function changePedestrianSemaphore(){
	service.state.children['pedestrianMachine'].send('change');
}

function start(){
	service = interpret(machine);
	return service.start();
}

module.exports = {start, changePedestrianSemaphore};
