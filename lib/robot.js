'use strict';
var directions = ['north', 'east', 'south', 'west']
// class Robot{
//   constructor(bearing, coordinatesArr){
//     this.bearing = bearing
//     this.coordinates = coordinatesArr
//   }
// }
function Robot() {
  this.bearing = undefined;
  this.coordinates = []
}
Robot.prototype.turnRight = function(){
  if(directions.slice(0, 3).includes(this.bearing)){
    this.bearing = directions[directions.indexOf(this.bearing) + 1]
  }
  else{
    this.bearing = 'north'
  }
}
Robot.prototype.orient = function(direction){
  if(directions.includes(direction)){
    this.bearing = direction
  }
  else{
    throw new Error("Invalid Robot Bearing")
  }
}

Robot.prototype.turnLeft = function(){
  if(directions.slice(1).includes(this.bearing)){
    this.bearing = directions[directions.indexOf(this.bearing) - 1]
  }
  else {
    this.bearing = "west"
  }
}

Robot.prototype.at = function(num1, num2){ this.coordinates = [num1, num2] }

Robot.prototype.advance = function(){
  switch (this.bearing) {
    case 'north':
      this.coordinates[1] += 1;
      break;
    case 'south':
      this.coordinates[1] -= 1;
      break;
    case 'east':
      this.coordinates[0] += 1;
      break;
    case 'west':
      this.coordinates[0] -= 1;
      break;
    default:
      return "The robot is facing an invalid direction."
  }
};
Robot.prototype.place = function(obj){
  this.coordinates = [obj.x, obj.y];
  this.bearing = obj.direction;
}
Robot.prototype.instructions = function(str){
  let instructArr = [...str]
  let returnArr = []
  while(instructArr.length > 0){
    let currentInstruct = instructArr.shift()
    switch(currentInstruct) {
      case "R":
        returnArr.push("turnRight");
        break;
      case "L":
        returnArr.push("turnLeft");
        break;
      case "A":
        returnArr.push("advance");
        break;
      default:
    }
  }
  return returnArr;
}
Robot.prototype.evaluate = function(str){
  let instructArr = this.instructions(str)
  while(instructArr.length > 0){
    let instruct = instructArr.shift();
    this[instruct]();
  }
}
