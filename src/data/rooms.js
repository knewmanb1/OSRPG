const rooms = {
    //Town Square
    '0,0,0': { name: 'Town Square', exits:['North', 'South', 'East', 'West', 'Down'], monsters:[], description: 'The hub of bustling Winterholm.  Crown street stretches out before you to the north and the south while Dock street extends to the west and Forest street to the east.  You notice a sewer cap here that has recently been pried open.' },
    //Crown Street
    '0,1,0': { name: 'South Crown St.', exits:['North','West'], monsters:[], description: 'Large homes flank the street on both sides.' },
    '0,-1,0': { name: 'North Crown St.', exits:['North', 'South', 'East', 'West', 'Down'], monsters:[], description: 'Shops line the bustling Crown St.  The bank of Winterholm is to the west.' },
    '0,-2,0': { name: 'North Crown St.', exits:['North', 'South', 'East', 'West', 'Down'], monsters:[], description: 'Shops line the bustling Crown St.' },
    '0,-3,0': { name: 'North Crown St.', exits:['North', 'South', 'East', 'West', 'Down'], monsters:[], description: 'Shops line the bustling Crown St.' },
    '0,-4,0': { name: 'North Crown St.', exits:['North', 'South', 'East', 'West', 'Down'], monsters:[], description: 'Shops line the bustling Crown St.' },
    '0,-5,0': { name: 'North Crown St.', exits:['North', 'South', 'East', 'West', 'Down'], monsters:[], description: 'Shops line the bustling Crown St.' },
    '0,-6,0': { name: 'North Crown St.', exits:['North', 'South', 'East', 'West', 'Down'], monsters:[], description: 'Shops line the bustling Crown St.' },
    //Winterholm Shops
    '-1,-1,0':{name: 'Bank of Winterholm Lobby', exits: ['Closed West', 'East'], monsters:[], description: ''},
    
    '1,0,0': { name: 'Room 3', exits:['West'], monsters:[], description: 'A mysterious room, echoing with whispers.' },
    '-1,0,0': { name: 'Room 3', exits:['East'], monsters:[], description: 'A mysterious room, echoing with whispers.' },
    '-1,1,0': { name: 'Holy Vestments', exits:['East','Down'], monsters:[], description: 'Religious items surround you in this shop.  There is a staircase in the back of the room leading down.'},
    '-1,1,-1': { name: 'Halls of the Dead', exits:['Up'], monsters:[], description: 'A somber room surrounds you. You do not recall how you got here'},
    //Winterholm Sewers
    '0,0,-1': { name: 'Sewers Enterance', exits:['North', 'South', 'East', 'West', 'Up'], area: 'sewers', spawnChance: 1, spawnMin: 0, spawnMax: 3, monsters:[], description: 'A putrid smell enters your nostrils' },
    //Trainers
    '1,-1,0':{name: 'Training Hall', exits: ['West'],monsters:[], hasTrainer: true, description: 'A vast hall bustling with sounds of training.  Masters and students can be found throughout the room training in various disciplines.'},
  };
  
  export default rooms;