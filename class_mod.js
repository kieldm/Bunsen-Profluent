class Mod {
  constructor(xOrg, yOrg, quad, sOrg){
    this.xOrg = xOrg;
    this.yOrg = yOrg;
    this.quad = quad;
    this.sOrg = sOrg;

    this.x = this.xOrg;
    this.y = this.yOrg;
    this.xTar, this.yTar;
    this.s;
    this.sTar;
    this.c;
    this.cOrg, this.cTar;

    this.splitting = true;

    this.ticker = 0;
    this.animA = 20;

    this.parent = false;
    this.kids = [];
    this.build();
  }

  build(){
    this.splitting = true;
    this.sTar = this.sOrg/2;

    if(this.quad == 0){
      this.xTar = this.xOrg - this.sTar/2;
      this.yTar = this.yOrg - this.sTar/2
    } else if(this.quad == 1){
      this.xTar = this.xOrg + this.sTar/2;
      this.yTar = this.yOrg - this.sTar/2;
    } else if(this.quad == 2){
      this.xTar = this.xOrg + this.sTar/2;
      this.yTar = this.yOrg + this.sTar/2;
    } else if(this.quad == 3){
      this.xTar = this.xOrg - this.sTar/2;
      this.yTar = this.yOrg + this.sTar/2;
    }

    this.cOrg = color(refImage.get(this.xOrg, this.yOrg));
    this.cTar = color(refImage.get(this.xTar, this.yTar));

  }

  makeKids(){
    this.parent = true;
    for(var m = 0; m < 4; m++){
      this.kids[m] = new Mod(this.xTar, this.yTar, m, this.sTar);
    }
  }

  makeFamTree(){
    if(random(10) < 5 && this.sTar > modRadEnd * 2){
      this.makeKids();

      for(var m = 0; m < 4; m++){
        this.kids[m].makeFamTree();
      }
    }


    
  }

  run(){
    if(this.parent){
      for(var m = 0; m < 4; m++){
        this.kids[m].run();
      }
    } else {
      this.update();
      this.display();
    }

  }

  update(){
    if(this.splitting){
      
      if(this.ticker < 0){
        this.x = this.xOrg;
        this.y = this.yOrg;
        this.s = this.sOrg;
        this.c = this.cOrg;

      } else if(this.ticker < this.animA){
        var tk0 = map(this.ticker, 0, this.animA - 1, 0, 1);
        // var tk1 = easeOutBack(tk0);
        var tk1 = easeOutExpo(tk0);

        this.x = map(tk1, 0, 1, this.xOrg, this.xTar);
        this.y = map(tk1, 0, 1, this.yOrg, this.yTar);
        this.s = map(tk1, 0, 1, this.sOrg, this.sTar);
        this.c = lerpColor(this.cOrg, this.cTar, tk1);

      } else {
        this.x = this.xTar;
        this.y = this.yTar;
        this.s = this.sTar;
        this.c = this.cTar;

      }

      this.ticker ++;
    }

    if(this.ticker > this.animA){
      this.splitting = false;
    }


  }

  display(){
    push();
      translate(this.x, this.y);

      noStroke();
      fill(this.c);

      ellipse(0, 0, this.s);

      // fill(foreColor);
      // text("x: " + round(this.x), 0, 0);
      // text("y: " + round(this.y), 0, 15);
    pop();
  }

  mouseSplit(){
    if(this.parent){
      for(var m = 0; m < 4; m++){
        this.kids[m].mouseSplit();
      }
    } else {
      if(
        dist(mouseX, mouseY, this.x, this.y) < this.s * 2
        && this.splitting == false
        && this.s > modRadEnd
      ){
        this.makeKids();
      }
    }
  }
}