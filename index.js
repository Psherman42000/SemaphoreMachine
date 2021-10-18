const { interpret } = require('xstate');
const fatherMachine = require('./fatherMachine');

const idCarMachine = 'carMachine';
const idPedestrianMachine = 'pedestrianMachine';

const semaphoreService = fatherMachine.start();

semaphoreService.state.children[idCarMachine].onTransition(state => {
    console.clear();
    console.log('SEMAFORO CARROS: '+state.value);
    console.log('SEMAFORO PEDESTRES: '+semaphoreService.state.children[idPedestrianMachine].state.value);
    
    if(JSON.stringify(state.value).includes('yellow') || JSON.stringify(state.value).includes('red')){
        fatherMachine.changePedestrianSemaphore();
    }
});
