export class Monster {

  constructor(name, attack, defense) {

    this.name = name;
    this.pv = 100;
    this.attack = attack;
    this.defense = defense;

  }

  action() {
    return `${this.name} quiere atacarte.`;
  }

  receiveDamage(amount) {
    let daño = amount - this.defense;

    if (daño < 0) {
      daño = 0;
    }

    this.pv = this.pv - daño;

    if (this.pv < 0) {
      this.pv = 0;
    }
  }

  attackMonster(target) {
    if (this.pv === 0) {
      return;
    }

    target.receiveDamage(this.attack);
  }

  showInfo() {
    return `${this.name} — Vida: ${this.pv}, Ataque: ${this.attack}, Defensa: ${this.defense}`;
  }

}
