//variaveis de controle
var controle = 25;
var controleTop = 25;
var controleRight = 25;
var controleRleft = 75;
var lastscroll = 0;
var Lx = 0.5;
var Tx = 0.5;
var Rx = 0.5;
var playerid = 1;
var rotate = new Array(50);
var tamanho = new Array(50);
var proxValue = 0;

//Tutorial BigMeow
var TutorialBM = "-----Tutorial----- \n \n -----rolagens---- \n \n O sistema por enquanto tem 3 tipos de rolagem de dados: \n \n VANTAGEM: pega o maior valor \n \n DESVANTAGEM: pega o menor valor \n \n DANO: soma todos os valores \n \n -----PROMPT----- \n \n Temos 3 tipos de commandos (DANO, ROLAGEN, SOMA) \n \n DANO: 1d20, 4d12, 510 (não importa os valores se tiver um D no meio) \n \n ROLAGEM: dano, vantagem(vant), desvantagem(desv) \n \n SOMA: +5 +6 +7 \n \n PS: A ORDEM DOS VALORES NÃO ALTERA O RESULTADO, fique tranquilo para escrever {2d30 4d100 +5 +6 dano 2d13 +7} \n \n PS2: Cada commando tem que estar separado por ESPAÇO para serem reconhecidos \n \n PS3: O commando ROLAGENS é OBRIGATORIO!!! \n \n Obrigado, se divirta!!!"

//animações
    //div lateral esquerda(animação para retrair e abrir)
        $("#leftdiv").mouseleave(() => {
            if(document.getElementById("mudar_mapa").style.display == "flex" || document.getElementById("excluir_player").style.display == "flex"){
                return;
            }
            
            function Anim()
            {
                if(controle < 3)
                {
                    controle = 4;
                    return;
                }
                if(controle > 25)
                {
                    controle = 25;
                    return;
                }
                if(controle < 25)
                {
                    document.getElementById("objetos_left").style.display = "none";
                }else if(controle > 24){
                    document.getElementById("objetos_left").style.display = "flex";
                }
                document.getElementById("leftdiv").style.width = controle + "%";
                controle += Lx;
                requestAnimationFrame(Anim);
            }
            Lx *= -1;
            Anim();
        });
    //div superior(animação para retrair e abrir)
        $("#topdiv").mouseleave(() => { 
            function Anim()
            {
                if(controleTop < 3)
                {
                    controleTop = 4;
                    return;
                }
                if(controleTop > 25)
                {
                    controleTop = 25;
                    return;
                }
                if(controleTop < 24)
                {
                    document.getElementById("objetos_top").style.display = "none";
                }else if(controleTop > 24){
                    document.getElementById("objetos_top").style.display = "flex";
                }
                document.getElementById("topdiv").style.height = controleTop + "%";
                controleTop += Tx;
                requestAnimationFrame(Anim);
            }
            Tx *= -1;
            Anim();
        });

    //div lateral direita(animação para retrair e abrir)
        $("#rightdiv").mouseleave(() => { 

            function Anim()
            {
                if(controleRight < 3)
                {
                    controleRight = 4;
                    controleRleft = 96;
                    return;
                }
                if(controleRight > 25)
                {
                    controleRight = 25;
                    controleRleft = 75;
                    return;
                }
                if(controleRight < 24)
                {
                    document.getElementById("objetos_right").style.display = "none";
                }else if(controleRight > 24){
                    document.getElementById("objetos_right").style.display = "flex";
                }
                document.getElementById("rightdiv").style.width = controleRight + "%";
                document.getElementById("rightdiv").style.left = controleRleft + "%";
                controleRight += Rx;
                controleRleft += (Rx * -1);
                requestAnimationFrame(Anim);
            }
            Rx *= -1;
            Anim();
        });

//mudança de estado
function opcoestop(ret,col)
{
    document.getElementById(ret).style.display = "none";
    document.getElementById(col).style.display = "flex";
}
    
