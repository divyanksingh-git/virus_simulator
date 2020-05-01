function simulate() { 
  input.people.infected =[]
  input.people.dead =[] 
    var config = {
      width: 500,
      height: 400,
      parent:"phaserContainer",
      backgroundColor: 0x080E33,
      pixelArt: true,
      domCreateContainer: true,
      scene:{
        preload:preload,
        create:create,
        update: update
      },
      physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
      },
      //update: update
    }
  if (input.instances ==0){
    input.instances++
    } else if(input.instances==1){
    game.destroy()
    Plotly.deleteTraces('myChart', 0);
    document.getElementById("phaserContainer").parentNode.removeChild(document.getElementById("phaserContainer"))
    document.getElementById("Vcontainer").insertAdjacentHTML("afterbegin",'<div id = "phaserContainer"></div>')
  }
  game = new Phaser.Game(config);
  console.log(game)
  var healthy,infected,deceased
  var bool = true;
  setInterval(function(){ bool = !bool }, 400);
  function preload() {
    this.load.image("healthy","sprite/hPerson.png")
    this.load.image("infected","sprite/iPerson.png")
    this.load.image("dead","sprite/dPerson.png")
    this.load.image("ground_v","sprite/ground_v.png")
    this.load.image("ground_h","sprite/ground_h.png")
  }
 function create() {
    elements = this.physics.add.group();
    healthy = this.physics.add.group();
    infected = this.physics.add.group();
    deceased = this.physics.add.group();
    for( i =0;i<input.population;i++ ) {
      hPerson=this.add.sprite(randomInt(config.width),randomInt(config.height),"healthy");
      healthy.add(hPerson)
      elements.add(hPerson)
      properties(hPerson)
    }
    for(i = 0;i<input.virus;i++){
      iPerson=this.add.sprite(randomInt(config.width),randomInt(config.height),"infected");
      infected.add(iPerson)
      elements.add(iPerson)
      properties(iPerson)
      
    }
    
    platform = this.physics.add.staticGroup();
    platform.create(0, 400, 'ground_h').setScale(2).refreshBody();
    platform.create(500, 0, 'ground_v').setScale(2).refreshBody();
    platform.create(0, 0, 'ground_v').setScale(2).refreshBody();
    platform.create(0,0, 'ground_h').setScale(2).refreshBody();
    
    this.physics.add.overlap(infected,healthy,infection,null,this)
    this.physics.add.collider(elements,platform,death,null,this)
  }

  function update(){
    let trace1 = {
    y: [0].concat(input.people.infected),
    x: () => {
        let i = 0;
        let arr =[]
        for(i = 0;i<=input.people.infected.length;i++) {
            arr[i] = i;
        }
        return arr;
    },
    name:"Infection Rate",
    mode: 'line',
  marker: {
      line: {
      color: 'rgb(114, 6, 6)',
    }
  }
  };

  let trace2 = {
    y: [0].concat(input.people.dead),
    x: () => {
        let i = 0;
        let arr =[]
        for(i = 0;i<=input.people.dead.length;i++) {
            arr[i] = i;
        }
        return arr;
    },
    name:"Death Rate",
    mode: 'line',
  marker: {
    line: {
      color: 'rgb(58, 58, 58)',
    }
  }
  };

  let data = [trace1,trace2];

  Plotly.newPlot('myChart', data);
  }

  function randomInt(num){
    return Math.round(Math.random()*num)+1;
  }
  
  function coordinate(){
      if(Math.random()>0.5){
        const coordinate =50+Math.random()*25;
        return coordinate;
      }
      else{
        const coordinate =-50-Math.random()*25;
        return coordinate;
      }
    }

    function properties(obj){
      obj.body.setCollideWorldBounds(true)
      obj.body.setBounce(1)
      obj.body.setVelocity(coordinate(),coordinate())
  }


  function infection (iPerson,hPerson){
    if (rInfde()<(input.infectionRate - input.peoplePrecaution*3)){
      healthy.remove(hPerson)
      infected.add(hPerson)
      elements.add(hPerson)
      properties(hPerson)
      hPerson.setTexture("infected")
      if(bool == false){
        input.people.infected.push(infected.children.size )
      }
    }
  }

  function death(element){
      if(rInfde()<input.deathRate) {
        if(element.texture.key == "infected")
      {
        element.setTexture("dead")
        infected.remove(element)
        deceased.add(element)
        properties(element)
        if(bool == false){
          input.people.dead.push(deceased.children.size)
        }
    }
  }
  }

  function rInfde(){
    let x ,y ;
    x=Math.random()*100
    y=Math.random()*100
    let c = (x / y)*100
    return c+1
  }
}
simulate();

