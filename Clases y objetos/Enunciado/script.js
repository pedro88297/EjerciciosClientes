import { Monster } from "./monster.js";

const slime = new Monster("Slime", 10, 3);
const wolf = new Monster("Wolf", 24, 7);

console.log(slime.action());
console.log(wolf.action());

// Escribe aquí el combate y las comprobaciones del enunciado.
console.log("Estado inicial")
console.log(slime.showInfo());
console.log(wolf.showInfo());

console.log("Lobo ataca al slime")
wolf.attackMonster(slime);
console.log(slime.showInfo());

console.log("El slime ataca al lobo")
slime.attackMonster(wolf);
console.log(wolf.showInfo());

console.log("El slime recibe un golpe de 2 puntos")
slime.receiveDamage(2);
console.log(slime.showInfo());

console.log("El slime recibe un golpe de 200 puntos")
slime.receiveDamage(200);
console.log(slime.showInfo());

console.log("EL slime intenta atacar de nuevo al lobo ")
slime.attackMonster(wolf);
console.log(wolf.showInfo());
