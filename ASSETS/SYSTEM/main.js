// BASIC FUNCTION

function intdiv(a, b){return (a - a % b) / b;}

function sp(n){return " ".repeat(n);}

function z(n, d){return n.toString().padStart(d, "0");}

function replaceall(text, match, target){return text.split(match).join(target);}

function add_space(text, space){return space >= 0 ? replaceall(text, "\n", `\n${sp(space)}`) : replaceall(text, `\n${sp(-space)}`, "\n");}

function supertext(text){
    var result = text, old = text, match, cites = {};
    for (;;){
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
    req.onreadystatechange = function (){if (req.readyState === 4 && [0, 200].includes(req.status)) result = req.responseText;};
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
    for (let i = 0; i < a.length; i++) b.push([a[i].attributes.category.value, a[i].attributes.time.value, a[i].hasAttribute("pinned"), a[i], i]);
    for (let i = 0; i < data.articles.length; i++) b.push(["article", data.articles[i].time, false, null, data.articles[i].id]);
    return b.sort(blog_comp);
}

// GET FUNCTION

function get_para(code){return new URLSearchParams(window.location.search).get(code);}

function get_section(){
    var section = get_para("section");
    return section === null ? "0" : section;
}

function get_category(){
    var category = get_para("category");
    return category === null ? "" : category;
}

function get_id(){
    var id = get_para("id");
    return id === null ? -1 : parseInt(id);
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
    for (let i = 0; i < data.categories.series.length; i++){
        if (data.categories.series[i].list.indexOf(id) >= 0){
            if (data.categories.series[i].default === null) name = data.categories.series[i].name.null
            else if (data.langs[data.save.lang] in data.categories.series[i].name) name = data.categories.series[i].name[data.langs[data.save.lang]];
            else name = data.categories.series[i].name[data.categories.series[i].default];
            return [name, data.categories.series[i].list.indexOf(id) + 1, data.categories.series[i].list.length, i];
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
        dt[1]--;
    } else dt[2] -= t2[2];
    if (dt[1] < t2[1]){
        dt[1] += 12 - t2[1];
        dt[0]--;
    } else dt[1] -= t2[1];
    dt[0] -= t2[0];
    return `${now_text(t3)} (${ago_text(dt)})`;
}

// SCROLL FUNCTION

function get_scroll_top(){return Math.max(document.body.scrollTop, document.documentElement.scrollTop);}

function set_scroll_top(y){
    document.body.scrollTop = y;
    document.documentElement.scrollTop = y;
}

// UPDATE FUNCTION

function update_math(){
    try {MathJax.typeset();}
    catch {
        var command = function (){
            set_content();
            try {MathJax.typeset();} catch {}
        };
        setTimeout(command, 1000);
    }
}

function update_top(){
    document.getElementById("top").style.display = get_scroll_top() >= 500 ? "block" : "none";
    document.getElementById("top").style.opacity = Math.min(Math.max(get_scroll_top() - 500, 0), 500) / 500;
}

function update_logo(){
    document.querySelector(".logo2").style.height = Math.max(Math.min(1152 - window.innerWidth, 64), 0) + "px";
}

function update_menu(){
    var button = ["HOME", "PROFILE", "PROJECTS", "ARTICLES"];
    var state = window.innerWidth >= 832 ? 1 : window.innerWidth >= 448 ? 2 : 3;
    var section = get_section();
    var line, new1, k;
    if (data.menu_state !== state){
        data.menu_state = state;
        document.querySelector(".menu").innerHTML = "";
        for (let i = 0; i < 2 ** (state - 1); i++){
            line = document.createElement("div");
            line.setAttribute("class", "menu-line");
            for (let j = 0; j < 2 ** (3 - state); j++){
                k = i * 2 ** (3 - state) + j
                new1 = document.createElement("div");
                new1.setAttribute("class", "menu-split");
                line.appendChild(new1);
                new1 = to_dom(fetch_page("menu-button", "null")).querySelector("div");
                new1.setAttribute("class", `menu-button${section == k ? "-triggered" : ""}`);
                new1.setAttribute("onclick", `change_section(${k});`);
                new1.querySelector(".menu-text1").innerHTML = button[k];
                new1.querySelector(".menu-text2").innerHTML = word().menu_text ? word().menu[k] : "";
                line.appendChild(new1);
            }
            new1 = document.createElement("div");
            new1.setAttribute("class", "menu-split");
            line.appendChild(new1);
            document.querySelector(".menu").appendChild(line);
        }
    }
}

function update_home(){
    var state = window.innerWidth >= 1024 ? 1 : data.home_right ? 3 : 2;
    if (data.content_state !== state){
        data.content_state = state;
        var blog_data = fetch_blog(), line, new1, new2, article, content, default_, contents, text, comment, width;
        document.querySelector(".content").innerHTML = fetch_page("home-page" + (state > 1 ? state : ""), "null", -4);
        for (let i = 0; i < blog_data.length; i++){
            if (get_category() !== "" && blog_data[i][0] !== get_category()) continue;
            if (data.now < read_time(blog_data[i][1])) continue;
            line = to_dom(fetch_page("blog-lines", "null")).querySelector("div");
            new1 = document.createElement("div");
            new1.innerHTML = `${time_text(read_time(blog_data[i][1]))} - ${data.categories.blogs[blog_data[i][0]][data.langs[data.save.lang]]}`;
            line.querySelector(".blog-info").appendChild(new1);
            if (blog_data[i][2]){
                new1 = document.createElement("div");
                new1.setAttribute("class", "blog-pin");
                new2 = document.createElement("div");
                new2.innerHTML = word().pinned;
                new1.appendChild(new2);
                new2 = document.createElement("div");
                new2.innerHTML = fetch_page("svg-pin", "null");
                new1.appendChild(new2);
                line.querySelector(".blog-info").appendChild(new1);
            }
            if (blog_data[i][0] === "article"){
                for (let j = 0; j < data.articles.length; j++) if (data.articles[j].id === blog_data[i][4]){
                    article = data.articles[j];
                    break;
                }
                if (article.default === null) content = article.content.null;
                else if (data.langs[data.save.lang] in article.content) content = article.content[data.langs[data.save.lang]];
                else content = article.content[article.default];
                new1 = document.createElement("p");
                new2 = document.createElement("a");
                new2.setAttribute("href", `?section=3&id=${blog_data[i][4]}`);
                new2.innerHTML = content.title;
                new1.innerHTML = supertext(word().published_article.replace("${ARTICLE}", new2.outerHTML));
                line.querySelector(".blog-content").appendChild(new1);
            } else {
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
                        line.querySelector(".blog-content").appendChild(new1);
                    }
                } else content = blog_data[i][3].getElementsByTagName("content")[0];
                text = content.getElementsByTagName("text")[0], comment = content.getElementsByTagName("comment");
                line.querySelector(".blog-content").innerHTML = add_space(supertext(text.innerHTML), 4);
                if (comment[0]){
                    line.querySelector(".blog-content").innerHTML += sp(4);
                    new1 = document.createElement("div");
                    new1.setAttribute("class", "blog-comment" + (data.comment.includes(blog_data[i][4]) ? "-triggered" : ""));
                    new1.setAttribute("onclick", `check_comment(${blog_data[i][4]});`);
                    new1.setAttribute("title", word()[(data.comment.includes(blog_data[i][4]) ? "hide" : "view") + "_comments"]);
                    new1.innerHTML = fetch_page("svg-comment", "null");
                    line.querySelector(".blog-content").appendChild(new1);
                    line.querySelector(".blog-content").innerHTML += data.comment.includes(blog_data[i][4]) ? add_space(supertext(comment[0].innerHTML), 4) : "\n" + sp(20);
                }
            }
            document.getElementById("blogs").innerHTML += "\n" + sp(16);
            document.getElementById("blogs").appendChild(line);
        }
        document.getElementById("blogs").innerHTML = add_space(document.getElementById("blogs").innerHTML + "\n" + sp(12), 4);
        document.querySelector(".home-window").innerHTML = fetch_page("home-right", data.langs[data.save.lang], 8);
        document.getElementById("icon-twitter").innerHTML = fetch_page("svg-twitter", "null");
        document.getElementById("icon-fandom").innerHTML = fetch_page("svg-fandom", "null");
        for (let i = 0; i < document.querySelectorAll(".home-link").length; i++){
            document.querySelectorAll(".home-link")[i].setAttribute("onclick", "change_home_right();")
        }
        document.querySelector(".home-window").innerHTML += sp(4);
        new1 = document.createElement("br");
        document.querySelector(".home-window").appendChild(new1);
        document.querySelector(".home-window").innerHTML += "\n" + sp(24);
        new1 = document.createElement("p");
        new1.innerHTML = word().category;
        document.querySelector(".home-window").appendChild(new1);
        document.querySelector(".home-window").innerHTML += "\n" + sp(20);
        for (let i = 0; i < Object.keys(data.categories.blogs).length; i++){
            document.querySelector(".home-window").innerHTML += sp(4);
            new1 = document.createElement("div");
            new1.setAttribute("class", "home-category" + (get_category() === Object.keys(data.categories.blogs)[i] ? "-triggered" : ""));
            new1.setAttribute("onclick", `change_category("${Object.keys(data.categories.blogs)[i]}");`);
            new1.innerHTML = data.categories.blogs[Object.keys(data.categories.blogs)[i]][data.langs[data.save.lang]];
            document.querySelector(".home-window").appendChild(new1);
            document.querySelector(".home-window").innerHTML += "\n" + sp(20);
        }
        if (document.querySelector(".home-right2") !== null){
            width = 32 + document.documentElement.clientWidth - window.innerWidth;
            width += Math.min(Math.max(window.innerWidth / 2, 160), 192) - 160;
            document.querySelector(".home-right2").style.width = `${width}px`;
            document.querySelector(".home-right2").style["margin-right"] = `-${width}px`;
        }
        update_math();
    }
}

