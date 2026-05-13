const player={
    name:"Alex",
    hp:100,
    atk:80,
    def:50
}

const enemy={
    name:"Sam",
    hp:100,
    atk:70,
    def:60
}

const move={
    name:"Ember",
    pow:60,
    type:"fire"
}

function calcDamage(atk,pow,def){
    const randomNumber = Math.random() *0.15 +0.85
    return Math.floor((atk*pow/def)*randomNumber)
    
}
while(enemy.hp !=0 || player.hp !=0){
const player_damage =calcDamage(player.atk,move.pow, enemy.def)
const enemy_damage = calcDamage(enemy.atk, move.pow, player.def)
enemy.hp=Math.max(0, enemy.hp- player_damage)
player.hp=Math.max(0, player.hp- enemy_damage)

console.log(player.name + " used " + move.name + "!")
console.log(player.name + " dealt " + player_damage + " damage!")
console.log(enemy.name + " HP: " + enemy.hp + " / 100")

console.log(enemy.name + " used " +move.name + "!")
console.log(enemy.name + " dealt " + enemy_damage + " damage!")
console.log(player.name + " HP: " + enemy.hp + " / 100")

if (player.hp !=0 || enemy.hp !=0){
    console.log("Battle continues...")
}
    
if (enemy.hp <= 0) {
  console.log(enemy.name + " fainted! You win!")
    break;
}
if (player.hp <= 0) {
  console.log(player.name + " fainted! Enemy win!")
    break;
} 
}