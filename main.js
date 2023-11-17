// GLOBAL DATA

var data = {lang : 0, bright : 0};
var temp = {now : 0, lang_open : false, comment : []};

// BASIC FUNCTION

function intdiv(a, b){return (a - a % b) / b;}

function sp(n){return " ".repeat(n);}

function z(n, d){return n.toString().padStart(d, "0");}

function replaceall(text, match, target){
    var result = text;
    while (true){
        if (result === result.replace(match, target)) break;
        result = result.replace(match, target);
    }
    return result;
}

function time_param(t){
    return [
        new Date(t).getUTCFullYear(),
        new Date(t).getUTCMonth() + 1,
        new Date(t).getUTCDate(),
        new Date(t).getUTCHours(),
        new Date(t).getUTCMinutes(),
        new Date(t).getUTCSeconds(),
        new Date(t).getUTCMilliseconds(),
    ];
}

// GET FUNCTION

function get_para(code){return new URLSearchParams(window.location.search).get(code);}

function get_section(){
    var section = get_para("section");
    if (section === null) return "0";
    return section;
}

function get_lang(){
    var lan = navigator.language.toLowerCase();
    if (lan.includes("ja")) return 3;
    if (!lan.includes("zh")) return 0;
    if (lan.includes("hant")) return 2;
    if (lan.includes("hk")) return 2;
    if (lan.includes("mo")) return 2;
    if (lan.includes("tw")) return 2;
    return 1;
}

function get_now(){temp.now = Date.now();}

function get_timezone(){return new Date().getTimezoneOffset() * -60000;}

// SET CONTENT

function set_text(id, set = null){
    var text = (set === null ? words[data.lang][id] : set);
    text = replaceall(text, "\\H\\", "<span class=\"highlight\">");
    text = replaceall(text, "\\h\\", "</span>");
    document.getElementById(id).innerHTML = text;
}

function set_page(){
    const langs = ["en", "zh-Hans", "zh-Hant", "jp"];
    document.getElementsByTagName("html")[0].lang = langs[data.lang];
    for (let i = 0; i < 4; i++) document.getElementById("m" + i).className = 
    "menu-button" + (get_section() == i ? "-triggered": "");
    set_text("title", "David_Exmachina - " + words[data.lang]["menu" + get_section()]);
    for (let i = 0; i < 4; i++) set_text("menu" + i, data.lang === 0 ? "" : null);
}

function set_lang(){
    var text;
    set_text("lang");
    document.getElementById("lang-tab").className = 
    "lang-button" + data.bright + (temp.lang_open ? "-triggered" : "");
    text = `\n${sp(16)}`;
    if (temp.lang_open){
        for (let i = 0; i < 4; i++){
            text += `${sp(20)}<div class="lang-button${data.bright}${(data.lang === i ? "-triggered" : "")}"`;
            text += ` onclick="open_lang(${i});"><p class="lang-words">${words[i].lang}</p></div>`;
        }
    }
    document.getElementById("lang-window").innerHTML = text;
    text = document.querySelectorAll(".lang-words");
    for (let i = 0; i < text.length; i++){
        text[i].style.color = (data.bright ? "#0080ff": "#00ffff");
    }
}

