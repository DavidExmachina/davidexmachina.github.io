// BASIC FUNCTION

function intdiv(a, b){return (a - a % b) / b;}

function sp(n){return " ".repeat(n);}

function z(n, d){return n.toString().padStart(d, "0");}

function replaceall(text, match, target){return text.split(match).join(target);}

function add_space(text, space){return space >= 0 ? replaceall(text, "\n", `\n${sp(space)}`) : replaceall(text, `\n${sp(-space)}`, "\n");}

function supertext(text){
    var result = text, old = text, match, cites = {};
    for(;;){
        match = result.match(/\${S\(([0-9]+)\)}/);
        if (match !== null) result = result.replace(match[0], "&nbsp;".repeat(match[1]));
        match = result.match(/\${C\(([0-9]+)\)}/);
        if (match !== null){
            if (match[1] in cites) cites[match[1]]++;
            else cites[match[1]] = 0;
            result = result.replace(match[0], `<sup><a id="goto${z(match[1], 4)}-${cites[match[1]]}" href="#cite${z(match[1], 4)}-${cites[match[1]]}">[${match[1]}]</a></sup>`);
        }
        if (result === old) break;
        old = result;
    }
    return result;
}

// READ FILE

function read_file(file){
    var req = new XMLHttpRequest(), result = null;
    req.open("GET", file, false);
    req.onreadystatechange = function (){if (req.readyState === 4 && [0, 200].includes(req.status)) result = req.responseText;}
    req.send(null);
    return result;
}

function to_dom(text){return new DOMParser().parseFromString(text, 'text/html');}

function word(){return data.words[data.langs[data.save.lang]];}

function fetch_page(name, lang, space = 0){
    var a = data.pages.getElementsByTagName("page");
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
    var a = data.blogs.getElementsByTagName("blog"), b = [];
    for (let i = 0; i < a.length; i++) b.push([0, a[i].attributes.time.value, a[i].hasAttribute("pinned"), a[i], i]);
    for (let i = 0; i < data.articles.length; i++) b.push([1, data.articles[i].time, false, null, i]);
    return b.sort(blog_comp);
}

// GET FUNCTION

function get_para(code){return new URLSearchParams(window.location.search).get(code);}

