// ==UserScript==
// @name         PB FastScript
// @version      1.5
// @description  Script-assistant for Pixel Battle.
// @author       Artemiy Zarubin
// @downloadURL  https://raw.githubusercontent.com/ArtemiyGeneralov/pb-fastscript/main/fastscript.user.js
// @updateURL    https://raw.githubusercontent.com/ArtemiyGeneralov/pb-fastscript/main/fastscript.user.js
// @supportURL   https://vk.com/id382847201
// @match        https://mmosg.ru/game.php?*
// @icon         https://mmosg.ru/assets/hd_icon_world.png
// ==/UserScript==

function changeDesign () {
    let captchaWaitContain = document.getElementsByClassName('captchaWaitingContainer')[0],
        delbgcText = document.getElementsByTagName('p')[38],
        captchaCD = document.getElementsByClassName('captchaCountdown')[0],
        goldButton = document.getElementsByClassName('goldButton')[0];

    if(captchaWaitContain && delbgcText && captchaCD) {
        captchaWaitContain.lastElementChild.style["background-image"] = 'url("https://steamuserimages-a.akamaihd.net/ugc/932683001473291243/FBEBB64A9EC0D1A98CB0FE213D8A251A7D0486DA/")'
        if(delbgcText.innerText.includes('Зайдите сюда ровно')) { delbgcText.style = 'background-color: none;'; };
        captchaCD.innerText = 'Автор скрипта: Артемий Зарубин'; captchaCD.style['font-size']='8px'; captchaCD.classList.remove('captchaCountdown');
        goldButton.classList.add('captchaCountdown');
        goldButton.text = '23:59:59';
        goldButton.style['font-size']='24px';
    } else {
        setTimeout(changeDesign, 500);
    }
}

function fastCaptchaClick() {
    document.addEventListener('keypress', (event) => {
        let modalCaptcha = document.getElementById('modalCaptcha');
        if(modalCaptcha.style.display === 'none') return;
        let keyName = event.key,
            buttons = document.getElementsByClassName('captchaOption'),
            clickEvent = new Event('click');
        if(keyName.match(/(Я|Z|1)/i)){ buttons[0].dispatchEvent(clickEvent) };
        if(keyName.match(/(Ч|X|2)/i)){ buttons[1].dispatchEvent(clickEvent) };
        if(keyName.match(/(C|С|3)/i)){ buttons[2].dispatchEvent(clickEvent) };
    })
}

function showCaptchaBeforeCollect() {
    let goldButton = document.getElementsByClassName('goldButton')[0].text,
        time = goldButton.split(':'),
        captches = document.getElementsByClassName('captchaContainer')[0],
        captchawaiting = document.getElementsByClassName('captchaWaitingContainer')[0];
    if(goldButton && time && captches && captchawaiting) {
        if(Number(time[0]) > 0 || Number(time[1]) > 0 || Number(time[2]) > 5) return;
        captchawaiting.parentNode.removeChild(captchawaiting);
        captches.style = 'display:block;';
        captches.classList.remove('captchaContainer');
    }
}
setTimeout(() => { setInterval(showCaptchaBeforeCollect, 500) },1000);

function showCountPaints() {
    let element = document.getElementsByClassName('paintPerHour')[0],
        countPaints = document.getElementsByTagName('p')[15];
    let diff = Number(countPaints.textContent) - 1000;
    if(Number(countPaints.textContent) > 1000) {
        minusColors(diff)
    }
    
}
setInterval(showCountPaints, 800);

function pixinfoDesign() {
    let modalinfo = document.getElementsByClassName('pixel_info')[0],
        imodal = modalinfo.getElementsByClassName('main')[0],
        uname = imodal.getElementsByClassName('name')[0],
        cname = imodal.getElementsByClassName('clan')[0],
        icoord = imodal.getElementsByClassName('coord')[0],
        idate = imodal.getElementsByClassName('date')[0],
        iavatar = imodal.getElementsByClassName('avatar')[0],
        ibordertop = imodal.getElementsByClassName('arrow')[0],
        mitext = modalinfo.firstElementChild;
    if(!modalinfo || !imodal || !uname || !cname || !icoord || !idate || !iavatar || !ibordertop || !mitext) return;
    mitext.style.color = '#fff';
    ibordertop.style['border-top'] = '10px solid #5d5da6'; // #5858ff
    iavatar.style['border-radius'] = '50%';
    modalinfo.style['border-radius'] = '8px';
    modalinfo.style['background-color'] = '#5d5da6'
    uname.style.color = '#fff';
    cname.style.color = '#fff';
    icoord.style.color = '#c4c4ee';
    idate.style.color = '#c4c4ee';
};

pixinfoDesign();
changeDesign();
fastCaptchaClick();