function update_profile(){
    var state = window.innerWidth >= 1024 ? 1 : 2;
    if (data.content_state !== state){
        data.content_state = state;
        document.querySelector(".content").innerHTML = fetch_page("profile-page" + (state > 1 ? state : ""), "null", -4);
        document.getElementById("profile").innerHTML = fetch_page("profile-content", data.langs[data.save.lang], 4);
    }
}

function update_article(){
    var state = window.innerWidth >= 1024 ? 1 : 2;
    if (data.content_state !== state){
        data.content_state = state;
        for (let i = 0; i < document.querySelectorAll(".category-text").length; i++){
            document.querySelectorAll(".category-text")[i].style.display = ["", "block", "none"][state];
        }
    }
}

function update(){
    var section = get_section();
    update_logo();
    update_menu();
    if (section == 0) update_home();
    if (section == 1) update_profile();
    if (section == 3) update_article();
}

// SET FUNCTION

function set_page(){
    var section = get_section();
    document.getElementsByTagName("html")[0].lang = data.langs[data.save.lang];
    document.getElementById("title").innerHTML = `David_Exmachina - ${["0", "1", "2", "3"].includes(section) ? word().menu[section] : word().menu_error}`;
    document.getElementsByTagName("body")[0].innerHTML = fetch_page("menu", "null", -8);
    document.querySelector(".logo3").innerHTML = fetch_page("svg-logo", "null");
    document.querySelector(".icon-lang").innerHTML = fetch_page("svg-lang", "null");
    document.getElementById("icon-bright").setAttribute("title", word().color_theme);
    document.getElementById("top").innerHTML = fetch_page("svg-top", "null");
    document.getElementById("top").setAttribute("title", word().to_top);
    update_logo();
    update_menu();
}

