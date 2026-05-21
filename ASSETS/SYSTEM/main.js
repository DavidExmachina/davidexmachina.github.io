"use strict";

// BASIC FUNCTIONS

function intdiv(a, b){return (a - a % b) / b;}

function sp(n){return " ".repeat(n);}

function z(n, d){return n.toString().padStart(d, "0");}

function replaceall(text, match, target){return text.split(match).join(target);}

function add_space(text, space){
    if (space >= 0) return replaceall(text, "\n", `\n${sp(space)}`);
    return replaceall(text, `\n${sp(-space)}`, "\n");
}

function color_code(r, g, b, a = 255){
    let result = "#";
    for (let i = 0; i < 4; i++){
        if (i === 3 && a >= 255) continue;
        result += z(Math.min(Math.floor([r, g, b, a][i]), 255).toString(16), 2);
    }
    return result;
}

function to_dom(text){return new DOMParser().parseFromString(text, "text/html");}

function clone(obj){
    if (typeof obj !== "object") return obj;
    let result, k;
    if (Array.isArray(obj)){
        result = [];
        for (let i = 0; i < obj.length; i++) result.push(clone(obj[i]));
    } else {
        result = {};
        k = Object.keys(obj);
        for (let i = 0; i < k.length; i++) result[k[i]] = clone(obj[k[i]]);
    }
    return result;
}

function ec(a){return btoa(encodeURIComponent(a)).replace("=", "").replace("=", "");}

function dc(a){return decodeURIComponent(atob(a));}

// ABBREVIATIONS

function lang(){return data.constant.langs[data.save.lang];}

function words(){return data.assets.words[lang()];}

function articles(){return data.assets.articles;}

function series(){return data.assets.categories.series;}

// ADVANCED FUNCTIONS

async function read_file(url, raw = false){
    let content = await fetch(url);
    if (!content.ok) return null;
    content = await content.text();
    if (raw || ccc.db()) return content;
    return ccc.pr(content, url);
}

function supertext(text){
    let result = text, old = text, match, cites = {}, cite, button;
    for (;;){
        match = result.match(/\${S\(([0-9]+)\)}/);
        if (match !== null) result = result.replace(match[0], "&nbsp;".repeat(match[1]));
        match = result.match(/\${C\(([0-9]+)\)}/);
        if (match !== null){
            if (match[1] in cites) cites[match[1]]++;
            else cites[match[1]] = 0;
            cite = `<sup><a id="goto${z(match[1], 4)}-${cites[match[1]]}" `;
            cite += `href="#cite${z(match[1], 4)}-${cites[match[1]]}">[${match[1]}]</a></sup>`;
            result = result.replace(match[0], cite);
        }
        match = result.match(/\${E}/);
        if (match !== null){
            button = `<div class="expand-button button1" onclick="expand_or_collapse(this);">`;
            button += `[${words().article_expand}]</div>`;
            result = result.replace(match[0], button);
        }
        if (result === old) break;
        old = result;
    }
    return result;
}

