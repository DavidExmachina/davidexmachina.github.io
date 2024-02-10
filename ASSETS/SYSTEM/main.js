// GLOBAL DATA

var data = {lang : 0, bright : 0};

var temp = {now : 0, lang_open : false, comment : []};

const langs = ["en", "zh-Hans", "zh-Hant", "jp"];

// BASIC FUNCTION

function intdiv(a, b){return (a - a % b) / b;}

function sp(n){return " ".repeat(n);}

function z(n, d){return n.toString().padStart(d, "0");}

function replaceall(text, match, target){return text.split(match).join(target);}

function add_space(text, space){return space >= 0 ? replaceall(text, "\n", `\n${sp(space)}`) : replaceall(text, `\n${sp(-space)}`, "\n");}

function supertext(text){
    var result = text, old = text, match;
    for(;;){
        match = result.match(/\${S\(([0-9]+)\)}/);
        if (match !== null) result = result.replace(match[0], "&nbsp;".repeat(Number(match[1])));
        if (result === old) break;
        old = result;
    }
    return result;
}

// READ FILE

function read_file(file){
    var req = new XMLHttpRequest(), result = "";
    req.open("GET", file, false);
    req.onreadystatechange = function (){if (req.readyState === 4 && [0, 200].includes(req.status)) result = req.responseText;}
    req.send(null);
    return result;
}

function to_dom(text){return new DOMParser().parseFromString(text, 'text/html');}

const pages = to_dom(read_file("ASSETS/SYSTEM/pages.html"));

const words = JSON.parse(read_file("ASSETS/SYSTEM/words.json"));

const articles = JSON.parse(read_file("ASSETS/POSTS/articles.json"));

function word(){return words[langs[data.lang]];}

function fetch_page(name, lang, space = 0){
    var a = pages.getElementsByTagName("page");
    var b = null;
    for (let i = 0; i < a.length; i++) if (a[i].attributes.name.value === name){b = a[i]; break;}
    if (b === null) return "ERROR";
    a = b.getElementsByTagName("content");
    b = null;
    for (let i = 0; i < a.length; i++) if (a[i].attributes.lang.value === lang){b = a[i]; break;}
    if (b === null) return "ERROR";
    return add_space(b.innerHTML, space);
}

function blog_comp(a, b){
    if (a[2] && !b[2]) return -1;
    if (!a[2] && b[2]) return 1;
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    return 0;
}

