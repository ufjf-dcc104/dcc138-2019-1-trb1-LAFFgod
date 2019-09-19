function Sprite(params = {}){
    var exemplo = {
        x:0,
        y:0,
        vx:0,
        vy:0,
        h:20,
        w:20,
        a:0,
        va: 0 ,
        vm: 20,
        color: "blue",
        imune: 0,
        atirando: 0,
        comportar: undefined,
        scene: undefined,
        cooldown: 0,
    }
    Object.assign(this, exemplo, params);
}
/*function Inimigo(params = {}){
    var inimigo = {
        x:0,
        y:0,
        vx:0,
        vy:0,
        h:20,
        w:20,
        a:0,
        va: 0,
        vm: 0,
        color: "purple",
        comportar: undefined,
        scene: undefined,      
    }
    Object.assign(this, inimigo, params);
}*/
    

Sprite.prototype = new Sprite();
Sprite.prototype.constructor = Sprite;

Sprite.prototype.desenhar=function(ctx){
    //ctx.fillRect(-this.w/2,-this.h/2, this.w, this.h);
    ctx.save();
    ctx.translate(this.x, this.y);
    //ctx.strokeRect(-this.w/2,-this.h/2, this.w, this.h);
    ctx.rotate(this.a);
    ctx.fillStyle = this.color;
    ctx.fillStroke= "black";
    ctx.lineWidth= 1;
    ctx.beginPath();
    ctx.moveTo(-this.w/2, -this.h/2);
    ctx.lineTo(-this.w/2, +this.h/2);
    ctx.lineTo(+this.w/2, 0);
    ctx.closePath();    
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

Sprite.prototype.mover = function (dt) {
    this.a = this.a + this.va*dt;
    this.vx = this.vm*Math.cos(this.a);
    this.vy = this.vm*Math.sin(this.a);
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
    this.cooldown = this.cooldown-dt;
    if(this.imune > 0) {
        this.imune = this.imune - 1*dt;
    }

}

    //this.vx=this.vm*Math.cos(this.a);
    //this.vy=this.vm*Math.sin(this.a);


    //this.y = this.y + this.vy*dt;
    //this.a = this.a + this.va*dt;

    //this.cooldown = this.cooldown - dt;
//}
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
    
           		
        var af = calculoAngulo(this,alvo);	
        
        if(this.x <= alvo.x && this.y <= alvo.y)
            this.a = af*-1;
        else {
            if(this.x < alvo.x && this.y > alvo.y)
                this.a = af;
        else {
            if(this.x > alvo.x && this.y < alvo.y)
                this.a = (af+Math.PI);
        else{
            this.a = (af+Math.PI)*-1;
        }
        }
        
        this.vx = this.vm*Math.cos(this.a);
         this.vy = this.vm*Math.sin(this.a);
 }
}
function calculoAngulo(p, alvo){
    var x1 = p.x - alvo.x;
       var y1 = p.y - alvo.y;
       var oX = p.x - alvo.x;
       var oY = 0;
       var normaX = Math.sqrt(Math.pow(x1,2) + Math.pow(y1,2));
       var normaA = Math.sqrt(Math.pow(oX,2) + Math.pow(oY,2));
       var prodEscalar = (x1*oX)+(y1*oY);

       return Math.acos((prodEscalar)/(normaA*normaX))*-1;

}