function fetch_page(name, lang, space = 0){
    let a = data.assets.pages.getElementsByTagName("page"), b = null;
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

function page_validity(page){
    try {Number(page)} catch {return false;}
    if (!Number.isInteger(Number(page))) return false;
    if (Number(page) <= 0) return false;
    if (Number(page) > get_max_page()) return false;
    return true;
}

function in_series(category){
    if (category === "series") return true;
    if (category === "") return false;
    if (category === null) return false;
    return Number.isInteger(Number(category));
}

// GET FUNCTION

function get_para(code, url = null){
    return new URLSearchParams(url === null ? window.location.search : url).get(code);
}

function get_section(url = null){
    let section = get_para("section", url);
    return section === null ? "0" : section;
}

function get_category(url = null){
    let category = get_para("category", url);
    return category === null ? "" : category;
}

function get_page(url = null){
    let page = get_para("page", url);
    return page === null ? 1 : Number(page);
}

function get_id(url = null){
    let id = get_para("id", url);
    return id === null ? -1 : Number(id);
}

function get_lang(){
    let lan = navigator.language.toLowerCase();
    if (lan.includes("ja")) return 3;
    if (!lan.includes("zh")) return 0;
    if (lan.includes("hant")) return 2;
    if (lan.includes("hk")) return 2;
    if (lan.includes("mo")) return 2;
    if (lan.includes("tw")) return 2;
    return 1;
}

function get_blogs(all = false){
    let a = data.assets.blogs.getElementsByTagName("blog"), b = [], k, result = [], p;
    for (let i = 0; i < a.length; i++) b.push([
        a[i].attributes.category.value,
        a[i].attributes.time.value,
        a[i].hasAttribute("pinned"),
        a[i],
        i,
    ]);
    k = Object.keys(articles());
    for (let i = 0; i < k.length; i++){
        b.push(["article", articles()[k[i]].time, false, null, k[i]]);
    }
    b = b.sort(blog_comp);
    for (let i = 0; i < b.length; i++){
        if (get_category() !== "" && b[i][0] !== get_category()) continue;
        if (data.time.now < read_time(b[i][1], true) && !ccc.db()) continue;
        result.push(b[i]);
    }
    p = data.constant.blog_page;
    if (!all) result = result.slice((get_page() - 1) * p).slice(0, p);
    return result;
}

function get_articles(all = false){
    let k = Object.keys(articles()).toReversed(), result = [], p;
    let category = get_category(), ins = in_series(category);
    if (ins) k = k.toReversed();
    for (let i = 0; i < k.length; i++){
        if (data.time.now < read_time(articles()[k[i]].time, true) && !ccc.db()) continue;
        if (!ins && category !== "" && category !== articles()[k[i]].category) continue;
        if (ins && category !== "series"){
            if (!series()[get_category()].list.includes(Number(k[i]))) continue;
        }
        result.push([k[i], articles()[k[i]]]);
    }
    p = data.constant.article_page;
    if (!all) result = result.slice((get_page() - 1) * p).slice(0, p);
    return result;
}

function get_article_data(id){
    if (!(id in articles())) return null;
    let article = articles()[id];
    if (data.time.now < read_time(article.time, true) && !ccc.db()) return null;
    return article;
}

function get_series(all = false){
    let k = Object.keys(series()), result = [], r, p;
    for (let i = 0; i < k.length; i++){
        r = [];
        for (let j = 0; j < series()[k[i]].list.length; j++){
            if (get_article_data(series()[k[i]].list[j]) !== null) r.push(series()[k[i]].list[j]);
        }
        if (r.length) result.push([k[i], series()[k[i]], r]);
    }
    p = data.constant.article_page;
    if (!all) result = result.slice((get_page() - 1) * p).slice(0, p);
    return result;
}

function get_series_data(id){
    if (!get_article_data(id)) return null;
    let all_series = get_series(true), name = "", d, result;
    for (let i = 0; i < all_series.length; i++) if (all_series[i][2].indexOf(id) >= 0){
        d = all_series[i][1].default;
        if (d === null) name = all_series[i][1].name.null;
        else if (lang() in all_series[i][1].name) name = all_series[i][1].name[lang()];
        else name = all_series[i][1].name[d];
        result = [name, all_series[i][2].indexOf(id) + 1, all_series[i][2].length];
        result.push(result[1] > 1 ? all_series[i][2][result[1] - 2] : null);
        result.push(result[1] < result[2] ? all_series[i][2][result[1]] : null);
        return result;
    }
    return null;
}

function get_max_page(){
    let section = get_section();
    let f = function (a, b){return intdiv(Math.max(a(true).length - 1, 0), data.constant[b]) + 1};
    if (section == 0) return f(get_blogs, "blog_page");
    if (section == 3){
        return f(get_category() === "series" ? get_series : get_articles, "article_page");
    }
    return 1;
}

// TIME FUNCTION

async function get_now(){
    let timedata, t1 = null, t2;
    try {
        timedata = await read_file("https://www.cloudflare.com/cdn-cgi/trace", true);
        t1 = Number(timedata.split("\n")[3].slice(3, -4)) * 1000;
    } catch {}
    t2 = Date.now();
    if (t1 === null) data.time.now = t2;
    else {
        data.time.now = t1;
        data.time.offset = t2 - t1;
    }
    data.time.active = true;
}

function get_timezone(){return new Date().getTimezoneOffset() * -60000;}

function read_time(t, forced = false){
    let a = replaceall(replaceall(replaceall(t, "-", " "), ":", " "), ".", " ").split(" ");
    if ((data.states.af === 2026) && !forced){
        let r = Math.random();
        a[0] = Number(a[0]);
        if (0.00 <= r && r < 0.50) a[0] += Math.floor(r * 4000 - 2000, 0);
        if (0.50 <= r && r < 0.75) a[0] += Math.floor(r * 8000 - 4000, 0);
        if (0.75 <= r && r < 1.00) a[0] += Math.floor(r * 16000 - 10000, 0);
        a[0] = a[0].toString();
    }
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

function time_delta(a, b){
    let d = (a - b) % 86400000;
    let n1 = a - d - b % 86400000, t1 = b - b % 86400000;
    let n2 = time_param(n1), t2 = time_param(t1);
    let dt = [
        n2[0],
        n2[1],
        n2[2],
        intdiv(d, 3600000) % 24,
        intdiv(d, 60000) % 60,
        intdiv(d, 1000) % 60, d % 1000,
    ];
    if (dt[2] < t2[2]){
        dt[2] += (Date.UTC(t2[0], t2[1], 1, 0, 0, 0, 0) - t1) / 86400000;
        dt[1]--;
    } else dt[2] -= t2[2];
    if (dt[1] < t2[1]){
        dt[1] += 12 - t2[1];
        dt[0]--;
    } else dt[1] -= t2[1];
    dt[0] -= t2[0];
    return dt;
}

function now_text(t){
    let result = words().time_text;
    result = result.replace("${YEAR}", t[0]);
    result = result.replace("${MONTH}", words().months[t[1] - 1]);
    result = result.replace("${DAY}", z(t[2], 2));
    result = result.replace("${HOUR}", z(t[3], 2));
    result = result.replace("${MINUTE}", z(t[4], 2));
    result = result.replace("${SECOND}", z(t[5], 2));
    result = result.replace("${MILLISECOND}", z(t[6], 3));
    return result;
}

function delta_text(t, ago){
    let unit = words().time_units, dword = unit[ago + 7];
    if (t[0]) return `${t[0]}${unit[0]}` + (t[1] ? `${t[1]}${unit[1]}` : "") + dword;
    if (t[1]){
        return `${t[1]}${unit[1]}` + (t[2] >= 7 ? `${intdiv(t[2], 7)}${unit[2]}` : "") + dword;
    }
    if (t[2] >= 7){
        return `${intdiv(t[2], 7)}${unit[2]}` + (t[2] % 7 ? `${t[2] % 7}${unit[3]}` : "") + dword;
    }
    if (t[2]) return `${t[2]}${unit[3]}` + (t[3] ? `${z(t[3], 2)}${unit[4]}` : "") + dword;
    if (t[3]) return `${t[3]}${unit[4]}` + (t[4] ? `${z(t[4], 2)}${unit[5]}` : "") + dword;
    if (t[4]) return `${t[4]}${unit[5]}` + (t[5] ? `${z(t[5], 2)}${unit[6]}` : "") + dword;
    return `${t[5]}.${z(t[6], 3)}${unit[6]}${dword}`;
}

function time_text(t){
    let pt = time_param(t + get_timezone()), dt;
    if (data.states.af === 2026){
        let d = data.time.now + data.temp.te.days * 86400000;
        if (d >= t) dt = delta_text(time_delta(d, t), false);
        else dt = delta_text(time_delta(t, d), true);
        return `${now_text(pt)} (${dt})`;
    }
    if (data.time.now >= t) dt = delta_text(time_delta(data.time.now, t), false);
    else dt = delta_text(time_delta(t, data.time.now), true);
    return `${now_text(pt)} (${dt})`;
}

// SCROLL FUNCTION

function get_scroll_top(){
    return Math.max(document.body.scrollTop, document.documentElement.scrollTop);
}

function set_scroll_top(y){
    document.body.scrollTop = y;
    document.documentElement.scrollTop = y;
}

function go_to_hash(){
    let hash = window.location.hash;
    if (hash) document.getElementById(hash.slice(1)).scrollIntoView();
}

// ANIMATION FUNCTION

function generate_arc(){
    let result = [], size, total, big;
    for (let i = 0;; i++){
        size = 1;
        for (let j = 0; j < 3; j++){
            if (Math.random() * 4 < 1) size++;
            else break;
        }
        result.push(size);
        total = result.length;
        for (let j = 0; j < result.length; j++) total += result[j];
        if (total < 16) continue;
        if (total === 16) result[Math.floor(Math.random() * result.length)]++;
        for (let j = 0; j < total - 17; j++){
            big = [];
            for (let k = 0; k < result.length; k++) if (result[k] > 1) big.push(k);
            result[big[Math.floor(Math.random() * big.length)]]--;
        }
        break;
    }
    for (let i = 0; i < result.length; i++){
        result[i] *= Math.floor(Math.random() * 2) * 2 - 1;
        result[i] = [result[i], Math.floor(Math.random() * 60) * 6 - 180];
    }
    return result;
}

function set_arcs(){
    let div, arc, path, f1, f2, d, r1, r2;
    data.animation.arcs = generate_arc();
    for (let i = 0; i < data.animation.arcs.length; i++){
        f1 = i;
        for (let j = 0; j < i; j++) f1 += Math.abs(data.animation.arcs[j][0]);
        f2 = f1 + Math.abs(data.animation.arcs[i][0]);
        div = document.createElement("div");
        div.setAttribute("class", "back-arc id" + i);
        div.setAttribute("style", "opacity: 0;");
        arc = document.createElement("svg");
        arc.setAttribute("class", "back-arc-svg");
        arc.setAttribute("viewBox", "0 0 864 864");
        arc.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        path = document.createElement("path");
        path.setAttribute("fill", "#80808080");
        d = `M ${728 + f1 * 8} 432 A ${296 + f1 * 8} ${296 + f1 * 8} 0 0 0 432 ${136 - f1 * 8} `;
        d += `V ${136 - f2 * 8} A ${296 + f2 * 8} ${296 + f2 * 8} 0 0 1 ${728 + f2 * 8} 432`;
        if (data.animation.arcs[i][0] < 0){
            r1 = Math.sqrt((296 + f1 * 8 + 2) ** 2 + 4);
            r2 = Math.sqrt((296 + f2 * 8 - 2) ** 2 + 4);
            d += ` M 434 ${134 - f1 * 8} A ${r1} ${r1} 0 0 1 ${730 + f1 * 8} 430`;
            d += ` H ${726 + f2 * 8} A ${r2} ${r2} 0 0 0 434 ${138 - f2 * 8}`;
        }
        path.setAttribute("d", d);
        arc.appendChild(path);
        div.appendChild(arc);
        div.innerHTML += "";
        document.querySelector(".back-arcs").appendChild(div);
    }
}

function generate_rect(t, h){
    let result = [t, h];
    result.push(Math.floor(Math.random() * 2));
    result.push(Math.floor(Math.random() * 201) + 100);
    result.push(Math.floor(Math.random() * 6) - 45);
    result.push(Math.floor(Math.random() * 16) + 5);
    result.push(Math.floor(Math.random() * 16) * 10 + 50);
    result.push(Math.floor(Math.random() * 16) * 10 + 50);
    return result;
}

function occupied_space(branch){
    let result = [], p;
    for (let i = 0; i < branch.length; i++){
        for (let j = 0; j < Math.abs(branch[i][2]); j++){
            p = `${branch[i][0] + j},${branch[i][1] + j * (branch[i][2] > 0 ? 1 : -1)}`;
            if (!result.includes(p)) result.push(p);
        }
        for (let j = 0; j < branch[i][3] + 1; j++){
            p = `${branch[i][0] + Math.abs(branch[i][2]) + j},${branch[i][1] + branch[i][2]}`;
            if (!result.includes(p)) result.push(p);
        }
    }
    return result;
}

function available_space(branch){
    let result = [], p;
    for (let i = 0; i < branch.length; i++){
        result = result.filter((x) => x !== `${branch[i][0]},${branch[i][1]}`);
        for (let j = 1; j < branch[i][3]; j++){
            p = `${branch[i][0] + Math.abs(branch[i][2]) + j},${branch[i][1] + branch[i][2]}`;
            if (!result.includes(p)) result.push(p);
        }
    }
    return result;
}

function generate_branch(t){
    let result = [t], branch = [], occ, ava, err, p, d, b, g;
    result.push(Math.floor(Math.random() * 2));
    result.push(window.innerHeight * (Math.random() * 6 + 1) / 8);
    for (let i = 0; i < Math.floor(Math.random() * 5) + 3; i++){
        if (!i){
            branch.push([0, 0, 0, Math.floor(Math.random() * 5) + 4]);
            continue;
        }
        occ = occupied_space(branch);
        ava = available_space(branch);
        err = false;
        for (let j = 0; j < 100; j++){
            if (!ava.length){
                err = true;
                break;
            }
            p = ava[Math.floor(Math.random() * ava.length)].split(",");
            d = Math.floor(Math.random() * 4);
            b = [Number(p[0]), Number(p[1]), [-2, -1, 1, 2][d], Math.floor(Math.random() * 5) + 2];
            g = true;
            if (Math.abs(b[2]) > 1){
                p = [b[0] + 1, b[1] + b[2] / 2];
                if (occ.includes(`${p[0]},${p[1]}`) || p[0] > 24) g = false;
            }
            for (let k = 0; k < b[3] + 1; k++){
                if (!g) break;
                p = [b[0] + Math.abs(b[2]) + k, b[1] + b[2]];
                if (occ.includes(`${p[0]},${p[1]}`) || p[0] > 24){
                    g = false;
                    break;
                }
            }
            if (g) break;
        }
        if (err || !g) break;
        branch.push(b);
    }
    result.push(branch);
    return result;
}

function set_alphabet(){
    let result = [], ord = [], r;
    for (let i = 0; i < 15; i++){
        r = [];
        for (let j = 0; j < 15; j++) if (!ord.includes(j)) r.push(j);
        ord.push(r[Math.floor(Math.random() * r.length)]);
    }
    for (let i = 0; i < 25; i++){
        r = [];
        for (let j = 0; j < 15; j++){
            if (i === ord[j] + 10) continue;
            if (i < ord[j]) continue;
            if (i >= ord[j] + 11) r.push(j);
            else if (Math.random() * 2 >= 1) r.push(j);
        }
        result.push(r);
    }
    data.animation.alphabet = result;
}

function set_squares(){
    let result = [], ord = [], r;
    for (let i = 0; i < 5; i++){
        r = [];
        for (let j = 0; j < 5; j++) if (!ord.includes(j)) r.push(j);
        ord.push(r[Math.floor(Math.random() * r.length)]);
    }
    for (let i = 0; i < 21; i++){
        r = [];
        for (let j = 0; j < 5; j++){
            if (i === ord[j] * 2 + 11) continue;
            if (i < ord[j] * 2) continue;
            if (i >= ord[j] * 2 + 12) r.push(j);
            else if (Math.random() * 2 >= 1) r.push(j);
        }
        result.push(r);
    }
    data.animation.squares = result;
}

function text_appear(text, t){
    if (t >= 1000 || t === null) return text;
    let result = "", len = 0, lens = [];
    for (let i = 0; i < text.length; i++){
        lens.push(len);
        len += (text.charCodeAt(i) >= 128) + 1;
    }
    lens.push(len);
    if (t < 500) for (let i = 0; i < intdiv(t * len, 500); i++){
        result += String.fromCharCode(Math.floor(Math.random() * 94) + 33);
    } else for (let i = 0; i < text.length; i++){
        if (intdiv((t - 500) * len, 500) >= lens[i]) result += text.charAt(i);
        else for (let j = 0; j < lens[i + 1] - lens[i]; j++){
            result += String.fromCharCode(Math.floor(Math.random() * 94) + 33);
        }
    }
    return result;
}

function update_ani_center_time(t1){
    let b = document.querySelector(".back-center");
    if (data.animation.start) b.style.opacity = Math.min(t1, 1000) / 1000;
    else b.style.opacity = 1;
}

function update_ani_gear_time(t1){
    let t, b = document.querySelector(".back-gear");
    if (data.animation.start){
        if (t1 < 2000) t = 0;
        if (2000 <= t1 && t1 < 4000) t = t1 * t1 - t1 * 4000 + 4000000;
        if (t1 >= 4000) t = t1 * 4000 - 12000000;
    } else t = t1 * 4000;
    b.style.opacity = data.animation.start ? Math.min(t1 / 1000, 1) : 1;
    b.style.transform = `rotate(${t * 3 / 5000000}deg)`;
}

function update_ani_arc_time(t1){
    let t, deg, b;
    if (data.animation.start){
        if (t1 < 2000) t = 0;
        if (2000 <= t1 && t1 < 4000) t = t1 ** 3 - 12000 * t1 ** 2 + 48500000 * t1 - 57000000000;
        if (t1 >= 4000) t = t1 * 500000 + 7000000000;
    } else t = t1 * 500000;
    for (let i = 0; i < data.animation.arcs.length; i++){
        deg = t * 3 / 125000000 / data.animation.arcs[i][0] + data.animation.arcs[i][1];
        b = document.querySelector(".back-arc.id" + i);
        b.style.opacity = data.animation.start ? Math.min((t1 - 2000) / 2000, 1) : 1;
        b.style.transform = `rotate(${deg}deg)`;
    }
}

function update_ani_rect_time(t1, t2){
    if (t1 < 4000 && data.animation.start) return;
    let change = false, id, k, rect, pos, div, r;
    if (Math.random() * 500 < t1 - t2){
        for (;;){
            id = Math.floor(Math.random() * 1000000);
            if (!(id in data.animation.rects)) break;
        }
        data.animation.rects[id] = generate_rect(t1, window.innerHeight);
        change = true;
    }
    k = Object.keys(data.animation.rects);
    for (let i = 0; i < k.length; i++){
        rect = data.animation.rects[k[i]];
        pos = ((t1 - rect[0]) * rect[7]) / 1000 - rect[6] - 2;
        if (!rect[2]) pos += window.innerHeight - rect[1];
        if (pos >= window.innerHeight){
            delete data.animation.rects[k[i]];
            change = true;
        }
    }
    if (change) document.querySelector(".back-rects").innerHTML = "";
    k = Object.keys(data.animation.rects);
    for (let i = 0; i < k.length; i++){
        rect = data.animation.rects[k[i]];
        if (change){
            div = document.createElement("div");
            div.setAttribute("class", "back-rect id" + z(k[i], 6));
            div.style.width = `calc(${rect[5] / 10}vw + 2px)`;
            div.style.height = `${rect[6] + 2}px`;
            if (rect[2]) div.style.left = `calc(${(rect[3] - rect[5]) / 20}vw - 1px)`;
            else div.style.left = `calc(${(2000 - rect[3] + rect[5]) / 20}vw - 1px)`;
            div.style.zIndex = rect[4];
            r = document.createElement("div");
            r.setAttribute("class", "back-rect2");
            r.style.width = rect[5] / 10 + "vw";
            r.style.height = rect[6] + "px";
            div.appendChild(r);
            document.querySelector(".back-rects").appendChild(div);
        }
        if (rect[2]) pos = ((t1 - rect[0]) * rect[7]) / 1000 - rect[6] - 2;
        else pos = rect[1] - ((t1 - rect[0]) * rect[7]) / 1000;
        document.querySelector(".back-rect.id" + z(k[i], 6)).style.top = pos + "px";
    }
}

function update_ani_branch_time(t1, t2){
    if (t1 < 4000 && data.animation.start) return;
    let change = false, id, k, branch, div, b, br, path, d, f;
    if (Math.random() * 2000 < t1 - t2){
        for (;;){
            id = Math.floor(Math.random() * 1000000);
            if (!(id in data.animation.branches)) break;
        }
        data.animation.branches[id] = generate_branch(t1);
        change = true;
    }
    k = Object.keys(data.animation.branches);
    for (let i = 0; i < k.length; i++){
        branch = data.animation.branches[k[i]];
        if (t1 >= branch[0] + branch[3].length * 500 + 2500){
            delete data.animation.branches[k[i]];
            change = true;
        }
    }
    if (change) document.querySelector(".back-branches").innerHTML = "";
    k = Object.keys(data.animation.branches);
    for (let i = 0; i < k.length; i++){
        branch = data.animation.branches[k[i]];
        if (change){
            div = document.createElement("div");
            div.setAttribute("class", "back-branch id" + z(k[i], 6));
            div.style.top = `calc(${branch[2]}px - min(50vw, 400px))`;
            div.style.left = `calc(max(100vw - 800px, 0px) * ${branch[1]})`;
            document.querySelector(".back-branches").appendChild(div);
        }
        b = document.querySelector(".back-branch.id" + z(k[i], 6));
        b.innerHTML = "";
        br = document.createElement("svg");
        br.setAttribute("viewBox", "0 0 800 800");
        br.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        for (let j = 0; j < Math.min(intdiv(t1 - branch[0], 500) + 1, branch[3].length); j++){
            path = document.createElement("path");
            path.setAttribute("fill", "#80808080");
            d = "";
            f = function (n){return branch[3][j][n] * 32};
            if (branch[1]){
                if (!f(2)){
                    d += `M ${800 - f(0)} ${f(1) + 399} `;
                    d += `h ${Math.sqrt(15) - f(3)} a 4 4 0 1 0 0 2 h ${f(3) - Math.sqrt(15)} `;
                }
                if (f(2) > 0){
                    d += `M ${798 - f(0)} ${f(1) + 401} l ${2 - f(2)} ${f(2) - 2} `;
                    d += `h ${Math.sqrt(15) - f(3)} a 4 4 0 1 0 0 2 h ${f(3) - Math.sqrt(15)} `;
                    d += `l ${f(2)} ${-f(2)} `;
                }
                if (f(2) < 0){
                    d += `M ${800 - f(0)} ${f(1) + 399} l ${f(2)} ${f(2)} `;
                    d += `h ${Math.sqrt(15) - f(3)} a 4 4 0 1 0 0 2 h ${f(3) - Math.sqrt(15)} `;
                    d += `l ${-f(2) - 2} ${-f(2) - 2} `;
                }
                d += `M ${802 - (f(0) + Math.abs(f(2)) + f(3))} ${f(1) + f(2) + 400} `;
                d += `a 2 2 0 1 1 -4 0 a 2 2 0 1 1 4 0`;
            } else {
                if (!f(2)){
                    d += `M ${f(0)} ${f(1) + 399} `;
                    d += `h ${f(3) - Math.sqrt(15)} a 4 4 0 1 1 0 2 h ${Math.sqrt(15) - f(3)} `;
                }
                if (f(2) > 0){
                    d += `M ${f(0) + 2} ${f(1) + 401} l ${f(2) - 2} ${f(2) - 2} `;
                    d += `h ${f(3) - Math.sqrt(15)} a 4 4 0 1 1 0 2 h ${Math.sqrt(15) - f(3)} `;
                    d += `l ${-f(2)} ${-f(2)} `;
                }
                if (f(2) < 0){
                    d += `M ${f(0)} ${f(1) + 399} l ${-f(2)} ${f(2)} `;
                    d += `h ${f(3) - Math.sqrt(15)} a 4 4 0 1 1 0 2 h ${Math.sqrt(15) - f(3)} `;
                    d += `l ${f(2) + 2} ${-f(2) - 2} `;
                }
                d += `M ${f(0) + Math.abs(f(2)) + f(3) - 2} ${f(1) + f(2) + 400} `;
                d += `a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0`;
            }
            path.setAttribute("d", d);
            br.appendChild(path);
        }
        b.appendChild(br);
        b.innerHTML += "";
        b.style.opacity = Math.min((branch[0] + branch[3].length * 500 + 2500 - t1) / 1000, 1);
    }
}

function update_ani_back_time(t1, t2){
    update_ani_center_time(t1);
    update_ani_gear_time(t1);
    update_ani_arc_time(t1);
    update_ani_rect_time(t1, t2);
    update_ani_branch_time(t1, t2);
}

function update_ani_laser_time(t1){
    if (!data.animation.start) return;
    document.querySelector(".back-lasers").innerHTML = "";
    if (t1 < 1000 || t1 > 2000) return;
    let svg, t, op, laser, d, len;
    let size = Math.min((window.innerWidth - 80) / 560, 1);
    let x = Math.max(window.innerWidth - 560, 80) / 2;
    let y = 1184 - Math.min(Math.max(window.innerWidth, 1088), 1152) + (1 - size) * 32;
    let c = color_code(0, 256 - data.animation.bright * 32 / 125, 256);
    let ls = [
        [0, 0], [2, 28], [3, 4], [2, 44], [3, 44], [2, 84], [3, 60],
        [2, 100], [3, 116], [2, 116], [0, 60], [1, 220], [4, 296], [3, 268],
        [2, 312], [1, 332], [2, 344], [3, 360], [2, 360], [3, 376], [2, 416],
        [0, 30], [1, 452], [2, 464], [1, 484], [2, 512], [3, 528], [2, 528],
    ];
    svg = document.createElement("svg");
    svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    for (let i = 0; i < ls.length; i++){
        t = t1 - i * 20 - 1000;
        op = z(Math.floor((460 - Math.min(Math.max(t, 360), 460)) * 32 / 25).toString(16), 2);
        laser = document.createElement("path");
        laser.setAttribute("fill", c + op);
        d = "";
        if (ls[i][0] === 0) len = window.innerWidth;
        if ([1, 2].includes(ls[i][0])) len = window.innerHeight;
        if ([3, 4].includes(ls[i][0])) len = window.innerHeight + size * 1.6;
        len *= Math.min(Math.max(t, 0), 200) / 200;
        if (ls[i][0] === 0) d += `M 0 ${y + size * ls[i][1]} h ${len} v ${size * 4} h -${len}`;
        if (ls[i][0] === 1) d += `M ${x + size * ls[i][1]} 0 v ${len} h -${size * 4} v -${len}`;
        if (ls[i][0] === 2){
            d += `M ${x + size * ls[i][1]} ${window.innerHeight} v -${len} h ${size * 4} v ${len}`;
        }
        if (ls[i][0] === 3){
            d += `M ${x - y / 2 + size * (ls[i][1] - 0.8)} -${size * 1.6} `;
            d += `l ${len / 2} ${len} l -${size * 3.2} ${size * 1.6} l -${len / 2} -${len}`;
        }
        if (ls[i][0] === 4){
            d += `M ${x + y / 2 + size * ls[i][1] - window.innerHeight / 2} ${window.innerHeight} `;
            d += `l ${len / 2} -${len} l ${size * 3.2} ${size * 1.6} l -${len / 2} ${len}`;
        }
        laser.setAttribute("d", d);
        svg.appendChild(laser);
    }
    document.querySelector(".back-lasers").appendChild(svg);
    document.querySelector(".back-lasers").innerHTML += "";
}

function update_ani_logo_time(t1, t2){
    if (!data.animation.start) return;
    if (t1 - t1 % 40 <= t2) return;
    if (t1 < 2000 || t2 >= 3000) return;
    document.querySelector(".logo2").innerHTML = "";
    if (t1 >= 3000){
        set_logo();
        return;
    }
    let ds = [
        "M 0 0 h 32 v 64 M 6 4 l 22 44 v -44",
        "M 44 0 l 32 64 h -4 l -24 -48 v 48 h -4",
        "M 56 0 h 4 l 24 48 v -48 h 4 v 64",
        "M 100 0 h 4 v 64 h -4",
        "M 116 0 l 32 64 h -32 M 120 16 v 44 h 22",
        "M 160 60 h 44 v 4 h -44",
        "M 216 0 h 36 v 4 h -32 v 26 h 32 v 4 h -32 v 26 h 32 v 4 h -36",
        "M 264 0 h 4 l 14 28 l 14 -28 h 4 l -16 32 l 16 32 h -4 l -14 -28 l -14 28 h -4 l 16 -32",
        "M 312 0 h 36 v 64 h -4 v -60 h -12 v 60 h -4 v -60 h -12 v 60 h -4",
        "M 360 0 l 32 64 h -4 l -24 -48 v 48 h -4",
        "M 372 0 h 32 v 4 h -26 l 26 52 v 8",
        "M 416 0 h 4 v 30 h 28 v -30 h 4 v 64 h -4 v -30 h -28 v 30 h -4",
        "M 464 0 h 4 v 64 h -4",
        "M 480 0 h 36 v 64 h -4 v -60 h -28 v 60 h -4",
        "M 528 0 l 32 64 h -4 l -24 -48 v 48 h -4",
    ];
    let as = data.animation.alphabet[intdiv(t1, 40) - 50], svg, a;
    svg = document.createElement("svg");
    svg.setAttribute("width", "560");
    svg.setAttribute("height", "64");
    svg.setAttribute("viewBox", "0 0 560 64");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    for (let i = 0; i < as.length; i++){
        a = document.createElement("path");
        a.setAttribute("class", "svg-theme");
        a.setAttribute("d", ds[as[i]]);
        svg.appendChild(a);
    }
    document.querySelector(".logo2").appendChild(svg);
    document.querySelector(".logo2").innerHTML += "";
}

function update_ani_menu_time(t1, t2){
    if (!data.animation.start || t2 >= 4000) return;
    let m = document.querySelector(".menu");
    m.style.pointerEvents = t1 >= 4000 ? "auto" : "none";
    if (t1 >= 3000){
        if (t1 - t1 % 50 <= t2) return;
        m.style.height = "auto";
        m.style.backgroundColor = "var(--theme-window1)";
        m.style.padding = "0px calc(30px - var(--page-scroll)) 0px 30px";
        set_menu(data.states.menu);
        return;
    }
    let items = 4 - data.states.menu * (data.states.menu !== 1), a, svg, path, l;
    m.innerHTML = "";
    m.style.height = 192 / items + "px";
    m.style.backgroundColor = "#00000000";
    m.style.padding = "0px 0px 0px 0px";
    if (t1 >= 2000){
        svg = document.createElement("svg");
        svg.setAttribute("width", window.innerWidth);
        svg.setAttribute("height", 192 / items);
        svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${192 / items}`);
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        path = document.createElement("path");
        path.style.fill = "var(--theme-window1)";
        l = (1 - Math.max(2500 - t1, 0) ** 4 / 62500000000) * window.innerWidth;
        path.setAttribute("d", `M 0 0 h ${l} v ${192 / items} h -${l}`);
        svg.appendChild(path);
        if (t1 >= 2500) for (let i = 0; i < items + 1; i++){
            l = Math.min(Math.max(3000 - 200 * (items - i) / items - t1, 0), 300);
            l = (1 - l ** 4 / 8100000000) * 192 / items;
            path = document.createElement("path");
            path.setAttribute("fill", "#ffffff80");
            a = `M ${window.innerWidth / 2 + i * 192 - items * 96 - 1} 0 h 2 v ${l} h -2`;
            path.setAttribute("d", a);
            svg.appendChild(path);
        }
        m.appendChild(svg);
        m.innerHTML += "";
    }
}

function update_ani_content_inside(t){
    let section = get_section(), t0 = Math.abs(t - 500), a, items, cates;
    document.querySelector(".content").style.pointerEvents = t ? "none" : "auto";
    if (!data.save.change){
        document.querySelector(".content").style.opacity = t0 / 500;
        return;
    }
    if (section == 0 && page_validity(get_page())){
        document.querySelector(".content").style.opacity = 1;
        items = document.querySelectorAll(".blog-line");
        for (let i = 0; i < items.length; i++){
            if (t >= 500) a = window.innerWidth * -(62500000000 - (t - 500) ** 4) / 125000000000;
            else a = window.innerWidth * -(Math.max(t - 200 * 0.75 ** i, 0) ** 4) / 8100000000;
            items[i].style.left = a + "px";
            items[i].style.opacity = t >= 500 ? (t - 500) / 500 : 1;
        }
        a = data.animation.category ? 500 : t0;
        a /= 1000 - (data.states.content < 2 || data.states.home_right) * 500;
        document.querySelector(".home-right").style.opacity = a;
        return;
    }
    if (section == 3 && page_validity(get_page()) && get_id() === -1){
        document.querySelector(".content").style.opacity = 1;
        cates = document.querySelectorAll(".category");
        for (let i = 0; i < cates.length; i++){
            a = (data.animation.squares[intdiv(t0, 25)].includes(i) || data.animation.category) * 1;
            cates[i].style.opacity = a;
        }
        items = document.querySelectorAll(".article-line");
        items = Array.from(items).slice(data.animation.category);
        for (let i = 0; i < items.length; i++){
            if (t >= 500) a = window.innerWidth * -(62500000000 - (t - 500) ** 4) / 125000000000;
            else a = window.innerWidth * -(Math.max(t - 200 * 0.75 ** i, 0) ** 4) / 8100000000;
            items[i].style.left = a + "px";
            items[i].style.opacity = t >= 500 ? (t - 500) / 500 : 1;
        }
        return;
    }
    document.querySelector(".content").style.top = (40 - t0 * 2 / 25) + "px";
    document.querySelector(".content").style.opacity = t0 / 500;
}

function update_ani_content_time(t1, t2){
    let oc = data.animation.change, m = document.querySelector(".menu");
    if (data.animation.starting){
        update_ani_content_inside(Math.min(Math.max(4000 - t1, 0), 500));
        return;
    }
    if (!data.animation.change) return;
    data.animation.change = Math.max(data.animation.change - t1 + t2, 0);
    if (oc >= 500 && data.animation.change < 500){
        change_url(data.animation.destination);
        refresh(data.animation.category * 1);
    }
    update_ani_content_inside(data.animation.change);
    m.style.pointerEvents = data.animation.change ? "none" : "auto";
    if (!data.animation.change){
        data.animation.destination = null;
        data.animation.category = false;
    }
}

function update_ani_home_right_time(t1, t2){
    if (data.states.home_right && data.animation.home_right < 500){
        data.animation.home_right = Math.min(data.animation.home_right + t1 - t2, 500);
    }
    if (!data.states.home_right && data.animation.home_right > 0){
        data.animation.home_right = Math.max(data.animation.home_right - t1 + t2, 0);
    }
    if (get_section() != 0 || data.states.content < 2) return;
    let a, c, k, w1, w2;
    document.querySelector(".home-left").style.opacity = (1000 - data.animation.home_right) / 1000;
    a = [0, 500].includes(data.animation.home_right) ? "auto" : "none";
    document.querySelector(".menu").style.pointerEvents = a;
    document.querySelector(".content").style.pointerEvents = a;
    if (data.animation.home_right){
        document.querySelector(".home-left").setAttribute("onclick", "change_home_right();");
    } else document.querySelector(".home-left").removeAttribute("onclick");
    k = document.querySelectorAll(".blog-line");
    for (let i = 0; i < k.length; i++){
        a = data.animation.home_right ? "none" : "auto";
        document.querySelectorAll(".blog-line")[i].style.pointerEvents = a;
        document.querySelectorAll(".blog-line")[i].style.userSelect = a;
        document.querySelectorAll(".blog-line")[i].style.msUserSelect = a;
        document.querySelectorAll(".blog-line")[i].style.WebkitUserSelect = a;
    }
    if (data.states.home_right){
        w1 = (1 - (500 - data.animation.home_right) ** 4 / 62500000000) * 288 + 32;
    } else w1 = (data.animation.home_right ** 4 / 62500000000) * 288 + 32;
    w2 = w1 + document.documentElement.clientWidth - window.innerWidth;
    w2 += Math.min(Math.max(window.innerWidth / 2, 160), 192) - 160;
    document.querySelector(".home-right").style.right = `${w1}px`;
    document.querySelector(".home-right").style.width = `${w2}px`;
    document.querySelector(".home-right").style.marginRight = `-${w2}px`;
    document.querySelector(".home-right").style.zIndex = !!data.animation.home_right * 50;
    if (!data.animation.starting && (!data.animation.change || (t1 === -1 && t2 === -1))){
        a = (data.animation.home_right + 500) / 1000;
        document.querySelector(".home-right").style.opacity = a;
    }
    a = data.animation.home_right ? "default" : "pointer";
    c = document.querySelector(".home-window-content");
    document.querySelector(".home-window").style.cursor = a;
    c.style.zIndex = !!data.animation.home_right * -100;
    c.style.opacity = data.animation.home_right / 500;
    c.style.pointerEvents = data.animation.home_right ? "auto" : "none";
    c.style.userSelect = data.animation.home_right ? "auto" : "none";
    c.style.msUserSelect = data.animation.home_right ? "auto" : "none";
    c.style.WebkitUserSelect = data.animation.home_right ? "auto" : "none";
}

function update_ani_buttons_time(t1){
    if (!data.animation.starting) return;
    document.querySelector(".buttons").style.opacity = Math.min(Math.max((t1 - 3000) / 1000, 0), 1);
    document.querySelector(".buttons").style.pointerEvents = t1 >= 4000 ? "auto" : "none";
}

function update_ani_time(t1, t2){
    if (data.animation.start && t1 >= 3500 && t2 < 3500) refresh();
    if (data.animation.background) update_ani_back_time(t1, t2);
    update_ani_laser_time(t1);
    update_ani_logo_time(t1, t2);
    update_ani_menu_time(t1, t2);
    update_ani_content_time(t1, t2);
    update_ani_home_right_time(t1, t2);
    update_ani_buttons_time(t1);
    if (data.animation.start && t1 >= 4000) data.animation.starting = false;
}

// UPDATE FUNCTION

async function update_math(elements = null, retry = 5){
    try {await MathJax.typesetPromise(elements);}
    catch {
        if (!retry) return;
        await new Promise(r => setTimeout(r, 1000));
        await update_math(elements, retry - 1);
    }
}

async function update_math_gradual(elements = null, id = null, n = 10){
    if (!elements.length) return;
    if (get_section() != 3) return;
    if (id !== null && id !== get_id()) return;
    await update_math(elements.slice(0, n));
    await new Promise(r => setTimeout(r, 10));
    await update_math_gradual(elements.slice(n), id, n);
}

function update_top(){
    let a = get_scroll_top() >= 500 ? "block" : "none";
    document.getElementById("top").style.display = a;
    a = Math.min(Math.max(get_scroll_top() - 500, 0), 500) / 500;
    document.getElementById("top").style.opacity = a;
}

function update_menu(){
    let state = window.innerWidth >= 832 ? 1 : window.innerWidth >= 448 ? 2 : 3;
    if (data.states.menu !== state){
        data.states.menu = state;
        set_menu(state);
    }
}

function update_home(){
    if (data.animation.starting && data.time.real < 3500) return;
    let state = (window.innerWidth < 1024) + 1;
    if (data.states.content !== state){
        data.states.content = state;
        set_home(state);
    }
}

function update(){
    if (!data.time.active) return;
    update_menu();
    if (get_section() == 0) update_home();
}

function change_color(v, c){document.querySelector(":root").style.setProperty("--" + v, c);}

function update_setting_time(t1, t2){
    if (data.states.setting === 1 && data.animation.lang < 200){
        data.animation.lang = Math.min(data.animation.lang + t1 - t2, 200);
    }
    if (data.states.setting !== 1 && data.animation.lang > 0){
        data.animation.lang = Math.max(data.animation.lang + t2 - t1, 0);
    }
    if (data.states.setting === 2 && data.animation.tool < 200){
        data.animation.tool = Math.min(data.animation.tool + t1 - t2, 200);
    }
    if (data.states.setting !== 2 && data.animation.tool > 0){
        data.animation.tool = Math.max(data.animation.tool + t2 - t1, 0);
    }
    document.getElementById("lang-window").style.opacity = data.animation.lang / 200;
    document.getElementById("lang-window").style.display = data.animation.lang ? "block" : "none";
    document.getElementById("tool-window").style.opacity = data.animation.tool / 200;
    document.getElementById("tool-window").style.display = data.animation.tool ? "block" : "none";
}

function update_bright_time(t1, t2){
    if (data.save.bright && data.animation.bright < 500){
        data.animation.bright = Math.min(data.animation.bright + t1 - t2, 500);
    }
    if (!data.save.bright && data.animation.bright > 0){
        data.animation.bright = Math.max(data.animation.bright + t2 - t1, 0);
    }
    let c = intdiv(data.animation.bright * 64, 125);
    if (data.states.af === 2025){
        let s = function (t0, r, g, b, a = 255){
            if (r === g && g === b) return color_code(r, g, b);
            let r2 = Math.round(r * 8), g2 = Math.round(g * 8), b2 = Math.round(b * 8);
            let mn = Math.min(r2, g2, b2), mx = Math.max(r2, g2, b2), m = mx - mn, h;
            if (mx === r2 && mx !== g2) h = g2 - b2;
            if (mx === g2 && mx !== b2) h = b2 - r2 + m * 2;
            if (mx === b2 && mx !== r2) h = r2 - g2 + m * 4;
            if (h < 0) h += m * 6;
            h = (h * 500 + m * t0) % (m * 3000);
            let r3 = mn * 500, g3 = mn * 500, b3 = mn * 500;
            if (0 <= h && h < m * 500){r3 += m * 500; g3 += h;}
            if (m * 500 <= h && h < m * 1000){r3 += m * 1000 - h; g3 += m * 500;}
            if (m * 1000 <= h && h < m * 1500){g3 += m * 500; b3 += h - m * 1000;}
            if (m * 1500 <= h && h < m * 2000){g3 += m * 2000 - h; b3 += m * 500;}
            if (m * 2000 <= h && h < m * 2500){r3 += h - m * 2000; b3 += m * 500;}
            if (m * 2500 <= h && h < m * 3000){r3 += m * 500; b3 += m * 3000 - h;}
            return color_code(intdiv(r3, 4000), intdiv(g3, 4000), intdiv(b3, 4000), a);
        }
        change_color("theme-back", s(t1, c, c, c));
        change_color("theme-font", s(t1, 256 - c, 256 - c, 256 - c));
        change_color("theme-ui1", s(t1, 0, 256 - c / 2, 256));
        change_color("theme-ui2", s(t1, 128 - c / 2, 256 - c * 3 / 4, 256 - c / 2));
        change_color("theme-window1", s(t1, 0, 96 + c * 3 / 8, 192, 192));
        change_color("theme-window2", s(t1, c, c, c, 192));
        change_color("theme-transition1", s(t1, 0, 256 - c / 2, 256, 0));
        change_color("theme-transition2", s(t1, 0, 256 - c / 2, 256, 64));
        change_color("theme-transition3", s(t1, 0, 256 - c / 2, 256, 128));
        return;
    }
    change_color("theme-back", color_code(c, c, c));
    change_color("theme-font", color_code(256 - c, 256 - c, 256 - c));
    change_color("theme-ui1", color_code(0, 256 - c / 2, 256));
    change_color("theme-ui2", color_code(128 - c / 2, 256 - c * 3 / 4, 256 - c / 2));
    change_color("theme-window1", color_code(0, 96 + c * 3 / 8, 192, 192));
    change_color("theme-window2", color_code(c, c, c, 192));
    change_color("theme-transition1", color_code(0, 256 - c / 2, 256, 0));
    change_color("theme-transition2", color_code(0, 256 - c / 2, 256, 64));
    change_color("theme-transition3", color_code(0, 256 - c / 2, 256, 128));
}

function update_background_time(t1, t2){
    if (data.save.background && data.animation.background < 500){
        data.animation.background = Math.min(data.animation.background + t1 - t2, 500);
    }
    if (!data.save.background && data.animation.background > 0){
        data.animation.background = Math.max(data.animation.background + t2 - t1, 0);
    }
    document.querySelector(".back-center-svg").style.opacity = data.animation.background / 500;
    document.querySelector(".back-gear-svg").style.opacity = data.animation.background / 500;
    document.querySelector(".back-arcs").style.opacity = data.animation.background / 500;
    document.querySelector(".back-rects").style.opacity = data.animation.background / 500;
    document.querySelector(".back-branches").style.opacity = data.animation.background / 500;
}

function update_time(t1, t2){
    if (data.states.af === 2026){
        data.temp.te.interval = Math.max(data.temp.te.interval - t1 + t2, 0);
        data.temp.te.now += (t1 - t2) * data.temp.te.speed;
        if (!data.temp.te.interval){
            let r = Math.random();
            data.temp.te.interval = Math.floor(Math.random() * 8000 + 2000);
            if (0.00 <= r && r < 0.25) data.temp.te.speed = r + 0.25;
            if (0.25 <= r && r < 0.50) data.temp.te.speed = r * 2;
            if (0.50 <= r && r < 0.60) data.temp.te.speed = r * 10 - 4;
            if (0.60 <= r && r < 0.70) data.temp.te.speed = r * 30 - 16;
            if (0.70 <= r && r < 0.80) data.temp.te.speed = r * 50 - 30;
            if (0.80 <= r && r < 0.90) data.temp.te.speed = r * 100 - 70;
            if (0.90 <= r && r < 0.95) data.temp.te.speed = r * 600 - 520;
            if (0.95 <= r && r < 1.00) data.temp.te.speed = r * 1000 - 900;
        }
        update_ani_time(data.temp.te.now, data.temp.te.then);
        update_setting_time(data.temp.te.now, data.temp.te.then);
        update_bright_time(data.temp.te.now, data.temp.te.then);
        update_background_time(data.temp.te.now, data.temp.te.then);
        data.temp.te.then = data.temp.te.now;
        return;
    }
    update_ani_time(t1, t2);
    update_setting_time(t1, t2);
    update_bright_time(t1, t2);
    update_background_time(t1, t2);
}

// SET FUNCTION

function set_page(){
    let section = get_section();
    document.getElementsByTagName("body")[0].innerHTML = fetch_page("body", "null", -8);
    document.querySelector(".background").innerHTML = fetch_page("background", "null", -4);
    data.animation.start = true;
    if (!data.save.start) data.animation.start = false;
    if (!["0", "1", "2", "3"].includes(section)) data.animation.start = false;
    if (!page_validity(get_page())) data.animation.start = false;
    if (section === "3" && get_id() !== -1 && get_article_data(get_id()) === null){
        data.animation.start = false;
    }
    if (get_para("direct") === "1") data.animation.start = false;
    data.animation.background = data.save.background * 500;
    data.animation.bright = data.save.bright * 500;
    update_bright_time(0, 0);
    set_background();
    set_buttons();
    if (data.animation.start) data.animation.starting = true;
    else {
        document.querySelector(".buttons").style.opacity = 1;
        document.querySelector(".buttons").style.pointerEvents = "auto";
    }
}

function set_title(){
    let section = get_section();
    document.getElementsByTagName("html")[0].lang = lang();
    document.getElementById("title").innerHTML = "David_Exmachina - ";
    if (["0", "1", "2", "3"].includes(section)){
        document.getElementById("title").innerHTML += words().menu[get_section()];
    } else if (["af2024", "af2025", "af2026", "69"].includes(section)){
        document.getElementById("title").innerHTML += "???";
    } else document.getElementById("title").innerHTML += words().menu_error;
}

function set_background(){
    document.querySelector(".back-center").innerHTML = fetch_page("svg-center", "null");
    document.querySelector(".back-gear").innerHTML = fetch_page("svg-gear", "null");
    document.querySelector(".back-center").style.opacity = 0;
    document.querySelector(".back-gear").style.opacity = 0;
    set_arcs();
    set_alphabet();
}

function set_main(){
    document.querySelector(".main").innerHTML = fetch_page("main", "null", -4);
    set_logo();
    update_menu();
}

function set_buttons(){
    document.querySelector(".buttons").innerHTML = fetch_page("buttons", "null", -4);
    document.querySelector(".icon-lang").innerHTML = fetch_page("svg-lang", "null");
    document.getElementById("icon-tool").setAttribute("title", words().setting);
    document.getElementById("top").innerHTML = fetch_page("svg-top", "null");
    document.getElementById("top").setAttribute("title", words().to_top);
    document.getElementById("restore").innerHTML = fetch_page("svg-restore", "null");
    document.getElementById("restore").setAttribute("title", words().restore);
    document.getElementById("restore").style.display = data.save.special ? "block" : "none";
}

function set_logo(){
    if (data.animation.starting && data.time.real < 3000) return;
    document.querySelector(".logo2").innerHTML = fetch_page("svg-logo", "null");
}

function set_menu(state){
    let t = data.animation.starting ? Math.min(data.time.real - 3000, 1000) : 1000;
    if (data.animation.starting && t < 0) return;
    let button = ["HOME", "PROFILE", "PROJECTS", "ARTICLES"];
    let section = get_section(data.animation.destination);
    let line, new1, k, a;
    document.querySelector(".menu").innerHTML = "";
    for (let i = 0; i < 2 ** (state - 1); i++){
        line = document.createElement("div");
        line.setAttribute("class", "menu-line");
        for (let j = 0; j < 2 ** (3 - state); j++){
            k = i * 2 ** (3 - state) + j;
            new1 = document.createElement("div");
            new1.setAttribute("class", "menu-split");
            line.appendChild(new1);
            new1 = to_dom(fetch_page("menu-button", "null")).querySelector("div");
            a = section == k && (t >= 1000) ? " triggered1" : " button1";
            new1.setAttribute("class", `menu-button${a}`);
            if (section == k && (t < 1000)){
                new1.style.backgroundColor = color_code(256, 256, 256, t * 16 / 125);
            }
            a = words().menu_text ? text_appear(words().menu[k], t) : "";
            new1.setAttribute("onclick", `change_section(${k});`);
            new1.querySelector(".menu-text1").innerHTML = text_appear(button[k], t);
            new1.querySelector(".menu-text2").innerHTML = a;
            line.appendChild(new1);
        }
        new1 = document.createElement("div");
        new1.setAttribute("class", "menu-split");
        line.appendChild(new1);
        document.querySelector(".menu").appendChild(line);
    }
}

function set_content(){
    let section = get_section();
    if (!data.animation.starting){
        document.querySelector(".content").style.opacity = 1;
        document.querySelector(".content").style.pointerEvents = "auto";
    }
    if (!page_validity(get_page())){
        set_error("not-exist");
        return;
    }
    if (["0", "1", "2", "3"].includes(section)){
        [update_home, set_profile, set_projects, set_article][section]();
        return;
    }
    if (["af2024", "af2025", "af2026"].includes(section)){
        document.querySelector(".content").innerHTML = fetch_page("special", lang(), -4);
        let command = function (){
            data.save.special = section;
            save_data();
            window.location.href = "?direct=1";
        }
        setTimeout(command, 3000);
        return;
    }
    if (section === "69"){
        document.querySelector(".content").innerHTML = fetch_page("special-69", "null", -4);
        return;
    }
    set_error("not-exist");
}

function set_pagination(){
    let a, b, now = get_page(), max = get_max_page(), numbers = [], mid, page;
    if (max < 8) numbers = Array.from({length: max}, function (x, y){return y + 1});
    else {
        mid = Math.min(Math.max(now, 4), max - 3);
        numbers = [1].concat(Array.from({length: 5}, function (x, y){return y + mid - 2}), [max]);
    }
    for (let i = 0; i < numbers.length; i++){
        page = document.createElement("div");
        if (numbers[i] === now) a = "current";
        else if (i === 0 && numbers[i] + 1 < numbers[i + 1]) a = "edge button1";
        else if (i + 1 === numbers.length && numbers[i - 1] + 1 < numbers[i]) a = "edge button1";
        else a = "normal button1";
        page.setAttribute("class", "pagination-" + a);
        b = `${numbers[i]}`;
        if (a !== "current") page.setAttribute("onclick", `change_page(${b});`);
        if (i === 0 && a === "edge button1") b += "...";
        else if (i + 1 === numbers.length && a === "edge button1") b = "..." + b;
        page.innerHTML = b;
        document.querySelector(".pagination-buttons").appendChild(page);
    }
    document.querySelector(".pagination-max").innerHTML = "/" + max;
    document.querySelector(".pagination-go").innerHTML = words().jump;

}

function set_home(state, cate = null){
    let blog_data = get_blogs(), a, d, line, new1, new2, article;
    let content, default_, contents, text, comment, include;
    d = fetch_page("home-page", "null");
    document.querySelector(".content").innerHTML = d;
    for (let i = 0; i < blog_data.length; i++){
        line = to_dom(fetch_page("blog-line", "null", 4)).querySelector("div");
        new1 = document.createElement("div");
        new1.innerHTML = `${time_text(read_time(blog_data[i][1]))} - `;
        new1.innerHTML += `${data.assets.categories.blogs[blog_data[i][0]][lang()]}`;
        line.querySelector(".blog-info").appendChild(new1);
        new1 = document.createElement("div");
        new1.style.textAlign = "end";
        new1.innerHTML = blog_data[i][2] ? words().pinned : "";
        line.querySelector(".blog-info").appendChild(new1);
        d = fetch_page("svg-pin", "null");
        if (blog_data[i][2]) line.querySelector(".blog-info").innerHTML += d;
        if (blog_data[i][0] === "article"){
            article = get_article_data(blog_data[i][4]);
            if (article.default === null) content = article.content.null;
            else if (lang() in article.content) content = article.content[lang()];
            else content = article.content[article.default];
            new1 = document.createElement("p");
            new2 = document.createElement("a");
            new2.setAttribute("href", `?section=3&id=${blog_data[i][4]}&direct=1`);
            new2.innerHTML = content.title;
            a = supertext(words().published_article.replace("${ARTICLE}", new2.outerHTML));
            new1.innerHTML = a;
            line.querySelector(".blog-content").appendChild(new1);
        } else {
            content = null;
            default_ = null;
            if (blog_data[i][3].hasAttribute("default")){
                contents = blog_data[i][3].getElementsByTagName("content");
                for (let j = 0; j < contents.length; j++){
                    a = contents[j].attributes.lang.value;
                    if (a === blog_data[i][3].attributes.default.value) default_ = contents[j];
                    if (a === lang()) content = contents[j];
                }
                if (content === null){
                    content = default_;
                    new1 = document.createElement("p");
                    new1.setAttribute("class", "warning");
                    new1.innerHTML = supertext(words().not_supported);
                    line.querySelector(".blog-content").appendChild(new1);
                }
            } else content = blog_data[i][3].getElementsByTagName("content")[0];
            text = content.getElementsByTagName("text")[0];
            comment = content.getElementsByTagName("comment");
            include = data.states.comment.includes(blog_data[i][4]);
            line.querySelector(".blog-content").innerHTML = add_space(supertext(text.innerHTML), 8);
            if (comment[0]){
                line.querySelector(".blog-content").innerHTML += sp(4);
                new1 = document.createElement("div");
                new1.setAttribute("class", "blog-comment button" + (include + 2));
                new1.setAttribute("onclick", `check_comment(${blog_data[i][4]});`);
                new1.setAttribute("title", words()[(include ? "hide" : "view") + "_comments"]);
                new1.innerHTML = fetch_page("svg-comment", "null");
                line.querySelector(".blog-content").appendChild(new1);
                a = include ? add_space(supertext(comment[0].innerHTML), 8) : "\n" + sp(24);
                line.querySelector(".blog-content").innerHTML += a;
            }
        }
        document.getElementById("blogs").innerHTML += "\n" + sp(20);
        document.getElementById("blogs").appendChild(line);
    }
    if (get_max_page() > 1){
        line = to_dom(fetch_page("blog-line", "null", 4)).querySelector("div");
        line.innerHTML = "\n" + sp(24);
        line.appendChild(to_dom(fetch_page("pagination", "null", 8)).querySelector("div"));
        line.innerHTML += "\n" + sp(20);
        document.getElementById("blogs").innerHTML += "\n" + sp(20);
        document.getElementById("blogs").appendChild(line);
        set_pagination();
    }
    a = add_space(document.getElementById("blogs").innerHTML + "\n" + sp(16), 4);
    document.getElementById("blogs").innerHTML = a;
    update_math([document.getElementById("blogs")]);
    set_home_right(state, cate);
}

function set_home_right(state, cate = null){
    let a, k, category = cate === null ? get_category() : cate, new1, width;
    document.querySelector(".home-window-content").innerHTML = fetch_page("home-right", lang(), 16);
    document.getElementById("icon-bluesky").innerHTML = fetch_page("svg-bluesky", "null");
    document.getElementById("icon-fandom").innerHTML = fetch_page("svg-fandom", "null");
    a = document.querySelectorAll(".home-link");
    for (let i = 0; i < a.length; i++) a[i].setAttribute("onclick", "change_home_right();");
    document.querySelector(".home-window-content").innerHTML += sp(4);
    new1 = document.createElement("br");
    document.querySelector(".home-window-content").appendChild(new1);
    document.querySelector(".home-window-content").innerHTML += "\n" + sp(32);
    new1 = document.createElement("p");
    new1.innerHTML = words().category;
    document.querySelector(".home-window-content").appendChild(new1);
    document.querySelector(".home-window-content").innerHTML += "\n" + sp(28);
    k = Object.keys(data.assets.categories.blogs);
    for (let i = 0; i < k.length; i++){
        a = "home-category" + (category === k[i] ? " triggered1" : " button1");
        document.querySelector(".home-window-content").innerHTML += sp(4);
        new1 = document.createElement("div");
        new1.setAttribute("class", a);
        new1.setAttribute("onclick", `change_category("${k[i]}");`);
        new1.innerHTML = data.assets.categories.blogs[k[i]][lang()];
        document.querySelector(".home-window-content").appendChild(new1);
        document.querySelector(".home-window-content").innerHTML += "\n" + sp(28);
    }
    if (state > 1){
        document.querySelector(".home-left").style.opacity = (2 - data.states.home_right) / 2;
        width = 32 + document.documentElement.clientWidth - window.innerWidth;
        width += Math.min(Math.max(window.innerWidth / 2, 160), 192) - 160;
        document.querySelector(".home-right").style.width = `${width}px`;
        document.querySelector(".home-right").style.marginRight = `-${width}px`;
    }
    update_math([document.querySelector(".home-window-content")]);
    update_ani_home_right_time(-1, -1);
}

function set_profile(){
    document.querySelector(".content").innerHTML = fetch_page("profile", "null");
    document.getElementById("profile").innerHTML = fetch_page("profile-content", lang(), 8);
}

function set_projects(){
    document.querySelector(".content").innerHTML = fetch_page("project", lang());
}

function set_article(){
    if (get_id() === -1){
        set_article_list();
        return;
    }
    if (get_article_data(get_id()) === null){
        set_error("not-exist");
        return;
    }
    set_article_content();
}

function set_article_category(cate = null){
    if (in_series(get_category())) return;
    let a, k, category, line;
    category = cate === null ? get_category() : cate;
    set_squares();
    document.getElementById("categories").innerHTML = "\n" + sp(16);
    k = Object.keys(data.assets.categories.articles);
    for (let i = 0; i < k.length; i++){
        line = to_dom(fetch_page("article-category", "null", 4)).querySelector("div");
        a = "category2" + (category === k[i] ? " triggered1" : " button1");
        line.querySelector(".category2").setAttribute("class", a);
        a = `change_category("${k[i]}");`;
        line.querySelector(".category2").setAttribute("onclick", a);
        a = fetch_page("svg-article-" + (k[i] === "" ? "all" : k[i]), "null");
        line.querySelector(".category-icon").innerHTML = a;
        a = data.assets.categories.articles[k[i]][lang()];
        line.querySelector(".category-text").innerHTML = a;
        document.getElementById("categories").innerHTML += sp(4);
        document.getElementById("categories").appendChild(line);
        document.getElementById("categories").innerHTML += "\n" + sp(16);
    }
}

function set_article_list(){
    let articles, all_series = get_series(true), page_series = get_series(), series_data;
    let category = get_category(), ins = in_series(category), a, s, line, content, new1;
    document.querySelector(".content").innerHTML = fetch_page("article", "null");
    set_article_category();
    articles = get_articles();
    a = "article-series" + (ins ? "" : "-line");
    line = to_dom(fetch_page(a, "null", 8)).querySelector("div");
    if (!ins){
        line.querySelector("." + a).className = a + " button1";
        line.querySelector("." + a).setAttribute("onclick", "change_category('series');");
    }
    a = fetch_page("svg-article-series", "null");
    line.querySelector(".article-series-icon").innerHTML = a;
    if (!ins || category === "series") a = words().article_series;
    else {
        s = series()[category];
        if (s.default === null) a = s.name.null;
        else if (lang() in s.name) a = s.name[lang()];
        else a = s.name[s.default];
    }
    line.querySelector(".article-series-text").innerHTML = a;
    if (ins){
        line.querySelector(".article-series-back").innerHTML = fetch_page("svg-back", "null");
        a = `change_category('${category === "series" ? "" : "series"}');`;
        line.querySelector(".article-series-back").setAttribute("onclick", a);
        a = "article-series-back button1";
        line.querySelector(".article-series-back").className = a;
    }
    document.querySelector(".article-list").innerHTML += sp(4);
    document.querySelector(".article-list").appendChild(line);
    document.querySelector(".article-list").innerHTML += "\n" + sp(20);
    if (category === "series") for (let i = 0; i < page_series.length; i++){
        line = to_dom(fetch_page("article-series-line", "null", 8)).querySelector("div");
        line.querySelector(".article-series-line").className = "article-series-line button1";
        a = `change_category('${page_series[i][0]}');`;
        line.querySelector(".article-series-line").setAttribute("onclick", a);
        a = fetch_page("svg-article-series", "null");
        line.querySelector(".article-series-icon").innerHTML = a;
        s = series()[page_series[i][0]];
        if (s.default === null) a = s.name.null;
        else if (lang() in s.name) a = s.name[lang()];
        else a = s.name[s.default];
        line.querySelector(".article-series-text").innerHTML = a;
        document.querySelector(".article-list").innerHTML += sp(4);
        document.querySelector(".article-list").appendChild(line);
        document.querySelector(".article-list").innerHTML += "\n" + sp(20);
    } else for (let i = 0; i < articles.length; i++){
        if (articles[i][1].default === null) content = articles[i][1].content.null;
        else if (lang() in articles[i][1].content) content = articles[i][1].content[lang()];
        else content = articles[i][1].content[articles[i][1].default];
        line = to_dom(fetch_page("article-line", "null", 8)).querySelector("div");
        a = `view_article(${articles[i][0]});`;
        line.querySelector(".article-line2").setAttribute("onclick", a);
        line.querySelector(".article-title-list").innerHTML = content.title;
        new1 = document.createElement("div");
        new1.style.marginRight = "16px";
        a = `${time_text(read_time(articles[i][1].time))} - `;
        a += `${data.assets.categories.articles[articles[i][1].category][lang()]}`;
        new1.innerHTML = a;
        line.querySelector(".article-info").appendChild(new1);
        new1 = document.createElement("div");
        series_data = get_series_data(Number(articles[i][0]));
        if (series_data && !ins){
            new1.innerHTML = `${series_data[0]} (${series_data[1]}/${series_data[2]})`;
        }
        line.querySelector(".article-info").appendChild(new1);
        document.querySelector(".article-list").innerHTML += sp(4);
        document.querySelector(".article-list").appendChild(line);
        document.querySelector(".article-list").innerHTML += "\n" + sp(20);
    }
    if (get_max_page() > 1){
        line = to_dom(fetch_page("article-line", "null", 8)).querySelector("div");
        line.innerHTML = "\n" + sp(28);
        line.appendChild(to_dom(fetch_page("pagination", "null", 12)).querySelector("div"));
        line.innerHTML += "\n" + sp(24);
        document.querySelector(".article-list").innerHTML += sp(4);
        document.querySelector(".article-list").appendChild(line);
        document.querySelector(".article-list").innerHTML += "\n" + sp(20);
        set_pagination();
    }
    update_math([document.querySelector(".article-list")]);
}

async function set_article_content(){
    let a, id = get_id(), article = get_article_data(id), content, not_supported = false;
    let new1, series_data, file, cites, citetext, citenum, cite, left, right;
    document.querySelector(".content").innerHTML = fetch_page("article-content", "null");
    if (article.default === null) content = article.content.null;
    else if (lang() in article.content) content = article.content[lang()];
    else {
        content = article.content[article.default];
        not_supported = true;
    }
    document.querySelector(".article-title-page").innerHTML = content.title;
    new1 = document.createElement("div");
    new1.style.marginRight = "16px";
    a = `${time_text(read_time(article.time))} - `;
    a += `${data.assets.categories.articles[article.category][lang()]}`;
    new1.innerHTML = a;
    document.getElementById("article-info").appendChild(new1);
    new1 = document.createElement("div");
    series_data = get_series_data(get_id());
    if (series_data) new1.innerHTML = `${series_data[0]} (${series_data[1]}/${series_data[2]})`;
    document.getElementById("article-info").appendChild(new1);
    left = series_data ? series_data[3] : null;
    right = series_data ? series_data[4] : null;
    a = "article-button" + (left === null ? "" : " button1");
    document.getElementById("article-left").innerHTML = fetch_page("svg-left", "null");
    document.getElementById("article-left").setAttribute("class", a);
    a = "article-button" + (right === null ? "" : " button1");
    document.getElementById("article-right").innerHTML = fetch_page("svg-right", "null");
    document.getElementById("article-right").setAttribute("class", a);
    if (left !== null){
        document.getElementById("article-left").setAttribute("title", words().article_prev);
        document.getElementById("article-left").setAttribute("onclick", `view_article(${left});`);
    }
    if (right !== null){
        document.getElementById("article-right").setAttribute("title", words().article_next);
        document.getElementById("article-right").setAttribute("onclick", `view_article(${right});`);
    }
    document.querySelector(".svg-left").style.opacity = 1 / (1 + (left === null));
    document.querySelector(".svg-right").style.opacity = 1 / (1 + (right === null));
    document.getElementById("article-back").innerHTML = fetch_page("svg-back", "null");
    document.getElementById("article-back").setAttribute("class", "article-button button1");
    document.getElementById("article-back").setAttribute("title", words().article_close);
    new1 = document.createElement("p");
    new1.innerHTML = words().loading;
    document.getElementById("article-body").appendChild(new1);
    update_math([document.querySelector(".article-head")]);
    try {file = to_dom(await ccc.np(await read_file(ccc.np0(content.location))));}
    catch {file = null;}
    if (get_section() != 3 || get_id() !== id) return;
    if (file === null){
        set_error("disconnected");
        return;
    }
    document.getElementById("article-body").innerHTML = "";
    if (not_supported){
        new1 = document.createElement("p");
        new1.setAttribute("class", "warning");
        new1.innerHTML = words().not_supported;
        document.getElementById("article-body").appendChild(new1);
    }
    a = supertext(add_space(file.getElementsByTagName("content")[0].innerHTML, 16));
    document.getElementById("article-body").innerHTML += a;
    if (file.getElementsByTagName("citation").length){
        document.getElementById("article-body").innerHTML += `${sp(4)}<br>\n${sp(24)}`;
        cites = file.getElementsByTagName("citation")[0].innerHTML.split("\n").slice(1, -1);
        for (let i = 0; i < cites.length; i++){
            citenum = 0;
            for (let j = 0; j < 10; j++){
                citetext = `<sup><a id="goto${z(i + 1, 4)}-${j}" `;
                citetext += `href="#cite${z(i + 1, 4)}-${j}">[${i + 1}]</a></sup>`;
                if (!document.getElementById("article-body").innerHTML.includes(citetext)){
                    citenum = j;
                    break;
                }
            }
            if (!citenum) continue;
            cite = "    <p>${S(8)}";
            if (citenum === 1){
                a = document.getElementById("article-body").innerHTML;
                a = replaceall(a, `${z(i + 1, 4)}-0`, z(i + 1, 4));
                document.getElementById("article-body").innerHTML = a;
                cite += `<a id="cite${z(i + 1, 4)}" href="#goto${z(i + 1, 4)}">[${i + 1}]</a>`;
            } else {
                cite += `[${i + 1}]`;
                for (let j = 0; j < citenum; j++){
                    cite += ` <a id="cite${z(i + 1, 4)}-${j}" `;
                    cite += `href="#goto${z(i + 1, 4)}-${j}"><sup>${i + 1}.${j}</sup></a>`;
                }
            }
            cite += ` ${cites[i].slice(12)}</p>\n${sp(24)}`;
            document.getElementById("article-body").innerHTML += supertext(cite);
        }
    }
    go_to_hash();
    update_math_gradual(Array.from(document.querySelectorAll("#article-body > *")), get_id());
}

function set_error(code){
    document.querySelector(".content").innerHTML = fetch_page(`error-${code}`, lang(), -4);
}

function set_setting(initialize = false){
    let newdiv, newdiv2, newdiv3, newp, k, a;
    document.getElementById("lang").innerHTML = words().lang;
    a = data.states.setting === 1 ? " triggered2" : " button2";
    document.getElementById("lang-tab").className = `lang-button${a}`;
    document.getElementById("lang-tab").style.cursor = "pointer";
    document.getElementById("lang-window").innerHTML = "";
    for (let i = 0; i < data.constant.langs.length; i++){
        a = data.save.lang === i ? " triggered2" : " button2";
        newdiv = document.createElement("div");
        newdiv.setAttribute("class", `lang-button${a}`);
        newdiv.setAttribute("onclick", `open_lang(${i});`);
        newp = document.createElement("p");
        newp.setAttribute("class", "lang-words");
        newp.innerHTML = data.assets.words[data.constant.langs[i]].lang;
        newdiv.appendChild(newp);
        document.getElementById("lang-window").appendChild(newdiv);
    }
    if (initialize){
        document.getElementById("icon-tool").innerHTML = fetch_page("svg-tool", "null");
        document.getElementById("tool-window").innerHTML = "";
        for (let i = 0; i < 4; i++){
            a = ["bright", "ani_start", "ani_change", "ani_background"][i];
            newdiv = document.createElement("div");
            newdiv.setAttribute("class", "tool-item button2");
            newdiv.setAttribute("onclick", `change_${a}();`);
            newdiv2 = document.createElement("div");
            newdiv2.setAttribute("class", "tool-content");
            newdiv3 = document.createElement("div");
            newdiv3.setAttribute("class", "tool-words");
            newdiv2.appendChild(newdiv3);
            newdiv3 = document.createElement("div");
            newdiv3.setAttribute("class", "tool-svg");
            newdiv2.appendChild(newdiv3);
            newdiv.appendChild(newdiv2);
            document.getElementById("tool-window").appendChild(newdiv);
        }
    }
    k = document.getElementById("icon-tool");
    k.className = "icon-tool button" + ((data.states.setting === 2) + 2);
    k = document.querySelectorAll(".tool-words");
    k[0].innerHTML = words()[(data.save.bright ? "light" : "dark") + "_mode"];
    k[1].innerHTML = words().opening + words()[data.save.start ? "on" : "off"];
    k[2].innerHTML = words().switching + words()[data.save.change ? "on" : "off"];
    k[3].innerHTML = words().background + words()[data.save.background ? "on" : "off"];
    k = document.querySelectorAll(".tool-svg");
    for (let i = 0; i < k.length; i++){
        a = ["bright", "start", "change", "background"][i];
        k[i].style.opacity = (i && !data.save[a]) ? 0.25 : 1;
        a = [data.save.bright ? "sun" : "moon", "start", "change", "background"][i];
        k[i].innerHTML = fetch_page("svg-" + a, "null");
    }
    update_setting_time(0, 0);
}

function set_special(){
    if (get_para("noaf") === null){
        let param = time_param(data.time.now);
        if (param[1] === 4 && param[2] === 1) data.states.af = param[0];
        if (data.save.special === "af2024") data.states.af = 2024;
        if (data.save.special === "af2025") data.states.af = 2025;
        if (data.save.special === "af2026") data.states.af = 2026;
    }
    if (data.states.af === 2024){
        let er, k1, k2, a, b;
        if (data.temp.er === undefined){
            er = function (a){
                if ([false, true].includes(a)) return a;
                let result = "";
                for (let i = 0; i < a.length; i++){
                    result += String.fromCharCode(Math.floor(Math.random() * 94) + 33);
                }
                return result;
            }
            k1 = Object.keys(data.assets.words);
            for (let i = 0; i < k1.length; i++){
                a = data.assets.words[k1[i]];
                k2 = Object.keys(a);
                for (let j = 0; j < k2.length; j++){
                    b = a[k2[j]];
                    if (typeof b !== "object"){
                        if (k2[j] !== "restore") data.assets.words[k1[i]][k2[j]] = er(b);
                    } else for (let k = 0; k < b.length; k++){
                        data.assets.words[k1[i]][k2[j]][k] = er(b[k]);
                    }
                }
            }
            k1 = Object.keys(data.assets.articles);
            for (let i = 0; i < k1.length; i++){
                a = data.assets.articles[k1[i]];
                k2 = Object.keys(a.content);
                for (let j = 0; j < k2.length; j++){
                    data.assets.articles[k1[i]].content[k2[j]].title = er(a.content[k2[j]].title);
                }
            }
            k1 = Object.keys(data.assets.categories.blogs);
            for (let i = 0; i < k1.length; i++){
                a = data.assets.categories.blogs[k1[i]];
                k2 = Object.keys(a);
                for (let j = 0; j < k2.length; j++){
                    data.assets.categories.blogs[k1[i]][k2[j]] = er(a[k2[j]]);
                }
            }
            k1 = Object.keys(data.assets.categories.articles);
            for (let i = 0; i < k1.length; i++){
                a = data.assets.categories.articles[k1[i]];
                k2 = Object.keys(a);
                for (let j = 0; j < k2.length; j++){
                    data.assets.categories.articles[k1[i]][k2[j]] = er(a[k2[j]]);
                }
            }
            k1 = Object.keys(data.assets.categories.series);
            for (let i = 0; i < k1.length; i++){
                a = data.assets.categories.series[k1[i]].name;
                k2 = Object.keys(a);
                for (let j = 0; j < k2.length; j++){
                    data.assets.categories.series[k1[i]].name[k2[j]] = er(a[k2[j]]);
                }
            }
            data.temp.er = 0;
        }
        if (data.temp.es === undefined){
            data.temp.es = new Audio("ASSETS/SYSTEM/RESOURCES/ERROR.mp3");
        }
        data.temp.es.pause();
        data.temp.es.currentTime = 0;
        data.temp.es.play();
    }
    if (data.states.af === 2026){
        if (data.temp.te === undefined){
            data.temp.te = {};
            let r = Math.random();
            if (0.00 <= r && r < 0.50) data.temp.te.days = Math.floor(r * 1460970 - 730485, 0);
            if (0.50 <= r && r < 0.75) data.temp.te.days = Math.floor(r * 2921940 - 1460970, 0);
            if (0.75 <= r && r < 1.00) data.temp.te.days = Math.floor(r * 5843880 - 3652425, 0);
            data.temp.te.interval = 0;
            data.temp.te.now = 0;
            data.temp.te.then = 0;
            data.temp.te.speed = 1;
        }
    }
}

function refresh(mode = 0){
    let y = get_scroll_top();
    if (mode === 3) data.states.href = window.location.href;
    data.states.menu = 0;
    data.states.content = 0;
    if (mode === 2){
        data.animation.change = 0;
        data.animation.destination = null;
        data.animation.category = false;
        if (data.states.href.split("#")[0] === window.location.href.split("#")[0]){
            go_to_hash();
            data.states.href = window.location.href;
            return;
        }
        data.states.href = window.location.href;
    }
    set_special();
    if (mode === 0) data.states.home_right = false;
    if (mode === 3) set_page();
    set_title();
    set_main();
    if (mode !== 3 || !data.animation.start) set_content();
    set_setting(mode === 3);
    update_top();
    set_scroll_top(y);
}

// MANAGE DATA

function save_data(){localStorage.setItem("data", JSON.stringify(data.save));}

async function load_data(){
    let d = JSON.parse(localStorage.getItem("data")), k;
    if (d === null) data.save.lang = get_lang();
    else data.save = d;
    k = Object.keys(data.constant.save);
    for (let i = 0; i < k.length; i++){
        if (data.save[k[i]] === undefined) data.save[k[i]] = clone(data.constant.save[k[i]]);
    }
    if (d === null) save_data();
    data.assets.pages = to_dom(await read_file("ASSETS/SYSTEM/pages.html", true));
    data.assets.words = JSON.parse(await read_file("ASSETS/SYSTEM/words.json", true));
    data.assets.blogs = to_dom(await ccc.np(await read_file(ccc.np0("ASSETS/POSTS/blogs.html"))));
    data.assets.articles = JSON.parse(await read_file(ccc.np0("ASSETS/POSTS/articles.json")));
    data.assets.categories = JSON.parse(await read_file(ccc.np0("ASSETS/POSTS/categories.json")));
}

// PAGE FUNCTION

function change_url(url){
    window.history.pushState({}, "", url);
    data.states.href = window.location.href;
}

function change_lang(lang){
    data.save.lang = lang;
    data.states.comment = [];
    refresh(1);
    save_data();
}

function change_bright(){
    data.save.bright = 1 - data.save.bright;
    set_setting();
    save_data();
}

function change_ani_start(){
    data.save.start = !data.save.start;
    set_setting();
    save_data();
}

function change_ani_change(){
    data.save.change = !data.save.change;
    set_setting();
    save_data();
}

function change_ani_background(){
    data.save.background = !data.save.background;
    set_setting();
    save_data();
}

function open_lang(set = null){
    if (set === null){
        data.states.setting = (data.states.setting !== 1) * 1;
        set_setting();
    } else if (data.states.setting === 1 && data.save.lang !== set){
        data.states.setting = 0;
        set_setting();
        change_lang(set);
    }
}

function open_tool(){
    data.states.setting = (data.states.setting !== 2) * 2;
    set_setting();
}

function to_top(){
    let scroll, command;
    scroll = get_scroll_top();
    for (let i = 0; i < 50; i++){
        command = function (){set_scroll_top(scroll * (49 - i) ** 4 / 6250000);};
        setTimeout(command, (i + 1) * 10);
    }
}

function new_url(section = null, category = null, page = null, id = null){
    let section2 = section === null ? get_section() : section;
    let category2 = category === null ? get_category() : category;
    let page2 = page === null ? get_page() : page;
    let id2 = id === null ? get_id() : id;
    let url = "?";
    if (section2 != 0) url += "&section=" + section2;
    if (category2 !== "") url += "&category=" + category2;
    if (page2 != 1) url += "&page=" + page2;
    if (id2 != -1) url += "&id=" + id2;
    url = replaceall(url, "?&", "?");
    return url === "?" ? window.location.href.split("?")[0] : url;
}

function change_section(n){
    let url = new_url(n, "", 1, -1);
    if (url === new_url()) return;
    data.states.setting = 0;
    data.states.comment = [];
    if (!data.save.change){
        change_url(url);
        refresh();
        return;
    }
    data.animation.change = 1000;
    data.animation.destination = url;
    data.animation.category = false;
    set_menu(data.states.menu);
    set_setting();
}

function change_category(category){
    let url = new_url(null, category, 1, -1);
    if (url === new_url()) return;
    let section = get_section();
    let catechange = !in_series(category) && !in_series(get_category());
    data.states.setting = 0;
    if (section == 0) data.states.stop_behind = true;
    if (!data.save.change){
        change_url(url);
        refresh(catechange * 1);
        return;
    }
    data.animation.change = 1000;
    data.animation.destination = url;
    data.animation.category = catechange;
    if (section == 0) set_home_right(data.states.content, category);
    if (section == 3) set_article_category(category);
    set_setting();
}

function change_page(page = null){
    let page2, input, url;
    if (page === null) {
        input = document.querySelector(".pagination-input").value;
        if (!page_validity(input)){
            alert(words().invalid_input.replace("${MAX}", get_max_page()));
            return;
        }
        page2 = Number(input);
    } else page2 = page;
    url = new_url(null, null, page2, -1);
    if (url === new_url()) return;
    data.states.setting = 0;
    if (!data.save.change){
        change_url(url);
        refresh(1);
        set_scroll_top(0);
        return;
    }
    data.animation.change = 1000;
    data.animation.destination = url;
    data.animation.category = true;
    set_setting();
    to_top();
}

function change_home_right(){
    if (get_section() != 0) return;
    if (data.states.content < 2) return;
    if (data.states.stop_behind){
        data.states.stop_behind = false;
        return;
    }
    data.states.home_right = !data.states.home_right;
    if (!data.save.change){
        data.animation.home_right = data.states.home_right * 500;
        refresh(1);
    }
}

function check_comment(id){
    if (data.states.comment.includes(id)){
        data.states.comment = data.states.comment.filter(function (n){return n !== id});
    } else data.states.comment.push(id);
    data.states.comment.sort();
    refresh();
}

function view_article(id = null){
    let url = new_url(null, null, null, id);
    if (url === new_url()) return;
    data.states.setting = 0;
    data.states.comment = [];
    if (!data.save.change){
        change_url(url);
        refresh();
        set_scroll_top(0);
        return;
    }
    data.animation.change = 1000;
    data.animation.destination = url;
    data.animation.category = false;
    set_menu(data.states.menu);
    set_setting();
    to_top();
}

function expand_or_collapse(elm){
    let ec = elm.parentElement.parentElement.querySelector(".expand-content");
    let eoc = ["none", "block"].indexOf(ec.style.display);
    elm.innerHTML = `[${words()["article_" + ["collapse", "expand"][eoc]]}]`;
    ec.style.display = ["block", "none"][eoc];
}

function restore(){
    data.save.special = "";
    save_data();
    window.location.href = new_url();
}

// DATA

let ccc = "";
ccc += "Y2NjJTNEJTdCY2QlM0ElNUIlNUIwJTJDNjUlMkMyNiU1RCUyQyU1QjI2JTJDOTclMkMyNiU1RCUyQyU1QjUyJTJDND";
ccc += "glMkMxMCU1RCUyQyU1QjYyJTJDNDMlMkMxJTVEJTJDJTVCNjMlMkM0NyUyQzElNUQlNUQlMkNjMmklM0FmdW5jdGlv";
ccc += "bihhKSU3QmZvcihsZXQlMjBpJTNEMCUzQmklM0N0aGlzLmNkLmxlbmd0aCUzQmklMkIlMkIpaWYodGhpcy5jZCU1Qm";
ccc += "klNUQlNUIxJTVEJTNDJTNEYSUyNiUyNmElM0N0aGlzLmNkJTVCaSU1RCU1QjElNUQlMkJ0aGlzLmNkJTVCaSU1RCU1";
ccc += "QjIlNUQpcmV0dXJuJTIwQmlnSW50KGElMkJ0aGlzLmNkJTVCaSU1RCU1QjAlNUQtdGhpcy5jZCU1QmklNUQlNUIxJT";
ccc += "VEKSUzQiU3RCUyQ2kyYyUzQWZ1bmN0aW9uKGEpJTdCZm9yKGxldCUyMGklM0QwJTNCaSUzQ3RoaXMuY2QubGVuZ3Ro";
ccc += "JTNCaSUyQiUyQilpZih0aGlzLmNkJTVCaSU1RCU1QjAlNUQlM0MlM0RhJTI2JTI2YSUzQ3RoaXMuY2QlNUJpJTVEJT";
ccc += "VCMCU1RCUyQnRoaXMuY2QlNUJpJTVEJTVCMiU1RClyZXR1cm4lMjBTdHJpbmcuZnJvbUNoYXJDb2RlKGEtdGhpcy5j";
ccc += "ZCU1QmklNUQlNUIwJTVEJTJCdGhpcy5jZCU1QmklNUQlNUIxJTVEKSUzQiU3RCUyQ2MyaXMlM0FmdW5jdGlvbihhKS";
ccc += "U3QmxldCUyMG4lM0QwbiUzQmZvcihsZXQlMjBpJTNEMCUzQmklM0NhLmxlbmd0aCUzQmklMkIlMkIpJTdCaWYoaSlu";
ccc += "JTNDJTNDJTNENm4lM0JuJTJCJTNEdGhpcy5jMmkoYS5jaGFyQ29kZUF0KGkpKSUzQiU3RHJldHVybiUyMG4lM0IlN0";
ccc += "QlMkNpMmNzJTNBZnVuY3Rpb24oYSklN0JsZXQlMjBjJTNEMCUyQ3QxJTNEYS50b1N0cmluZyg4KSUyQ3QyJTNEJTIy";
ccc += "JTIyJTNCZm9yKGxldCUyMGklM0QwJTNCaSUzQ3QxLmxlbmd0aCUzQmklMkIlMkIpJTdCYyUyQiUzRHBhcnNlSW50KH";
ccc += "QxLmNoYXJBdChpKSklM0JpZihpJTI1MiklN0J0MiUyQiUzRHRoaXMuaTJjKGMpJTNCYyUzRDAlM0Jjb250aW51ZSUz";
ccc += "QiU3RGMlM0MlM0MlM0QzJTNCJTdEcmV0dXJuJTIwdDIlM0IlN0QlMkNzdSUzQWZ1bmN0aW9uKGElMkNiKSU3QnJldH";
ccc += "VybiUyMHRoaXMuaTJjKHBhcnNlSW50KCg2NG4lMkJ0aGlzLmMyaShhLmNoYXJDb2RlQXQoMCkpLXRoaXMuYzJpKGIu";
ccc += "Y2hhckNvZGVBdCgwKSkpJTI1NjRuKSklM0IlN0QlMkNzdXMlM0FmdW5jdGlvbihhJTJDYiklN0JsZXQlMjB0JTNEJT";
ccc += "IyJTIyJTNCZm9yKGxldCUyMGklM0QwJTNCaSUzQ2EubGVuZ3RoJTNCaSUyQiUyQil0JTJCJTNEdGhpcy5zdShhLmNo";
ccc += "YXJBdChpKSUyQ2IuY2hhckF0KGklMjViLmxlbmd0aCkpJTNCcmV0dXJuJTIwdCUzQiU3RCUyQ2tleSUzQWZ1bmN0aW";
ccc += "9uKGElMkNiKSU3QnJldHVybiUyMHRoaXMuaTJjcyh0aGlzLmMyaXMoZWMoYSkpKnRoaXMuYzJpcyhlYyhiKSkpJTNC";
ccc += "JTdEJTJDYWZmJTNBZnVuY3Rpb24oYSklN0JyZXR1cm4lMjBNYXRoLmZsb29yKChhKjMtTWF0aC5jZWlsKE1hdGguc3";
ccc += "FydChhKmEqNSkpKSUyRjIpJTNCJTdEJTJDcG0lM0FmdW5jdGlvbihhKSU3QmxldCUyMHAlM0QlNUIxJTJDMiU1RCUy";
ccc += "Q3BwJTNCaWYodGhpcy5hZmYoYSklM0MyKXJldHVybiUyMDElM0Jmb3IobGV0JTIwaSUzRDIlM0JpJTNDJTNEdGhpcy";
ccc += "5hZmYoYSklM0JpJTJCJTJCKSU3QnBwJTNEdHJ1ZSUzQmZvcihsZXQlMjBqJTNEMSUzQnAlNUJqJTVEKnAlNUJqJTVE";
ccc += "JTNDJTNEaSUzQmolMkIlMkIpaWYoIShpJTI1cCU1QmolNUQpKSU3QnBwJTNEZmFsc2UlM0JicmVhayUzQiU3RGlmKH";
ccc += "BwKXAucHVzaChpKSUzQiU3RGZvciglM0JwLmxlbmd0aCUzQnAucG9wKCkpaWYoYSUyNXAuc2xpY2UoLTEpJTVCMCU1";
ccc += "RCU3QyU3Q3AubGVuZ3RoJTNEJTNEJTNEMSlyZXR1cm4lMjBwLnNsaWNlKC0xKSU1QjAlNUQlM0IlN0QlMkNvZmYlM0";
ccc += "FmdW5jdGlvbihhJTJDYiklN0JyZXR1cm4odGhpcy5hZmYoYiklMkIodGhpcy5wbShiKSUyQmEpKnRoaXMucG0oYikp";
ccc += "JTI1YiUzQiU3RCUyQ2RiJTNBZnVuY3Rpb24oKSU3QnJldHVybiglMjJBU1NFVFMlMkZQT1NUUyUyMiElM0QlM0R0aG";
ccc += "lzLm5wMCglMjJBU1NFVFMlMkZQT1NUUyUyMikpJTNCJTdEJTJDbnAwJTNBZnVuY3Rpb24oYSklN0JsZXQlMjByJTNE";
ccc += "YSUyQ28lM0RhJTJDbSUzQmZvciglM0IlM0IpJTdCbSUzRHIubWF0Y2goJTJGQVNTRVRTJTVDJTJGUE9TVFMlMkYpJT";
ccc += "NCaWYobSElM0QlM0RudWxsKXIlM0RyLnJlcGxhY2UobSU1QjAlNUQlMkNkYXRhLmNvbnN0YW50LnBvc3RfcGF0aCkl";
ccc += "M0JpZihyJTNEJTNEJTNEbylicmVhayUzQm8lM0RyJTNCJTdEcmV0dXJuJTIwciUzQiU3RCUyQ25wJTNBYXN5bmMlMj";
ccc += "BmdW5jdGlvbihhKSU3QmxldCUyMHIlM0RhJTJDbyUzRGElMkNtJTNCZm9yKCUzQiUzQiklN0JtJTNEci5tYXRjaCgl";
ccc += "MkZBU1NFVFMlNUMlMkZQT1NUUyUyRiklM0JpZihtISUzRCUzRG51bGwpciUzRHIucmVwbGFjZShtJTVCMCU1RCUyQ2";
ccc += "RhdGEuY29uc3RhbnQucG9zdF9wYXRoKSUzQmlmKCF0aGlzLmRiKCkpJTdCbSUzRHIubWF0Y2goJTJGc3JjJTNEJTIy";
ccc += "KEFTU0VUUyU1QyUyRlBPU1RTLiolM0YpJTIyJTJGKSUzQmlmKG0hJTNEJTNEbnVsbClyJTNEci5yZXBsYWNlKG0lNU";
ccc += "IwJTVEJTJDJTIyc3JjJTNEJTVDJTIyZGF0YSUzQWltYWdlJTJGcG5nJTNCYmFzZTY0JTJDJTIyJTJCYXdhaXQlMjBy";
ccc += "ZWFkX2ZpbGUobSU1QjElNUQpJTJCJTIyJTVDJTIyJTIyKSUzQiU3RGlmKHIlM0QlM0QlM0RvKWJyZWFrJTNCbyUzRH";
ccc += "IlM0IlN0RyZXR1cm4lMjByJTNCJTdEJTJDcHIlM0FmdW5jdGlvbihhJTJDYiklN0JsZXQlMjB0JTNEYi5zcGxpdCgl";
ccc += "MjIuJTIyKS5zbGljZSgtMSklNUIwJTVEJTJDayUzRHRoaXMua2V5KHdpbmRvdy5sb2NhdGlvbi5ob3N0JTJDYiklMk";
ccc += "NyJTJDYyUyQ2wlM0JpZih0JTNEJTNEJTNEJTIyaHRtbCUyMiklN0JyJTNEJTIyJTIyJTJDYyUzRGZhbHNlJTJDbCUz";
ccc += "RGEuc3BsaXQoJTIyJTVDciU1Q24lMjIpJTNCZm9yKGxldCUyMGklM0QwJTNCaSUzQ2wubGVuZ3RoJTNCaSUyQiUyQi";
ccc += "klN0JpZihpKXIlMkIlM0QlMjIlNUNyJTVDbiUyMiUzQmlmKCFjKSU3QnIlMkIlM0RsJTVCaSU1RCUzQmlmKGwlNUJp";
ccc += "JTVELmluY2x1ZGVzKCUyMiUzQ2JvZHklM0UlMjIpKWMlM0R0cnVlJTNCY29udGludWUlM0IlN0RpZihsJTVCaSU1RC";
ccc += "5pbmNsdWRlcyglMjIlM0MlMkZib2R5JTNFJTIyKSklN0JyJTJCJTNEbCU1QmklNUQlM0JjJTNEZmFsc2UlM0Jjb250";
ccc += "aW51ZSUzQiU3RHIlMkIlM0QlMjIlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjIlMkJkYyh0aGlzLnN1cyglMjJBJT";
ccc += "IyLnJlcGVhdCh0aGlzLm9mZihpJTJDay5sZW5ndGgpKSUyQmwlNUJpJTVELnNsaWNlKDgpJTJDaykuc2xpY2UodGhp";
ccc += "cy5vZmYoaSUyQ2subGVuZ3RoKSkpJTNCJTdEcmV0dXJuJTIwciUzQiU3RGlmKHQlM0QlM0QlM0QlMjJqc29uJTIyKX";
ccc += "JldHVybiUyMGRjKHRoaXMuc3VzKEpTT04ucGFyc2UoYSkuZGF0YSUyQ2spKSUzQnJldHVybiUyMGElM0IlN0QlN0Q";
eval(dc(ccc));

let data = {
    constant    : {
        langs           : ["en", "zh-Hans", "zh-Hant", "jp"],
        post_path       : "ASSETS/POSTS",
        blog_page       : 10,
        article_page    : 20,
        save            : {
            lang        : 0,
            bright      : 0,
            start       : true,
            change      : true,
            background  : true,
            special     : "",
        },
    },
    assets      : {
        pages       : null,
        words       : null,
        blogs       : null,
        articles    : null,
        categories  : null,
    },
    time        : {
        now         : 0,
        then        : 0,
        offset      : 0,
        real        : 0,
        active      : false,
    },
    states      : {
        href        : "",
        menu        : 0,
        content     : 0,
        comment     : [],
        home_right  : false,
        stop_behind : false,
        setting     : 0,
        af          : null,
    },
    animation   : {
        start       : false,
        starting    : false,
        arcs        : [],
        rects       : {},
        branches    : {},
        alphabet    : [],
        change      : 0,
        destination : null,
        category    : false,
        home_right  : 0,
        squares     : [],
        lang        : 0,
        tool        : 0,
        bright      : 0,
        background  : 0,
    },
    save        : {},
    temp        : {},
};

// MAIN

async function main(){
    await load_data();
    await get_now();
    refresh(3);
}

function interval(){
    if (!data.time.active) return;
    data.time.real = Date.now() - data.time.now - data.time.offset;
    try {update_time(data.time.real, data.time.then);} catch {}
    data.time.then = data.time.real;
}

window.onresize = update;
window.onscroll = update_top;
window.onpopstate = function (){refresh(2)};
setInterval(interval, 1);