function set_lang(){
    var newdiv = null, newp = null;
    document.getElementById("lang").innerHTML = word().lang;
    document.getElementById("lang-tab").className = `lang-button${data.lang_open ? "-triggered" : ""}`;
    document.getElementById("lang-window").innerHTML = "";
    if (data.lang_open){
        for (let i = 0; i < data.langs.length; i++){
            newdiv = document.createElement("div");
            newdiv.setAttribute("class", `lang-button${data.save.lang === i ? "-triggered" : ""}`);
            newdiv.setAttribute("onclick", `open_lang(${i});`);
            newp = document.createElement("p");
            newp.setAttribute("class", "lang-words");
            newp.innerHTML = data.words[data.langs[i]].lang;
            newdiv.appendChild(newp);
            document.getElementById("lang-window").appendChild(newdiv);
        }
    }
}

function set_content(){
    var section = get_section();
    if (!["0", "1", "2", "3"].includes(section)) set_error("not-exist");
    else [update_home, update_profile, set_projects, set_article][section]();
}

function set_projects(){document.querySelector(".content").innerHTML = fetch_page("project-placeholder", data.langs[data.save.lang], -4);}

function set_article(){
    var article = null;
    if (get_id() === -1){
        set_article_list();
        return;
    }
    for (let i = 0; i < data.articles.length; i++) if (data.articles[i].id == get_id()){
        article = data.articles[i];
        break;
    }
    if (article === null ? true : data.now < read_time(article.time)){
        set_error("not-exist");
        return;
    }
    set_article_page();
}

