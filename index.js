import plataforma from "./img/platform.png"
// usar o canvas-boilerplate
//https://github.com/christopher4lis/canvas-boilerplate

//npm install

console.log(plataforma)
const canvas= document.querySelector("canvas");

const c=canvas.getContext("2d");
//Captura a largura e a  altura 
canvas.width=innerWidth
canvas.height=innerHeight

const gravity=2.5;

class Player{

    //contrutor
    constructor(){

        this.position={
            x:100,
            y:100,
        }

        this.velocity={
            x:0,
            y:0
        }

        this.width=30;
        this.height=30;
    }

    //Aqui eu crio o desenho do personagem 
    draw(){
        c.fillStyle="red";
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }

    //atualizo sua posição
    update(){
        this.draw();
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y

        if(this.position.y+this.height+this.velocity.y<=canvas.height){
        this.velocity.y+=gravity
        }else{
            this.velocity.y=0;
        }
      
    }
}

//Criação das plataformas
class Platafor{
constructor({x,y}){
    this.position={
        x,
        y
    }
    this.width=200;
    this.height=20;
}

draw(){
    c.fillStyle="blue";
    c.fillRect(this.position.x,this.position.y,this.width, this.height)

}
}


//Instanciando o personagem para um objeto
const player= new Player();

//instanciando duas plataformas e dando suas posições
const plataforms= [new Platafor({x:200,y:100}), new Platafor({x:500,y:200})]


//Criando um Json com duas informações bool, se a posição direita ou esquerda estão ativas 
const keys={
    right:{
        pressed:false, 
    },
    left:{
        pressed:false, 
    },
}

//Atualizando o personagem
player.update()


let scrollOffset=0
//Animação
function animate(){

    requestAnimationFrame(animate)

    c.clearRect(0,0,canvas.width,canvas.height)

    player.update()
    plataforms.forEach(plataform =>{
        plataform.draw()
    })

    // Se o lado direito do movimento estiver ativo e a posição X for menor que 400px, por vai somar com o tamanho do meu personagem que tem 100px, ai velocidade fica em 5
    if(keys.right.pressed && player.position.x<400){
        player.velocity.x=5

    }else if(keys.left.pressed&&player.position.x>100){
        player.velocity.x=-5
    }else{
        player.velocity.x=0

        if(keys.right.pressed){


            // movendo as plataformas
            plataforms.forEach(plataform =>{
                scrollOffset+=5
                plataform.position.x-=5
            })
         
        
        }else if (keys.left.pressed){
            scrollOffset-=5
            plataforms.forEach(plataform =>{
                plataform.position.x+=5
            })
            

        }
    }

    //plataform collision
    plataforms.forEach(plataform =>{


    if(player.position.y+player.height<=plataform.position.y && player.position.y+player.height+player.velocity.y>=plataform.position.y&&player.position.x+player.width>= plataform.position.x&&player.position.x<= plataform.position.x+plataform.width){

        player.velocity.y=0

        }
    });

    if(scrollOffset>2000){
        console.log("venci")
    }

}


animate();


addEventListener('keydown',({keyCode})=>{
    console.log(keyCode)
    switch(keyCode){
        case 65:
            console.log("left");
            keys.left.pressed=true;
            break;
        case 83:
            console.log("down");
            break;
        case 68:
            keys.right.pressed=true;
            console.log("right");
            break;
        case 87:
        
            player.velocity.y=-20
            console.log("up");
            break;
    }
   
})



addEventListener('keyup',({keyCode})=>{
    console.log(keyCode)
    switch(keyCode){
        case 65:
            console.log("left");
            keys.left.pressed=false
            break;
        case 83:
            console.log("down");
            break;
        case 68:
            console.log("right");
            keys.right.pressed=false;
            break;
        case 87:
            player.velocity.y=-20
            console.log("up");
            break;
    }

})