function set_home(){
    var text = "\n", top = null, i2, l2;
    text += `${sp(12)}<div class="blog">\n`;
    text += `${sp(16)}<div class="blog-left">\n`;
    for (let i = 0; i < blogs.length; i++){
        if (temp.now < blogs[i].time) continue;
        if (blogs[i].pinned){top = i; break;}
    }
    for (let i = blogs.length - 1; i >= 0; i--){
        if (top === null) i2 = i;
        else if (i === blogs.length - 1) i2 = top;
        else if (i >= top) i2 = i + 1;
        else i2 = i;
        if (temp.now < blogs[i2].time) continue;
        text += `${sp(20)}<div class="blog-lines">\n`;
        text += `${sp(24)}<div class="blog-info">\n`;
        text += `${sp(28)}${get_time(blogs[i2].time)}\n`;
        if (i2 === top){
            text += `${sp(28)}<div class="blog-pin">\n`;
            text += `${sp(32)}<div>${words[data.lang].blog0}</div>\n`;
            text += `${sp(32)}<img id="img-pin" src="RESOURCE/pin0.png" alt width="32" height="32">\n`;
            text += `${sp(28)}</div>\n`;
        }
        text += `${sp(24)}</div>\n`;
        text += `${sp(24)}<div class="blog-content">\n`;
        if (blogs[i2].default === null) l2 = 0;
        else if (blogs[i2].content[data.lang] !== null) l2 = data.lang;
        else {
            l2 = blogs[i2].default;
            text += `${sp(28)}<p class="warning">${words[data.lang].blog1}</p>\n`;
        }
        if (blogs[i2].content[l2] !== null) for (let j = 0; j < blogs[i2].content[l2].length; j++){
            text += `${sp(28)}<p class="blog-text">${blogs[i2].content[l2][j]}</p>\n`;
        }
        text += `${sp(24)}</div>\n`;
        if (blogs[i2].comment[data.lang] !== null){
            text += `${sp(24)}<div class="blog-comment" onclick="check_comment(${i2});">\n`;
            text += `${sp(28)}${words[data.lang][`blog${temp.comment.includes(i2) ? 3 : 2}`]}\n`;
            text += `${sp(24)}</div>\n`;
            if (temp.comment.includes(i2)){
                text += `${sp(24)}<div class="blog-content">\n`;
                for (let j = 0; j < blogs[i2].comment[data.lang].length; j++){
                    text += `${sp(28)}<p class="blog-text">${blogs[i2].comment[data.lang][j]}</p>\n`;
                }
                text += `${sp(24)}</div>\n`;
            }
        }
        text += `${sp(20)}</div>\n`;
    }
    text += `${sp(16)}</div>\n${sp(16)}<div class="blog-right">\n`;
    text += `${sp(20)}<div class="blog-window">\n`;
    text += `${sp(24)}<p id="home0">\n`;
    text += `${sp(24)}<p id="home1">\n`;
    text += `${sp(24)}<p id="home2">\n`;
    text += `${sp(20)}</div>\n${sp(16)}</div>\n${sp(12)}</div>\n`;
    text += sp(8);
    document.getElementById("content").innerHTML = text;
    for (let i = 0; i < 3; i++) set_text("home" + i);
}

function set_profile(){
    var text = `\n${sp(12)}<div class="profile">\n${sp(16)}`;
    text += `<div><img class="profile-img" src="RESOURCE/icon.png" alt=""></div>\n`;
    text += `${sp(16)}<div class="profile-text">\n`;
    for (let i = 0; i < 11; i++){
        text += `${sp(20)}<p id="pro${z(i, 2)}"${i > 6 ? ` class="connect"` : ""}></p>\n`;
    }
    text += `${sp(16)}</div>\n${sp(12)}</div>\n${sp(8)}`;
    document.getElementById("content").innerHTML = text;
    for (let i = 0; i < 11; i++) set_text("pro" + z(i, 2));
}

function set_projects(){
    var text = "\n";
    text += `${sp(12)}<div class="big-text" id="prj0"></div>\n`;
    text += `${sp(12)}<div class="small-text" id="home2"></div>\n`;
    text += sp(8);
    document.getElementById("content").innerHTML = text;
    set_text("prj0");
    set_text("home2");
}

