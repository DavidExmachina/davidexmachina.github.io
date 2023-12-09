function s(n){return "&nbsp;".repeat(n);}

const articles = [
    {
        title: [
            `Introducing Googology`,
            null,
            null,
            null,
        ],
        series: ``,
        time: Date.UTC(2023, 11 - 1, 17, 12, 0, 0, 0),
        default: 0,
        content: [
            [
                `${s(8)}I'm a math enthusiast and I was fascinated with googology a decade ago. It's been 2 years since I started studying googology in depth. I know this wasn't something I dreamed of doing from the beginning, but this subject is so fascinating that I'm actually addicted to it and I want to share my thoughts on it with everybody.`,
                `${s(8)}Googology is the study of large numbers. In my opinion, it's a game of creating large numbers which tests one's mathematical ability. It's also a gateway to other fields of mathematics such as set theory, mathematical logic, proof theory, computational science and so on, as they are essential to create large numbers that simple mathematical definitions cannot create. It's like playing chess, we have to study a lot of openings, tactics, endgames and so on to beat stronger opponents. Therefore, I consider these fields of mathematics to be part of googology as well.`,
                `${s(8)}Rather than large number notations like the Knuth's up-arrow notation, the BAN (Bird's Array Notation) and the Hyper-E notation, I prefer set theoretic concepts like infinite ordinals, cardinals, OCFs (Ordinal Collapsing Functions), the FGH (fast-growing hierarchy) and so on. This is because the infinite ordinals play an important role in creating large number notations. Actually, BAN is an example because Bird used infinite ordinals to continue his definition of the notation<sup><a id="goto0001" href="#cite0001">[1]</a></sup>. After all, give a man a fish, and you feed him for a day. Teach a man to fish, and you feed him for a lifetime.`,
                `${s(8)}What fascinates me most about googology are the OCFs and the ordinal notations because they can create extremely large ordinals and thus create extremely large numbers. They're like towers that are infinitely tall but still have a top to reach. Studying how the ordinals go up in this system and climbing the stairs of the tower step by step really entertains me. This reminds me of the anime I watched late last year called "Made in Abyss" which is about protagonists going deeper and deeper to find the magnificent scenery and the truth.`,
                `${s(8)}I'm not a professional mathematician and I like to make things as easy to understand as possible. Although I make nice and naive assumptions most of the time, I like my numbers or concepts as well-defined as possible. But as the number goes up, the concepts get more complex and the definitions and proofs get more difficult. Therefore, I will inevitably make some mistakes and ask about something silly. I hope everybody is friendly enough when pointing out my mistakes and answering my questions.`,
                `${s(8)}I've also started to study some mathematics I mentioned above like the Lambda Calculus, the Sequent Calculus, etc. so that I can understand more about the definitions of large numbers and still have something to learn in case I stop caring about googology for some reasons.`,
                `${s(8)}I will also post something on the <a href="https://googology.fandom.com/">Googology wiki</a>. Although I see people complaining about the Fandom website, there seems to be no other place suitable to talk about googology to my knowledge. I hope this is not a bad decision.`,
                `${s(8)}I will post more about googology on this website in the future, so stay tuned! (*￣▽￣*)`,
                `${s(1)}`,
                `${s(8)}<a id="cite0001" href="#goto0001">^</a>[1] Chris Bird, <a href="http://www.mrob.com/users/chrisb/Beyond_Nested_Arrays_I.pdf">Beyond Bird's Nested Arrays I</a>`,
            ],
            null,
            null,
            null,
        ],
    },
        {
        title: [
            `My analysis of Buchholz's OCF and two Rathjen's OCFs - Part.I`,
            null,
            null,
            null,
        ],
        series: ``,
        time: Date.UTC(2023, 12 - 1, 3, 12, 0, 0, 0),
        default: 0,
        content: [
            [
                `<h2>The role of countable ordinals in googology</h2>`,
                `${s(8)}Countable ordinals play a vital role in googology. In a nutshell, countable ordinals are used to "measure" the growth rate of functions or notations. They're mainly used in a well-known function in googology called FGH (Fast-Growing Hierarchy), which is defined like this:`,
                `<div style="text-align: center;">\\( \\begin{align} f_0(n) & := n+1 \\\\ f_{\\alpha+1}(n) & := f_\\alpha^n(n)=\\underbrace{f_\\alpha(f_\\alpha(\\cdots f_\\alpha(}_{n}n))\\cdots) \\\\ \\alpha\\in Lim \\Rightarrow f_\\alpha(n) & := f_{\\alpha[n]}(n) \\end{align} \\)</div>`,
                `${s(8)}Where \\( \\alpha \\) denotes ordinal numbers, \\( n \\) denotes natural numbers, \\( Lim \\) denotes the class of limit ordinals (EXCLUDING 0) and \\( \\alpha[n] \\) denotes the FS (Fundamental Sequence) function, which, in a nutshell, returns the \\( n \\)-th ordinal of a monotonically increasing sequence whose limit is \\( \\alpha \\):`,
                `<div style="text-align: center;">\\( m< n \\Rightarrow \\alpha[m] \\le \\alpha[n] \\)</div>`,
                `<div style="text-align: center;">\\( sup\\{\\alpha[n]|n< \\omega\\}=\\alpha \\)</div>`,
                `${s(8)}For example:`,
                `<div style="text-align: center;">\\( \\omega[n]=n \\)</div>`,
                `<div style="text-align: center;">\\( \\varepsilon_0[0]=0\\land \\varepsilon_0[n+1]=\\omega^{\\varepsilon_0[n]} \\)</div>`,
                `${s(8)}Actually, it is important to define the FS function well in order to determine the exact value. However, defining the FS function is currently completely artificial and usually difficult. It's not that hard to define the FS of relatively small ordinals like \\( \\varepsilon_0 \\), but it takes a lot of time and effort to define the FS for very large ordinals.`,
                `<h2>What are OCFs (Ordinal Collapsing Functions)?</h2>`,
                `${s(8)}OCFs (Ordinal Collapsing Functions) are functions that takes a LARGE (and usually uncountable) but SIMPLE ordinal as input and returns a SMALL (and usually countable) but COMPLEX ordinal as output. The countable ordinals that the OCFs produce are usually extremely large and complex enough to express the "strength" of some mathematical theories. Mathematicians like Wilfried Buchholz, Michael Rathjen and so on have invented their OCFs, but the their strength and the way they work are all different. It's difficult to figure out how to represent the same ordinal using these OCFs.`,
                `${s(8)}In this series of articles, I'm going to list 1,200 notable countable ordinals using Buchholz's OCF<sup><a id="goto0001" href="#cite0001">[1]</a></sup> and two Rathjen's OCFs, one based on the "Mahlo Cardinal"(\\( M \\))<sup><a id="goto0002" href="#cite0002">[2]</a></sup>, and one another based on the "Weakly Compact Cardinal"(\\( K \\))<sup><a id="goto0003" href="#cite0003">[3]</a></sup> to give a feeling of how the ordinals go up in these systems. Each article contains 200 ordinals and each ordinal is assigned with an identification number. If I'm notified that there are errors in my list, I'll fix'em ASAP. I will explain all the mathematical concepts I've mentioned and how these OCFs works in future articles.`,
                `<h2>#0000~#0099 - \\( 0-\\Gamma_0 \\)</h2>`,
                `<b>#0000~#0039 - \\( 0-\\varepsilon_0 \\)</b>`,
                `${s(8)}In this part, ordinals will be represented in these 3 notations:`,
                `${s(8)}<b>Normal:</b> The notation most people recognize these ordinals as. There are no standards in this notation.`,
                `${s(8)}<b>Veblen:</b> The notation using ONLY \\( 0 \\) and the Veblen function \\( \\varphi \\).`,
                `${s(8)}<b>Buchholz:</b> The notation using ONLY \\( 0 \\) and the Buchholz function \\( \\psi \\).`,
                `
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Normal</th>
                            <th>Veblen</th>
                            <th>Buchholz</th>
                        </tr>
                        <tr>
                            <td>0000</td>
                            <td>\\( 0 \\)</td>
                            <td>\\( 0 \\)</td>
                            <td>\\( 0 \\)</td>
                        </tr>
                        <tr>
                            <td>0001</td>
                            <td>\\( 1 \\)</td>
                            <td>\\( \\varphi_0(0) \\)</td>
                            <td>\\( \\psi_0(0) \\)</td>
                        </tr>
                        <tr>
                            <td>0002</td>
                            <td>\\( 2 \\)</td>
                            <td>\\( \\varphi_0(0)+\\varphi_0(0) \\)</td>
                            <td>\\( \\psi_0(0)+\\psi_0(0) \\)</td>
                        </tr>
                        <tr>
                            <td>0003</td>
                            <td>\\( 3 \\)</td>
                            <td>\\( \\varphi_0(0)+\\varphi_0(0)+\\varphi_0(0) \\)</td>
                            <td>\\( \\psi_0(0)+\\psi_0(0)+\\psi_0(0) \\)</td>
                        </tr>
                        <tr>
                            <td>0004</td>
                            <td>\\( \\omega \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0005</td>
                            <td>\\( \\omega+1 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0))+\\varphi_0(0) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0))+\\psi_0(0) \\)</td>
                        </tr>
                        <tr>
                            <td>0006</td>
                            <td>\\( \\omega+2 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0))+\\varphi_0(0)+\\varphi_0(0) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0))+\\psi_0(0)+\\psi_0(0) \\)</td>
                        </tr>
                        <tr>
                            <td>0007</td>
                            <td>\\( \\omega+3 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0))+\\varphi_0(0)+\\varphi_0(0)+\\varphi_0(0) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0))+\\psi_0(0)+\\psi_0(0)+\\psi_0(0) \\)</td>
                        </tr>
                        <tr>
                            <td>0008</td>
                            <td>\\( \\omega2 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0))+\\varphi_0(\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0))+\\psi_0(\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0009</td>
                            <td>\\( \\omega3 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0))+\\varphi_0(\\varphi_0(0))+\\varphi_0(\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0))+\\psi_0(\\psi_0(0))+\\psi_0(\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0010</td>
                            <td>\\( \\omega^2 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0)+\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0)+\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0011</td>
                            <td>\\( \\omega^2+1 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0)+\\varphi_0(0))+\\varphi_0(0) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0)+\\psi_0(0))+\\psi_0(0) \\)</td>
                        </tr>
                        <tr>
                            <td>0012</td>
                            <td>\\( \\omega^2+\\omega \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0)+\\varphi_0(0))+\\varphi_0(\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0)+\\psi_0(0))+\\psi_0(\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0013</td>
                            <td>\\( \\omega^2+\\omega+1 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0)+\\varphi_0(0))+\\varphi_0(\\varphi_0(0))+\\varphi_0(0) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0)+\\psi_0(0))+\\psi_0(\\psi_0(0))+\\psi_0(0) \\)</td>
                        </tr>
                        <tr>
                            <td>0014</td>
                            <td>\\( \\omega^2+\\omega2 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0)+\\varphi_0(0))+\\varphi_0(\\varphi_0(0))+\\varphi_0(\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0)+\\psi_0(0))+\\psi_0(\\psi_0(0))+\\psi_0(\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0015</td>
                            <td>\\( \\omega^2+\\omega3 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0)+\\varphi_0(0))+\\varphi_0(\\varphi_0(0))+\\varphi_0(\\varphi_0(0))+\\varphi_0(\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0)+\\psi_0(0))+\\psi_0(\\psi_0(0))+\\psi_0(\\psi_0(0))+\\psi_0(\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0016</td>
                            <td>\\( \\omega^22 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0)+\\varphi_0(0))+\\varphi_0(\\varphi_0(0)+\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0)+\\psi_0(0))+\\psi_0(\\psi_0(0)+\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0017</td>
                            <td>\\( \\omega^23 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0)+\\varphi_0(0))+\\varphi_0(\\varphi_0(0)+\\varphi_0(0))+\\varphi_0(\\varphi_0(0)+\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0)+\\psi_0(0))+\\psi_0(\\psi_0(0)+\\psi_0(0))+\\psi_0(\\psi_0(0)+\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0018</td>
                            <td>\\( \\omega^3 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0)+\\varphi_0(0)+\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0)+\\psi_0(0)+\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0019</td>
                            <td>\\( \\omega^4 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(0)+\\varphi_0(0)+\\varphi_0(0)+\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(0)+\\psi_0(0)+\\psi_0(0)+\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0020</td>
                            <td>\\( \\omega^\\omega \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(0))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(0))) \\)</td>
                        </tr>
                        <tr>
                            <td>0021</td>
                            <td>\\( \\omega^\\omega+1 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(0)))+\\varphi_0(0) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(0)))+\\psi_0(0) \\)</td>
                        </tr>
                        <tr>
                            <td>0022</td>
                            <td>\\( \\omega^\\omega+\\omega \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(0)))+\\varphi_0(\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(0)))+\\psi_0(\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0023</td>
                            <td>\\( \\omega^\\omega2 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(0)))+\\varphi_0(\\varphi_0(\\varphi_0(0))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(0)))+\\psi_0(\\psi_0(\\psi_0(0))) \\)</td>
                        </tr>
                        <tr>
                            <td>0024</td>
                            <td>\\( \\omega^{\\omega+1} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(0))+\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(0))+\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0025</td>
                            <td>\\( \\omega^{\\omega+2} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(0))+\\varphi_0(0)+\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(0))+\\psi_0(0)+\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0026</td>
                            <td>\\( \\omega^{\\omega2} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(0))+\\varphi_0(\\varphi_0(0))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(0))+\\psi_0(\\psi_0(0))) \\)</td>
                        </tr>
                        <tr>
                            <td>0027</td>
                            <td>\\( \\omega^{\\omega3} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(0))+\\varphi_0(\\varphi_0(0))+\\varphi_0(\\varphi_0(0))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(0))+\\psi_0(\\psi_0(0))+\\psi_0(\\psi_0(0))) \\)</td>
                        </tr>
                        <tr>
                            <td>0028</td>
                            <td>\\( \\omega^{\\omega^2} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(0)+\\varphi_0(0))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(0)+\\psi_0(0))) \\)</td>
                        </tr>
                        <tr>
                            <td>0029</td>
                            <td>\\( \\omega^{\\omega^3} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(0)+\\varphi_0(0)+\\varphi_0(0))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(0)+\\psi_0(0)+\\psi_0(0))) \\)</td>
                        </tr>
                        <tr>
                            <td>0030</td>
                            <td>\\( \\omega^{\\omega^\\omega} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(0)))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(\\psi_0(0)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0031</td>
                            <td>\\( \\omega^{\\omega^\\omega}+1 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(0))))+\\varphi_0(0) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(\\psi_0(0))))+\\psi_0(0) \\)</td>
                        </tr>
                        <tr>
                            <td>0032</td>
                            <td>\\( \\omega^{\\omega^\\omega}2 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(0))))+\\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(0)))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(\\psi_0(0))))+\\psi_0(\\psi_0(\\psi_0(\\psi_0(0)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0033</td>
                            <td>\\( \\omega^{\\omega^\\omega+1} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(0)))+\\varphi_0(0)) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(\\psi_0(0)))+\\psi_0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0034</td>
                            <td>\\( \\omega^{\\omega^\\omega2} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(0)))+\\varphi_0(\\varphi_0(\\varphi_0(0)))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(\\psi_0(0)))+\\psi_0(\\psi_0(\\psi_0(0)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0035</td>
                            <td>\\( \\omega^{\\omega^{\\omega+1}} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(0))+\\varphi_0(0))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(\\psi_0(0))+\\psi_0(0))) \\)</td>
                        </tr>
                        <tr>
                            <td>0036</td>
                            <td>\\( \\omega^{\\omega^{\\omega2}} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(0))+\\varphi_0(\\varphi_0(0)))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(\\psi_0(0))+\\psi_0(\\psi_0(0)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0037</td>
                            <td>\\( \\omega^{\\omega^{\\omega^2}} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(0)+\\varphi_0(0)))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(\\psi_0(0)+\\psi_0(0)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0038</td>
                            <td>\\( \\omega^{\\omega^{\\omega^\\omega}} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(0))))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(\\psi_0(\\psi_0(0))))) \\)</td>
                        </tr>
                        <tr>
                            <td>0039</td>
                            <td>\\( \\omega^{\\omega^{\\omega^{\\omega^\\omega}}} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(\\varphi_0(0)))))) \\)</td>
                            <td>\\( \\psi_0(\\psi_0(\\psi_0(\\psi_0(\\psi_0(\\psi_0(0)))))) \\)</td>
                        </tr>
                    </tbody>
                </table>
                `,
                `<b>#0040~#0079 - \\( \\varepsilon_0-\\varphi_\\omega(0) \\)</b>`,
                `${s(8)}The notation used in this part are the same as in the previous part, except for the following changes:`,
                `${s(8)}1. \\( \\underbrace{\\varphi_0(0)+\\varphi_0(0)+\\cdots+\\varphi_0(0)}_{n} \\) and \\( \\underbrace{\\psi_0(0)+\\psi_0(0)+\\cdots+\\psi_0(0)}_{n} \\) are written as \\( n \\) due to numerical equivalence.`,
                `${s(8)}2. Repeated terms will be written in the form of multiplication, for example:`,
                `<div style="text-align: center;">\\( \\begin{align} \\omega+\\omega+\\omega & = \\omega3 \\\\ \\varphi_1(0)+\\varphi_1(0)+\\varphi_1(0)+\\varphi_1(0) & = \\varphi_1(0)*4 \\end{align} \\)</div>`,
                `${s(8)}3. \\( \\psi_0(\\beta) \\) is written as \\( \\omega^\\beta \\) if \\( \\beta< \\psi_1(0) \\) and \\( \\psi_\\alpha(\\beta) \\) is written as \\( \\Omega_\\alpha\\omega^\\beta \\) if \\( \\beta< \\psi_{\\alpha+1}(0) \\) and \\( \\alpha>0 \\). And then, further simplifications will be done using the fact that \\( \\Omega_\\alpha=\\omega^{\\Omega_\\alpha} \\) for \\( \\alpha>0 \\), for example:`,
                `<div style="text-align: center;">\\( \\begin{align} \\psi_0(\\psi_0(0)) & = \\omega^{\\psi_0(0)}=\\omega^1=\\omega \\\\ \\psi_1(0) & = \\Omega_1\\omega^0=\\Omega_11=\\Omega_1=\\Omega \\\\ \\psi_1(\\psi_1(0)) & = \\Omega_1\\omega^{\\psi_1(0)}=\\Omega_1\\omega^{\\Omega_1\\omega^0}=\\Omega_1\\Omega_1=\\Omega_1^2=\\Omega^2 \\\\ \\psi_1(\\psi_1(\\psi_1(0))) & = \\Omega\\omega^{\\psi_1(\\psi_1(0))}=\\Omega\\omega^{\\Omega^2}=\\Omega\\omega^{\\Omega\\Omega}=\\Omega(\\omega^\\Omega)^\\Omega=\\Omega\\Omega^\\Omega=\\Omega^{1+\\Omega}=\\Omega^\\Omega \\\\ \\psi_1(\\psi_2(0)) & = \\psi_1(\\Omega_2\\omega^0)=\\psi_1(\\Omega_2) \\end{align} \\)</div>`,
                `${s(8)}4. The following abbreviation will be used in the normal form:`,
                `<div style="text-align: center;">\\( \\begin{align} \\omega^\\alpha & := \\varphi_0(\\alpha) \\\\ \\varepsilon_\\alpha & := \\varphi_1(\\alpha) \\\\ \\zeta_\\alpha & := \\varphi_2(\\alpha) \\\\ \\eta_\\alpha & := \\varphi_3(\\alpha) \\end{align} \\)</div>`,
                `
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Normal</th>
                            <th>Veblen</th>
                            <th>Buchholz</th>
                        </tr>
                        <tr>
                            <td>0040</td>
                            <td>\\( \\varepsilon_0 \\)</td>
                            <td>\\( \\varphi_1(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0041</td>
                            <td>\\( \\varepsilon_0+1 \\)</td>
                            <td>\\( \\varphi_1(0)+1 \\)</td>
                            <td>\\( \\psi_0(\\Omega)+1 \\)</td>
                        </tr>
                        <tr>
                            <td>0042</td>
                            <td>\\( \\varepsilon_02 \\)</td>
                            <td>\\( \\varphi_1(0)+\\varphi_1(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega)+\\psi_0(\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0043</td>
                            <td>\\( \\varepsilon_0\\omega \\)</td>
                            <td>\\( \\varphi_0(\\varphi_1(0)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0044</td>
                            <td>\\( \\varepsilon_0^2 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_1(0)+\\varphi_1(0)) \\)</td>
                            <td>\\( \\psi_0(\\Omega+\\psi_0(\\Omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0045</td>
                            <td>\\( \\varepsilon_0^3 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_1(0)+\\varphi_1(0)+\\varphi_1(0)) \\)</td>
                            <td>\\( \\psi_0(\\Omega+\\psi_0(\\Omega)+\\psi_0(\\Omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0046</td>
                            <td>\\( \\varepsilon_0^\\omega \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_1(0)+1)) \\)</td>
                            <td>\\( \\psi_0(\\Omega+\\psi_0(\\Omega+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0047</td>
                            <td>\\( \\varepsilon_0^{\\varepsilon_0} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_1(0)+\\varphi_1(0))) \\)</td>
                            <td>\\( \\psi_0(\\Omega+\\psi_0(\\Omega+\\psi_0(\\Omega))) \\)</td>
                        </tr>
                        <tr>
                            <td>0048</td>
                            <td>\\( \\varepsilon_0^{\\varepsilon_0^\\omega} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(\\varphi_1(0)+1))) \\)</td>
                            <td>\\( \\psi_0(\\Omega+\\psi_0(\\Omega+\\psi_0(\\Omega+1))) \\)</td>
                        </tr>
                        <tr>
                            <td>0049</td>
                            <td>\\( \\varepsilon_0^{\\varepsilon_0^{\\varepsilon_0}} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(\\varphi_1(0)+\\varphi_1(0)))) \\)</td>
                            <td>\\( \\psi_0(\\Omega+\\psi_0(\\Omega+\\psi_0(\\Omega+\\psi_0(\\Omega)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0050</td>
                            <td>\\( \\varepsilon_1 \\)</td>
                            <td>\\( \\varphi_1(1) \\)</td>
                            <td>\\( \\psi_0(\\Omega2) \\)</td>
                        </tr>
                        <tr>
                            <td>0051</td>
                            <td>\\( \\varepsilon_1^2 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_1(1)+\\varphi_1(1)) \\)</td>
                            <td>\\( \\psi_0(\\Omega2+\\psi_0(\\Omega2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0052</td>
                            <td>\\( \\varepsilon_1^{\\varepsilon_1} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_1(1)+\\varphi_1(1))) \\)</td>
                            <td>\\( \\psi_0(\\Omega2+\\psi_0(\\Omega2+\\psi_0(\\Omega2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0053</td>
                            <td>\\( \\varepsilon_1^{\\varepsilon_1^{\\varepsilon_1}} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_0(\\varphi_1(1)+\\varphi_1(1)))) \\)</td>
                            <td>\\( \\psi_0(\\Omega2+\\psi_0(\\Omega2+\\psi_0(\\Omega2+\\psi_0(\\Omega2)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0054</td>
                            <td>\\( \\varepsilon_2 \\)</td>
                            <td>\\( \\varphi_1(2) \\)</td>
                            <td>\\( \\psi_0(\\Omega3) \\)</td>
                        </tr>
                        <tr>
                            <td>0055</td>
                            <td>\\( \\varepsilon_3 \\)</td>
                            <td>\\( \\varphi_1(3) \\)</td>
                            <td>\\( \\psi_0(\\Omega4) \\)</td>
                        </tr>
                        <tr>
                            <td>0056</td>
                            <td>\\( \\varepsilon_\\omega \\)</td>
                            <td>\\( \\varphi_1(\\varphi_0(1)) \\)</td>
                            <td>\\( \\psi_0(\\Omega\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0057</td>
                            <td>\\( \\varepsilon_{\\omega+1} \\)</td>
                            <td>\\( \\varphi_1(\\varphi_0(1)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega\\omega+\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0058</td>
                            <td>\\( \\varepsilon_{\\varepsilon_0} \\)</td>
                            <td>\\( \\varphi_1(\\varphi_1(0)) \\)</td>
                            <td>\\( \\psi_0(\\Omega*\\psi_0(\\Omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0059</td>
                            <td>\\( \\varepsilon_{\\varepsilon_{\\varepsilon_0}} \\)</td>
                            <td>\\( \\varphi_1(\\varphi_1(\\varphi_1(0))) \\)</td>
                            <td>\\( \\psi_0(\\Omega*\\psi_0(\\Omega*\\psi_0(\\Omega))) \\)</td>
                        </tr>
                        <tr>
                            <td>0060</td>
                            <td>\\( \\zeta_0 \\)</td>
                            <td>\\( \\varphi_2(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0061</td>
                            <td>\\( \\zeta_0^2 \\)</td>
                            <td>\\( \\varphi_0(\\varphi_2(0)+\\varphi_2(0)) \\)</td>
                            <td>\\( \\psi_0(\\Omega^2+\\psi_0(\\Omega^2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0062</td>
                            <td>\\( \\zeta_0^{\\zeta_0} \\)</td>
                            <td>\\( \\varphi_0(\\varphi_0(\\varphi_2(0)+\\varphi_2(0))) \\)</td>
                            <td>\\( \\psi_0(\\Omega^2+\\psi_0(\\Omega^2+\\psi_0(\\Omega^2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0063</td>
                            <td>\\( \\varepsilon_{\\zeta_0+1} \\)</td>
                            <td>\\( \\varphi_1(\\varphi_2(0)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^2+\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0064</td>
                            <td>\\( \\varepsilon_{\\zeta_0+\\omega} \\)</td>
                            <td>\\( \\varphi_1(\\varphi_2(0)+\\varphi_0(1)) \\)</td>
                            <td>\\( \\psi_0(\\Omega^2+\\Omega\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0065</td>
                            <td>\\( \\varepsilon_{\\zeta_02} \\)</td>
                            <td>\\( \\varphi_1(\\varphi_2(0)+\\varphi_2(0)) \\)</td>
                            <td>\\( \\psi_0(\\Omega^2+\\Omega*\\psi_0(\\Omega^2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0066</td>
                            <td>\\( \\varepsilon_{\\varepsilon_{\\zeta_0+1}} \\)</td>
                            <td>\\( \\varphi_1(\\varphi_1(\\varphi_2(0)+1)) \\)</td>
                            <td>\\( \\psi_0(\\Omega^2+\\Omega*\\psi_0(\\Omega^2+\\Omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0067</td>
                            <td>\\( \\zeta_1 \\)</td>
                            <td>\\( \\varphi_2(1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^22) \\)</td>
                        </tr>
                        <tr>
                            <td>0068</td>
                            <td>\\( \\zeta_\\omega \\)</td>
                            <td>\\( \\varphi_2(\\varphi_0(1)) \\)</td>
                            <td>\\( \\psi_0(\\Omega^2\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0069</td>
                            <td>\\( \\zeta_{\\zeta_0} \\)</td>
                            <td>\\( \\varphi_2(\\varphi_2(0)) \\)</td>
                            <td>\\( \\psi_0(\\Omega^2*\\psi_0(\\Omega^2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0070</td>
                            <td>\\( \\eta_0 \\)</td>
                            <td>\\( \\varphi_3(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^3) \\)</td>
                        </tr>
                        <tr>
                            <td>0071</td>
                            <td>\\( \\varepsilon_{\\eta_0+1} \\)</td>
                            <td>\\( \\varphi_1(\\varphi_3(0)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^3+\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0072</td>
                            <td>\\( \\zeta_{\\eta_0+1} \\)</td>
                            <td>\\( \\varphi_2(\\varphi_3(0)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^3+\\Omega^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0073</td>
                            <td>\\( \\eta_1 \\)</td>
                            <td>\\( \\varphi_3(1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^32) \\)</td>
                        </tr>
                        <tr>
                            <td>0074</td>
                            <td>\\( \\eta_{\\eta_0} \\)</td>
                            <td>\\( \\varphi_3(\\varphi_3(0)) \\)</td>
                            <td>\\( \\psi_0(\\Omega^3*\\psi_0(\\Omega^3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0075</td>
                            <td>\\( \\varphi_4(0) \\)</td>
                            <td>\\( \\varphi_4(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^4) \\)</td>
                        </tr>
                        <tr>
                            <td>0076</td>
                            <td>\\( \\varphi_4(1) \\)</td>
                            <td>\\( \\varphi_4(1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^42) \\)</td>
                        </tr>
                        <tr>
                            <td>0077</td>
                            <td>\\( \\varphi_4(\\varphi_4(0)) \\)</td>
                            <td>\\( \\varphi_4(\\varphi_4(0)) \\)</td>
                            <td>\\( \\psi_0(\\Omega^4*\\psi_0(\\Omega^4)) \\)</td>
                        </tr>
                        <tr>
                            <td>0078</td>
                            <td>\\( \\varphi_5(0) \\)</td>
                            <td>\\( \\varphi_5(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^5) \\)</td>
                        </tr>
                        <tr>
                            <td>0079</td>
                            <td>\\( \\varphi_6(0) \\)</td>
                            <td>\\( \\varphi_6(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^6) \\)</td>
                        </tr>
                    </tbody>
                </table>
                `,
                `<b>#0080~#0099 - \\( \\varphi_\\omega(0)-\\Gamma_0 \\)</b>`,
                `${s(8)}As you can see, the normal form and the Veblen form are the SAME in ordinal #0075-#0079. This is because we want to stop using more Greek letters and use a more clever method to represent these ordinals. Sometimes we don't even use the symbol \\( \\zeta \\) and \\( \\eta \\) and use them to represent larger ordinals<sup><a id="goto0004" href="#cite0004">[4]</a><a id="goto0005" href="#cite0005">[5]</a></sup>. Therefore, we MERGE the normal form and the Veblen form in this part.`,
                `
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Veblen</th>
                            <th>Buchholz</th>
                        </tr>
                        <tr>
                            <td>0080</td>
                            <td>\\( \\varphi_\\omega(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0081</td>
                            <td>\\( \\varepsilon_{\\varphi_\\omega(0)+1} \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\omega+\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0082</td>
                            <td>\\( \\zeta_{\\varphi_\\omega(0)+1} \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\omega+\\Omega^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0083</td>
                            <td>\\( \\eta_{\\varphi_\\omega(0)+1} \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\omega+\\Omega^3) \\)</td>
                        </tr>
                        <tr>
                            <td>0084</td>
                            <td>\\( \\varphi_\\omega(1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\omega2) \\)</td>
                        </tr>
                        <tr>
                            <td>0085</td>
                            <td>\\( \\varphi_\\omega(\\varphi_\\omega(0)) \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\omega*\\psi_0(\\Omega^\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0086</td>
                            <td>\\( \\varphi_{\\omega+1}(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\omega+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0087</td>
                            <td>\\( \\varphi_{\\omega2}(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\omega2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0088</td>
                            <td>\\( \\varphi_{\\omega^2}(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\omega^2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0089</td>
                            <td>\\( \\varphi_{\\omega^\\omega}(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\omega^\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0090</td>
                            <td>\\( \\varphi_{\\varepsilon_0}(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\psi_0(\\Omega)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0091</td>
                            <td>\\( \\varphi_\\omega(\\varphi_{\\varepsilon_0}(0)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\psi_0(\\Omega)}+\\Omega^\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0092</td>
                            <td>\\( \\varphi_{\\omega^\\omega}(\\varphi_{\\varepsilon_0}(0)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\psi_0(\\Omega)}+\\Omega^{\\omega^\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0093</td>
                            <td>\\( \\varphi_{\\varepsilon_0}(1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\psi_0(\\Omega)}2) \\)</td>
                        </tr>
                        <tr>
                            <td>0094</td>
                            <td>\\( \\varphi_{\\varepsilon_0+1}(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\psi_0(\\Omega)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0095</td>
                            <td>\\( \\varphi_{\\varepsilon_1}(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\psi_0(\\Omega2)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0096</td>
                            <td>\\( \\varphi_{\\zeta_0}(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\psi_0(\\Omega^2)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0097</td>
                            <td>\\( \\varphi_{\\eta_0}(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\psi_0(\\Omega^3)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0098</td>
                            <td>\\( \\varphi_{\\varphi_\\omega(0)}(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\psi_0(\\Omega^\\omega)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0099</td>
                            <td>\\( \\varphi_{\\varphi_{\\varphi_\\omega(0)}(0)}(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\psi_0(\\Omega^{\\psi_0(\\Omega^\\omega)})}) \\)</td>
                        </tr>
                    </tbody>
                </table>
                `,
                `<h2>#0100~#0200 - \\( \\Gamma_0-\\psi_0(\\Omega_2) \\)</h2>`,
                `${s(8)}Now we have reached \\( \\Gamma_0 \\), which is also known as the "Feferman-Schütte Ordinal", and this notation is due to Feferman. This is the part where the two Rathjen's OCFs starts functioning.`,
                `${s(8)}In this part, ordinals will be represented in these 4 notations:`,
                `${s(8)}<b>Normal:</b> The notation most people recognize these ordinals as. There are no standards in this notation.`,
                `${s(8)}<b>Buchholz:</b> The notation using the Buchholz function \\( \\psi \\).`,
                `${s(8)}<b>Rathjen M:</b> The notation using the Rathjen's function \\( \\psi \\) based on the "Mahlo Cardinal"(\\( M \\)). I use the symbol \\( \\rho \\) outside this article for specification. \\( \\chi_0(0) \\) is written as \\( \\Omega \\) in this part.`,
                `${s(8)}<b>Rathjen K:</b> The notation using the Rathjen's function \\( \\Psi \\) based on the "Weakly Compact Cardinal"(\\( K \\)). \\( \\Omega_1 \\) is written as \\( \\Omega \\) in this part.`,
                `${s(8)}The following abbreviation will still be used in this part:`,
                `<div style="text-align: center;">\\( \\begin{align} \\omega^\\alpha & := \\varphi_0(\\alpha) \\\\ \\varepsilon_\\alpha & := \\varphi_1(\\alpha) \\\\ \\zeta_\\alpha & := \\varphi_2(\\alpha) \\\\ \\eta_\\alpha & := \\varphi_3(\\alpha) \\end{align} \\)</div>`,
                `
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Normal</th>
                            <th>Buchholz</th>
                            <th>Rathjen M</th>
                            <th>Rathjen K</th>
                        </tr>
                        <tr>
                            <td>0100</td>
                            <td>\\( \\Gamma_0 \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(0) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(0) \\)</td>
                        </tr>
                        <tr>
                            <td>0101</td>
                            <td>\\( \\varepsilon_{\\Gamma_0+1} \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\Omega+\\Omega) \\)</td>
                            <td>\\( \\varepsilon_{\\psi_\\Omega(0)+1} \\)</td>
                            <td>\\( \\varepsilon_{\\Psi_\\Omega^0(0)+1} \\)</td>
                        </tr>
                        <tr>
                            <td>0102</td>
                            <td>\\( \\varphi_\\omega(\\Gamma_0+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\Omega+\\Omega^\\omega) \\)</td>
                            <td>\\( \\varphi_\\omega(\\psi_\\Omega(0)+1) \\)</td>
                            <td>\\( \\varphi_\\omega(\\Psi_\\Omega^0(0)+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0103</td>
                            <td>\\( \\varphi_{\\varphi_\\omega(0)}(\\Gamma_0+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\Omega+\\Omega^{\\psi_0(\\Omega^\\omega)}) \\)</td>
                            <td>\\( \\varphi_{\\varphi_\\omega(0)}(\\psi_\\Omega(0)+1) \\)</td>
                            <td>\\( \\varphi_{\\varphi_\\omega(0)}(\\Psi_\\Omega^0(0)+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0104</td>
                            <td>\\( \\varphi_{\\Gamma_0}(1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\Omega+\\Omega^{\\psi_0(\\Omega^\\Omega)}) \\)</td>
                            <td>\\( \\varphi_{\\psi_\\Omega(0)}(1) \\)</td>
                            <td>\\( \\varphi_{\\Psi_\\Omega^0(0)}(1) \\)</td>
                        </tr>
                        <tr>
                            <td>0105</td>
                            <td>\\( \\varphi_{\\varphi_{\\Gamma_0}(1)}(0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\Omega+\\Omega^{\\psi_0(\\Omega^\\Omega+\\Omega^{\\psi_0(\\Omega^\\Omega)})}) \\)</td>
                            <td>\\( \\varphi_{\\varphi_{\\psi_\\Omega(0)}(1)}(0) \\)</td>
                            <td>\\( \\varphi_{\\varphi_{\\Psi_\\Omega^0(0)}(1)}(0) \\)</td>
                        </tr>
                        <tr>
                            <td>0106</td>
                            <td>\\( \\Gamma_1 \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\Omega2) \\)</td>
                            <td>\\( \\psi_\\Omega(1) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(1) \\)</td>
                        </tr>
                        <tr>
                            <td>0107</td>
                            <td>\\( \\Gamma_2 \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\Omega3) \\)</td>
                            <td>\\( \\psi_\\Omega(2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(2) \\)</td>
                        </tr>
                        <tr>
                            <td>0108</td>
                            <td>\\( \\Gamma_\\omega \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\Omega\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0109</td>
                            <td>\\( \\Gamma_{\\Gamma_0} \\)</td>
                            <td>\\( \\psi_0(\\Omega^\\Omega*\\psi_0(\\Omega^\\Omega)) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_\\Omega(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0110</td>
                            <td>\\( \\varphi(1,1,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0111</td>
                            <td>\\( \\Gamma_{\\varphi(1,1,0)+1} \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+1}+\\Omega^\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega+1) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(\\Omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0112</td>
                            <td>\\( \\Gamma_{\\varphi(1,1,0)+2} \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+1}+\\Omega^\\Omega2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega+2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(\\Omega)+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0113</td>
                            <td>\\( \\Gamma_{\\varphi(1,1,0)+\\omega} \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+1}+\\Omega^\\Omega\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega+\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(\\Omega)+\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0114</td>
                            <td>\\( \\Gamma_{\\varphi(1,1,0)+\\varphi(1,1,0)} \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+1}+\\Omega^\\Omega*\\psi_0(\\Omega^{\\Omega+1})) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega+\\psi_\\Omega(\\Omega)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(\\Omega)+\\Psi_\\Omega^0(\\Omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0115</td>
                            <td>\\( \\Gamma_{\\Gamma_{\\varphi(1,1,0)+1}} \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+1}+\\Omega^\\Omega*\\psi_0(\\Omega^{\\Omega+1}+\\Omega^\\Omega)) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega+\\psi_\\Omega(\\Omega+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(\\Psi_\\Omega^0(\\Omega))) \\)</td>
                        </tr>
                        <tr>
                            <td>0116</td>
                            <td>\\( \\varphi(1,1,1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+1}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0117</td>
                            <td>\\( \\varphi(1,1,2) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+1}3) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega3) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega+2) \\)</td>
                        </tr>
                        <tr>
                            <td>0118</td>
                            <td>\\( \\varphi(1,1,\\omega) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+1}\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega+\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0119</td>
                            <td>\\( \\varphi(1,1,\\varphi(1,1,0)) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+1}*\\psi_0(\\Omega^{\\Omega+1})) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega*\\psi_\\Omega(\\Omega)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega+\\Psi_\\Omega^0(\\Omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0120</td>
                            <td>\\( \\varphi(1,2,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega2) \\)</td>
                        </tr>
                        <tr>
                            <td>0121</td>
                            <td>\\( \\Gamma_{\\varphi(1,2,0)+1} \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+2}+\\Omega^\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^2+1) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(\\Omega2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0122</td>
                            <td>\\( \\varphi(1,1,\\varphi(1,2,0)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+2}+\\Omega^{\\Omega+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^2+\\Omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega+\\Psi_\\Omega^0(\\Omega2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0123</td>
                            <td>\\( \\Gamma_{\\varphi(1,1,\\varphi(1,2,0)+1)+1} \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+2}+\\Omega^{\\Omega+1}+\\Omega^\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^2+\\Omega+1) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(\\Omega+\\Psi_\\Omega^0(\\Omega2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0124</td>
                            <td>\\( \\varphi(1,1,\\varphi(1,2,0)+2) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+2}+\\Omega^{\\Omega+1}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^2+\\Omega2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega+\\Psi_\\Omega^0(\\Omega2)+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0125</td>
                            <td>\\( \\varphi(1,1,\\varphi(1,2,0)+\\omega) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+2}+\\Omega^{\\Omega+1}\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^2+\\Omega\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega+\\Psi_\\Omega^0(\\Omega2)+\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0126</td>
                            <td>\\( \\varphi(1,1,\\varphi(1,1,\\varphi(1,2,0)+1)) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+2}+\\Omega^{\\Omega+1}*\\psi_0(\\Omega^{\\Omega+2}+\\Omega^{\\Omega+1})) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^2+\\Omega*\\psi_\\Omega(\\Omega^2+\\Omega)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega+\\Psi_\\Omega^0(\\Omega+\\Psi_\\Omega^0(\\Omega2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0127</td>
                            <td>\\( \\varphi(1,2,1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+2}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^22) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega2+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0128</td>
                            <td>\\( \\varphi(1,3,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+3}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^3) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega3) \\)</td>
                        </tr>
                        <tr>
                            <td>0129</td>
                            <td>\\( \\varphi(1,4,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+4}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^4) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega4) \\)</td>
                        </tr>
                        <tr>
                            <td>0130</td>
                            <td>\\( \\varphi(1,\\omega,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+\\omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0131</td>
                            <td>\\( \\Gamma_{\\varphi(1,\\omega,0)+1} \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+\\omega}+\\Omega^\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\omega+1) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(\\Omega\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0132</td>
                            <td>\\( \\varphi(1,1,\\varphi(1,\\omega,0)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+\\omega}+\\Omega^{\\Omega+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\omega+\\Omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega+\\Psi_\\Omega^0(\\Omega\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0133</td>
                            <td>\\( \\varphi(1,2,\\varphi(1,\\omega,0)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+\\omega}+\\Omega^{\\Omega+2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\omega+\\Omega^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega2+\\Psi_\\Omega^0(\\Omega\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0134</td>
                            <td>\\( \\varphi(1,\\omega,1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+\\omega}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\omega2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega\\omega+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0135</td>
                            <td>\\( \\varphi(1,\\omega+1,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+\\omega+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega\\omega+\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0136</td>
                            <td>\\( \\varphi(1,\\Gamma_0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+\\psi_0(\\Omega^\\Omega)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\psi_\\Omega(0)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega*\\Psi_\\Omega^0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0137</td>
                            <td>\\( \\varphi(1,\\varphi(1,1,0),0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+\\psi_0(\\Omega^{\\Omega+1})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\psi_\\Omega(\\Omega)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega*\\Psi_\\Omega^0(\\Omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0138</td>
                            <td>\\( \\varphi(1,\\varphi(1,\\omega,0),0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+\\psi_0(\\Omega^{\\Omega+\\omega})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\psi_\\Omega(\\Omega^\\omega)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega*\\Psi_\\Omega^0(\\Omega\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0139</td>
                            <td>\\( \\varphi(1,\\varphi(1,\\Gamma_0,0),0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega+\\psi_0(\\Omega^{\\Omega+\\psi_0(\\Omega^\\Omega)})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\psi_\\Omega(\\Omega^{\\psi_\\Omega(0)})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega*\\Psi_\\Omega^0(\\Omega*\\Psi_\\Omega^0(0))) \\)</td>
                        </tr>
                        <tr>
                            <td>0140</td>
                            <td>\\( \\varphi(2,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\Omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0141</td>
                            <td>\\( \\Gamma_{\\varphi(2,0,0)+1} \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2}+\\Omega^\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\Omega+1) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(\\Omega^2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0142</td>
                            <td>\\( \\varphi(1,1,\\varphi(2,0,0)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2}+\\Omega^{\\Omega+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\Omega+\\Omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega+\\Psi_\\Omega^0(\\Omega^2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0143</td>
                            <td>\\( \\varphi(1,\\omega,\\varphi(2,0,0)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2}+\\Omega^{\\Omega+\\omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\Omega+\\Omega^\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega\\omega+\\Psi_\\Omega^0(\\Omega^2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0144</td>
                            <td>\\( \\varphi(1,\\Gamma_0,\\varphi(2,0,0)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2}+\\Omega^{\\Omega+\\psi_0(\\Omega^\\Omega)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\Omega+\\Omega^{\\psi_\\Omega(0)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega*\\Psi_\\Omega^0(0)+\\Psi_\\Omega^0(\\Omega^2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0145</td>
                            <td>\\( \\varphi(1,\\varphi(1,\\Gamma_0,0),\\varphi(2,0,0)+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2}+\\Omega^{\\Omega+\\psi_0(\\Omega^{\\Omega+\\psi_0(\\Omega^\\Omega)})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\Omega+\\Omega^{\\psi_\\Omega(\\Omega^{\\psi_\\Omega(0)})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega*\\Psi_\\Omega^0(\\Omega*\\Psi_\\Omega^0(0))+\\Psi_\\Omega^0(\\Omega^2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0146</td>
                            <td>\\( \\varphi(1,\\varphi(2,0,0),1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2}+\\Omega^{\\Omega+\\psi_0(\\Omega^{\\Omega2})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\Omega+\\Omega^{\\psi_\\Omega(\\Omega^\\Omega)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega*\\Psi_\\Omega^0(\\Omega^2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0147</td>
                            <td>\\( \\varphi(1,\\varphi(2,0,0),\\varphi(2,0,0)) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2}+\\Omega^{\\Omega+\\psi_0(\\Omega^{\\Omega2})}*\\psi_0(\\Omega^{\\Omega2})) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\Omega+\\Omega^{\\psi_\\Omega(\\Omega^\\Omega)}*\\psi_\\Omega(\\Omega^\\Omega)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega*\\Psi_\\Omega^0(\\Omega^2)+\\Psi_\\Omega^0(\\Omega^2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0148</td>
                            <td>\\( \\varphi(1,\\varphi(2,0,0)+1,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2}+\\Omega^{\\Omega+\\psi_0(\\Omega^{\\Omega2})+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\Omega+\\Omega^{\\psi_\\Omega(\\Omega^\\Omega)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega*\\Psi_\\Omega^0(\\Omega^2)+\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0149</td>
                            <td>\\( \\varphi(1,\\varphi(1,\\varphi(2,0,0),1),0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2}+\\Omega^{\\Omega+\\psi_0(\\Omega^{\\Omega2}+\\Omega^{\\Omega+\\psi_0(\\Omega^{\\Omega2})})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\Omega+\\Omega^{\\psi_\\Omega(\\Omega^\\Omega+\\Omega^{\\psi_\\Omega(\\Omega^\\Omega)})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega*\\Psi_\\Omega^0(\\Omega*\\Psi_\\Omega^0(\\Omega^2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0150</td>
                            <td>\\( \\varphi(2,0,1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\Omega2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^2+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0151</td>
                            <td>\\( \\varphi(2,0,2) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2}3) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\Omega3) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^2+2) \\)</td>
                        </tr>
                        <tr>
                            <td>0152</td>
                            <td>\\( \\varphi(2,0,\\omega) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2}\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^\\Omega\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^2+\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0153</td>
                            <td>\\( \\varphi(2,1,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^2+\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0154</td>
                            <td>\\( \\varphi(2,\\omega,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega2+\\omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^2+\\Omega\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0155</td>
                            <td>\\( \\varphi(3,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega3}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^22) \\)</td>
                        </tr>
                        <tr>
                            <td>0156</td>
                            <td>\\( \\varphi(4,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega4}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega3}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^23) \\)</td>
                        </tr>
                        <tr>
                            <td>0157</td>
                            <td>\\( \\varphi(\\omega,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega\\omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^2\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0158</td>
                            <td>\\( \\varphi(\\Gamma_0,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega*\\psi_0(\\Omega^\\Omega)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega*\\psi_\\Omega(0)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^2*\\Psi_\\Omega^0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0159</td>
                            <td>\\( \\varphi(\\varphi(\\Gamma_0,0,0),0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega*\\psi_0(\\Omega^{\\Omega*\\psi_0(\\Omega^\\Omega)})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega*\\psi_\\Omega(\\Omega^{\\Omega*\\psi_\\Omega(0)})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^2*\\Psi_\\Omega^0(\\Omega^2*\\Psi_\\Omega^0(0))) \\)</td>
                        </tr>
                        <tr>
                            <td>0160</td>
                            <td>\\( AO=\\varphi(1,0,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^3) \\)</td>
                        </tr>
                        <tr>
                            <td>0161</td>
                            <td>\\( \\varphi(1,0,0,1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^2}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^2}2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^3+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0162</td>
                            <td>\\( \\varphi(1,0,1,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^2+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^2+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^3+\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0163</td>
                            <td>\\( \\varphi(1,1,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^2+\\Omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^2+\\Omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^3+\\Omega^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0164</td>
                            <td>\\( \\varphi(2,0,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^22}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^22}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^32) \\)</td>
                        </tr>
                        <tr>
                            <td>0165</td>
                            <td>\\( \\varphi(\\omega,0,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^2\\omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^2\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^3\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0166</td>
                            <td>\\( \\varphi(1,0,0,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^3}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^3}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^4) \\)</td>
                        </tr>
                        <tr>
                            <td>0167</td>
                            <td>\\( \\varphi(\\omega,0,0,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^3\\omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^3\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^4\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0168</td>
                            <td>\\( \\varphi(1,0,0,0,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^4}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^4}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^5) \\)</td>
                        </tr>
                        <tr>
                            <td>0169</td>
                            <td>\\( \\varphi(1,0,0,0,0,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^5}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^5}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^6) \\)</td>
                        </tr>
                        <tr>
                            <td>0170</td>
                            <td>\\( SVO=\\varphi(\\{\\omega,0\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0171</td>
                            <td>\\( \\Gamma_{\\varphi(\\{\\omega,0\\})+1} \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\omega}+\\Omega^\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\omega}+1) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(\\Omega^\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0172</td>
                            <td>\\( \\varphi(1,0,0,\\varphi(\\{\\omega,0\\})+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\omega}+\\Omega^{\\Omega^2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\omega}+\\Omega^{\\Omega^2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^3+\\Psi_\\Omega^0(\\Omega^\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0173</td>
                            <td>\\( \\varphi(1,0,0,0,\\varphi(\\{\\omega,0\\})+1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\omega}+\\Omega^{\\Omega^3}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\omega}+\\Omega^{\\Omega^3}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^4+\\Psi_\\Omega^0(\\Omega^\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0174</td>
                            <td>\\( \\varphi(\\{\\omega,0\\},1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\omega}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\omega}2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^\\omega+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0175</td>
                            <td>\\( \\varphi(\\{\\omega,0\\},1,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\omega+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^\\omega+\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0176</td>
                            <td>\\( \\varphi(\\{\\omega,0\\},1,0,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\omega+\\Omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\omega+\\Omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^\\omega+\\Omega^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0177</td>
                            <td>\\( \\varphi(\\{\\omega,1\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\omega2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\omega2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^\\omega2) \\)</td>
                        </tr>
                        <tr>
                            <td>0178</td>
                            <td>\\( \\varphi(\\{\\omega+1,0\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\omega+1}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\omega+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\omega+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0179</td>
                            <td>\\( \\varphi(\\{\\varphi(\\{\\omega,0\\}),0\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\psi_0(\\Omega^{\\Omega^\\omega})}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\psi_\\Omega(\\Omega^{\\Omega^\\omega})}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Psi_\\Omega^0(\\Omega^\\omega)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0180</td>
                            <td>\\( LVO=\\varphi(\\{1,0,0\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\Omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\Omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0181</td>
                            <td>\\( \\varphi(\\{\\varphi(\\{1,0,0\\}),0\\},1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\Omega}+\\Omega^{\\Omega^{\\psi_0(\\Omega^{\\Omega^\\Omega})}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\Omega}+\\Omega^{\\Omega^{\\psi_\\Omega(\\Omega^{\\Omega^\\Omega})}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Psi_\\Omega^0(\\Omega^\\Omega)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0182</td>
                            <td>\\( \\varphi(\\{1,0,0\\},1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\Omega}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\Omega}2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^\\Omega+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0183</td>
                            <td>\\( \\varphi(\\{1,0,0\\},1,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\Omega+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\Omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^\\Omega+\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0184</td>
                            <td>\\( \\varphi(\\{1,0,0\\},\\{\\omega,0\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\Omega+\\Omega^\\omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\Omega+\\Omega^\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^\\Omega+\\Omega^\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0185</td>
                            <td>\\( \\varphi(\\{1,0,1\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^\\Omega2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^\\Omega2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^\\Omega2) \\)</td>
                        </tr>
                        <tr>
                            <td>0186</td>
                            <td>\\( \\varphi(\\{1,1,0\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega+1}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0187</td>
                            <td>\\( \\varphi(\\{2,0,0\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega2}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega2}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0188</td>
                            <td>\\( \\varphi(\\{1,0,0,0\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega^2}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega^2}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega^2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0189</td>
                            <td>\\( \\varphi(\\{\\{\\omega,0\\}\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega^\\omega}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega^\\omega}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega^\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0190</td>
                            <td>\\( XLVO=\\varphi(\\{\\{1,0,0\\}\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega^\\Omega}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega^\\Omega}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega^\\Omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0191</td>
                            <td>\\( \\varphi(\\{\\{1,0,0\\}\\},1) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega^\\Omega}}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega^\\Omega}}2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega^\\Omega}+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0192</td>
                            <td>\\( \\varphi(\\{\\{1,0,0\\}\\},1,0) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega^\\Omega}+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega^\\Omega}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega^\\Omega}+\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0193</td>
                            <td>\\( \\varphi(\\{\\{1,0,0\\},1\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega^\\Omega}2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega^\\Omega}2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega^\\Omega}2) \\)</td>
                        </tr>
                        <tr>
                            <td>0194</td>
                            <td>\\( \\varphi(\\{\\{1,0,0\\},1,0\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega^\\Omega+1}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega^\\Omega+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega^\\Omega+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0195</td>
                            <td>\\( \\varphi(\\{\\{1,0,1\\}\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega^\\Omega2}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega^\\Omega2}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega^\\Omega2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0196</td>
                            <td>\\( \\varphi(\\{\\{1,1,0\\}\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega^{\\Omega+1}}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega^{\\Omega+1}}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega^{\\Omega+1}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0197</td>
                            <td>\\( \\varphi(\\{\\{2,0,0\\}\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega^{\\Omega2}}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega^{\\Omega2}}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega^{\\Omega2}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0198</td>
                            <td>\\( \\varphi(\\{\\{1,0,0,0\\}\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega^{\\Omega^2}}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega^{\\Omega^2}}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega^{\\Omega^2}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0199</td>
                            <td>\\( \\varphi(\\{\\{\\{1,0,0\\}\\}\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega^{\\Omega^{\\Omega^{\\Omega^\\Omega}}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega^{\\Omega^{\\Omega^{\\Omega^\\Omega}}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^{\\Omega^{\\Omega^\\Omega}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0200</td>
                            <td>\\( BHO=\\varphi(\\{\\cdots\\{\\{1,0,0\\}\\}\\cdots\\}) \\)</td>
                            <td>\\( \\psi_0(\\Omega_2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega+1}) \\)</td>
                        </tr>
                    </tbody>
                </table>
                `,
                `${s(8)}Ordinal #0160 is also known as the "Ackermann Ordinal" (AO)`,
                `${s(8)}Ordinal #0170 is also known as the "Small Veblen Ordinal" (SVO)`,
                `${s(8)}Ordinal #0180 is also known as the "Large Veblen Ordinal" (LVO)`,
                `${s(8)}I call ordinal #0190 the "Extra Large Veblen Ordinal" (XLVO)`,
                `${s(8)}Ordinal #0200 is also known as the "Bachmann-Howard Ordinal" (BHO)`,
                `${s(1)}`,
                `${s(8)}In the next article, I will show my analysis from \\( \\psi_0(\\Omega_2) \\) to \\( \\psi_0(\\Omega_{\\Omega_{\\Omega_\\ddots}}) \\).`,
                `${s(1)}`,
                `${s(8)}<a id="cite0001" href="#goto0001">^</a>[1] W. Buchholz, <a href="https://www.sciencedirect.com/science/article/pii/0168007286900527">A New System of Proof-Theoretic Ordinal Functions</a>, Annals of Pure and Applied Logic, vol. 32 (1986), pp. 195--207.`,
                `${s(8)}<a id="cite0002" href="#goto0002">^</a>[2] Rathjen, Michael. <a href="https://www1.maths.leeds.ac.uk/~rathjen/Ord_Notation_Weakly_Mahlo.pdf">"Ordinal Notations Based on a Weakly Mahlo Cardinal"</a>, Archive for Mathematical Logic 29 (1990) 249--263.`,
                `${s(8)}<a id="cite0003" href="#goto0003">^</a>[3] Rathjen, Michael. <a href="https://www1.maths.leeds.ac.uk/~rathjen/Ehab.pdf">"Proof Theory of Reflection"</a>, Annals of Pure and Applied Logic 68, 181--224 (1994).`,
                `${s(8)}<a id="cite0004" href="#goto0004">^</a>[4] M. Rathjen, <a href="https://www1.maths.leeds.ac.uk/~rathjen/Dissertation_Ontos.pdf">Investigations of Subsystems of Second Order Arithmetic and Set Theory in Strength between \\( \\Pi_1^1-CA \\) and \\( \\Delta_2^1-CA+BI \\): Part I</a> (p.70) (Accessed 2023-12-03)`,
                `${s(8)}<a id="cite0005" href="#goto0005">^</a>[5] J. Ven der Meeren, M. Rathjen, A. Weiermann, <a href="https://arxiv.org/abs/1411.4481">An order-theoretic characterization of the Howard-Bachmann-hierarchy</a> (p.1) (Accessed 2023-12-03)`,
            ],
            null,
            null,
            null,
        ],
    },
    {
        title: [
            `My analysis of Buchholz's OCF and two Rathjen's OCFs - Part.II`,
            null,
            null,
            null,
        ],
        series: ``,
        time: Date.UTC(2023, 12 - 1, 6, 12, 0, 0, 0),
        default: 0,
        content: [
            [
                `${s(8)}In this article, I will list 200 more ordinals continued from the previous article using 3 OCFs. If I'm notified that there are errors in my list, I'll fix'em ASAP.`,
                `${s(8)}Throughout this article, the following abbreviation will be used:`,
                `<div style="text-align: center;">\\( \\begin{align} \\omega^\\alpha & := \\varphi_0(\\alpha) \\\\ \\varepsilon_\\alpha & := \\varphi_1(\\alpha) \\\\ \\zeta_\\alpha & := \\varphi_2(\\alpha) \\\\ \\eta_\\alpha & := \\varphi_3(\\alpha) \\end{align} \\)</div>`,
                `<h2>#0200~#0299 - \\( \\psi_0(\\Omega_2)-\\psi_0(\\Omega_\\omega) \\)</h2>`,
                `${s(8)}In this part, ordinals will be represented in these 3 notations:`,
                `${s(8)}<b>Buchholz:</b> The notation using the Buchholz function \\( \\psi \\)<sup><a id="goto0001" href="#cite0001">[1]</a></sup>, the abbreviation is the same as in the previous article.`,
                `${s(8)}<b>Rathjen M:</b> The notation using the Rathjen's function \\( \\psi \\) based on the "Mahlo Cardinal"(\\( M \\))<sup><a id="goto0002" href="#cite0002">[2]</a></sup>. The following abbreviation will be used:`,
                `<div style="text-align: center;">\\( \\begin{align} \\Omega & := \\chi_0(0) \\\\ \\Omega_{2+\\alpha} & := \\chi_0(1+\\alpha) \\end{align} \\)</div>`,
                `${s(8)}<b>Rathjen K:</b> The notation using the Rathjen's function \\( \\Psi \\) based on the "Weakly Compact Cardinal"(\\( K \\))<sup><a id="goto0003" href="#cite0003">[3]</a></sup>. The following abbreviation will be used:`,
                `<div style="text-align: center;">\\( \\Omega:=\\Omega_1 \\)</div>`,
                `
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Buchholz</th>
                            <th>Rathjen M</th>
                            <th>Rathjen K</th>
                        </tr>
                        <tr>
                            <td>0200</td>
                            <td>\\( BHO=\\psi_0(\\Omega_2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0201</td>
                            <td>\\( \\psi_0(\\Omega_2+\\Omega) \\)</td>
                            <td>\\( \\varepsilon_{\\psi_\\Omega(\\varepsilon_{\\Omega+1})+1} \\)</td>
                            <td>\\( \\varepsilon_{\\Psi_\\Omega^0(\\varepsilon_{\\Omega+1})+1} \\)</td>
                        </tr>
                        <tr>
                            <td>0202</td>
                            <td>\\( \\psi_0(\\Omega_2+\\Omega^2) \\)</td>
                            <td>\\( \\zeta_{\\psi_\\Omega(\\varepsilon_{\\Omega+1})+1} \\)</td>
                            <td>\\( \\zeta_{\\Psi_\\Omega^0(\\varepsilon_{\\Omega+1})+1} \\)</td>
                        </tr>
                        <tr>
                            <td>0203</td>
                            <td>\\( \\psi_0(\\Omega_2+\\Omega^\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+1}+1) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(\\varepsilon_{\\Omega+1})) \\)</td>
                        </tr>
                        <tr>
                            <td>0204</td>
                            <td>\\( \\psi_0(\\Omega_2+\\Omega^{\\Omega^\\Omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+1}+\\Omega^{\\Omega^\\Omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega^\\Omega+\\Psi_\\Omega^0(\\varepsilon_{\\Omega+1})) \\)</td>
                        </tr>
                        <tr>
                            <td>0205</td>
                            <td>\\( \\psi_0(\\Omega_2+\\psi_1(\\Omega_2)) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+1}2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega+1}+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0206</td>
                            <td>\\( \\psi_0(\\Omega_2+\\psi_1(\\Omega_2+1)) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+1}\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega+1}+\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0207</td>
                            <td>\\( \\psi_0(\\Omega_2+\\psi_1(\\Omega_2+\\Omega)) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+1}\\Omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega+1}+\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0208</td>
                            <td>\\( \\psi_0(\\Omega_2+\\psi_1(\\Omega_2+\\psi_1(\\Omega_2))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+1}^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega+1}2) \\)</td>
                        </tr>
                        <tr>
                            <td>0209</td>
                            <td>\\( \\psi_0(\\Omega_2+\\psi_1(\\Omega_2+\\psi_1(\\Omega_2+\\psi_1(\\Omega_2)))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+1}^{\\varepsilon_{\\Omega+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega+1}^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0210</td>
                            <td>\\( \\psi_0(\\Omega_22) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega+2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0211</td>
                            <td>\\( \\psi_0(\\Omega_23) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+3}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega+3}) \\)</td>
                        </tr>
                        <tr>
                            <td>0212</td>
                            <td>\\( \\psi_0(\\Omega_2\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega+\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0213</td>
                            <td>\\( \\psi_0(\\Omega_2*\\psi_0(\\Omega_2)) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+\\psi_\\Omega(\\varepsilon_{\\Omega+1})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega+\\Psi_\\Omega^0(\\varepsilon_{\\Omega+1})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0214</td>
                            <td>\\( \\psi_0(\\Omega_2*\\psi_0(\\Omega_2*\\psi_0(\\Omega_2))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega+\\psi_\\Omega(\\varepsilon_{\\Omega+\\psi_\\Omega(\\varepsilon_{\\Omega+1})})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega+\\Psi_\\Omega^0(\\varepsilon_{\\Omega+\\Psi_\\Omega^0(\\varepsilon_{\\Omega+1})})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0215</td>
                            <td>\\( \\psi_0(\\Omega_2\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0216</td>
                            <td>\\( \\psi_0(\\Omega_2\\Omega^2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega^2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega^2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0217</td>
                            <td>\\( \\psi_0(\\Omega_2\\Omega^\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega^\\Omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega^\\Omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0218</td>
                            <td>\\( \\psi_0(\\Omega_2*\\psi_1(\\Omega_2)) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\varepsilon_{\\Omega+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\varepsilon_{\\Omega+1}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0219</td>
                            <td>\\( \\psi_0(\\Omega_2*\\psi_1(\\Omega_2*\\psi_1(\\Omega_2))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\varepsilon_{\\varepsilon_{\\Omega+1}}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\varepsilon_{\\varepsilon_{\\Omega+1}}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0220</td>
                            <td>\\( \\psi_0(\\Omega_2^2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\zeta_{\\Omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\zeta_{\\Omega+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0221</td>
                            <td>\\( \\psi_0(\\Omega_2^2+\\Omega_2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\zeta_{\\Omega+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\zeta_{\\Omega+1}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0222</td>
                            <td>\\( \\psi_0(\\Omega_2^22) \\)</td>
                            <td>\\( \\psi_\\Omega(\\zeta_{\\Omega+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\zeta_{\\Omega+2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0223</td>
                            <td>\\( \\psi_0(\\Omega_2^2\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\zeta_{\\Omega+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\zeta_{\\Omega+\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0224</td>
                            <td>\\( \\psi_0(\\Omega_2^3) \\)</td>
                            <td>\\( \\psi_\\Omega(\\eta_{\\Omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\eta_{\\Omega+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0225</td>
                            <td>\\( \\psi_0(\\Omega_2^3+\\Omega_2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\eta_{\\Omega+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\eta_{\\Omega+1}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0226</td>
                            <td>\\( \\psi_0(\\Omega_2^3+\\Omega_2^2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\zeta_{\\eta_{\\Omega+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\zeta_{\\eta_{\\Omega+1}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0227</td>
                            <td>\\( \\psi_0(\\Omega_2^32) \\)</td>
                            <td>\\( \\psi_\\Omega(\\eta_{\\Omega+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\eta_{\\Omega+2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0228</td>
                            <td>\\( \\psi_0(\\Omega_2^3\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\eta_{\\Omega+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\eta_{\\Omega+\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0229</td>
                            <td>\\( \\psi_0(\\Omega_2^4) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varphi_4(\\Omega+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varphi_4(\\Omega+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0230</td>
                            <td>\\( \\psi_0(\\Omega_2^\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varphi_\\omega(\\Omega+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varphi_\\omega(\\Omega+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0231</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\omega+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varphi_{\\omega+1}(\\Omega+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varphi_{\\omega+1}(\\Omega+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0232</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\psi_0(\\Omega_2)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varphi_{\\psi_\\Omega(\\varepsilon_{\\Omega+1})}(\\Omega+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varphi_{\\Psi_\\Omega^0(\\varepsilon_{\\Omega+1})}(\\Omega+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0233</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\psi_0(\\Omega_2^\\omega)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varphi_{\\psi_\\Omega(\\varphi_\\omega(\\Omega+1))}(\\Omega+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varphi_{\\Psi_\\Omega^0(\\varphi_\\omega(\\Omega+1))}(\\Omega+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0234</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\psi_0(\\Omega_2^{\\psi_0(\\Omega_2)})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varphi_{\\psi_\\Omega(\\varphi_{\\psi_\\Omega(\\varepsilon_{\\Omega+1})}(\\Omega+1))}(\\Omega+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varphi_{\\Psi_\\Omega^0(\\varphi_{\\Psi_\\Omega^0(\\varepsilon_{\\Omega+1})}(\\Omega+1))}(\\Omega+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0235</td>
                            <td>\\( \\psi_0(\\Omega_2^\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varphi_\\Omega(1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varphi_\\Omega(1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0236</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega^\\Omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varphi_{\\Omega^\\Omega}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varphi_{\\Omega^\\Omega}(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0237</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega^{\\Omega^\\Omega}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varphi_{\\Omega^{\\Omega^\\Omega}}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varphi_{\\Omega^{\\Omega^\\Omega}}(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0238</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\psi_1(\\Omega_2)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varphi_{\\varepsilon_{\\Omega+1}}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varphi_{\\varepsilon_{\\Omega+1}}(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0239</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\psi_1(\\Omega_2^{\\psi_1(\\Omega_2)})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varphi_{\\varphi_{\\varepsilon_{\\Omega+1}}(0)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varphi_{\\varphi_{\\varepsilon_{\\Omega+1}}(0)}(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0240</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_2}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0241</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2}+\\Omega_2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\psi_{\\Omega_2}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Psi_{\\Omega_2}^0(0)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0242</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2}+\\Omega_2^2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\zeta_{\\psi_{\\Omega_2}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\zeta_{\\Psi_{\\Omega_2}^0(0)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0243</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_2}(1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0244</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2}\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_2}(\\omega)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0245</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2}*\\psi_0(\\Omega_2^{\\Omega_2})) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_2}(\\psi_\\Omega(\\psi_{\\Omega_2}(0)))) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(\\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(0)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0246</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2}*\\psi_0(\\Omega_2^{\\Omega_2}*\\psi_0(\\Omega_2^{\\Omega_2}))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_2}(\\psi_\\Omega(\\psi_{\\Omega_2}(\\psi_\\Omega(\\psi_{\\Omega_2}(0)))))) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(\\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(\\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(0)))))) \\)</td>
                        </tr>
                        <tr>
                            <td>0247</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2}\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_2}(\\Omega)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(\\Omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0248</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2}*\\psi_1(\\Omega_2^{\\Omega_2})) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_2}(\\psi_{\\Omega_2}(0))) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(\\Psi_{\\Omega_2}^0(0))) \\)</td>
                        </tr>
                        <tr>
                            <td>0249</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2}*\\psi_1(\\Omega_2^{\\Omega_2}*\\psi_1(\\Omega_2^{\\Omega_2}))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_2}(\\psi_{\\Omega_2}(\\psi_{\\Omega_2}(0)))) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(\\Psi_{\\Omega_2}^0(\\Psi_{\\Omega_2}^0(0)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0250</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2) \\)</td>
                        </tr>
                        <tr>
                            <td>0251</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}+\\psi_1(\\Omega_2^{\\Omega_2})) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2+\\psi_{\\Omega_2}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(0)+\\Psi_\\Omega^0(\\Omega_2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0252</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}+\\psi_1(\\Omega_2^{\\Omega_2+1})) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2+\\psi_{\\Omega_2}(\\Omega_2)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0253</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}+\\psi_1(\\Omega_2^{\\Omega_2+1}+\\psi_1(\\Omega_2^{\\Omega_2+1}))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2+\\psi_{\\Omega_2}(\\Omega_2)^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0254</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}+\\psi_1(\\Omega_2^{\\Omega_2+1}+\\psi_1(\\Omega_2^{\\Omega_2+1}+\\psi_1(\\Omega_2^{\\Omega_2+1})))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2+\\psi_{\\Omega_2}(\\Omega_2)^{\\psi_{\\Omega_2}(\\Omega_2)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2)^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0255</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}+\\Omega_2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2+\\varepsilon_{\\psi_{\\Omega_2}(\\Omega_2)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\varepsilon_{\\Psi_{\\Omega_2}^0(\\Omega_2)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0256</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}+\\Omega_2^2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2+\\zeta_{\\psi_{\\Omega_2}(\\Omega_2)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\zeta_{\\Psi_{\\Omega_2}^0(\\Omega_2)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0257</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}+\\Omega_2^{\\Omega_2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2+\\psi_{\\Omega_2}(\\Omega_2+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Psi_{\\Omega_2}^0(\\Omega_2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0258</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}+\\Omega_2^{\\Omega_2}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2+\\psi_{\\Omega_2}(\\Omega_2+2)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Psi_{\\Omega_2}^0(\\Omega_2)+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0259</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}+\\Omega_2^{\\Omega_2}*\\psi_1(\\Omega_2^{\\Omega_2+1}+\\Omega_2^{\\Omega_2})) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2+\\psi_{\\Omega_2}(\\Omega_2+\\psi_{\\Omega_2}(\\Omega_2+1))) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Psi_{\\Omega_2}^0(\\Psi_{\\Omega_2}^0(\\Omega_2)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0260</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_22) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0261</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}2+\\Omega_2^{\\Omega_2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_22+\\psi_{\\Omega_2}(\\Omega_22+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Psi_{\\Omega_2}^0(\\Omega_2+1))) \\)</td>
                        </tr>
                        <tr>
                            <td>0262</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}2+\\Omega_2^{\\Omega_2}*\\psi_1(\\Omega_2^{\\Omega_2+1}2+\\Omega_2^{\\Omega_2})) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_22+\\psi_{\\Omega_2}(\\Omega_22+\\psi_{\\Omega_2}(\\Omega_22+1))) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Psi_{\\Omega_2}^0(\\Psi_{\\Omega_2}^0(\\Omega_2+1)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0263</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}3) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_23) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0264</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2+\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0265</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}*\\psi_0(\\Omega_2^{\\Omega_2+1})) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2*\\psi_\\Omega(\\Omega_2)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2+\\Psi_\\Omega^0(\\Omega_2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0266</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}*\\psi_0(\\Omega_2^{\\Omega_2+1}*\\psi_0(\\Omega_2^{\\Omega_2+1}))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2*\\psi_\\Omega(\\Omega_2*\\psi_\\Omega(\\Omega_2))) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2+\\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2+\\Psi_\\Omega^0(\\Omega_2))))) \\)</td>
                        </tr>
                        <tr>
                            <td>0267</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2\\Omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2+\\Omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0268</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}*\\psi_1(\\Omega_2^{\\Omega_2+1})) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2*\\psi_{\\Omega_2}(\\Omega_2)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0269</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+1}*\\psi_1(\\Omega_2^{\\Omega_2+1}*\\psi_1(\\Omega_2^{\\Omega_2+1}))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2*\\psi_{\\Omega_2}(\\Omega_2*\\psi_{\\Omega_2}(\\Omega_2))) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_2)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0270</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_22) \\)</td>
                        </tr>
                        <tr>
                            <td>0271</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+2}+\\Omega_2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2^2+\\varepsilon_{\\psi_{\\Omega_2}(\\Omega_2^2)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_22+\\varepsilon_{\\Psi_{\\Omega_2}^0(\\Omega_22)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0272</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+2}+\\Omega_2^{\\Omega_2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2^2+\\psi_{\\Omega_2}(\\Omega_2^2+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_22+\\Psi_{\\Omega_2}^0(\\Psi_{\\Omega_2}^0(\\Omega_22))) \\)</td>
                        </tr>
                        <tr>
                            <td>0273</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+2}+\\Omega_2^{\\Omega_2+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2^2+\\Omega_2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_22+\\Psi_{\\Omega_2}^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_22))) \\)</td>
                        </tr>
                        <tr>
                            <td>0274</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+2}+\\Omega_2^{\\Omega_2+1}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2^2+\\Omega_22) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_22+\\Psi_{\\Omega_2}^0(\\Omega_2+\\Psi_{\\Omega_2}^0(\\Omega_22)+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0275</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+2}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2^22) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_22+\\Psi_{\\Omega_2}^0(\\Omega_22+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0276</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2+3}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2^3) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_23) \\)</td>
                        </tr>
                        <tr>
                            <td>0277</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_22}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2^{\\Omega_2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0278</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2^2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2^{\\Omega_2^2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2^3) \\)</td>
                        </tr>
                        <tr>
                            <td>0279</td>
                            <td>\\( \\psi_0(\\Omega_2^{\\Omega_2^{\\Omega_2}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_2^{\\Omega_2^{\\Omega_2}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2^{\\Omega_2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0280</td>
                            <td>\\( \\psi_0(\\Omega_3) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_2+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_2+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0281</td>
                            <td>\\( \\psi_0(\\Omega_3+\\Omega) \\)</td>
                            <td>\\( \\varepsilon_{\\psi_\\Omega(\\varepsilon_{\\Omega_2+1})+1} \\)</td>
                            <td>\\( \\varepsilon_{\\Psi_\\Omega^0(\\varepsilon_{\\Omega_2+1})+1} \\)</td>
                        </tr>
                        <tr>
                            <td>0282</td>
                            <td>\\( \\psi_0(\\Omega_3+\\psi_1(\\Omega_2)) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_2+1}+\\varepsilon_{\\Omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega+1}+\\Psi_\\Omega^0(\\varepsilon_{\\Omega_2+1})) \\)</td>
                        </tr>
                        <tr>
                            <td>0283</td>
                            <td>\\( \\psi_0(\\Omega_3+\\psi_1(\\Omega_3)) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_2+1}+\\psi_{\\Omega_2}(\\varepsilon_{\\Omega_2+1})) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(\\varepsilon_{\\Omega_2+1})+\\Psi_\\Omega^0(\\varepsilon_{\\Omega_2+1})) \\)</td>
                        </tr>
                        <tr>
                            <td>0284</td>
                            <td>\\( \\psi_0(\\Omega_3+\\psi_1(\\Omega_3+\\psi_1(\\Omega_3))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_2+1}+\\psi_{\\Omega_2}(\\varepsilon_{\\Omega_2+1})^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(\\varepsilon_{\\Omega_2+1})+\\Psi_{\\Omega_2}^0(\\varepsilon_{\\Omega_2+1})+\\Psi_\\Omega^0(\\varepsilon_{\\Omega_2+1})) \\)</td>
                        </tr>
                        <tr>
                            <td>0285</td>
                            <td>\\( \\psi_0(\\Omega_3+\\psi_1(\\Omega_3+\\psi_1(\\Omega_3+\\psi_1(\\Omega_3)))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_2+1}+\\psi_{\\Omega_2}(\\varepsilon_{\\Omega_2+1})^{\\psi_{\\Omega_2}(\\varepsilon_{\\Omega_2+1})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(\\varepsilon_{\\Omega_2+1})^2+\\Psi_\\Omega^0(\\varepsilon_{\\Omega_2+1})) \\)</td>
                        </tr>
                        <tr>
                            <td>0286</td>
                            <td>\\( \\psi_0(\\Omega_3+\\Omega_2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_2+1}+\\varepsilon_{\\psi_{\\Omega_2}(\\varepsilon_{\\Omega_2+1})+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Psi_{\\Omega_2}^0(\\varepsilon_{\\Omega_2+1})+1}+\\Psi_\\Omega^0(\\varepsilon_{\\Omega_2+1})) \\)</td>
                        </tr>
                        <tr>
                            <td>0287</td>
                            <td>\\( \\psi_0(\\Omega_3+\\psi_2(\\Omega_3)) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_2+1}2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_2+1}+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0288</td>
                            <td>\\( \\psi_0(\\Omega_3+\\psi_2(\\Omega_3+\\psi_2(\\Omega_3))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_2+1}^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_2+1}2) \\)</td>
                        </tr>
                        <tr>
                            <td>0289</td>
                            <td>\\( \\psi_0(\\Omega_3+\\psi_2(\\Omega_3+\\psi_2(\\Omega_3+\\psi_2(\\Omega_3)))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_2+1}^{\\varepsilon_{\\Omega_2+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_2+1}^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0290</td>
                            <td>\\( \\psi_0(\\Omega_32) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_2+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_2+2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0291</td>
                            <td>\\( \\psi_0(\\Omega_3^2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\zeta_{\\Omega_2+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\zeta_{\\Omega_2+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0292</td>
                            <td>\\( \\psi_0(\\Omega_3^{\\Omega_3}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_3}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_3}^0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0293</td>
                            <td>\\( \\psi_0(\\Omega_3^{\\Omega_3+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_3) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_3) \\)</td>
                        </tr>
                        <tr>
                            <td>0294</td>
                            <td>\\( \\psi_0(\\Omega_3^{\\Omega_32}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_3^{\\Omega_3}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_3^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0295</td>
                            <td>\\( \\psi_0(\\Omega_3^{\\Omega_3^{\\Omega_3}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_3^{\\Omega_3^{\\Omega_3}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_3^{\\Omega_3}) \\)</td>
                        </tr>
                        <tr>
                            <td>0296</td>
                            <td>\\( \\psi_0(\\Omega_4) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_3+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_3+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0297</td>
                            <td>\\( \\psi_0(\\Omega_4^{\\Omega_4+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_4) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_4) \\)</td>
                        </tr>
                        <tr>
                            <td>0298</td>
                            <td>\\( \\psi_0(\\Omega_5) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_4+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_4+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0299</td>
                            <td>\\( \\psi_0(\\Omega_6) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_5+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_5+1}) \\)</td>
                        </tr>
                    </tbody>
                </table>
                `,
                `${s(8)}Ordinal #0200 is also known as the "Bachmann-Howard Ordinal" (BHO)`,
                `<h2>#0300~#0400 - \\( \\psi_0(\\Omega_\\omega)-\\psi_0(\\Omega_{\\Omega_{\\Omega_{\\cdot_{\\cdot_\\cdot}}}}) \\)</h2>`,
                `<b>#0300~#0309 - \\( \\psi_0(\\Omega_\\omega)-\\psi_0(\\varepsilon_{\\Omega_\\omega+1}) \\)</b>`,
                `${s(8)}In this part, ordinals will be represented in the same notation as in the previous part.`,
                `
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Buchholz</th>
                            <th>Rathjen M</th>
                            <th>Rathjen K</th>
                        </tr>
                        <tr>
                            <td>0300</td>
                            <td>\\( SBO=\\psi_0(\\Omega_\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0301</td>
                            <td>\\( \\psi_0(\\Omega_\\omega+\\Omega^\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_\\omega+1) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(\\Omega_\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0302</td>
                            <td>\\( \\psi_0(\\Omega_\\omega+\\Omega^{\\Omega+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_\\omega+\\Omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega+\\Psi_\\Omega^0(\\Omega_\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0303</td>
                            <td>\\( \\psi_0(\\Omega_\\omega+\\Omega_2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_\\omega+\\varepsilon_{\\psi_\\Omega(\\Omega_\\omega)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Psi_\\Omega^0(\\Omega_\\omega)+1}+\\Psi_\\Omega^0(\\Omega_\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0304</td>
                            <td>\\( \\psi_0(\\Omega_\\omega+\\Omega_2^{\\Omega_2+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_\\omega+\\Omega_2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_2+\\Psi_\\Omega^0(\\Omega_\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0305</td>
                            <td>\\( \\psi_0(\\Omega_\\omega+\\Omega_3) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_\\omega+\\varepsilon_{\\psi_{\\Omega_2}(\\Omega_\\omega)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Psi_{\\Omega_2}^0(\\Omega_\\omega)+1}+\\Psi_\\Omega^0(\\Omega_\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0306</td>
                            <td>\\( \\psi_0(\\Omega_\\omega+\\Omega_3^{\\Omega_3+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_\\omega+\\Omega_3) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_3+\\Psi_\\Omega^0(\\Omega_\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0307</td>
                            <td>\\( \\psi_0(\\Omega_\\omega2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_\\omega2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_\\omega+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0308</td>
                            <td>\\( \\psi_0(\\Omega_\\omega^2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_\\omega^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_\\omega2) \\)</td>
                        </tr>
                        <tr>
                            <td>0309</td>
                            <td>\\( \\psi_0(\\Omega_\\omega^{\\Omega_\\omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_\\omega^{\\Omega_\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_\\omega^2) \\)</td>
                        </tr>
                    </tbody>
                </table>
                `,
                `${s(8)}Ordinal #0300 is also known as the "Buchholz Ordinal" (BO), while I prefer the name "Small Buchholz Ordinal" (SBO).`,
                `<b>#0310~#0400 - \\( \\psi_0(\\Omega_{\\omega+1})-\\psi_0(\\Omega_{\\Omega_{\\Omega_{\\cdot_{\\cdot_\\cdot}}}}) \\)</b>`,
                `${s(8)}We have reached \\( \\psi_0(\\varepsilon_{\\Omega_\\omega+1}) \\), which is known as the "Takeuti-Feferman-Buchholz Ordinal" (TFBO) and this name was purposed by David Madore<sup><a id="goto0004" href="#cite0004">[4]</a></sup>. Unfortunately, this is the largest ordinal the original Buchholz function can represent. To continue using this function to represent ordinals, we have to use the extension of this function called the "Extended Buchholz function" proposed by Denis Maksudov<sup><a id="goto0005" href="#cite0005">[5]</a></sup>. The function is still notated as \\( \\psi \\) while I use the symbol with an asterisk as a superscript \\( \\psi^* \\) outside this article for specification.`,
                `${s(8)}In this part, ordinals will be represented in the same notation as in the previous part except the "Buchholz" column is "Extended Buchholz" and the "Extended Buchholz function" is used instead of the original Buchholz function. Note that some WEIRD ordinals are introduced to demonstrate how the two Rathjen's OCFs works.`,
                `
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Extended Buchholz</th>
                            <th>Rathjen M</th>
                            <th>Rathjen K</th>
                        </tr>
                        <tr>
                            <td>0310</td>
                            <td>\\( TFBO=\\psi_0(\\Omega_{\\omega+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_\\omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_\\omega+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0311</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega+1}+\\Omega_\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_\\omega+1}+\\Omega_\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_\\omega+\\Psi_\\Omega^0(\\varepsilon_{\\Omega_\\omega+1})) \\)</td>
                        </tr>
                        <tr>
                            <td>0312</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega+1}+\\psi_\\omega(\\Omega_{\\omega+1})) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_\\omega+1}2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_\\omega+1}+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0313</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega+1}+\\psi_\\omega(\\Omega_{\\omega+1}+\\psi_\\omega(\\Omega_{\\omega+1}))) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_\\omega+1}^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_\\omega+1}2) \\)</td>
                        </tr>
                        <tr>
                            <td>0314</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega+1}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_\\omega+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_\\omega+2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0315</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega+1}^2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\zeta_{\\Omega_\\omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\zeta_{\\Omega_\\omega+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0316</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega+1}^{\\Omega_{\\omega+1}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_{\\omega+1}}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_{\\omega+1}}^0(0)) \\)</td>
                        </tr>
                        <tr>
                            <td>0317</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega+1}^{\\Omega_{\\omega+1}+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\omega+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0318</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega+2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_{\\omega+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_{\\omega+1}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0319</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega+3}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_{\\omega+2}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_{\\omega+2}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0320</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\omega2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\omega2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0321</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega2}+\\Omega_\\omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\omega2}+\\Omega_\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_\\omega+\\Psi_\\Omega^0(\\Omega_{\\omega2})) \\)</td>
                        </tr>
                        <tr>
                            <td>0322</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega2}+\\Omega_{\\omega+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\omega2}+\\varepsilon_{\\psi_{\\Omega_{\\omega+1}}(\\Omega_{\\omega2})+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Psi_{\\Omega_{\\omega+1}}^0(\\Omega_{\\omega2})+1}+\\Psi_\\Omega^0(\\Omega_{\\omega2})) \\)</td>
                        </tr>
                        <tr>
                            <td>0323</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega2}+\\Omega_{\\omega+2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\omega2}+\\varepsilon_{\\psi_{\\Omega_{\\omega+2}}(\\Omega_{\\omega2})+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Psi_{\\Omega_{\\omega+2}}^0(\\Omega_{\\omega2})+1}+\\Psi_\\Omega^0(\\Omega_{\\omega2})) \\)</td>
                        </tr>
                        <tr>
                            <td>0324</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega2}2) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\omega2}2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\omega2}+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0325</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega2+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_{\\omega2}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_{\\omega2}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0326</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega3}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\omega3}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\omega3}) \\)</td>
                        </tr>
                        <tr>
                            <td>0327</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega^2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\omega^2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\omega^2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0328</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega^\\omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\omega^\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\omega^\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0329</td>
                            <td>\\( \\psi_0(\\Omega_{\\omega^{\\omega^\\omega}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\omega^{\\omega^\\omega}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\omega^{\\omega^\\omega}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0330</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\varepsilon_0}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\varepsilon_0}) \\)</td>
                        </tr>
                        <tr>
                            <td>0331</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega^\\Omega)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(0)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(0)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0332</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega^\\Omega)+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_{\\psi_\\Omega(0)}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_{\\Psi_\\Omega^0(0)}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0333</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega^\\Omega)+1}^{\\Omega_{\\psi_0(\\Omega^\\Omega)+1}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_{\\psi_\\Omega(0)+1}}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_{\\Psi_\\Omega^0(0)+1}}^0(1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0334</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega^{\\Omega+1})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0335</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega^{\\Omega+1})+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_{\\psi_\\Omega(\\Omega)}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_{\\Psi_\\Omega^0(\\Omega)}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0336</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega^{\\Omega+1})+1}^{\\Omega_{\\psi_0(\\Omega^{\\Omega+1})+1}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_{\\psi_\\Omega(\\Omega)+1}}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_{\\Psi_\\Omega^0(\\Omega)+1}}^0(\\Omega+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0337</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega^{\\Omega2})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega^\\Omega)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega^2)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0338</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega^{\\Omega^2})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega^{\\Omega^2})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega^3)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0339</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega^{\\Omega^\\Omega})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega^{\\Omega^\\Omega})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega^\\Omega)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0340</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_2)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\varepsilon_{\\Omega+1})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\varepsilon_{\\Omega+1})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0341</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_2^{\\Omega_2})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\psi_{\\Omega_2}(0))}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(0))}) \\)</td>
                        </tr>
                        <tr>
                            <td>0342</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_2^{\\Omega_2})+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_{\\psi_\\Omega(\\psi_{\\Omega_2}(0))}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_{\\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(0))}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0343</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_2^{\\Omega_2})+1}^{\\Omega_{\\psi_0(\\Omega_2^{\\Omega_2})+1}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_{\\psi_\\Omega(\\psi_{\\Omega_2}(0))+1}}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_{\\Psi_\\Omega^0(\\Psi_{\\Omega_2}^0(0))+1}}^0(\\Psi_{\\Omega_2}^0(0)+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0344</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_2^{\\Omega_2+1})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega_2)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega_2)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0345</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_2^{\\Omega_22})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega_2^{\\Omega_2})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega_2^2)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0346</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_2^{\\Omega_2^2})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega_2^{\\Omega_2^2})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega_2^3)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0347</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_2^{\\Omega_2^{\\Omega_2}})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega_2^{\\Omega_2^{\\Omega_2}})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega_2^{\\Omega_2})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0348</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_3)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\varepsilon_{\\Omega_2+1})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\varepsilon_{\\Omega_2+1})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0349</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_4)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\varepsilon_{\\Omega_3+1})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\varepsilon_{\\Omega_3+1})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0350</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_\\omega)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega_\\omega)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega_\\omega)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0351</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_\\omega)+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_{\\psi_\\Omega(\\Omega_\\omega)}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_{\\Psi_\\Omega^0(\\Omega_\\omega)}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0352</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_\\omega)+1}^{\\Omega_{\\psi_0(\\Omega_\\omega)+1}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_{\\psi_\\Omega(\\Omega_\\omega)+1}}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_{\\Psi_\\Omega^0(\\Omega_\\omega)+1}}^0(\\Omega_\\omega+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0353</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_{\\omega+1})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\varepsilon_{\\Omega_\\omega+1})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\varepsilon_{\\Omega_\\omega+1})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0354</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_{\\omega+1}^{\\Omega_{\\omega+1}+1})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega_{\\omega+1})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega_{\\omega+1})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0355</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_{\\omega2})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega_{\\omega2})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega_{\\omega2})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0356</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_{\\psi_0(\\Omega)})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega_{\\varepsilon_0})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega_{\\varepsilon_0})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0357</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_{\\psi_0(\\Omega^\\Omega)})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega_{\\psi_\\Omega(0)})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(0)})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0358</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_{\\psi_0(\\Omega_2)})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\varepsilon_{\\Omega+1})})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\varepsilon_{\\Omega+1})})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0359</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_0(\\Omega_{\\psi_0(\\Omega_\\omega)})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega_{\\psi_\\Omega(\\Omega_\\omega)})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega_{\\Psi_\\Omega^0(\\Omega_\\omega)})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0360</td>
                            <td>\\( \\psi_0(\\Omega_\\Omega) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_\\Omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0361</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_\\Omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_\\Omega+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0362</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega+1}^{\\Omega_{\\Omega+1}+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0363</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega+\\omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega+\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0364</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega+\\psi_0(\\Omega_{\\Omega+\\omega})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega+\\psi_\\Omega(\\Omega_{\\Omega+\\omega})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega+\\Psi_\\Omega^0(\\Omega_{\\Omega+\\omega})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0365</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0366</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega\\omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0367</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega^2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega^2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega^2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0368</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega^\\Omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega^\\Omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega^\\Omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0369</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega^{\\Omega^\\Omega}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega^{\\Omega^\\Omega}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega^{\\Omega^\\Omega}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0370</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_1(\\Omega_2)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\varepsilon_{\\Omega+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\varepsilon_{\\Omega+1}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0371</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_1(\\Omega_2^{\\Omega_2})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_{\\Omega_2}(0)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Omega_2}^0(0)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0372</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_1(\\Omega_2^{\\Omega_2})+1}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_{\\psi_{\\Omega_2}(0)}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_{\\Psi_{\\Omega_2}^0(0)}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0373</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_1(\\Omega_2^{\\Omega_2})+1}^{\\Omega_{\\psi_1(\\Omega_2^{\\Omega_2})+1}}) \\)</td>
                            <td>\\( \\psi_\\Omega(  \\psi_{\\Omega_{\\psi_{\\Omega_2}(0)+1}}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(  \\Psi_{\\Omega_{\\Psi_{\\Omega_2}^0(0)+1}}^0(1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0374</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_1(\\Omega_2^{\\Omega_2+1})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_{\\Omega_2}(\\Omega_2)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Omega_2}^0(\\Omega_2)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0375</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_1(\\Omega_2^{\\Omega_22})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_{\\Omega_2}(\\Omega_2^{\\Omega_2})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Omega_2}^0(\\Omega_2^2)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0376</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_1(\\Omega_2^{\\Omega_2^{\\Omega_2}})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_{\\Omega_2}(\\Omega_2^{\\Omega_2^{\\Omega_2}})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Omega_2}^0(\\Omega_2^{\\Omega_2})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0377</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_1(\\Omega_3)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_{\\Omega_2}(\\varepsilon_{\\Omega_2+1})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Omega_2}^0(\\varepsilon_{\\Omega_2+1})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0378</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_1(\\Omega_\\omega)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_{\\Omega_2}(\\Omega_\\omega)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Omega_2}^0(\\Omega_\\omega)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0379</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_1(\\Omega_{\\psi_1(\\Omega_\\omega)})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_{\\Omega_2}(\\Omega_{\\psi_{\\Omega_2}(\\Omega_\\omega)})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Omega_2}^0(\\Omega_{\\Psi_{\\Omega_2}^0(\\Omega_\\omega)})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0380</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_2}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0381</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_22}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_22}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_22}) \\)</td>
                        </tr>
                        <tr>
                            <td>0382</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_2(\\Omega_3)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\varepsilon_{\\Omega_2+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\varepsilon_{\\Omega_2+1}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0383</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_2(\\Omega_3^{\\Omega_3+1})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_{\\Omega_3}(\\Omega_3)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Omega_3}^0(\\Omega_3)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0384</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_2(\\Omega_\\omega)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_{\\Omega_3}(\\Omega_\\omega)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Omega_3}^0(\\Omega_\\omega)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0385</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_2(\\Omega_{\\psi_2(\\Omega_\\omega)})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_{\\Omega_3}(\\Omega_{\\psi_{\\Omega_3}(\\Omega_\\omega)})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Omega_3}^0(\\Omega_{\\Psi_{\\Omega_3}^0(\\Omega_\\omega)})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0386</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_3}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_3}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_3}) \\)</td>
                        </tr>
                        <tr>
                            <td>0387</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_3(\\Omega_\\omega)}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_{\\Omega_4}(\\Omega_\\omega)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Omega_4}^0(\\Omega_\\omega)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0388</td>
                            <td>\\( \\psi_0(\\Omega_{\\psi_3(\\Omega_{\\psi_3(\\Omega_\\omega)})}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\psi_{\\Omega_4}(\\Omega_{\\psi_{\\Omega_4}(\\Omega_\\omega)})}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Omega_4}^0(\\Omega_{\\Psi_{\\Omega_4}^0(\\Omega_\\omega)})}) \\)</td>
                        </tr>
                        <tr>
                            <td>0389</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_4}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_4}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_4}) \\)</td>
                        </tr>
                        <tr>
                            <td>0390</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_\\omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0391</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_{\\omega+1}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_{\\omega+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_{\\omega+1}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0392</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_{\\psi_0(\\Omega)}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_{\\varepsilon_0}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_{\\varepsilon_0}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0393</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_{\\psi_0(\\Omega^\\Omega)}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_{\\psi_\\Omega(0)}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_{\\Psi_\\Omega^0(0)}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0394</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_{\\psi_0(\\Omega_{\\Omega_\\omega})}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_{\\psi_\\Omega(\\Omega_{\\Omega_\\omega})}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_{\\Psi_\\Omega^0(\\Omega_{\\Omega_\\omega})}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0395</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_\\Omega}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_\\Omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_\\Omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0396</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_{\\Omega_2}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_{\\Omega_2}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_{\\Omega_2}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0397</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_{\\Omega_\\omega}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_{\\Omega_\\omega}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_{\\Omega_\\omega}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0398</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_{\\Omega_\\Omega}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_{\\Omega_\\Omega}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_{\\Omega_\\Omega}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0399</td>
                            <td>\\( \\psi_0(\\Omega_{\\Omega_{\\Omega_{\\Omega_\\Omega}}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_{\\Omega_{\\Omega_\\Omega}}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_{\\Omega_{\\Omega_\\Omega}}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0400</td>
                            <td>\\( LBO=\\psi_0(\\Omega_{\\Omega_{\\Omega_{\\cdot_{\\cdot_\\cdot}}}}) \\)</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_{\\Omega_{\\cdot_{\\cdot_\\cdot}}}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_{\\Omega_{\\cdot_{\\cdot_\\cdot}}}}) \\)</td>
                        </tr>
                    </tbody>
                </table>
                `,
                `${s(8)}Ordinal #0400 is also known as the "Extended Buchholz Ordinal" (EBO) and this name was purposed by 叢武 (read as "Muratake")<sup><a id="goto0006" href="#cite0006">[6]</a></sup>, while I prefer XBO as the abbreviation. I call this ordinal the "Large Buchholz Ordinal" (LBO). This is the largest ordinal the Extended Buchholz function can represent. To represent larger ordinals, we have to use the two Rathjen's OCFs.`,
                `${s(1)}`,
                `${s(8)}In the next article, I will show my analysis from \\( \\psi_\\Omega(E_0) \\) to \\( \\psi_\\Omega(\\psi_{\\chi_\\omega(0)}(0)) \\).`,
                `${s(1)}`,
                `${s(8)}<a id="cite0001" href="#goto0001">^</a>[1] W. Buchholz, <a href="https://www.sciencedirect.com/science/article/pii/0168007286900527">A New System of Proof-Theoretic Ordinal Functions</a>, Annals of Pure and Applied Logic, vol. 32 (1986), pp. 195--207.`,
                `${s(8)}<a id="cite0002" href="#goto0002">^</a>[2] Rathjen, Michael. <a href="https://www1.maths.leeds.ac.uk/~rathjen/Ord_Notation_Weakly_Mahlo.pdf">"Ordinal Notations Based on a Weakly Mahlo Cardinal"</a>, Archive for Mathematical Logic 29 (1990) 249--263.`,
                `${s(8)}<a id="cite0003" href="#goto0003">^</a>[3] Rathjen, Michael. <a href="https://www1.maths.leeds.ac.uk/~rathjen/Ehab.pdf">"Proof Theory of Reflection"</a>, Annals of Pure and Applied Logic 68, 181--224 (1994).`,
                `${s(8)}<a id="cite0004" href="#goto0004">^</a>[4] <a href="https://neugierde.github.io/cantors-attic/Buchholz%27s_%CF%88_functions#takeuti-feferman-buchholz-ordinal">Buchholz's \\( \\psi \\) functions on Cantor's Attic</a>`,
                `${s(8)}<a id="cite0005" href="#goto0005">^</a>[5] Maksudov, Denis. <a href="https://sites.google.com/site/travelingtotheinfinity/the-extension-of-buchholz-s-function">The extension of Buchholz's function. Traveling To The Infinity.</a> Retrieved 2023-12-03.`,
                `${s(8)}<a id="cite0006" href="#goto0006">^</a>[6] 叢武, <a href="https://twitter.com/muratake8901341/status/1286145244849823744">ゆのしふなんて無かった</a>, twitter.`,
            ],
            null,
            null,
            null,
        ],
    },
    {
        title: [
            `My analysis of Buchholz's OCF and two Rathjen's OCFs - Part.III`,
            null,
            null,
            null,
        ],
        series: ``,
        time: Date.UTC(2023, 12 - 1, 9, 12, 0, 0, 0),
        default: 0,
        content: [
            [
                `${s(8)}In this article, I will list 200 more ordinals continued from the previous article using the two Rathjen's OCFs. The Buchholz Function is no longer used because the ordinals in this article are too big for this. If I'm notified that there are errors in my list, I'll fix'em ASAP.`,
                `${s(8)}Throughout this article, the following abbreviation will be used:`,
                `<div style="text-align: center;">\\( \\begin{align} \\omega^\\alpha & := \\varphi_0(\\alpha) \\\\ \\varepsilon_\\alpha & := \\varphi_1(\\alpha) \\\\ \\zeta_\\alpha & := \\varphi_2(\\alpha) \\\\ \\eta_\\alpha & := \\varphi_3(\\alpha) \\end{align} \\)</div>`,
                `<h2>#0400~#0499 - \\( \\psi_\\Omega(E_0)-\\psi_\\Omega(\\psi_{\\chi_2(0)}(0)) \\)</h2>`,
                `${s(8)}In this part, ordinals will be represented in these 2 notations:`,
                `${s(8)}<b>Rathjen M:</b> The notation using the Rathjen's function \\( \\psi \\) based on the "Mahlo Cardinal"(\\( M \\))<sup><a id="goto0001" href="#cite0001">[1]</a></sup>. The following abbreviation will be used:`,
                `<div style="text-align: center;">\\( \\begin{align} E_\\alpha & := \\Phi_1(\\alpha) \\\\ Z_\\alpha & := \\Phi_2(\\alpha) \\\\ H_\\alpha & := \\Phi_3(\\alpha) \\\\ \\Omega & := \\chi_0(0) \\\\ \\Omega_{2+\\alpha} & := \\chi_0(1+\\alpha) \\\\ I & := \\chi_1(0) \\\\ I_{2+\\alpha} & := \\chi_1(1+\\alpha) \\end{align} \\)</div>`,
                `${s(8)}<b>Rathjen K:</b> The notation using the Rathjen's function \\( \\Psi \\) based on the "Weakly Compact Cardinal"(\\( K \\))<sup><a id="goto0002" href="#cite0002">[2]</a></sup>. The following abbreviation will be used:`,
                `<div style="text-align: center;">\\( \\begin{align} \\Omega & := \\Omega_1 \\\\ \\Xi & := \\Xi(1) \\\\ \\Xi_{2+\\alpha} & := \\Xi(2+\\alpha) \\end{align} \\)</div>`,
                `
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Rathjen M</th>
                            <th>Rathjen K</th>
                        </tr>
                        <tr>
                            <td>0400</td>
                            <td>\\( LBO=\\psi_\\Omega(E_0) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Xi^0(2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0401</td>
                            <td>\\( \\psi_\\Omega(E_0+1) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Omega^0(\\Psi_\\Xi^0(2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0402</td>
                            <td>\\( \\psi_\\Omega(E_0+\\Omega_\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_\\omega+\\Psi_\\Omega^0(\\Psi_\\Xi^0(2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0403</td>
                            <td>\\( \\psi_\\Omega(E_0+\\Omega_\\Omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_\\Omega+\\Psi_\\Omega^0(\\Psi_\\Xi^0(2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0404</td>
                            <td>\\( \\psi_\\Omega(E_0+\\Omega_{\\Omega_\\Omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_\\Omega}+\\Psi_\\Omega^0(\\Psi_\\Xi^0(2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0405</td>
                            <td>\\( \\psi_\\Omega(E_02) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Xi^0(2)+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0406</td>
                            <td>\\( \\psi_\\Omega(E_0\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Xi^0(2)+\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0407</td>
                            <td>\\( \\psi_\\Omega(E_0^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Xi^0(2)*2) \\)</td>
                        </tr>
                        <tr>
                            <td>0408</td>
                            <td>\\( \\psi_\\Omega(E_0^{E_0}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Xi^0(2)^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0409</td>
                            <td>\\( \\psi_\\Omega(E_0^{E_0^{E_0}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Xi^0(2)^{\\Psi_\\Xi^0(2)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0410</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{E_0+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Psi_\\Xi^0(2)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0411</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_{E_0+1}}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_{\\Psi_\\Xi^0(2)+1}}^0(3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0412</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{E_0+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Xi^0(2)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0413</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_{E_0+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_{\\Psi_\\Xi^0(2)+1}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0414</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{E_0+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_\\Xi^0(2)+\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0415</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_{E_0+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_{\\Psi_\\Xi^0(2)+1}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0416</td>
                            <td>\\( \\psi_\\Omega(E_1) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Xi^0(3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0417</td>
                            <td>\\( \\psi_\\Omega(E_2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Xi^0(4)) \\)</td>
                        </tr>
                        <tr>
                            <td>0418</td>
                            <td>\\( \\psi_\\Omega(E_\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Xi^0(\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0419</td>
                            <td>\\( \\psi_\\Omega(E_{E_0}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_\\Xi^0(\\Psi_\\Xi^0(2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0420</td>
                            <td>\\( \\psi_\\Omega(Z_0) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi) \\)</td>
                        </tr>
                        <tr>
                            <td>0421</td>
                            <td>\\( \\psi_\\Omega(Z_0^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi+\\Psi_\\Xi^0(\\Xi)) \\)</td>
                        </tr>
                        <tr>
                            <td>0422</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{Z_0+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi+\\varepsilon_{\\Psi_\\Xi^0(\\Xi)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0423</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{Z_0+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi+\\Omega_{\\Psi_\\Xi^0(\\Xi)+\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0424</td>
                            <td>\\( \\psi_\\Omega(E_{Z_0+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi+\\Psi_\\Xi^0(\\Psi_\\Xi^0(\\Xi))) \\)</td>
                        </tr>
                        <tr>
                            <td>0425</td>
                            <td>\\( \\psi_\\Omega(E_{Z_0+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi+\\Psi_\\Xi^0(\\Psi_\\Xi^0(\\Xi)+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0426</td>
                            <td>\\( \\psi_\\Omega(E_{E_{Z_0+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi+\\Psi_\\Xi^0(\\Psi_\\Xi^0(\\Psi_\\Xi^0(\\Xi)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0427</td>
                            <td>\\( \\psi_\\Omega(Z_1) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi+\\Psi_\\Xi^0(\\Xi+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0428</td>
                            <td>\\( \\psi_\\Omega(Z_2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi+\\Psi_\\Xi^0(\\Xi+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0429</td>
                            <td>\\( \\psi_\\Omega(Z_{Z_0}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi+\\Psi_\\Xi^0(\\Xi+\\Psi_\\Xi^0(\\Xi))) \\)</td>
                        </tr>
                        <tr>
                            <td>0430</td>
                            <td>\\( \\psi_\\Omega(H_0) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi2) \\)</td>
                        </tr>
                        <tr>
                            <td>0431</td>
                            <td>\\( \\psi_\\Omega(H_0^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi2+\\Psi_\\Xi^0(\\Xi2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0432</td>
                            <td>\\( \\psi_\\Omega(E_{H_0+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi2+\\Psi_\\Xi^0(\\Psi_\\Xi^0(\\Xi2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0433</td>
                            <td>\\( \\psi_\\Omega(Z_{H_0+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi2+\\Psi_\\Xi^0(\\Xi+\\Psi_\\Xi^0(\\Xi2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0434</td>
                            <td>\\( \\psi_\\Omega(H_1) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi2+\\Psi_\\Xi^0(\\Xi2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0435</td>
                            <td>\\( \\psi_\\Omega(\\Phi_4(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi3) \\)</td>
                        </tr>
                        <tr>
                            <td>0436</td>
                            <td>\\( \\psi_\\Omega(\\Phi_\\omega(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0437</td>
                            <td>\\( \\psi_\\Omega(\\Phi_\\Omega(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi\\Omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0438</td>
                            <td>\\( \\psi_\\Omega(\\Phi_{\\Phi_\\omega(0)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi*\\Psi_\\Xi^0(\\Xi\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0439</td>
                            <td>\\( \\psi_\\Omega(\\Phi_{\\Phi_{\\Phi_\\omega(0)}(0)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi*\\Psi_\\Xi^0(\\Xi*\\Psi_\\Xi^0(\\Xi\\omega))) \\)</td>
                        </tr>
                        <tr>
                            <td>0440</td>
                            <td>\\( \\psi_\\Omega(\\psi_I(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0441</td>
                            <td>\\( \\psi_\\Omega(E_{\\psi_I(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi^2+\\Psi_\\Xi^0(\\Psi_\\Xi^0(\\Xi^2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0442</td>
                            <td>\\( \\psi_\\Omega(\\Phi_\\omega(\\psi_I(0)+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi^2+\\Psi_\\Xi^0(\\Xi\\omega+\\Psi_\\Xi^0(\\Xi^2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0443</td>
                            <td>\\( \\psi_\\Omega(\\Phi_{\\psi_I(0)}(1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi^2+\\Psi_\\Xi^0(\\Xi*\\Psi_\\Xi^0(\\Xi^2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0444</td>
                            <td>\\( \\psi_\\Omega(\\Phi_{\\Phi_{\\psi_I(0)}(1)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi^2+\\Psi_\\Xi^0(\\Xi*\\Psi_\\Xi^0(\\Xi*\\Psi_\\Xi^0(\\Xi^2)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0445</td>
                            <td>\\( \\psi_\\Omega(\\psi_I(1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi^2+\\Psi_\\Xi^0(\\Xi^2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0446</td>
                            <td>\\( \\psi_\\Omega(I) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi^2+\\Xi) \\)</td>
                        </tr>
                        <tr>
                            <td>0447</td>
                            <td>\\( \\psi_\\Omega(I^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi^2+\\Xi2) \\)</td>
                        </tr>
                        <tr>
                            <td>0448</td>
                            <td>\\( \\psi_\\Omega(I^I) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi^22) \\)</td>
                        </tr>
                        <tr>
                            <td>0449</td>
                            <td>\\( \\psi_\\Omega(I^{I^I}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi^\\Xi) \\)</td>
                        </tr>
                        <tr>
                            <td>0450</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{I+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Xi+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0451</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{I+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Xi+2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0452</td>
                            <td>\\( \\psi_\\Omega(\\zeta_{I+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\zeta_{\\Xi+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0453</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_{I+1}}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_{\\Xi+1}}^0(2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0454</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{I+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Xi+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0455</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_{I+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_{\\Xi+1}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0456</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{I+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Xi+2}) \\)</td>
                        </tr>
                        <tr>
                            <td>0457</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_{I+2}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_{\\Xi+2}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0458</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{I+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Xi+\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0459</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_{I+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_{\\Xi+1}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0460</td>
                            <td>\\( \\psi_\\Omega(E_{I+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^0(3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0461</td>
                            <td>\\( \\psi_\\Omega(E_{I+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Psi_{\\Xi_2}^1(3)}^0(4)) \\)</td>
                        </tr>
                        <tr>
                            <td>0462</td>
                            <td>\\( \\psi_\\Omega(E_{I+3}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Psi_{\\Xi_2}^1(3)}^0(5)) \\)</td>
                        </tr>
                        <tr>
                            <td>0463</td>
                            <td>\\( \\psi_\\Omega(Z_{I+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0464</td>
                            <td>\\( \\psi_\\Omega(Z_{I+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(3)+\\Psi_{\\Psi_{\\Xi_2}^1(3)}^0(\\Psi_{\\Xi_2}^1(3)+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0465</td>
                            <td>\\( \\psi_\\Omega(H_{I+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(3)*2) \\)</td>
                        </tr>
                        <tr>
                            <td>0466</td>
                            <td>\\( \\psi_\\Omega(\\Phi_\\omega(I+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(3)*\\omega) \\)</td>
                        </tr>
                        <tr>
                            <td>0467</td>
                            <td>\\( \\psi_\\Omega(\\Phi_I(1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(3)*\\Xi) \\)</td>
                        </tr>
                        <tr>
                            <td>0468</td>
                            <td>\\( \\psi_\\Omega(\\Phi_{\\Phi_I(1)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(3)*\\Psi_{\\Psi_{\\Xi_2}^1(3)}^0(\\Psi_{\\Xi_2}^1(3)*\\Xi)) \\)</td>
                        </tr>
                        <tr>
                            <td>0469</td>
                            <td>\\( \\psi_\\Omega(\\Phi_{\\Phi_{\\Phi_I(1)}(0)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(3)*\\Psi_{\\Psi_{\\Xi_2}^1(3)}^0(\\Psi_{\\Xi_2}^1(3)*\\Psi_{\\Psi_{\\Xi_2}^1(3)}^0(\\Psi_{\\Xi_2}^1(3)*\\Xi))) \\)</td>
                        </tr>
                        <tr>
                            <td>0470</td>
                            <td>\\( \\psi_\\Omega(\\psi_{I_2}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(3)^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0471</td>
                            <td>\\( \\psi_\\Omega(\\psi_{I_2}(1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(3)^2+\\Psi_{\\Psi_{\\Xi_2}^1(3)}^0(\\Psi_{\\Xi_2}^1(3)^2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0472</td>
                            <td>\\( \\psi_\\Omega(I_2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(3)^2+\\Psi_{\\Xi_2}^1(3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0473</td>
                            <td>\\( \\psi_\\Omega(I_2^{I_2^{I_2}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(3)^{\\Psi_{\\Xi_2}^1(3)}) \\)</td>
                        </tr>
                        <tr>
                            <td>0474</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{I_2+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Psi_{\\Xi_2}^1(3)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0475</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\Omega_{I_2+1}}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Omega_{\\Psi_{\\Xi_2}^1(3)+1}}^0(4)) \\)</td>
                        </tr>
                        <tr>
                            <td>0476</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{I_2+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Xi_2}^1(3)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0477</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\Omega_{I_2+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Omega_{\\Psi_{\\Xi_2}^1(3)+1}+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0478</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{I_2+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Xi_2}^1(3)+\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0479</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_{I_2+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Omega_{\\Psi_{\\Xi_2}^1(3)+1}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0480</td>
                            <td>\\( \\psi_\\Omega(E_{I_2+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^0(4)) \\)</td>
                        </tr>
                        <tr>
                            <td>0481</td>
                            <td>\\( \\psi_\\Omega(Z_{I_2+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(4)) \\)</td>
                        </tr>
                        <tr>
                            <td>0482</td>
                            <td>\\( \\psi_\\Omega(\\psi_{I_3}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(4)^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0483</td>
                            <td>\\( \\psi_\\Omega(I_3) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(4)^2+\\Psi_{\\Xi_2}^1(4)) \\)</td>
                        </tr>
                        <tr>
                            <td>0484</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{I_3+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Psi_{\\Xi_2}^1(4)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0485</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{I_3+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Xi_2}^1(4)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0486</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{I_3+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Omega_{\\Psi_{\\Xi_2}^1(4)+\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0487</td>
                            <td>\\( \\psi_\\Omega(E_{I_3+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^0(5)) \\)</td>
                        </tr>
                        <tr>
                            <td>0488</td>
                            <td>\\( \\psi_\\Omega(I_4) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(5)^2+\\Psi_{\\Xi_2}^1(5)) \\)</td>
                        </tr>
                        <tr>
                            <td>0489</td>
                            <td>\\( \\psi_\\Omega(E_{I_4+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^0(6)) \\)</td>
                        </tr>
                        <tr>
                            <td>0490</td>
                            <td>\\( \\psi_\\Omega(I_\\omega) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^0(\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0491</td>
                            <td>\\( \\psi_\\Omega(E_{I_\\omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Psi_{\\Xi_2}^1(\\omega)}^0(\\omega+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0492</td>
                            <td>\\( \\psi_\\Omega(E_{I_\\omega+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Psi_{\\Xi_2}^1(\\omega)}^0(\\omega+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0493</td>
                            <td>\\( \\psi_\\Omega(Z_{I_\\omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0494</td>
                            <td>\\( \\psi_\\Omega(I_{\\omega+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^1(\\omega)^2+\\Psi_{\\Xi_2}^1(\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0495</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{I_{\\omega+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\varepsilon_{\\Psi_{\\Xi_2}^1(\\omega)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0496</td>
                            <td>\\( \\psi_\\Omega(E_{I_{\\omega+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^0(\\omega+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0497</td>
                            <td>\\( \\psi_\\Omega(I_{\\omega2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^0(\\omega2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0498</td>
                            <td>\\( \\psi_\\Omega(I_I) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^0(\\Xi)) \\)</td>
                        </tr>
                        <tr>
                            <td>0499</td>
                            <td>\\( \\psi_\\Omega(I_{I_I}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Psi_{\\Xi_2}^0(\\Psi_{\\Xi_2}^0(\\Xi))) \\)</td>
                        </tr>
                    </tbody>
                </table>
                `,
                `<h2>#0500~#0600 - \\( \\psi_\\Omega(\\psi_{\\chi_2(0)}(0))-\\psi_\\Omega(\\psi_{\\chi_\\omega(0)}(0)) \\)</h2>`,
                `${s(8)}In this part, ordinals will be represented in the same notation as in the previous part.`,
                `
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Rathjen M</th>
                            <th>Rathjen K</th>
                        </tr>
                        <tr>
                            <td>0500</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(0)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2) \\)</td>
                        </tr>
                        <tr>
                            <td>0501</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(0)}(0)^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Xi_2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0502</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\psi_{\\chi_2(0)}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\varepsilon_{\\Psi_{\\Xi_2}^0(\\Xi_2)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0503</td>
                            <td>\\( \\psi_\\Omega(E_{\\psi_{\\chi_2(0)}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Psi_{\\Xi_2}^0(\\Xi_2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0504</td>
                            <td>\\( \\psi_\\Omega(E_{\\psi_{\\chi_2(0)}(0)+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Psi_{\\Xi_2}^0(\\Xi_2)+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0505</td>
                            <td>\\( \\psi_\\Omega(E_{E_{\\psi_{\\chi_2(0)}(0)+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Psi_{\\Xi_2}^0(\\Psi_{\\Xi_2}^0(\\Xi_2)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0506</td>
                            <td>\\( \\psi_\\Omega(Z_{\\psi_{\\chi_2(0)}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2))}^0(\\Xi_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0507</td>
                            <td>\\( \\psi_\\Omega(Z_{\\psi_{\\chi_2(0)}(0)+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2))}^0(\\Xi_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0508</td>
                            <td>\\( \\psi_\\Omega(H_{\\psi_{\\chi_2(0)}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0509</td>
                            <td>\\( \\psi_\\Omega(\\Phi_4(\\psi_{\\chi_2(0)}(0)+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2))*2) \\)</td>
                        </tr>
                        <tr>
                            <td>0510</td>
                            <td>\\( \\psi_\\Omega(\\psi_{I_{\\psi_{\\chi_2(0)}(0)+1}}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2))^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0511</td>
                            <td>\\( \\psi_\\Omega(I_{\\psi_{\\chi_2(0)}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2))^2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0512</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{I_{\\psi_{\\chi_2(0)}(0)+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\varepsilon_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2))+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0513</td>
                            <td>\\( \\psi_\\Omega(E_{I_{\\psi_{\\chi_2(0)}(0)+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2)))) \\)</td>
                        </tr>
                        <tr>
                            <td>0514</td>
                            <td>\\( \\psi_\\Omega(E_{I_{\\psi_{\\chi_2(0)}(0)+1}+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2))+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0515</td>
                            <td>\\( \\psi_\\Omega(Z_{I_{\\psi_{\\chi_2(0)}(0)+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2)+1)}^0(\\Xi_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0516</td>
                            <td>\\( \\psi_\\Omega(H_{I_{\\psi_{\\chi_2(0)}(0)+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2)+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0517</td>
                            <td>\\( \\psi_\\Omega(I_{\\psi_{\\chi_2(0)}(0)+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2)+1)^2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2)+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0518</td>
                            <td>\\( \\psi_\\Omega(I_{\\psi_{\\chi_2(0)}(0)+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2)+\\omega)}^0(\\Xi_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0519</td>
                            <td>\\( \\psi_\\Omega(I_{I_{\\psi_{\\chi_2(0)}(0)+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2)))}^0(\\Xi_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0520</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(0)}(1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0521</td>
                            <td>\\( \\psi_\\Omega(E_{\\psi_{\\chi_2(0)}(1)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+1))) \\)</td>
                        </tr>
                        <tr>
                            <td>0522</td>
                            <td>\\( \\psi_\\Omega(Z_{\\psi_{\\chi_2(0)}(1)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+1))}^0(\\Xi_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0523</td>
                            <td>\\( \\psi_\\Omega(Z_{\\psi_{\\chi_2(0)}(1)+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+1))}^0(\\Xi_2+3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0524</td>
                            <td>\\( \\psi_\\Omega(H_{\\psi_{\\chi_2(0)}(1)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+1))) \\)</td>
                        </tr>
                        <tr>
                            <td>0525</td>
                            <td>\\( \\psi_\\Omega(I_{\\psi_{\\chi_2(0)}(1)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+1))^2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+1))) \\)</td>
                        </tr>
                        <tr>
                            <td>0526</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{I_{\\psi_{\\chi_2(0)}(1)+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\varepsilon_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+1))+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0527</td>
                            <td>\\( \\psi_\\Omega(Z_{I_{\\psi_{\\chi_2(0)}(1)+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+1)+1)}^0(\\Xi_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0528</td>
                            <td>\\( \\psi_\\Omega(I_{\\psi_{\\chi_2(0)}(1)+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+1)+\\omega)}^0(\\Xi_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0529</td>
                            <td>\\( \\psi_\\Omega(I_{I_{\\psi_{\\chi_2(0)}(1)+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+1)))}^0(\\Xi_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0530</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(0)}(2)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0531</td>
                            <td>\\( \\psi_\\Omega(Z_{\\psi_{\\chi_2(0)}(2)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+2))}^0(\\Xi_2+3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0532</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{I_{\\psi_{\\chi_2(0)}(2)+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\varepsilon_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+2))+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0533</td>
                            <td>\\( \\psi_\\Omega(Z_{I_{\\psi_{\\chi_2(0)}(2)+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+2)+1)}^0(\\Xi_2+3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0534</td>
                            <td>\\( \\psi_\\Omega(I_{\\psi_{\\chi_2(0)}(2)+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+2)+\\omega)}^0(\\Xi_2+3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0535</td>
                            <td>\\( \\psi_\\Omega(I_{I_{\\psi_{\\chi_2(0)}(2)+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+2)))}^0(\\Xi_2+3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0536</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(0)}(3)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0537</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(0)}(\\omega)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0538</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(0)}(I)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+\\Xi)) \\)</td>
                        </tr>
                        <tr>
                            <td>0539</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(0)}(\\psi_{\\chi_2(0)}(0))) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2)}^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Xi_2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0540</td>
                            <td>\\( \\psi_\\Omega(\\chi_2(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0541</td>
                            <td>\\( \\psi_\\Omega(\\chi_2(0)+\\psi_{\\chi_2(0)}(\\chi_2(0))) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_2)+1) \\)</td>
                        </tr>
                        <tr>
                            <td>0542</td>
                            <td>\\( \\psi_\\Omega(\\chi_2(0)+\\psi_{\\chi_2(0)}(\\chi_2(0)+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_2)+\\Psi_{\\Xi_2}^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0543</td>
                            <td>\\( \\psi_\\Omega(\\chi_2(0)*2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_2)+\\Psi_{\\Xi_2}^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_2)+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0544</td>
                            <td>\\( \\psi_\\Omega(\\chi_2(0)^2) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_2)*2) \\)</td>
                        </tr>
                        <tr>
                            <td>0545</td>
                            <td>\\( \\psi_\\Omega(\\chi_2(0)^{\\chi_2(0)}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_2)^2) \\)</td>
                        </tr>
                        <tr>
                            <td>0546</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{\\chi_2(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\varepsilon_{\\Psi_{\\Xi_2}^1(\\Xi_2)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0547</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\chi_2(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Omega_{\\Psi_{\\Xi_2}^1(\\Xi_2)+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0548</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\chi_2(0)+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Omega_{\\Psi_{\\Xi_2}^1(\\Xi_2)+\\omega}) \\)</td>
                        </tr>
                        <tr>
                            <td>0549</td>
                            <td>\\( \\psi_\\Omega(\\Omega_{\\Omega_{\\chi_2(0)+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Omega_{\\Omega_{\\Psi_{\\Xi_2}^1(\\Xi_2)+1}}) \\)</td>
                        </tr>
                        <tr>
                            <td>0550</td>
                            <td>\\( \\psi_\\Omega(E_{\\chi_2(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Psi_{\\Xi_2}^1(\\Xi_2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0551</td>
                            <td>\\( \\psi_\\Omega(Z_{\\chi_2(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_2))}^0(\\Xi_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0552</td>
                            <td>\\( \\psi_\\Omega(H_{\\chi_2(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0553</td>
                            <td>\\( \\psi_\\Omega(I_{\\chi_2(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_2))^2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0554</td>
                            <td>\\( \\psi_\\Omega(\\varepsilon_{I_{\\chi_2(0)+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\varepsilon_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_2))+1}) \\)</td>
                        </tr>
                        <tr>
                            <td>0555</td>
                            <td>\\( \\psi_\\Omega(Z_{I_{\\chi_2(0)+1}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_2)+1)}^0(\\Xi_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0556</td>
                            <td>\\( \\psi_\\Omega(I_{\\chi_2(0)+2}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_2)+1)^2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_2)+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0557</td>
                            <td>\\( \\psi_\\Omega(Z_{I_{\\chi_2(0)+2}+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_2)+2)}^0(\\Xi_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0558</td>
                            <td>\\( \\psi_\\Omega(I_{\\chi_2(0)+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_2)+\\omega)}^0(\\Xi_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0559</td>
                            <td>\\( \\psi_\\Omega(I_{I_{\\chi_2(0)+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_2)))}^0(\\Xi_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0560</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(1)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Xi_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0561</td>
                            <td>\\( \\psi_\\Omega(E_{\\psi_{\\chi_2(1)}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Psi_{\\Xi_2}^0(\\Xi_2+1))) \\)</td>
                        </tr>
                        <tr>
                            <td>0562</td>
                            <td>\\( \\psi_\\Omega(Z_{\\psi_{\\chi_2(1)}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2+1))}^0(\\Xi_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0563</td>
                            <td>\\( \\psi_\\Omega(H_{\\psi_{\\chi_2(1)}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2+1))) \\)</td>
                        </tr>
                        <tr>
                            <td>0564</td>
                            <td>\\( \\psi_\\Omega(I_{\\psi_{\\chi_2(1)}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2+1))^2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2+1))) \\)</td>
                        </tr>
                        <tr>
                            <td>0565</td>
                            <td>\\( \\psi_\\Omega(I_{\\psi_{\\chi_2(1)}(0)+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_2+1)+\\omega)}^0(\\Xi_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0566</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(1)}(1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2+1)}^0(\\Xi_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0567</td>
                            <td>\\( \\psi_\\Omega(\\chi_2(1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0568</td>
                            <td>\\( \\psi_\\Omega(I_{\\chi_2(1)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_2+1)^2+\\Psi_{\\Xi_2}^1(\\Xi_2+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0569</td>
                            <td>\\( \\psi_\\Omega(I_{\\chi_2(1)+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_2+1)+\\omega)}^0(\\Xi_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0570</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(2)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Xi_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0571</td>
                            <td>\\( \\psi_\\Omega(E_{\\psi_{\\chi_2(2)}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Psi_{\\Xi_2}^0(\\Xi_2+2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0572</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(2)}(1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2+2)}^0(\\Xi_2+3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0573</td>
                            <td>\\( \\psi_\\Omega(\\chi_2(2)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0574</td>
                            <td>\\( \\psi_\\Omega(I_{\\chi_2(2)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_2+2)^2+\\Psi_{\\Xi_2}^1(\\Xi_2+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0575</td>
                            <td>\\( \\psi_\\Omega(I_{\\chi_2(2)+\\omega}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_2+2)+\\omega)}^0(\\Xi_2+3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0576</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(3)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Xi_2+3)) \\)</td>
                        </tr>
                        <tr>
                            <td>0577</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(4)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Xi_2+4)) \\)</td>
                        </tr>
                        <tr>
                            <td>0578</td>
                            <td>\\( \\psi_\\Omega(\\chi_2(\\omega)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Xi_2+\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0579</td>
                            <td>\\( \\psi_\\Omega(\\chi_2(\\chi_2(0))) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_2))) \\)</td>
                        </tr>
                        <tr>
                            <td>0580</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_3(0)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22) \\)</td>
                        </tr>
                        <tr>
                            <td>0581</td>
                            <td>\\( \\psi_\\Omega(E_{\\psi_{\\chi_3(0)}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Xi_2}^0(\\Psi_{\\Xi_2}^0(\\Xi_22))) \\)</td>
                        </tr>
                        <tr>
                            <td>0582</td>
                            <td>\\( \\psi_\\Omega(Z_{\\psi_{\\chi_3(0)}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_22))}^0(\\Xi_22+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0583</td>
                            <td>\\( \\psi_\\Omega(I_{\\psi_{\\chi_3(0)}(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_22))^2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_22))) \\)</td>
                        </tr>
                        <tr>
                            <td>0584</td>
                            <td>\\( \\psi_\\Omega(I_{I_{\\psi_{\\chi_3(0)}(0)+1}}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^0(\\Xi_22)))}^0(\\Xi_22+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0585</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(\\chi_3(0)+1)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Xi_2}^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Xi_22))) \\)</td>
                        </tr>
                        <tr>
                            <td>0586</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(\\chi_3(0)+1)}(1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Xi_22))}^0(\\Xi_22+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0587</td>
                            <td>\\( \\psi_\\Omega(\\chi_2(\\chi_3(0)+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Xi_2}^1(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Xi_22))) \\)</td>
                        </tr>
                        <tr>
                            <td>0588</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(\\chi_3(0)+2)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Xi_2}^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Xi_22)+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0589</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_2(\\chi_3(0)+\\omega)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Xi_2}^0(\\Xi_2+\\Psi_{\\Xi_2}^0(\\Xi_22)+\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0590</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_3(0)}(1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_22)}^0(\\Xi_22+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0591</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_3(0)}(2)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Psi_{\\Xi_2}^1(\\Xi_22)}^0(\\Xi_22+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0592</td>
                            <td>\\( \\psi_\\Omega(\\chi_3(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Xi_2}^1(\\Xi_22)) \\)</td>
                        </tr>
                        <tr>
                            <td>0593</td>
                            <td>\\( \\psi_\\Omega(I_{\\chi_3(0)+1}) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_22))^2+\\Psi_{\\Xi_2}^1(\\Psi_{\\Xi_2}^1(\\Xi_22))) \\)</td>
                        </tr>
                        <tr>
                            <td>0594</td>
                            <td>\\( \\psi_\\Omega(\\chi_2(\\chi_3(0)+1)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Xi_2}^1(\\Xi_2+\\Psi_{\\Xi_2}^1(\\Xi_22))) \\)</td>
                        </tr>
                        <tr>
                            <td>0595</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_3(1)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Xi_2}^0(\\Xi_22+1)) \\)</td>
                        </tr>
                        <tr>
                            <td>0596</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_3(2)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Xi_2}^0(\\Xi_22+2)) \\)</td>
                        </tr>
                        <tr>
                            <td>0597</td>
                            <td>\\( \\psi_\\Omega(\\chi_3(\\omega)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_22+\\Psi_{\\Xi_2}^0(\\Xi_22+\\omega)) \\)</td>
                        </tr>
                        <tr>
                            <td>0598</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_4(0)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_23) \\)</td>
                        </tr>
                        <tr>
                            <td>0599</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_5(0)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_24) \\)</td>
                        </tr>
                        <tr>
                            <td>0600</td>
                            <td>\\( \\psi_\\Omega(\\psi_{\\chi_\\omega(0)}(0)) \\)</td>
                            <td>\\( \\Psi_\\Omega^0(\\Xi_2\\omega) \\)</td>
                        </tr>
                    </tbody>
                </table>
                `,
                `${s(8)}In the next article, I will show my analysis from \\( \\psi_\\Omega(\\psi_{\\chi_\\omega(0)}(0)) \\) to \\( \\psi_\\Omega(\\psi_{\\chi_{\\varepsilon_{M+1}}(0)}(0)) \\).`,
                `${s(1)}`,
                `${s(8)}<a id="cite0001" href="#goto0001">^</a>[1] Rathjen, Michael. <a href="https://www1.maths.leeds.ac.uk/~rathjen/Ord_Notation_Weakly_Mahlo.pdf">"Ordinal Notations Based on a Weakly Mahlo Cardinal"</a>, Archive for Mathematical Logic 29 (1990) 249--263.`,
                `${s(8)}<a id="cite0002" href="#goto0002">^</a>[2] Rathjen, Michael. <a href="https://www1.maths.leeds.ac.uk/~rathjen/Ehab.pdf">"Proof Theory of Reflection"</a>, Annals of Pure and Applied Logic 68, 181--224 (1994).`,
            ],
            null,
            null,
            null,
        ],
    },
];
