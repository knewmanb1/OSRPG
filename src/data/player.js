const player = {
    name: 'Hero',
    con: 10,    //Adds heavily to hps and weakly to physical damage
    str: 10,    //Adds weakly to hps and heavily to physical damage
    dex: 10,    //Adds heavily to speed and weekly to physical damage
    int: 10,    //Adds heavily to mp and weekly to spell damage.  Adds to crit chance
    wis: 10,    //Adds weakly to mp and heavily to spell damage.  Adds to crit damage
    per: 10,    //Increases relationship with shops.  Adds to crit chance and damage
    hp: 100,
    hpMax: 100,    //Base stat.  Calculated health below
    mp: 100,
    mpMax: 100,
    speed: 2,
    helm:'',
    necklace:'',
    earring1:'',
    earring2:'',
    chest:'',
    waist:'',
    legs:'',
    feet:'',
    arms:'',
    hands:'',
    finger1:'',
    finger2:''
}

player.hp = player.hp + (player.con-10)*10 + (player.str - 10)*4
player.mp = player.mp + (player.int-10)*10 + (player.wis - 10)*4
//This doesn't change the values.  Figure out how to set these.  Maybe on levelup and after character creation.  These formulas need work as well


export default player;