function set_article_list(){
    category = get_category();
    var category, key, line, content, new1, series_data;
    document.querySelector(".content").innerHTML = fetch_page("article", "null", -4);
    document.getElementById("categories").innerHTML += "\n" + sp(12);
    for (let i = 0; i < Object.keys(data.categories.articles).length; i++){
        key = Object.keys(data.categories.articles)[i];
        line = to_dom(fetch_page("article-category", "null")).querySelector("div");
        line.querySelector("#category-button").setAttribute("class", "category2" + (category === key ? "-triggered" : ""));
        line.querySelector("#category-button").setAttribute("onclick", `change_category("${key}");`);
        line.querySelector(".category-icon").innerHTML = fetch_page("svg-article-" + (key === "" ? "all" : key), "null");
        line.querySelector(".category-text").innerHTML = data.categories.articles[key][data.langs[data.save.lang]];
        document.getElementById("categories").innerHTML += sp(4);
        document.getElementById("categories").appendChild(line);
        document.getElementById("categories").innerHTML += "\n" + sp(12);
    }
    for (let i = data.articles.length - 1; i >= 0; i--){
        if (data.now < read_time(data.articles[i].time)) continue;
        if (category !== "" && category !== data.articles[i].category) continue;
        if (data.articles[i].default === null) content = data.articles[i].content.null;
        else if (data.langs[data.save.lang] in data.articles[i].content) content = data.articles[i].content[data.langs[data.save.lang]];
        else content = data.articles[i].content[data.articles[i].default];
        line = to_dom(fetch_page("article-lines", "null", 4)).querySelector("div");
        line.querySelector(".article-line2").setAttribute("onclick", `view_article(${data.articles[i].id});`);
        line.querySelector(".article-title").innerHTML = content.title;
        new1 = document.createElement("div");
        new1.setAttribute("style", "margin-right: 16px;");
        new1.innerHTML = `${time_text(read_time(data.articles[i].time))} - ${data.categories.articles[data.articles[i].category][data.langs[data.save.lang]]}`;
        line.querySelector(".article-info").appendChild(new1);
        new1 = document.createElement("div");
        series_data = get_series(data.articles[i].id);
        if (series_data) new1.innerHTML = `${series_data[0]} (${series_data[1]}/${series_data[2]})`;
        line.querySelector(".article-info").appendChild(new1);
        document.querySelector(".article-list").innerHTML += sp(4);
        document.querySelector(".article-list").appendChild(line);
        document.querySelector(".article-list").innerHTML += "\n" + sp(16);
    }
    update_article();
}