function fetch_blog(){
    var blogs = to_dom(read_file("ASSETS/POSTS/blogs.html")), a, b = [];
    a = blogs.getElementsByTagName("blog");
    for (let i = 0; i < a.length; i++) b.push([0, a[i].attributes.time.value, a[i].hasAttribute("pinned"), a[i], i]);
    for (let i = 0; i < articles.length; i++) b.push([1, articles[i].time, false, null, i]);
    return b.sort(blog_comp);
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

// TIME FUNCTION

function get_now(){temp.now = Date.now();}

function get_timezone(){return new Date().getTimezoneOffset() * -60000;}

function read_time(t){
    var a = replaceall(replaceall(replaceall(t, "/", " "), ":", " "), ".", " ").split(" ");
    return Date.UTC(a[0], a[1] - 1, a[2], a[3], a[4], a[5], a[6]);
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

function now_text(t){
    var result = word().time_text;
    result = result.replace("${YEAR}", t[0]);
    result = result.replace("${MONTH}", word().months[t[1] - 1]);
    result = result.replace("${DAY}", z(t[2], 2));
    result = result.replace("${HOUR}", z(t[3], 2));
    result = result.replace("${MINUTE}", z(t[4], 2));
    result = result.replace("${SECOND}", z(t[5], 2));
    result = result.replace("${MILLISECOND}", z(t[6], 3));
    return result;
}

function ago_text(t){
    var unit = word().time_units;
    if (t[0]) return `${t[0]}${unit[0]}` + (t[1] ? `${t[1]}${unit[1]}` : "") + unit[7];
    if (t[1]) return `${t[1]}${unit[1]}` + (t[2] >= 7 ? `${intdiv(t[2], 7)}${unit[2]}` : "") + unit[7];
    if (t[2] >= 7) return `${intdiv(t[2], 7)}${unit[2]}` + (t[2] % 7 ? `${t[2] % 7}${unit[3]}` : "") + unit[7];
    if (t[2]) return `${t[2]}${unit[3]}` + (t[3] ? `${z(t[3], 2)}${unit[4]}` : "") + unit[7];
    if (t[3]) return `${t[3]}${unit[4]}` + (t[4] ? `${z(t[4], 2)}${unit[5]}` : "") + unit[7];
    if (t[4]) return `${t[4]}${unit[5]}` + (t[5] ? `${z(t[5], 2)}${unit[6]}` : "") + unit[7];
    return `${t[5]}.${z(t[6], 3)}${unit[6]}${unit[7]}`;
}

function time_text(t){
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
    return `${now_text(t3)} (${ago_text(dt)})`;
}

// SET CONTENT

function set_style(select, key, bright, dark){document.querySelector(select).style[key] = (data.bright ? bright : dark);}

function set_styles(select, key, bright, dark){
    var target = document.querySelectorAll(select);
    for (let i = 0; i < target.length; i++) target[i].style[key] = (data.bright ? bright : dark);
}

function set_page(){
    document.getElementsByTagName("html")[0].lang = langs[data.lang];
    document.getElementById("title").innerHTML = `David_Exmachina - ${word().menu[get_section()]}`;
    for (let i = 0; i < 4; i++){
        document.getElementById(`m${i}`).className = `menu-button${get_section() == i ? "-triggered" : ""}`;
        document.getElementById(`menu${i}`).innerHTML = (word().menu_text ? word().menu[i] : "");
    }
}

function set_lang(){
    var newdiv = null, newp = null;
    document.getElementById("lang").innerHTML = word().lang;
    document.getElementById("lang-tab").className = `lang-button${data.bright}${temp.lang_open ? "-triggered" : ""}`;
    document.getElementById("lang-window").innerHTML = "";
    if (temp.lang_open){
        for (let i = 0; i < langs.length; i++){
            newdiv = document.createElement("div");
            newdiv.setAttribute("class", `lang-button${data.bright}${data.lang === i ? "-triggered" : ""}`);
            newdiv.setAttribute("onclick", `open_lang(${i});`);
            newp = document.createElement("p");
            newp.setAttribute("class", "lang-words");
            newp.innerHTML = words[langs[i]].lang;
            newdiv.appendChild(newp);
            document.getElementById("lang-window").appendChild(newdiv);
        }
    }
    set_styles(".lang-words", "color", "#0080ff", "#00ffff");
}

function set_home(){
    var blogs = fetch_blog(), line, new1, new2, content, default_, contents, text, comment;
    document.getElementById("content").innerHTML = fetch_page("home-page", "null", -4);
    document.getElementById("home-right").innerHTML = fetch_page("home-right", langs[data.lang], 8);
    for (let i = 0; i < blogs.length; i++){
        if (temp.now < read_time(blogs[i][1])) continue;
        line = to_dom(fetch_page("blog-lines", "null")).getElementsByTagName("div")[0];
        new1 = document.createElement("div");
        new1.innerHTML = time_text(read_time(blogs[i][1]));
        line.querySelectorAll(".blog-info")[0].appendChild(new1);
        if (blogs[i][2]){
            new1 = document.createElement("div");
            new1.setAttribute("class", "blog-pin");
            new2 = document.createElement("div");
            new2.innerHTML = word().pinned;
            new1.appendChild(new2);
            new2 = document.createElement("img");
            new2.setAttribute("src", `ASSETS/UI/pin${data.bright}.png`);
            new2.setAttribute("alt", "");
            new2.setAttribute("width", "32");
            new2.setAttribute("height", "32");
            new1.appendChild(new2);
            line.querySelectorAll(".blog-info")[0].appendChild(new1);
        }
        if (blogs[i][0] === 0){
            content = null, default_ = null;
            if (blogs[i][3].hasAttribute("default")){
                contents = blogs[i][3].getElementsByTagName("content");
                for (let j = 0; j < contents.length; j++){
                    if (contents[j].attributes.lang.value === blogs[i][3].attributes.default.value) default_ = contents[j];
                    if (contents[j].attributes.lang.value === langs[data.lang]) content = contents[j];
                }
                if (content === null){
                    content = default_;
                    new1 = document.createElement("p");
                    new1.setAttribute("class", "warning");
                    new1.innerHTML = word().not_supported;
                    line.querySelectorAll(".blog-content")[0].appendChild(new1);
                }
            } else content = blogs[i][3].getElementsByTagName("content")[0];
            text = content.getElementsByTagName("text")[0], comment = content.getElementsByTagName("comment");
            new1 = document.createElement("div");
            new1.setAttribute("class", "blog-text");
            new1.innerHTML = add_space(text.innerHTML, 4);
            line.querySelectorAll(".blog-content")[0].appendChild(new1);
            if (comment[0]){
                line.querySelectorAll(".blog-comment")[0].setAttribute("onclick", `check_comment(${blogs[i][4]});`);
                line.querySelectorAll(".blog-comment")[0].innerHTML = word()[temp.comment.includes(blogs[i][4]) ? "hide_comments" : "view_comments"];
                if (temp.comment.includes(blogs[i][4])){
                    new1 = document.createElement("div");
                    new1.setAttribute("class", "blog-text");
                    new1.innerHTML = add_space(comment[0].innerHTML, 4);
                    line.querySelectorAll(".blog-content")[1].appendChild(new1);
                } else {
                    line.querySelectorAll(".blog-content")[1].remove();
                    line.innerHTML = line.innerHTML.split("\n").slice(0, -2).join("\n") + "\n" + sp(16);
                }
            } else {
                line.querySelectorAll(".blog-comment")[0].remove();
                line.querySelectorAll(".blog-content")[1].remove();
                line.innerHTML = line.innerHTML.split("\n").slice(0, -3).join("\n") + "\n" + sp(16);
            }
            document.getElementById("blogs").innerHTML += "\n" + sp(16);
        } else if (blogs[i][0] === 1){
            if (articles[blogs[i][4]].default === null) content = articles[blogs[i][4]].content.null;
            else if (langs[data.lang] in articles[blogs[i][4]].content) content = articles[blogs[i][4]].content[langs[data.lang]];
            else content = articles[blogs[i][4]].content[articles[blogs[i][4]].default];
            new1 = document.createElement("div");
            new1.setAttribute("class", "blog-text");
            new2 = document.createElement("a");
            new2.setAttribute("href", `?section=3&id=0`);
            new2.innerHTML = content.title;
            new1.innerHTML = word().published_article.replace("${ARTICLE}", new2.outerHTML);
            line.querySelectorAll(".blog-content")[0].appendChild(new1);
            line.querySelectorAll(".blog-comment")[0].remove();
            line.querySelectorAll(".blog-content")[1].remove();
            line.innerHTML = line.innerHTML.split("\n").slice(0, -3).join("\n") + "\n" + sp(16);
        }
        document.getElementById("blogs").appendChild(line);
    }
    document.getElementById("blogs").innerHTML = add_space(document.getElementById("blogs").innerHTML + "\n" + sp(12), 4);
}

function set_profile(){
    document.getElementById("content").innerHTML = fetch_page("profile-page", "null", -4);
    document.getElementById("profile").innerHTML = fetch_page("profile-content", langs[data.lang], 4);
}

function set_projects(){document.getElementById("content").innerHTML = fetch_page("project-placeholder", langs[data.lang], -4);}

function set_article_list(){
    var content, line, new1;
    document.getElementById("content").innerHTML = fetch_page("article-list", "null", -4);
    for (let i = articles.length - 1; i >= 0; i--){
        if (temp.now < read_time(articles[i].time)) continue;
        if (articles[i].default === null) content = articles[i].content.null;
        else if (langs[data.lang] in articles[i].content) content = articles[i].content[langs[data.lang]];
        else content = articles[i].content[articles[i].default];
        line = to_dom(fetch_page("article-lines", "null")).getElementsByTagName("div")[0];
        line.setAttribute("onclick", `view_article(${i});`)
        line.querySelectorAll(".article-title")[0].innerHTML = content.title;
        new1 = document.createElement("div");
        new1.innerHTML = time_text(read_time(articles[i].time));
        line.querySelectorAll(".article-info")[0].appendChild(new1);
        new1 = document.createElement("div");
        new1.innerHTML = articles[i].series;
        line.querySelectorAll(".article-info")[0].appendChild(new1);
        document.getElementById("articles").appendChild(line);
        document.getElementById("articles").innerHTML += "\n" + sp(16);
    }
    document.getElementById("articles").innerHTML = add_space(document.getElementById("articles").innerHTML, 4).slice(0, -4);
}

function set_article_page(){
    var content, new1;
    document.getElementById("content").innerHTML = fetch_page("article-content", "null", -4);
    if (articles[get_para("id")].default === null) content = articles[get_para("id")].content.null;
    else if (langs[data.lang] in articles[get_para("id")].content) content = articles[get_para("id")].content[langs[data.lang]];
    else {
        content = articles[get_para("id")].content[articles[get_para("id")].default];
        new1 = document.createElement("p");
        new1.setAttribute("class", "warning");
        new1.innerHTML = word().not_supported;
        document.getElementById("article-content").appendChild(new1);
    }
    document.getElementById("article-title").innerHTML = content.title;
    new1 = document.createElement("div");
    new1.innerHTML = time_text(read_time(articles[get_para("id")].time));
    document.getElementById("article-info").appendChild(new1);
    new1 = document.createElement("div");
    new1.innerHTML = articles[get_para("id")].series;
    document.getElementById("article-info").appendChild(new1);
    document.getElementById("article-content").innerHTML += supertext(add_space(to_dom(read_file(content.location)).getElementsByTagName("content")[0].innerHTML, 12));
}

function set_bright(){
    const elm1 = ["logo", "lang", "bright"], elm2 = ["left", "right", "back"];
    for (let i = 0; i < elm1.length; i++) document.getElementById(`img-${elm1[i]}`).src = `ASSETS/UI/${elm1[i]}${data.bright}.png`;
    set_style("body", "backgroundColor", "#ffffff", "#000000");
    set_style("body", "color", "#000000", "#ffffff");
    set_style(".menu", "backgroundColor", "#00c0c0", "#0060c0");
    set_styles("a", "color", "#0080ff", "#00ffff");
    set_styles("table", "borderColor", "#000000", "#ffffff");
    set_styles("th", "borderColor", "#000000", "#ffffff");
    set_styles("td", "borderColor", "#000000", "#ffffff");
    set_styles(".menu-text2", "color", "#ffffffc0", "#ffffff80");
    set_styles(".highlight", "color", "#0080ff", "#00ffff");
    if (get_section() == 0){
        set_style(".home-window", "backgroundColor", "#00c0c0", "#0060c0");
        set_styles(".blog-lines", "backgroundColor", "#00c0c0", "#0060c0");
        set_styles(".blog-content", "backgroundColor", "#ffffff", "#000000");
    }
    if (get_section() == 3){
        if (get_para("id") === null) set_styles(".article-line", "backgroundColor", "#00c0c0", "#0060c0");
        else {
            for (let i = 0; i < elm2.length; i++) document.getElementById(`img-${elm2[i]}`).src = `ASSETS/UI/${elm2[i]}${data.bright + (i === 2 ? 0 : 2)}.png`;
            set_style(".article-page", "backgroundColor", "#00c0c0", "#0060c0");
            set_style(".article-body", "backgroundColor", "#ffffff", "#000000");
        }
    }
}

function set_math(){try {MathJax.typeset();} catch {}}

function refresh(){
    set_page();
    set_lang();
    [set_home, set_profile, set_projects, get_para("id") === null ? set_article_list : set_article_page][get_section()]();
    set_bright();
    set_math();
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

// PAGE FUNCTION

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

function view_article(id = null){
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

// MAIN

function main(){
    load_data();
    get_now();
    refresh();
}