function set_articles(){
    var text = `\n${sp(12)}<div class="article">\n`, l2;
    if (get_para("id") === null){
        text += `${sp(16)}<div>\n`;
        for (let i = articles.length - 1; i >= 0; i--){
            if (temp.now < articles[i].time) continue;
            text += `${sp(20)}<div class="article-line" onclick="open_article(${i});">\n`;
            if (articles[i].default === null) l2 = 0;
            else if (articles[i].title[data.lang] !== null) l2 = data.lang;
            else l2 = articles[i].default;
            if (articles[i].title[l2] !== null){
                text += `${sp(24)}<div class="article-title">${articles[i].title[l2]}</div>\n`;
            } else text += `${sp(24)}<div class="article-title"></div>\n`;
            text += `${sp(24)}<div class="article-info">\n`;
            text += `${sp(28)}<div>${get_time(articles[i].time)}</div>\n`;
            text += `${sp(28)}<div>${articles[i].series}</div>\n`;
            text += `${sp(24)}</div>\n`;
            text += `${sp(20)}</div>\n`;
        }
    } else {
        text += `${sp(16)}<div class="article-page">\n`;
        text += `${sp(20)}<div class="article-head">\n`;
        text += `${sp(24)}<div class="article-title-button">\n`;
        if (articles[get_para("id")].default === null) l2 = 0;
        else if (articles[get_para("id")].title[data.lang] !== null) l2 = data.lang;
        else l2 = articles[get_para("id")].default;
        if (articles[get_para("id")].title[l2] !== null){
            text += `${sp(28)}<div>${articles[get_para("id")].title[l2]}</div>\n`;
        } else text += `${sp(28)}<div></div>\n`;
        text += `${sp(28)}<img id="img-left" src="RESOURCE/left2.png" alt width="32" height="32" onclick="">\n`;
        text += `${sp(28)}<img id="img-right" src="RESOURCE/right2.png" alt width="32" height="32" onclick="">\n`;
        text += `${sp(28)}<img id="img-back" src="RESOURCE/back0.png" alt width="32" height="32" onclick="open_article();">\n`;
        text += `${sp(24)}</div>\n`;
        text += `${sp(24)}<div class="article-info">\n`;
        text += `${sp(28)}<div>${get_time(articles[get_para("id")].time)}</div>\n`;
        text += `${sp(28)}<div>${articles[get_para("id")].series}</div>\n`;
        text += `${sp(24)}</div>\n`;
        text += `${sp(20)}</div>\n`;
        text += `${sp(20)}<div class="article-body">\n`;
        if (articles[get_para("id")].default === null) l2 = 0;
        else if (articles[get_para("id")].content[data.lang] !== null) l2 = data.lang;
        else {
            l2 = articles[get_para("id")].default;
            text += `${sp(24)}<p class="warning">${words[data.lang].blog1}</p>\n`;
        }
        if (articles[get_para("id")].content[l2] !== null) for (let i = 0; i < articles[get_para("id")].content[l2].length; i++){
            text += `${sp(24)}<p class="article-text">${articles[get_para("id")].content[l2][i]}</p>\n`;
        }
        text += `${sp(20)}</div>\n`;
    }
    text += `${sp(16)}</div>\n${sp(12)}</div>\n${sp(8)}`;
    document.getElementById("content").innerHTML = text;
}

