class Particles {
  constructor(x, y, unit, size) {
    this.pos = createVector(x, y);
    this.unit = unit;
    this.r = unit * size ;
    
    this.swingR = random();
    this.swing = 0;
    this.swingSize = 0.01 * unit * random(1,2);

    this.v = createVector(0, 0);
    this.a = createVector(0, 0);
    this.w = 0;
    this.bounce = false;

    this.mk = createGraphics(600,600);
    
    this.del = false;
    //console.log(floor(this.distant/3));
  }

  rotation() {
    this.swing = this.swingSize * sin(this.swingR + millis() * 0.001);
  }

  gravity(bounce) {
    let g = createVector(0, -0.1);
    this.a.add(g);

    if (bounce) {
      this.bounce = bounce;
    }
  }

  resistant() {
    let r = this.v.copy();

    r.mult(
      -0.001 * (1 + 0.1 * (noise(this.pos.x, this.pos.y)))
    );
    this.a.add(r);
  }

  update() {
    this.v.add(this.a);

    if ( this.pos.y < 0 && this.v.y < 0) {
      if (this.bounce) {
        this.v.y *= -0.5;
      
        // if ( abs(this.v.y) <0.5) {
        //   this.v.y = 0;
        // }
        this.pos.y = h - this.r / 2;
      } else {
        this.del = true;
      }
    }

    if (this.v.mag() > 5) {
      this.v.setMag(5);
    }
    this.pos.add(this.v);

    this.a = createVector(0, 0);
  }

  render(img) {
    push();
    translate(this.pos.x + this.swing, this.pos.y);
    //ellipse(0, 0, this.r * this.row, this.r);
    //this.mk.fill(150,150);
    //this.mk.rect(0,0,this.mk.width,this.mk.height);
    //img.mask(100)
    image(img, -this.r, -this.r, 2*this.r, 2*this.r * img.height / img.width);
    
    pop();
  }
}
