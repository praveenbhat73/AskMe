import bot from "./assets/bot.svg"
import user from "./assets/user.svg"


const form = document.querySelector("form");
const chatContainer= document.querySelector("#chat_container")

let loadi;

function loader(element){
    element.textCont="";
    loadi=setInterval(()=>{
        element.textCont+=".";
        if(element.textCont==="...."){
            element.textCont="";
        }
    },300)
}