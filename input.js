var input= {
    population: 0,
    virus: 0,
    infectionRate: 0,
    deathRate: 0,
    peoplePrecaution: 0, 
    people: {
        infected:[],
        dead: []
    },
    instances: 0,
}

window.onload=function() {
var pops = document.getElementById("population")
var popv = document.getElementById("popu")
popv.innerHTML = pops.value
input.population =pops.value

var infds = document.getElementById("infected")
var infdv = document.getElementById("infd")
infdv.innerHTML = infds.value
this.input.virus = infds.value

var infrs = document.getElementById("infectionRate")
var infrv = document.getElementById("infr")
infrv.innerHTML = infrs.value
input.infectionRate = infrs.value

var ders = document.getElementById("deathRate")
var derv = document.getElementById("der")
derv.innerHTML = ders.value
input.deathRate = ders.value

var pres = document.getElementById("pPrecaution")
var prev = document.getElementById("pre")
prev.innerHTML = pres.value
input.peoplePrecaution = pres.value

pops.oninput = function() {
    popv.innerHTML = this.value;
    input.population = this.value;
  }

  infds.oninput = function() {
    infdv.innerHTML = this.value;
    input.virus=this.value;
  }

  infrs.oninput = function() {
    infrv.innerHTML = this.value;
    input.infectionRate = this.value;
  }

  ders.oninput = function() {
    derv.innerHTML = this.value;
    input.deathRate = this.value;
  }

  pres.oninput = function() {
    prev.innerHTML = this.value;
    input.peoplePrecaution = this.value;
  }
}