function get_section(){
    var section = get_para("section");
    return section === null ? "0" : section;
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

function get_series(id){
    var name = "";
    for (let i = 0; i < data.series.length; i++){
        if (data.series[i].list.indexOf(data.articles[id].id) >= 0){
            if (data.series[i].default === null) name = data.series[i].name.null
            else if (data.langs[data.save.lang] in data.series[i].name) name = data.series[i].name[data.langs[data.save.lang]];
            else name = data.series[i].name[data.series[i].default];
            return [name, data.series[i].list.indexOf(data.articles[id].id) + 1, data.series[i].list.length, i];
        }
    }
    return null;
}

// TIME FUNCTION

function get_now(){
    try {
        var timedata = JSON.parse(read_file("https://worldtimeapi.org/api/timezone/Etc/UTC"));
        data.now = timedata.unixtime * 1000 + Number(timedata.utc_datetime.split(".")[1].slice(0, 3));
    } catch {data.now = Date.now();}
}

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
    var d = (data.now - t) % 86400000;
    var n1 = data.now - d - t % 86400000, t1 = t - t % 86400000;
    var n2 = time_param(n1), t2 = time_param(t1); 
    var dt = [n2[0], n2[1], n2[2], intdiv(d, 3600000) % 24, intdiv(d, 60000) % 60, intdiv(d, 1000) % 60, d % 1000];
    var t3 = time_param(t + get_timezone());
    if (dt[2] < t2[2]){
        dt[2] += (Date.UTC(t2[0], t2[1], 1, 0, 0, 0, 0) - t1) / 86400000;
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

function set_style(select, key, dark, bright){document.querySelector(select).style[key] = (data.save.bright ? bright : dark);}

function set_styles(select, key, dark, bright){
    var target = document.querySelectorAll(select);
    for (let i = 0; i < target.length; i++) target[i].style[key] = (data.save.bright ? bright : dark);
}

function set_page(){
    var section = get_section();
    document.getElementsByTagName("html")[0].lang = data.langs[data.save.lang];
    document.getElementById("title").innerHTML = `David_Exmachina - ${["0", "1", "2", "3"].includes(section) ? word().menu[section] : word().menu_error}`;
    document.getElementsByTagName("body")[0].innerHTML = fetch_page("menu", "null", -8);
    for (let i = 0; i < 4; i++){
        document.getElementById(`m${i}`).className = `menu-button${section == i ? "-triggered" : ""}`;
        document.getElementById(`menu${i}`).innerHTML = (word().menu_text ? word().menu[i] : "");
    }
    document.getElementsByClassName("logo")[0].innerHTML = fetch_page("svg-logo", "null");
    document.getElementsByClassName("icon-lang")[0].innerHTML = fetch_page("svg-lang", "null");
    document.getElementsByClassName("icon-bright")[0].innerHTML = fetch_page("svg-" + (data.save.bright ? "sun" : "moon"), "null");
    document.getElementsByClassName("icon-bright")[0].setAttribute("title", word().color_theme);
}

function set_lang(){
    var newdiv = null, newp = null;
    document.getElementById("lang").innerHTML = word().lang;
    document.getElementById("lang-tab").className = `lang-button${data.save.bright}${data.lang_open ? "-triggered" : ""}`;
    document.getElementById("lang-window").innerHTML = "";
    if (data.lang_open){
        for (let i = 0; i < data.langs.length; i++){
            newdiv = document.createElement("div");
            newdiv.setAttribute("class", `lang-button${data.save.bright}${data.save.lang === i ? "-triggered" : ""}`);
            newdiv.setAttribute("onclick", `open_lang(${i});`);
            newp = document.createElement("p");
            newp.setAttribute("class", "lang-words");
            newp.innerHTML = data.words[data.langs[i]].lang;
            newdiv.appendChild(newp);
            document.getElementById("lang-window").appendChild(newdiv);
        }
    }
    set_styles(".lang-words", "color", "#00ffff", "#0080ff");
}

function set_content(){
    var section = get_section();
    if (!["0", "1", "2", "3"].includes(section)){
        set_error("not-exist");
        return;
    }
    [set_home, set_profile, set_projects, set_article][section]();
}

function set_home(){
    var blog_data = fetch_blog(), line, new1, new2, content, default_, contents, text, comment;
    document.getElementById("content").innerHTML = fetch_page("home-page", "null", -4);
    document.getElementById("home-right").innerHTML = fetch_page("home-right", data.langs[data.save.lang], 8);
    for (let i = 0; i < blog_data.length; i++){
        if (data.now < read_time(blog_data[i][1])) continue;
        line = to_dom(fetch_page("blog-lines", "null")).getElementsByTagName("div")[0];
        new1 = document.createElement("div");
        new1.innerHTML = time_text(read_time(blog_data[i][1]));
        line.querySelectorAll(".blog-info")[0].appendChild(new1);
        if (blog_data[i][2]){
            new1 = document.createElement("div");
            new1.setAttribute("class", "blog-pin");
            new2 = document.createElement("div");
            new2.innerHTML = word().pinned;
            new1.appendChild(new2);
            new2 = document.createElement("div");
            new2.innerHTML = fetch_page("svg-pin", "null");
            new1.appendChild(new2);
            line.querySelectorAll(".blog-info")[0].appendChild(new1);
        }
        if (blog_data[i][0] === 0){
            content = null, default_ = null;
            if (blog_data[i][3].hasAttribute("default")){
                contents = blog_data[i][3].getElementsByTagName("content");
                for (let j = 0; j < contents.length; j++){
                    if (contents[j].attributes.lang.value === blog_data[i][3].attributes.default.value) default_ = contents[j];
                    if (contents[j].attributes.lang.value === data.langs[data.save.lang]) content = contents[j];
                }
                if (content === null){
                    content = default_;
                    new1 = document.createElement("p");
                    new1.setAttribute("class", "warning");
                    new1.innerHTML = supertext(word().not_supported);
                    line.querySelectorAll(".blog-content")[0].appendChild(new1);
                }
            } else content = blog_data[i][3].getElementsByTagName("content")[0];
            text = content.getElementsByTagName("text")[0], comment = content.getElementsByTagName("comment");
            new1 = document.createElement("div");
            new1.setAttribute("class", "blog-text");
            new1.innerHTML = add_space(supertext(text.innerHTML), 4);
            line.querySelectorAll(".blog-content")[0].appendChild(new1);
            if (comment[0]){
                line.querySelectorAll(".blog-comment")[0].setAttribute("onclick", `check_comment(${blog_data[i][4]});`);
                line.querySelectorAll(".blog-comment")[0].innerHTML = word()[data.comment.includes(blog_data[i][4]) ? "hide_comments" : "view_comments"];
                if (data.comment.includes(blog_data[i][4])){
                    new1 = document.createElement("div");
                    new1.setAttribute("class", "blog-text");
                    new1.innerHTML = add_space(supertext(comment[0].innerHTML), 4);
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
        } else if (blog_data[i][0] === 1){
            if (data.articles[blog_data[i][4]].default === null) content = data.articles[blog_data[i][4]].content.null;
            else if (data.langs[data.save.lang] in data.articles[blog_data[i][4]].content) content = data.articles[blog_data[i][4]].content[data.langs[data.save.lang]];
            else content = data.articles[blog_data[i][4]].content[data.articles[blog_data[i][4]].default];
            new1 = document.createElement("div");
            new1.setAttribute("class", "blog-text");
            new2 = document.createElement("a");
            new2.setAttribute("href", `?section=3&id=${blog_data[i][4]}`);
            new2.innerHTML = content.title;
            new1.innerHTML = supertext(word().published_article.replace("${ARTICLE}", new2.outerHTML));
            line.querySelectorAll(".blog-content")[0].appendChild(new1);
            line.querySelectorAll(".blog-comment")[0].remove();
            line.querySelectorAll(".blog-content")[1].remove();
            line.innerHTML = line.innerHTML.split("\n").slice(0, -3).join("\n") + "\n" + sp(16);
            document.getElementById("blogs").innerHTML += "\n" + sp(16);
        }
        document.getElementById("blogs").appendChild(line);
    }
    document.getElementById("blogs").innerHTML = add_space(document.getElementById("blogs").innerHTML + "\n" + sp(12), 4);
    document.getElementById("icon-twitter").innerHTML = fetch_page("svg-twitter", "null");
    document.getElementById("icon-fandom").innerHTML = fetch_page("svg-fandom", "null");
}

function set_profile(){
    document.getElementById("content").innerHTML = fetch_page("profile-page", "null", -4);
    document.getElementById("profile").innerHTML = fetch_page("profile-content", data.langs[data.save.lang], 4);
}

function set_projects(){document.getElementById("content").innerHTML = fetch_page("project-placeholder", data.langs[data.save.lang], -4);}

function set_article(){
    var id = get_para("id");
    if (id === null){
        set_article_list();
        return;
    }
    if (id >= data.articles.length || data.now < read_time(data.articles[id].time)){
        set_error("not-exist");
        return;
    }
    set_article_page();
}

function set_article_list(){
    var content, line, new1, series_data;
    document.getElementById("content").innerHTML = fetch_page("article-list", "null", -4);
    for (let i = data.articles.length - 1; i >= 0; i--){
        if (data.now < read_time(data.articles[i].time)) continue;
        if (data.articles[i].default === null) content = data.articles[i].content.null;
        else if (data.langs[data.save.lang] in data.articles[i].content) content = data.articles[i].content[data.langs[data.save.lang]];
        else content = data.articles[i].content[data.articles[i].default];
        line = to_dom(fetch_page("article-lines", "null")).getElementsByTagName("div")[0];
        line.getElementsByClassName("article-line2")[0].setAttribute("onclick", `view_article(${i});`);
        line.querySelectorAll(".article-title")[0].innerHTML = content.title;
        new1 = document.createElement("div");
        new1.innerHTML = time_text(read_time(data.articles[i].time));
        line.querySelectorAll(".article-info")[0].appendChild(new1);
        new1 = document.createElement("div");
        series_data = get_series(i);
        if (series_data) new1.innerHTML = `${series_data[0]} (${series_data[1]}/${series_data[2]})`;
        line.querySelectorAll(".article-info")[0].appendChild(new1);
        document.getElementById("articles").appendChild(line);
        document.getElementById("articles").innerHTML += "\n" + sp(16);
    }
    document.getElementById("articles").innerHTML = add_space(document.getElementById("articles").innerHTML, 4).slice(0, -4);
}

function set_article_page(){
    var content, new1, file, series_data, cites, citetext, citenum, cite, left = null, right = null;
    document.getElementById("content").innerHTML = fetch_page("article-content", "null", -4);
    if (data.articles[get_para("id")].default === null) content = data.articles[get_para("id")].content.null;
    else if (data.langs[data.save.lang] in data.articles[get_para("id")].content) content = data.articles[get_para("id")].content[data.langs[data.save.lang]];
    else {
        content = data.articles[get_para("id")].content[data.articles[get_para("id")].default];
        new1 = document.createElement("p");
        new1.setAttribute("class", "warning");
        new1.innerHTML = word().not_supported;
        document.getElementById("article-content").appendChild(new1);
    }
    try {file = to_dom(read_file(content.location));} catch {file = null;}
    if (file === null) {
        set_error("disconnected");
        return;
    }
    document.getElementById("article-title").innerHTML = content.title;
    new1 = document.createElement("div");
    new1.innerHTML = time_text(read_time(data.articles[get_para("id")].time));
    document.getElementById("article-info").appendChild(new1);
    new1 = document.createElement("div");
    series_data = get_series(get_para("id"));
    if (series_data) new1.innerHTML = `${series_data[0]} (${series_data[1]}/${series_data[2]})`;
    document.getElementById("article-info").appendChild(new1);
    document.getElementById("article-content").innerHTML += supertext(add_space(file.getElementsByTagName("content")[0].innerHTML, 12));
    if (file.getElementsByTagName("citation").length){
        document.getElementById("article-content").innerHTML += "    <br>\n                    ";
        cites = file.getElementsByTagName("citation")[0].innerHTML.split("\n").slice(1, -1);
        for (let i = 0; i < cites.length; i++){
            citenum = 0;
            for (let j = 0; j < 10; j++){
                citetext = `<sup><a id="goto${z(i + 1, 4)}-${j}" href="#cite${z(i + 1, 4)}-${j}">[${i + 1}]</a></sup>`;
                if (!document.getElementById("article-content").innerHTML.includes(citetext)){citenum = j; break;}
            }
            if (!citenum) continue;
            cite = "    <p>${S(8)}";
            if (citenum === 1){
                document.getElementById("article-content").innerHTML = replaceall(document.getElementById("article-content").innerHTML, `${z(i + 1, 4)}-0`, z(i + 1, 4));
                cite += `<a id="cite${z(i + 1, 4)}" href="#goto${z(i + 1, 4)}">[${i + 1}]</a>`;
            } else {
                cite += `[${i + 1}]`;
                for (let j = 0; j < citenum; j++) cite += ` <a id="cite${z(i + 1, 4)}-${j}" href="#goto${z(i + 1, 4)}-${j}"><sup>${i + 1}.${j}</sup></a>`;
            }
            cite += ` ${cites[i].slice(12)}</p>\n                    `;
            document.getElementById("article-content").innerHTML += supertext(cite);
        }
    }
    if (series_data && series_data[1] > 1){
        for (let i = 0; i < data.articles.length; i++){
            if (data.articles[i].id === data.series[series_data[3]].list[series_data[1] - 2]){
                left = i;
                break;
            }
        }
    }
    if (series_data && series_data[1] < series_data[2]){
        for (let i = 0; i < data.articles.length; i++){
            if (data.articles[i].id === data.series[series_data[3]].list[series_data[1]]){
                right = i;
                break;
            }
        }
    }
    document.getElementById("article-left").innerHTML = fetch_page("svg-left", "null");
    document.getElementById("article-left").setAttribute("class", "article-" + (left === null ? "in" : "") + "active");
    document.getElementById("article-right").innerHTML = fetch_page("svg-right", "null");
    document.getElementById("article-right").setAttribute("class", "article-" + (right === null ? "in" : "") + "active");
    document.getElementById("article-back").innerHTML = fetch_page("svg-back", "null");
    document.getElementById("article-back").setAttribute("class", "article-active");
    document.getElementById("article-back").setAttribute("title", word().article_close);
    if (left !== null){
        document.getElementById("article-left").setAttribute("title", word().article_prev);
        document.getElementById("article-left").setAttribute("onclick", `view_article(${left});`);
    }
    if (right !== null){
        document.getElementById("article-right").setAttribute("title", word().article_next);
        document.getElementById("article-right").setAttribute("onclick", `view_article(${right});`);
    }
    set_styles(".svg-left", "fill", "#ffffff" + (left === null ? "80" : ""), "#ffffff" + (left === null ? "80" : ""));
    set_styles(".svg-right", "fill", "#ffffff" + (right === null ? "80" : ""), "#ffffff" + (right === null ? "80" : ""));
}

function set_bright(){
    set_style("body", "backgroundColor", "#000000", "#ffffff");
    set_style("body", "color", "#ffffff", "#000000");
    set_style(".menu", "backgroundColor", "#0060c0", "#00c0c0");
    set_styles("a", "color", "#00ffff", "#0080ff");
    set_styles("table", "borderColor", "#ffffff", "#000000");
    set_styles("th", "borderColor", "#ffffff", "#000000");
    set_styles("td", "borderColor", "#ffffff", "#000000");
    set_styles(".svg-theme", "fill", "#00ffff", "#0080ff");
    set_styles(".svg-pin", "fill", "#ffffff", "#000000");
    set_styles(".menu-text2", "color", "#ffffff80", "#ffffffc0");
    set_styles(".highlight", "color", "#00ffff", "#0080ff");
    set_styles(".home-link", "color", "#ffffff", "#000000");
    if (get_section() == 0){
        set_style(".home-window", "backgroundColor", "#0060c0", "#00c0c0");
        set_styles(".blog-lines", "backgroundColor", "#0060c0", "#00c0c0");
        set_styles(".blog-content", "backgroundColor", "#000000", "#ffffff");
    }
    if (get_section() == 3){
        if (get_para("id") === null) set_styles(".article-line", "backgroundColor", "#0060c0", "#00c0c0");
        else if (document.getElementsByClassName("article-page").length){
            set_style(".article-page", "backgroundColor", "#0060c0", "#00c0c0");
            set_style(".article-body", "backgroundColor", "#000000", "#ffffff");
        }
    }
}

function set_math(){try {MathJax.typeset();} catch {}}

function set_error(code){document.getElementById("content").innerHTML = fetch_page(`error-${code}`, data.langs[data.save.lang], -4);}

function refresh(){
    set_page();
    set_lang();
    set_content();
    set_bright();
    set_math();
}

// MANAGE DATA

function save_data(){localStorage.setItem("data", JSON.stringify(data.save));}

function load_data(){
    var d = JSON.parse(localStorage.getItem("data"));
    if (d === null){
        data.save.lang = get_lang();
        save_data();
    } else data.save = d;
}

function change_lang(lang){
    data.save.lang = lang;
    data.comment = [];
    refresh();
    save_data();
}

function change_bright(){
    data.save.bright = 1 - data.save.bright;
    refresh();
    save_data();
}

// PAGE FUNCTION

function open_lang(set = null){
    if (set === null){
        data.lang_open = !data.lang_open;
        set_lang();
    } else if (data.lang_open && data.save.lang !== set){
        data.lang_open = false;
        set_lang();
        change_lang(set);
    }
}

function change_section(n = 0){
    if (get_section() == n) return;
    window.history.replaceState(null, null, "?section=" + n);
    data.lang_open = false;
    data.comment = [];
    refresh();
}

function check_comment(id){
    if (data.comment.includes(id)) data.comment = data.comment.filter(function (n){return n !== id});
    else data.comment.push(id);
    data.comment.sort();
    refresh();
}

function view_article(id = null){
    if (get_para("id") == id) return;
    window.history.replaceState(null, null, "?section=3" + (id === null ? "" : "&id=" + id));
    data.lang_open = false;
    data.comment = [];
    refresh();
}

// DATA

var data = {
    save        : {
        lang : 0,
        bright : 0
    },
    langs       : ["en", "zh-Hans", "zh-Hant", "jp"],
    pages       : to_dom(read_file("ASSETS/SYSTEM/pages.html")),
    words       : JSON.parse(read_file("ASSETS/SYSTEM/words.json")),
    blogs       : to_dom(read_file("ASSETS/POSTS/blogs.html")),
    articles    : JSON.parse(read_file("ASSETS/POSTS/articles.json")),
    series      : JSON.parse(read_file("ASSETS/POSTS/series.json")),
    now         : 0,
    lang_open   : false,
    comment     : [],
};

// MAIN

function main(){
    load_data();
    get_now();
    refresh();
}