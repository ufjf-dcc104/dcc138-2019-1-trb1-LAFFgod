function Inimigo(exemplo){
    var {
        x=0,
        y=0,
        vx=0,
        vy=0,
        h=20,
        w=20,
        a=0,
        va= 0,
        vm= 0,
        color= "purple",
        comportar= undefined,
        scene= undefined,      
    }=exemplo;
    this.x=x;
    this.y=y;
    this.h=h;
    this.w=w;
    this.a=a;
    this.va=va;
    this.vm=vm;
    this.scene=scene;
    this.comportar=comportar;
    this.vx=vx;
    this.vy=vy;
    this.color=color;
}
Sprite.prototype = new Sprite ({});
Sprite.constructor = Sprite;

Sprite.prototype.desenhar = function(ctx){
    ctx.fillStyle=this.color;
    ctx.fillStroke= "Black";
    ctx.fillRect(this.x,this.y,this.w,this.w);
}
Sprite.prototype.mover=function(dt){
    this.x=this.x+this.vx*dt;
    this.y=this.y+this.vy*dt;
}

Sprite.prototype.colidiuCom=function(alvo){
    if(alvo.x+alvo.w<this.x)
        return false;
    if(alvo.x>this.x+this.w)
        return false;
    if(alvo.y+alvo.w<this.y)
        return false;
    if(alvo.y>this.y+this.w)
        return false;   
    return true;

}

Sprite.prototype.perseguir = function(alvo){
    this.vx = 20*Math.sign(alvo.x- this.x);
    this.vy = 20*Math.sign(alvo.y- this.y);
}