//jquery
    //criação de players
       $("#edit_btn1").click(function () { 
            let container = document.querySelector("body")
            let divP = document.createElement("div");
            let imgP = document.createElement("img");
            let inputP = document.createElement("input");
            let atriImg1 = document.createAttribute("id");
            let atriImg2 = document.createAttribute("class");
            let atriImg3 = document.createAttribute("src");
            let atriImg4 = document.createAttribute("alt");
            let atriInput1 = document.createAttribute("id");
            let atriInput2 = document.createAttribute("class");
            let atriInput3 = document.createAttribute("type");
            let atriDiv1 = document.createAttribute("draggable");
            let atriDiv2 = document.createAttribute("class");
            let atriDiv3 = document.createAttribute("id");
            
            atriImg1.value = "play_" + playerid;
            atriImg2.value = "player";
            atriImg3.value = "imagens/vacalo_xadres.png";
            atriImg4.value = "player" + playerid;
            atriInput1.value = "player" + playerid;
            atriInput2.value = "input_player";
            atriInput3.value = "file";
            atriDiv1.value = "true";
            atriDiv2.value = "divplayer";
            atriDiv3.value = playerid;

            imgP.setAttributeNode(atriImg1);
            imgP.setAttributeNode(atriImg2);
            imgP.setAttributeNode(atriImg3);
            imgP.setAttributeNode(atriImg4);
            inputP.setAttributeNode(atriInput1);
            inputP.setAttributeNode(atriInput2);
            inputP.setAttributeNode(atriInput3);
            divP.setAttributeNode(atriDiv1);
            divP.setAttributeNode(atriDiv2);
            divP.setAttributeNode(atriDiv3);

            divP.appendChild(imgP);
            divP.appendChild(inputP);
            container.appendChild(divP);

            rotate[playerid] = 0;
            tamanho[playerid] = 75;

        //mudança na imagen dos players
            inputP.addEventListener("change", () => {
                let leitor = new FileReader();

                leitor.addEventListener("load", ()=>{
                    imgP.src = leitor.result;
                });

                leitor.readAsDataURL(inputP.files[0]);
            },false)

        //mudança na posição dos players
            divP.addEventListener("dragend", () => {
                divP.style.left = event.pageX - tamanho[divP.id] + "px";
                divP.style.top = event.pageY - tamanho[divP.id] + "px";
            },false);
        
        //Rotação dos players   
            function rotatingplayer(){
                if(lastscroll < window.scrollY)
                {
                    divP.style.rotate = rotate[divP.id] + "deg";  
                    rotate[divP.id]+= 4;
                    if(rotate[divP.id] > 360){
                        rotate[divP.id] = 0;
                    }
                }else if (lastscroll > window.scrollY){
                    divP.style.rotate = rotate[divP.id] + "deg";  
                    rotate[divP.id]-= 4;
                    if(rotate[divP.id] > 360){
                        rotate[divP.id] = 0;
                    }
                }
                window.scroll(window.scrollX, lastscroll);
            } 

            $("#" + divP.id).hover(() => {
                lastscroll = window.scrollY;
                window.addEventListener("scroll", rotatingplayer, false);
            }, () => {
                window.removeEventListener("scroll", rotatingplayer, false);
                window.scroll(window.scrollX, lastscroll);
            });
                
                
            if(proxValue == 0)
            {
            playerid++;
            }else{
                playerid = proxValue;
                proxValue = 0;
            }
        });
    
    //excluir personagens
        $("#player_ext").change(() => {
            let valor = document.getElementById("player_ext").value;
            let playerExt = document.getElementById("" + valor);
            proxValue = playerid;
            playerid = valor;
            document.body.removeChild(playerExt);
        });

    //mudança de mapa
        $("#maps").change(() => {
            let arquivo = document.getElementById("maps");
            let mapa = document.getElementById("mapa");
            let leitor = new FileReader();

            leitor.addEventListener('load',()=>{
                mapa.src = leitor.result;
            },false)

            leitor.readAsDataURL(arquivo.files[0]);
        });
    
    //movimentação do mapa
        $("#mapa").click(() => { window.scroll(event.clientX, event.clientY); });
    
    //aumento do personagem
        $("#btn_change").click(() => {
           let tamanhu = document.getElementById("Tamanho_play").value;
           let id = document.getElementById("id_play").value;
           let img = document.getElementById("play_" + id).style;
           let input = document.getElementById("player" + id).style;
           let div = document.getElementById("" + id).style;
           img.width = tamanhu + "px";
           img.height = tamanhu + "px";
           input.width = tamanhu + "px";
           input.height = tamanhu + "px";
           div.width = tamanhu + "px";
           div.height = tamanhu + "px";
           tamanho[id] = tamanhu / 2;
        });

    //site para riar mapas2D
        $("#maps_create").click(() => { window.open("https://inkarnate.com/", "_blank") });

    //Sistema de dados
        $('#output_BM').attr("disabled", true);
        function enterprompt(eve)
        {
            let press = eve.keyCode;
            if(press == 13)
            {
                let prompt = document.getElementById("prompt_BM").value;
                BigMeow(prompt);
            }
        }
        function BigMeow(prompt)
        {
            let valor = prompt.toUpperCase();
            document.getElementById("output_BM").value = valor;
            let valores = valor.split(" ");
            console.log(valores);

            for(let i = 0; i <= valores.length; i++)
            {
                if(valores[i] == 'DANO')
                {
                    Dano();
                    return;
                }else if(valores[i] == "VANTAGEM" || valores[i] == "VAMTAGEM" || valores[i] == "VANT" || valores[i] == "VAMT"){
                    Vantagem();
                    return;
                }else if(valores[i] == "DESVANTAGEM" || valores[i] == "DESVAMTAGEM" || valores[i] == "DESV"){
                    Desvantagem();
                }else if(valores[i] == "TUTORIAL"){
                    document.getElementById("output_BM").value = TutorialBM;
                }
            }

            function Dano()
            {

                var pesquisaDICE = valores.filter((DADO) =>{
                    if(DADO.search("D") > 0){
                        return DADO;
                    }
                });
                var pesquisaSOMA = valores.filter((DADO) => {
                    if(DADO.search("D") < 0){
                        return DADO;
                    }
                })
                console.log(pesquisaDICE);
                console.log(pesquisaSOMA);

                let valorSubjacente = "";
                let valorFinal = 0;

                for(let i = 0; i < pesquisaDICE.length; i++)
                {
                    let separador = pesquisaDICE[i].split('D');
                    let controlador = parseInt(separador[0]);
                    let dado = parseInt(separador[1]);
                    for(let i = 0; i <= controlador; i++)
                    {
                        let dice = Math.floor(Math.random() * dado);
                        valorFinal += dice;
                        valorSubjacente += ("\n dice: " + dice + " \n ") ;
                    }
                }

                for(let i = 0; i < pesquisaSOMA.length; i++)
                {
                    if(pesquisaSOMA[i] == "VANTAGEM" || pesquisaSOMA[i] == "VAMTAGEM" || pesquisaSOMA[i] == "VANT" || pesquisaSOMA[i] == "VAMT")
                    {

                    }else{
                        let valor = pesquisaSOMA[i].substring(1);
                        let Valor = parseInt(valor);
                        console.log(valor);
                        console.log(Valor);
                        valorFinal += Valor;
                    }
                }
                
                document.getElementById("output_BM").value += valorSubjacente;
                document.getElementById("output_BM").value += ("\n Valor Final: " + valorFinal);
                document.getElementById("prompt_BM").value = "";
            }
            function Vantagem()
            {

                var pesquisaDICE = valores.filter((DADO) =>{
                    if(DADO.search("D") > 0){
                        return DADO;
                    }
                });
                var pesquisaSOMA = valores.filter((DADO) => {
                    if(DADO.search("D") < 0){
                        return DADO;
                    }
                })
                console.log(pesquisaDICE);
                console.log(pesquisaSOMA);

                let valorSubjacente = "";
                let valorFinal = 0;
                let valoresConclusao = new Array();
                let controlE = 0;
                

                for(let i = 0; i < pesquisaDICE.length; i++)
                {
                    let separador = pesquisaDICE[i].split('D');
                    console.log(separador);
                    let controlador = parseInt(separador[0]);
                    let dado = parseInt(separador[1]);
                    for(let e = 0; e < controlador; e++)
                    {
                        let dice = Math.floor(Math.random() * dado);
                        valorSubjacente += ("\n dice: " + dice + " \n ") ;
                        valoresConclusao[controlE] = dice;
                        controlE++;
                    }
                }
                for(let i = 0; i <= valoresConclusao.length; i++)
                {
                    if(valorFinal < valoresConclusao[i])
                    {
                        valorFinal = valoresConclusao[i];
                    }
                }

                for(let i = 0; i < pesquisaSOMA.length; i++)
                {
                    if(pesquisaSOMA[i] == "VANTAGEM" || pesquisaSOMA[i] == "VAMTAGEM" || pesquisaSOMA[i] == "VANT" || pesquisaSOMA[i] == "VAMT")
                    {

                    }else{
                        let valor = pesquisaSOMA[i].substring(1);
                        let Valor = parseInt(valor);
                        console.log(valor);
                        console.log(Valor);
                        valorFinal += Valor;
                    }
                }

                document.getElementById("output_BM").value += valorSubjacente;
                document.getElementById("output_BM").value += ("\n Valor Final: " + valorFinal);
                document.getElementById("prompt_BM").value = "";
            }
            function Desvantagem()
            {

                var pesquisaDICE = valores.filter((DADO) =>{
                    if(DADO.search("D") > 0){
                        return DADO;
                    }
                });
                var pesquisaSOMA = valores.filter((DADO) => {
                    if(DADO.search("D") < 0){
                        return DADO;
                    }
                })
                console.log(pesquisaDICE);
                console.log(pesquisaSOMA);

                let valorSubjacente = "";
                let valorFinal = 9999999999;
                let valoresConclusao = new Array();
                let controlE = 0;
                

                for(let i = 0; i < pesquisaDICE.length; i++)
                {
                    let separador = pesquisaDICE[i].split('D');
                    console.log(separador);
                    let controlador = parseInt(separador[0]);
                    let dado = parseInt(separador[1]);
                    for(let e = 0; e < controlador; e++)
                    {
                        let dice = Math.floor(Math.random() * dado);
                        valorSubjacente += ("\n dice: " + dice + " \n ") ;
                        valoresConclusao[controlE] = dice;
                        controlE++;
                    }
                }
                for(let i = 0; i <= valoresConclusao.length; i++)
                {
                    if(valorFinal > valoresConclusao[i])
                    {
                        valorFinal = valoresConclusao[i];
                    }
                }

                for(let i = 0; i < pesquisaSOMA.length; i++)
                {
                    if(pesquisaSOMA[i] == "DESVANTAGEM" || pesquisaSOMA[i] == "DESVAMTAGEM" || pesquisaSOMA[i] == "DESV")
                    {

                    }else{
                        let valor = pesquisaSOMA[i].substring(1);
                        let Valor = parseInt(valor);
                        console.log(valor);
                        console.log(Valor);
                        valorFinal += Valor;
                    }
                }

                document.getElementById("output_BM").value += valorSubjacente;
                document.getElementById("output_BM").value += ("\n Valor Final: " + valorFinal);
                document.getElementById("prompt_BM").value = "";
            }
        }
        