function set_bright(){
    const elm1 = ["logo", "lang", "bright"], elm2 = ["left", "right", "back"];
    var text;
    for (let i = 0; i < elm1.length; i++){
        document.getElementById(`img-${elm1[i]}`).src = `RESOURCE/${elm1[i]}${data.bright}.png`;
    }
    document.querySelector("body").style.backgroundColor = (data.bright ? "#ffffff": "#000000");
    document.querySelector("body").style.color = (data.bright ? "#000000": "#ffffff");
    document.querySelector(".menu").style.backgroundColor = (data.bright ? "#00c0c0": "#0060c0");
    text = document.querySelectorAll(".menu-text2");
    for (let i = 0; i < text.length; i++){
        text[i].style.color = (data.bright ? "#ffffffc0": "#ffffff80");
    }
    text = document.querySelectorAll(".highlight");
    for (let i = 0; i < text.length; i++){
        text[i].style.color = (data.bright ? "#0080ff": "#00ffff");
    }
    if (get_section() == 0){
        text = document.querySelectorAll("#img-pin");
        for (let i = 0; i < text.length; i++){
            text[i].src = `RESOURCE/pin${data.bright}.png`;
        }
        text = document.querySelectorAll(".blog-lines");
        for (let i = 0; i < text.length; i++){
            text[i].style.backgroundColor = (data.bright ? "#00c0c0": "#0060c0");
        }
        text = document.querySelectorAll(".blog-content");
        for (let i = 0; i < text.length; i++){
            text[i].style.backgroundColor = (data.bright ? "#ffffff": "#000000");
        }
        document.querySelector(".blog-window").style.backgroundColor = (data.bright ? "#00c0c0": "#0060c0");
    }
    if (get_section() == 3){
        if (get_para("id") === null){
            text = document.querySelectorAll(".article-line");
            for (let i = 0; i < text.length; i++){
                text[i].style.backgroundColor = (data.bright ? "#00c0c0": "#0060c0");
            }
        } else {
            for (let i = 0; i < elm2.length; i++){
                document.getElementById(`img-${elm2[i]}`).src = 
                `RESOURCE/${elm2[i]}${data.bright + (i === 2 ? 0 : 2)}.png`;
            }
            document.querySelector(".article-page").style.backgroundColor = (data.bright ? "#00c0c0": "#0060c0");
            document.querySelector(".article-body").style.backgroundColor = (data.bright ? "#ffffff": "#000000");
        }
    }
}

function set_math(){
    try {MathJax.typeset();}
    catch {}
}

function refresh(){
    set_page();
    set_lang();
    [set_home, set_profile, set_projects, set_articles][get_section()]();
    set_bright();
    set_math();
}

// TIME

function get_time(t){
    var d = (temp.now - t) % 86400000;
    var n1 = temp.now - d - t % 86400000, t1 = t - t % 86400000;
    var n2 = time_param(n1), t2 = time_param(t1); 
    var dt = [n2[0], n2[1], n2[2], intdiv(d, 3600000) % 24, intdiv(d, 60000) % 60, intdiv(d, 1000) % 60, d % 1000];
    var t3 = time_param(t + get_timezone());
    if (dt[2] < t2[2]){
        dt[2] = (Date.UTC(t2[0], t2[1], 1, 0, 0, 0, 0) - t1) / 86400000;
        dt[1] -= 1;
    } else dt[2] -= t2[2];
    if (dt[1] < t2[1]){
        dt[1] += 12 - t2[1];
        dt[0] -= 1;
    } else dt[1] -= t2[1];
    dt[0] -= t2[0];
    return `${words[data.lang].now_text(t3)} (${words[data.lang].ago_text(dt)})`
}

// MANAGE DATA

function save_data(){localStorage.setItem("data", JSON.stringify(data));}

function load_data(){
    var d = JSON.parse(localStorage.getItem("data"));
    if (d === null){
        data.lang = get_lang();
        save_data();
    } else data = d;
}

function change_lang(lang){
    data.lang = lang;
    temp.comment = [];
    refresh();
    save_data();
}

function change_bright(){
    data.bright = 1 - data.bright;
    refresh();
    save_data();
}

// MAIN

function main(){
    load_data();
    get_now();
    refresh();
}

function open_lang(set = null){
    if (set === null){
        temp.lang_open = !temp.lang_open;
        set_lang();
    } else if (temp.lang_open && data.lang !== set){
        temp.lang_open = false;
        set_lang();
        change_lang(set);
    }
}

function change_section(n = 0){
    if (get_section() == n) return;
    window.history.replaceState(null, null, "?section=" + n);
    temp.lang_open = false;
    temp.comment = [];
    get_now();
    refresh();
}

function open_article(id = null){
    if (get_para("id") == id) return;
    window.history.replaceState(null, null, "?section=3" + (id === null ? "" : "&id=" + id));
    temp.lang_open = false;
    temp.comment = [];
    get_now();
    refresh();
}

function check_comment(id){
    if (temp.comment.includes(id)) temp.comment = temp.comment.filter(function (n){return n !== id});
    else temp.comment.push(id);
    temp.comment.sort();
    refresh();
}