function set_article_page(){
    var article, content, new1, file, series_data, cites, citetext, citenum, cite, left = null, right = null;
    for (let i = 0; i < data.articles.length; i++) if (data.articles[i].id == get_id()){
        article = data.articles[i];
        break;
    }
    document.querySelector(".content").innerHTML = fetch_page("article-content", "null", -4);
    if (article.default === null) content = article.content.null;
    else if (data.langs[data.save.lang] in article.content) content = article.content[data.langs[data.save.lang]];
    else {
        content = article.content[article.default];
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
    document.querySelector(".article-title").innerHTML = content.title;
    new1 = document.createElement("div");
    new1.setAttribute("style", "margin-right: 16px;");
    new1.innerHTML = `${time_text(read_time(article.time))} - ${data.categories.articles[article.category][data.langs[data.save.lang]]}`;
    document.getElementById("article-info").appendChild(new1);
    new1 = document.createElement("div");
    series_data = get_series(get_id());
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
            cite += ` ${cites[i].slice(12)}</p>\n${sp(20)}`;
            document.getElementById("article-content").innerHTML += supertext(cite);
        }
    }

    if (series_data && series_data[1] > 1){
        for (let i = 0; i < data.articles.length; i++){
            if (data.articles[i].id === data.categories.series[series_data[3]].list[series_data[1] - 2]){
                left = data.articles[i].id;
                break;
            }
        }
    }
    if (series_data && series_data[1] < series_data[2]){
        for (let i = 0; i < data.articles.length; i++){
            if (data.articles[i].id === data.categories.series[series_data[3]].list[series_data[1]]){
                right = data.articles[i].id;
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
    document.querySelector(".svg-left").style.opacity = 1 / (1 + (left === null));
    document.querySelector(".svg-right").style.opacity = 1 / (1 + (right === null));
}

function set_var(v, dark, bright = dark){document.querySelector(":root").style.setProperty("--" + v, data.save.bright ? bright : dark);}

function set_bright(){
    document.getElementById("icon-bright").innerHTML = fetch_page("svg-" + (data.save.bright ? "sun" : "moon"), "null");
    set_var("theme-back", "#000000", "#ffffff");
    set_var("theme-font", "#ffffff", "#000000");
    set_var("theme-ui", "#00ffff", "#0080ff");
    set_var("theme-lang", "#40ffff", "#0060c0");
    set_var("theme-window", "#0060c0", "#00c0c0");
    set_var("theme-transition1", "#00ffff00", "#0080ff00");
    set_var("theme-transition2", "#00ffff40", "#0080ff40");
    set_var("theme-transition3", "#00ffff80", "#0080ff80");
}

function set_error(code){document.querySelector(".content").innerHTML = fetch_page(`error-${code}`, data.langs[data.save.lang], -4);}

function refresh(special = 0){
    var y = get_scroll_top();
    data.menu_state = 0;
    data.content_state = 0;
    if (special < 1) data.home_right = false;
    if (special < 2) set_page();
    set_lang();
    set_content();
    set_bright();
    update_math();
    update_top();
    set_scroll_top(y);
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
    refresh(1);
    save_data();
}

function change_bright(){
    data.save.bright = 1 - data.save.bright;
    refresh(2);
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

function to_top(){
    var scroll, command;
    scroll = get_scroll_top();
    for (let i = 0; i < 50; i++){
        command = function (){set_scroll_top(scroll * (49 - i) ** 4 / 6250000);};
        setTimeout(command, (i + 1) * 10);
    }
}

function change_section(n = 0){
    if (get_section() == n) return;
    window.history.replaceState(null, null, "?section=" + n);
    data.lang_open = false;
    data.comment = [];
    refresh();
}

function change_category(category = ""){
    if (get_category() === category) return;
    window.history.replaceState(null, null, "?section=" + get_section() + (category === "" ? "" : "&category=" + category));
    refresh();
}

function change_home_right(){
    data.home_right = !data.home_right;
    refresh(1);
}

function check_comment(id){
    if (data.comment.includes(id)) data.comment = data.comment.filter(function (n){return n !== id});
    else data.comment.push(id);
    data.comment.sort();
    refresh();
}

function view_article(id = null){
    if (get_id() == id) return;
    window.history.replaceState(null, null, "?section=3" + (get_category() === "" ? "" : "&category=" + get_category()) + (id === null ? "" : "&id=" + id));
    data.lang_open = false;
    data.comment = [];
    refresh();
    set_scroll_top(0);
}

// DATA

var data = {
    save            : {
        lang    : 0,
        bright  : 0,
    },
    langs           : ["en", "zh-Hans", "zh-Hant", "jp"],
    pages           : to_dom(read_file("ASSETS/SYSTEM/pages.html")),
    words           : JSON.parse(read_file("ASSETS/SYSTEM/words.json")),
    blogs           : to_dom(read_file("ASSETS/POSTS/blogs.html")),
    articles        : JSON.parse(read_file("ASSETS/POSTS/articles.json")),
    categories      : JSON.parse(read_file("ASSETS/POSTS/categories.json")),
    now             : 0,
    lang_open       : false,
    menu_state      : 0,
    content_state   : 0,
    comment         : [],
    home_right      : false,
};

// MAIN

function main(){
    load_data();
    get_now();
    refresh();
}

window.onscroll = update_top;
window.onresize = update;
window.onload = main;