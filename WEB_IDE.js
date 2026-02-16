function save() {
    document.getElementById("my").style.display = "block";
    document.getElementById("left-hide").style.display = "none";
    document.getElementById("output").style.display = "none";
    document.getElementById("outputpara").style.display = "none";
}

function back() {
    document.getElementById("my").style.display = "none";
    document.getElementById("left-hide").style.display = "block";
    document.getElementById("output").style.display = "block";
    document.getElementById("outputpara").style.display = "block";
}

function hide() {
    document.getElementById("left-hide").style.display = "none";
    document.getElementById("right-show").style.display = "block";


}

function show() {
    document.getElementById("left-hide").style.display = "block";
    document.getElementById("right-show").style.display = "none";

}

function show2() {
    document.getElementById("files-container").style.display = "none";
    document.getElementById("output").style.display = "block";
    document.getElementById("outputpara").style.display = "block";
    document.getElementById("left-hide").style.display = "block";
}

function buttonLive() {
    document.getElementById("frontend").style.display = "none";
    document.getElementById("output").style.display = "block";
    document.getElementById("outputpara").style.display = "block";
    document.getElementById("left-hide").style.display = "block";
}

function home() {
    document.getElementById("frontend").style.display = "block";
    document.getElementById("output").style.display = "none";
    document.getElementById("outputpara").style.display = "none";
    document.getElementById("left-hide").style.display = "none";
}



let htmlEditor, cssEditor, jsEditor;
let isCustomTheme = false;
require.config({
    paths: {
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs'
    }
});
require(['vs/editor/editor.main'], function() {

    // Create the editor instance
    htmlEditor = monaco.editor.create(document.querySelector('.htmleditor'), {
        value: `<!-- Coding like poetry should be short and concise -->\n<!DOCTYPE html>\n<html>\n<head>\n<title>Om Bheem Bhush</title>\n</head>\n<body>\n<p>Hello Web Wizard</p>\n</body>\n</html>`,
        language: 'html',
        theme: 'vs-dark',
        automaticLayout: true
    });
    cssEditor = monaco.editor.create(document.querySelector('.csseditor'), {
        value: `/* Clean code always looks like it was written by someone who cares */\np{\ncolor :blue;\n}`,
        language: 'css',
        theme: 'vs-dark',
        automaticLayout: true
    });
    jsEditor = monaco.editor.create(document.querySelector('.jseditor'), {
        value: `// It’s not a bug; it’s an undocumented feature\nconsole.log('Hello, Code Breaker');`,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true
    });
    monaco.editor.defineTheme('customTheme', {
        base: 'vs-dark', // Start with a dark base theme
        inherit: true, // Inherit Monaco's default rules
        rules: [{
                token: 'comment',
                foreground: 'ffa500',
                fontStyle: 'italic'
            },
            {
                token: 'keyword',
                foreground: '228B22',
                fontStyle: 'italic'
            },
            {
                token: 'string',
                foreground: 'a6e22e',
                fontStyle: 'italic'
            },
            {
                token: 'tag',
                foreground: 'FF00FF',
                fontStyle: 'italic'
            }, // HTML tag color
            {
                token: 'attribute.name',
                foreground: '98FF98',
                fontStyle: 'italic'
            }, // Attribute names
            {
                token: 'attribute.value',
                foreground: '00FFFF',
                fontStyle: 'italic'
            }, // Attribute values
        ],
        colors: {
            'editor.background': '#0d1117', // Editor background
            'editor.lineHighlightBackground': '#333333', // Highlighted line
            'editorCursor.foreground': '#ffffff', // Cursor color
            'editorSuggestWidget.background': '#252526', // Suggestion box background
            'editorSuggestWidget.foreground': '#39FF14', // Suggestion text color
            'editorSuggestWidget.selectedBackground': '#1e1e1e', // Highlighted suggestion background
            'editorSuggestWidget.highlightForeground': '#39FF14', // Highlighted text in suggestions
            'editorSuggestWidget.border': '#B0E0E6', // Suggestion box border
        }
    });


    window.addEventListener('resize', () => {
        htmlEditor.layout();
        cssEditor.layout();
        jsEditor.layout();

    });
    // Output iframe
    const output = document.getElementById('output');

    // Function to run the code
    function run() {
        let htmlCode = htmlEditor.getValue();
        let cssCode = cssEditor.getValue();
        let jsCode = jsEditor.getValue();

        const outputContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Output</title>
                <style>${cssCode}</style>
                </head>
                <body>
                ${htmlCode}
                <script>
                    ${jsCode}
                <\/script>
                </body>
                </html>
                `;

        // Write content to iframe
        const iframeDoc = output.contentDocument || output.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(outputContent);
        iframeDoc.close();
    }

    // Add listeners for live updates
    htmlEditor.onDidChangeModelContent(run);
    cssEditor.onDidChangeModelContent(run);
    jsEditor.onDidChangeModelContent(run);

    // Initial render
    run();

});

function dark() {
    isCustomTheme = !isCustomTheme;
    const themeName = isCustomTheme ? 'customTheme' : 'vs-light';
    monaco.editor.setTheme(themeName); // Change theme globally
    const color = isCustomTheme ? "#1e1e1e" : "white";
    document.getElementById("output").style.backgroundColor = color;
}

function saveFile() {
    const fileName = document.getElementById("totoo").value.trim();
    if (!fileName) {
        alert("File name cannot be empty!");
        return;
    }

    const htmlContent = htmlEditor.getValue();
    const cssContent = cssEditor.getValue();
    const jsContent = jsEditor.getValue();

    const fileData = {
        html: htmlContent,
        css: cssContent,
        js: jsContent,
    };

    const files = JSON.parse(localStorage.getItem('monacoFiles')) || {};
    files[fileName] = fileData;
    localStorage.setItem('monacoFiles', JSON.stringify(files));
    alert(`File "${fileName}" saved successfully!`);
    document.getElementById("my").style.display = "none";
    document.getElementById("left-hide").style.display = "block";
    document.getElementById("output").style.display = "block";
    document.getElementById("outputpara").style.display = "block";

}

// Show the list of saved files
// function file(){
function file() {
    const filesContainer = document.getElementById('files-container');
    const filesList = document.getElementById('files-list');
    filesList.innerHTML = ''; // Clear previous list
    const files = JSON.parse(localStorage.getItem('monacoFiles')) || {};

    for (let fileName in files) {
        const fileBox = document.createElement('div');
        fileBox.className = 'file-box w-50 col-md-6 shadow';

        const fileInfo = document.createElement('div');
        fileInfo.className = 'file-info';

        const fileIcon = document.createElement('img');
        fileIcon.src = 'https://cdn-icons-png.flaticon.com/128/174/174854.png';
        fileIcon.alt = 'HTML File';

        const fileNameText = document.createElement('p');
        fileNameText.textContent = fileName;
        fileNameText.className = "para3";

        fileInfo.appendChild(fileNameText);
        fileInfo.appendChild(fileIcon);

        const fileButtons = document.createElement('div');
        fileButtons.className = 'file-buttons';

        const openButton = document.createElement('button');
        openButton.textContent = 'Open';
        openButton.className = 'btn btn-info mb-2 boom';
        openButton.onclick = () => openFile(fileName);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger mb-2';
        deleteButton.onclick = () => deleteFile(fileName);

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.className = 'btn btn-success';
        downloadButton.onclick = () => downloadCode(fileName);

        fileBox.appendChild(fileInfo);
        fileBox.appendChild(openButton);
        fileBox.appendChild(deleteButton);
        fileBox.appendChild(downloadButton)

        filesList.appendChild(fileBox);
    }

    filesContainer.style.display = 'block';
    document.getElementById("my").style.display = "none";
    document.getElementById("left-hide").style.display = "none";
    document.getElementById("output").style.display = "none";
    document.getElementById("outputpara").style.display = "none";

}
// Open a file in the editors
function openFile(fileName) {
    const files = JSON.parse(localStorage.getItem('monacoFiles')) || {};
    const fileData = files[fileName];

    if (fileData) {
        htmlEditor.setValue(fileData.html);
        cssEditor.setValue(fileData.css);
        jsEditor.setValue(fileData.js);
        alert(`File "${fileName}" loaded successfully!`);
        document.getElementById("files-container").style.display = "none";
        document.getElementById("left-hide").style.display = "block";
        document.getElementById("output").style.display = "block";
        document.getElementById("outputpara").style.display = "block";
    } else {
        alert("File not found!");

    }
}

// Delete a file
function deleteFile(fileName) {
    const files = JSON.parse(localStorage.getItem('monacoFiles')) || {};
    if (files[fileName]) {
        delete files[fileName];
        localStorage.setItem('monacoFiles', JSON.stringify(files));
        alert(`File "${fileName}" deleted.`);
        file(); // Refresh the file list
        document.getElementById("files-container").style.display = "none";
        document.getElementById("left-hide").style.display = "block";
        document.getElementById("output").style.display = "block";
        document.getElementById("outputpara").style.display = "block";
    } else {
        alert("File not found!");
    }
}

function downloadCode(fileName) {
    let htmlCode = htmlEditor.getValue();
    let cssCode = `<style>${cssEditor.getValue()}</style>`;
    let jsCode = `<script>${jsEditor.getValue()}<\/script>`;

    // Combine all code into a single file
    let fullCode = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Downloaded Code</title>
            ${cssCode}
        </head>
        <body>
            ${htmlCode}
            ${jsCode}
        </body>
        </html>`;

    // Create a Blob and download the file
    let blob = new Blob([fullCode], {
        type: "text/html"
    });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName + ".html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// const SYSTEM_PROMPT = `
// You are a senior full-stack frontend engineer.



// STRICT RULES:
// - NO markdown
// - NO triple backticks
// - NO explanations

// FORMAT ONLY:
// <html>...</html>
// <style>...</style>
// <script>...</script>
// `;

// const SYSTEM_PROMPT = `
// You are a senior full-stack frontend engineer.

// STEP 1 (internal, do NOT output):
// - Expand the user prompt into a detailed technical specification.
// - Decide features, UI structure, JS logic, and data flow.
// - Assume frontend-only unless explicitly stated.
// - Use dummy data and public image URLs.
// - Ensure every interactive element works.

// STEP 2 (output ONLY code):
// - Generate a COMPLETE, WORKING website.
// - All buttons must function.
// - Use JavaScript for logic.
// - Persist state using localStorage when needed.
// - No placeholder or non-functional UI.
// - No explanations.
// - No markdown.

// STRICT RULES:
// - NO markdown
// - NO triple backticks
// - NO explanations

// FORMAT ONLY:
// <html>...</html>
// <style>...</style>
// <script>...</script>

//  Output in this strict order:
//   - HTML first
//   - CSS second
//   - JS last
// Assume frontend-only; do not include backend code.

// Follow this strictly so that your output can be split into HTML, CSS, and JS editors correctly.

// `;

// const SYSTEM_PROMPT = `
// You are a senior full-stack frontend engineer.

// You must generate a COMPLETE, WORKING, FRONTEND-ONLY web application.

// CRITICAL RULES:
// 1. This is a SIMULATED full-stack app using ONLY HTML, CSS, and JavaScript.
// 2. ALL functionality must work without a backend.
// 3. Use localStorage to simulate:
//   - Cart
//   - Orders
//   - User state
// 4. ALL buttons must have working JavaScript logic.
// 5. NO placeholder buttons. NO fake actions.
// 6. Use real public image URLs for products.
// 7. Implement real features when applicable:
//   - Add to cart
//   - Remove from cart
//   - Quantity update
//   - Search products
//   - Checkout simulation
//   - Order confirmation
// 8. Use clean, readable, modern JavaScript.
// 9. NO explanations. NO markdown. CODE ONLY.

// OUTPUT FORMAT (STRICT):
// 1. HTML ONLY (no <style> or <script> inside)
// 2. CSS ONLY
// 3. JS ONLY

// The website must behave like a real application.
// `;


const SYSTEM_PROMPT = `
You are a senior full-stack frontend engineer.

STEP 1 (internal, do NOT output):
- Expand the user prompt into a clear technical specification.
- Decide full UI structure, components, and layout.
- Decide JavaScript logic and data flow.
- Assume frontend-only unless explicitly stated otherwise.
- Ensure every interactive element has real logic.
- Plan state usage with localStorage where appropriate.
- Choose suitable public image URLs if images are needed.

STEP 2 (output ONLY code):
- Generate a COMPLETE, FULLY FUNCTIONAL website.
- All buttons, inputs, and interactions MUST WORK.
- Use JavaScript for all behavior and logic.
- Use localStorage for state (cart, settings, mock auth, etc.).
- Use ONLY public image URLs (Unsplash, Pexels, Picsum, etc.).
- No placeholder UI.
- No fake or non-functional buttons.
- Website must be usable immediately when opened in browser.

STRICT RULES:
- NO markdown
- NO triple backticks
- NO explanations

FORMAT ONLY:
<html>...</html>
<style>...</style>
<script>...</script>

 Output in this strict order:
  - HTML first
  - CSS second
  - JS last
Assume frontend-only; do not include backend code.

Follow this strictly so that your output can be split into HTML, CSS, and JS editors correctly.
The website must behave like a real application.

`;

// const SYSTEM_PROMPT = `
// You are generating a COMPLETE, WORKING web application.

// Think silently before answering.

// GOAL:
// The output must be a FUNCTIONAL website, not a mockup.

// NON-NEGOTIABLE RULES:
// - Every visible button MUST work.
// - No dead UI. No fake features.
// - All logic must be implemented in JavaScript.
// - State must be real and persistent using localStorage.
// - The app must work on page reload.
// - Use ONLY vanilla HTML, CSS, and JavaScript.
// - No frameworks. No libraries. No backend.

// ASSETS:
// - All images MUST use placeholder URLs from https://picsum.photos
// - Never leave images empty or broken.

// DATA:
// - Use JavaScript arrays/objects for all data.
// - Do NOT hardcode repeated HTML — render dynamically with JS.

// FUNCTIONALITY REQUIREMENTS:
// - If the app looks interactive, it must actually be interactive.
// - If a button exists, it must have an event listener.
// - If data changes, the UI must update immediately.

// ERROR PREVENTION:
// - Do NOT output partial logic.
// - Do NOT omit required behavior.
// - If something is missing, FIX IT before output.

// OUTPUT FORMAT (STRICT):
// 1. Output ONLY code.
// 2. First: full HTML wrapped in <html></html>
// 3. Second: all CSS wrapped in <style></style>
// 4. Third: all JavaScript wrapped in <script></script>
// 5. No markdown.
// 6. No explanations.
// 7. No comments outside code blocks.

// FINAL CHECK:
// Before answering, internally verify:
// - Buttons work
// - State updates
// - Reload persistence works
// - Images load
// - No UI element is non-functional

// `;






// // // function stripLeadingAngle(text) {
// // //     return text.replace(/^\s*>+/, "");
// // // }

// const SYSTEM_PROMPT = `
// You are a senior frontend engineer. Generate ONLY frontend code (HTML, CSS, JS). Follow these rules strictly:

// 1. Output must be fully functional and runnable in the browser.
// 2. HTML editor should contain ONLY HTML code:
//   - No <style> or <script> tags inside it.
// 3. CSS editor should contain ONLY CSS code:
//   - Remove <style> tags from the content.
// 4. JS editor should contain ONLY JS code:
//   - Remove <script> tags from the content.
// 5. All buttons and interactive elements must work.
// 6. Use localStorage to persist state when necessary.
// 7. Use public image URLs for any images.
// 8. Do NOT include explanations, markdown, or any text outside the code.
// 9. Output in this strict order:
//   - HTML first
//   - CSS second
//   - JS last
// 10. Assume frontend-only; do not include backend code.

// Follow this strictly so that your output can be split into HTML, CSS, and JS editors correctly.
// `;


// // ---------- FINAL CLEANUP (RUN ONCE) ----------

function cleanCSSFinal(code) {
    return code
        .replace(/<\/?\s*style\s*>/gi, "")
        .replace(/<\/?\s*>/g, "")
        .replace(/^\s*>+/, "")
        .trim();
}

function cleanJSFinal(code) {
    return code
        .replace(/<\/?\s*script\s*>/gi, "")
        .replace(/<\/?\s*>/g, "")
        .replace(/^\s*>+/, "")
        .trim();
}

// ---------- STREAM GENERATION ----------
async function generateCodeStream() {
    const prompt = document.getElementById("aiPrompt").value.trim();
    if (!prompt) return;

    htmlEditor.setValue("<!-- 🤖 Generating HTML... -->");
    cssEditor.setValue("/* 🎨 Waiting for CSS... */");
    jsEditor.setValue("// ⚙️ Waiting for JS...");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "YOUR_API_TOKEN_HERE",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // model: "mistralai/devstral-2512:free",
            model: "arcee-ai/trinity-large-preview:free",
            stream: true,
            messages: [{
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";
    let html = "";
    let css = "";
    let js = "";
    let mode = "html";

    let lastUpdate = 0;
    const UPDATE_INTERVAL = 60;

    while (true) {
        const {
            value,
            done
        } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, {
            stream: true
        });
        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            if (line.includes("[DONE]")) break;

            let json;
            try {
                json = JSON.parse(line.replace("data:", ""));
            } catch {
                continue;
            }

            const token = json.choices?. [0]?.delta?.content;
            if (!token) continue;

            // ---- MODE SWITCH ----
            if (token.includes("<style")) {
                mode = "css";
                css = css.replace(/^\s*>+/, "");
                cssEditor.setValue("/* 🎨 Writing CSS... */");
                continue;
            }

            if (token.includes("<script")) {
                mode = "js";
                js = js.replace(/^\s*>+/, "");
                jsEditor.setValue("// ⚙️ Writing JS...");
                continue;
            }

            const now = Date.now();

            if (mode === "html") {
                html += token;
                if (now - lastUpdate > UPDATE_INTERVAL) {
                    htmlEditor.setValue(html);
                    lastUpdate = now;
                }
            }

            if (mode === "css") {
                css += token;
                if (now - lastUpdate > UPDATE_INTERVAL) {
                    cssEditor.setValue(css);
                    lastUpdate = now;
                }
            }

            if (mode === "js") {
                js += token;
                if (now - lastUpdate > UPDATE_INTERVAL) {
                    jsEditor.setValue(js);
                    lastUpdate = now;
                }
            }
        }
    }

    // ---------- FINAL PASS ----------
    htmlEditor.setValue(html);
    cssEditor.setValue(cleanCSSFinal(css));
    jsEditor.setValue(cleanJSFinal(js));
}

function generateCode() {
    generateCodeStream();
}





// const SYSTEM_PROMPT = `
// You are a senior frontend en

// Internally expand the user prompt into a full specification.
// Then output ONLY runnable frontend code.

// Rules:
// - Frontend only
// - All buttons must work
// - Use JavaScript logic
// - Use localStorage if needed
// - Use public image URLs
// - No explanations
// - No markdown
// - No backticks

// FORMAT STRICTLY:
// <html>...</html>
// <style>...</style>
// <script>...</script>
// `;



// function stripStyleScriptArtifacts(text) {
//     return text
//         // remove brackets
//         .replace(/[<>]/g, "")
//         // remove tag words (even split)
//         .replace(/\/?\s*style\s*/gi, "")
//         .replace(/\/?\s*script\s*/gi, "")
//         // remove orphan slashes left from </
//         .replace(/(^|\s)\/(\s|$)/g, " ");
// }
// const SYSTEM_PROMPT = `
// You generate ONLY code.
// Order strictly:
// 1. HTML inside <html></html>
// 2. CSS inside <style></style>
// 3. JS inside <script></script>
// No explanation. No markdown.
// `;

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Particle system
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = `rgba(0, 242, 255, ${this.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f2ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Digital rain
class RainDrop {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -Math.random() * canvas.height;
        this.speed = Math.random() * 3 + 2;
        this.length = Math.random() * 50 + 20;
        this.alpha = Math.random() * 0.3 + 0.1;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height + this.length) {
            this.reset();
        }
    }

    draw() {
        const gradient = ctx.createLinearGradient(0, this.y - this.length, 0, this.y);
        gradient.addColorStop(0, 'rgba(0, 242, 255, 0)');
        gradient.addColorStop(1, `rgba(0, 242, 255, ${this.alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.shadowBlur = 3;
        ctx.shadowColor = '#00f2ff';

        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.length);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}

const particles = Array.from({
    length: 100
}, () => new Particle());
const rainDrops = Array.from({
    length: 50
}, () => new RainDrop());

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    rainDrops.forEach(drop => {
        drop.update();
        drop.draw();
    });

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections
    ctx.shadowBlur = 0;
    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(0, 242, 255, ${(1 - distance / 150) * 0.2})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animate);
}

animate();

// Typing animation
const headlineText = "Code Smarter Build Faster";
const subtitleText = "Transform your development workflow with AI-powered code completion, intelligent debugging, and real-time collaboration.";

const headlineEl = document.getElementById('headline');
const subtitleEl = document.getElementById('subtitle');
const button = document.getElementById('ctaButton');

let headlineIndex = 0;
let subtitleIndex = 0;

function typeHeadline() {
    if (headlineIndex < headlineText.length) {
        headlineEl.textContent = headlineText.substring(0, headlineIndex + 1);
        headlineIndex++;
        setTimeout(typeHeadline, 80);
    } else {
        headlineEl.innerHTML = headlineText + '<span class="typing-cursor"></span>';
        setTimeout(() => {
            headlineEl.innerHTML = headlineText;
            subtitleEl.classList.add('visible');
            typeSubtitle();
        }, 500);
    }
}

function typeSubtitle() {
    if (subtitleIndex < subtitleText.length) {
        subtitleEl.textContent = subtitleText.substring(0, subtitleIndex + 1);
        subtitleIndex++;
        setTimeout(typeSubtitle, 30);
    } else {
        subtitleEl.innerHTML = subtitleText + '<span class="typing-cursor"></span>';
        setTimeout(() => {
            subtitleEl.innerHTML = subtitleText;
            button.classList.add('visible');
        }, 500);
    }
}

setTimeout(typeHeadline, 1000);

button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});

const backgroundCanvas = document.getElementById('canvas');
const backgroundCtx = backgroundCanvas.getContext('2d');

let bgWidth = backgroundCanvas.width = window.innerWidth;
let bgHeight = backgroundCanvas.height = window.innerHeight;

// Handle window resize
window.addEventListener('resize', () => {
    bgWidth = backgroundCanvas.width = window.innerWidth;
    bgHeight = backgroundCanvas.height = window.innerHeight;
    initBgParticles();
    initBgRainDrops();
});

// Particle system
class BackgroundParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * bgWidth;
        this.y = Math.random() * bgHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.hue = Math.random() * 60 + 180; // Blue to cyan range
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;

        // Wrap around screen
        if (this.x < 0) this.x = bgWidth;
        if (this.x > bgWidth) this.x = 0;
        if (this.y < 0) this.y = bgHeight;
        if (this.y > bgHeight) this.y = 0;
    }

    draw() {
        const pulseRadius = this.radius + Math.sin(this.pulse) * 0.5;
        const gradient = backgroundCtx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, pulseRadius * 3
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 60%, ${this.opacity})`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 50%, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, 'transparent');

        backgroundCtx.fillStyle = gradient;
        backgroundCtx.beginPath();
        backgroundCtx.arc(this.x, this.y, pulseRadius * 3, 0, Math.PI * 2);
        backgroundCtx.fill();
    }
}

// Digital rain system
class BackgroundRain {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * bgWidth;
        this.y = Math.random() * -bgHeight;
        this.speed = Math.random() * 3 + 2;
        this.length = Math.random() * 100 + 50;
        this.opacity = Math.random() * 0.4 + 0.3;
        this.hue = Math.random() * 120 + 140; // Green to cyan range
        this.tailLength = Math.random() * 20 + 10;
    }

    update() {
        this.y += this.speed;
        if (this.y > bgHeight + this.length) {
            this.reset();
        }
    }

    draw() {
        const gradient = backgroundCtx.createLinearGradient(
            this.x, this.y - this.length,
            this.x, this.y
        );
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.1, `hsla(${this.hue}, 100%, 60%, ${this.opacity * 0.1})`);
        gradient.addColorStop(0.9, `hsla(${this.hue}, 100%, 50%, ${this.opacity})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 80%, ${this.opacity})`);

        backgroundCtx.strokeStyle = gradient;
        backgroundCtx.lineWidth = 1.5;
        backgroundCtx.beginPath();
        backgroundCtx.moveTo(this.x, this.y - this.length);
        backgroundCtx.lineTo(this.x, this.y);
        backgroundCtx.stroke();

        // Glowing head
        backgroundCtx.fillStyle = `hsla(${this.hue}, 100%, 80%, ${this.opacity * 1.5})`;
        backgroundCtx.beginPath();
        backgroundCtx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        backgroundCtx.fill();
    }
}

// Connection lines system
class BackgroundConnection {
    constructor(p1, p2, distance) {
        this.p1 = p1;
        this.p2 = p2;
        this.distance = distance;
        this.maxDistance = 150;
    }

    draw() {
        const opacity = (1 - this.distance / this.maxDistance) * 0.3;
        const gradient = backgroundCtx.createLinearGradient(
            this.p1.x, this.p1.y,
            this.p2.x, this.p2.y
        );
        gradient.addColorStop(0, `hsla(${this.p1.hue}, 100%, 60%, ${opacity})`);
        gradient.addColorStop(1, `hsla(${this.p2.hue}, 100%, 60%, ${opacity})`);

        backgroundCtx.strokeStyle = gradient;
        backgroundCtx.lineWidth = 0.5;
        backgroundCtx.beginPath();
        backgroundCtx.moveTo(this.p1.x, this.p1.y);
        backgroundCtx.lineTo(this.p2.x, this.p2.y);
        backgroundCtx.stroke();
    }
}

// Wave system for background
class BackgroundWave {
    constructor(index) {
        this.index = index;
        this.offset = (index * Math.PI * 2) / 3;
        this.speed = 0.01 + index * 0.005;
        this.amplitude = 30 + index * 10;
        this.frequency = 0.005 - index * 0.001;
        this.opacity = 0.03 + index * 0.01;
        this.hue = 200 + index * 20;
    }

    draw(time) {
        backgroundCtx.strokeStyle = `hsla(${this.hue}, 80%, 50%, ${this.opacity})`;
        backgroundCtx.lineWidth = 1.5;
        backgroundCtx.beginPath();

        for (let x = 0; x < bgWidth; x += 5) {
            const y = bgHeight / 2 +
                Math.sin(x * this.frequency + time * this.speed + this.offset) * this.amplitude +
                Math.sin(x * this.frequency * 2 + time * this.speed * 1.5) * (this.amplitude / 2);

            if (x === 0) {
                backgroundCtx.moveTo(x, y);
            } else {
                backgroundCtx.lineTo(x, y);
            }
        }
        backgroundCtx.stroke();
    }
}

// Hexagon grid system
class BackgroundHexGrid {
    constructor() {
        this.hexagons = [];
        this.createGrid();
    }

    createGrid() {
        this.hexagons = [];
        const size = 80;
        const cols = Math.ceil(bgWidth / (size * 1.5)) + 2;
        const rows = Math.ceil(bgHeight / (size * Math.sqrt(3))) + 2;

        for (let row = -1; row < rows; row++) {
            for (let col = -1; col < cols; col++) {
                const x = col * size * 1.5;
                const y = row * size * Math.sqrt(3) + (col % 2 === 1 ? size * Math.sqrt(3) / 2 : 0);
                this.hexagons.push({
                    x,
                    y,
                    size,
                    opacity: Math.random() * 0.05 + 0.01,
                    pulse: Math.random() * Math.PI * 2,
                    pulseSpeed: Math.random() * 0.01 + 0.005,
                    hue: Math.random() * 60 + 180
                });
            }
        }
    }

    update() {
        this.hexagons.forEach(hex => {
            hex.pulse += hex.pulseSpeed;
        });
    }

    draw() {
        this.hexagons.forEach(hex => {
            const opacity = hex.opacity * (0.5 + Math.sin(hex.pulse) * 0.5);
            backgroundCtx.strokeStyle = `hsla(${hex.hue}, 70%, 50%, ${opacity})`;
            backgroundCtx.lineWidth = 1;
            backgroundCtx.beginPath();

            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const x = hex.x + hex.size * Math.cos(angle);
                const y = hex.y + hex.size * Math.sin(angle);

                if (i === 0) {
                    backgroundCtx.moveTo(x, y);
                } else {
                    backgroundCtx.lineTo(x, y);
                }
            }
            backgroundCtx.closePath();
            backgroundCtx.stroke();
        });
    }
}

// Initialize systems
let bgParticles = [];
let bgRainDrops = [];
let bgWaves = [];
let bgHexGrid = new BackgroundHexGrid();

function initBgParticles() {
    bgParticles = [];
    const particleCount = Math.min(150, Math.floor((bgWidth * bgHeight) / 10000));
    for (let i = 0; i < particleCount; i++) {
        bgParticles.push(new BackgroundParticle());
    }
}

function initBgRainDrops() {
    bgRainDrops = [];
    const rainCount = Math.min(50, Math.floor(bgWidth / 30));
    for (let i = 0; i < rainCount; i++) {
        bgRainDrops.push(new BackgroundRain());
    }
}

function initBgWaves() {
    bgWaves = [];
    for (let i = 0; i < 3; i++) {
        bgWaves.push(new BackgroundWave(i));
    }
}

initBgParticles();
initBgRainDrops();
initBgWaves();

// Animation loop
let bgTime = 0;

function animateBackground() {
    // Create trails effect
    backgroundCtx.fillStyle = 'rgba(10, 10, 15, 0.15)';
    backgroundCtx.fillRect(0, 0, bgWidth, bgHeight);

    bgTime += 1;

    // Draw hexagon grid
    bgHexGrid.update();
    bgHexGrid.draw();

    // Draw waves
    bgWaves.forEach(wave => wave.draw(bgTime));

    // Draw rain
    bgRainDrops.forEach(drop => {
        drop.update();
        drop.draw();
    });

    // Update and draw particles
    bgParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connection lines between nearby particles
    for (let i = 0; i < bgParticles.length; i++) {
        for (let j = i + 1; j < bgParticles.length; j++) {
            const dx = bgParticles[i].x - bgParticles[j].x;
            const dy = bgParticles[i].y - bgParticles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const line = new BackgroundConnection(bgParticles[i], bgParticles[j], distance);
                line.draw();
            }
        }
    }

    // Add random energy bursts
    if (Math.random() < 0.01) {
        const x = Math.random() * bgWidth;
        const y = Math.random() * bgHeight;
        const gradient = backgroundCtx.createRadialGradient(x, y, 0, x, y, 100);
        gradient.addColorStop(0, 'hsla(180, 100%, 60%, 0.1)');
        gradient.addColorStop(1, 'transparent');
        backgroundCtx.fillStyle = gradient;
        backgroundCtx.fillRect(0, 0, bgWidth, bgHeight);
    }

    requestAnimationFrame(animateBackground);
}

animateBackground();

// const bgCanvas = document.getElementById("canvas");
// const bgCtx = bgCanvas.getContext("2d");

// let bgWidth, bgHeight;

// function resizeBgCanvas() {
//     const dpr = window.devicePixelRatio || 1;
//     bgWidth = window.innerWidth;
//     bgHeight = window.innerHeight;

//     bgCanvas.width = bgWidth * dpr;
//     bgCanvas.height = bgHeight * dpr;
//     bgCanvas.style.width = bgWidth + "px";
//     bgCanvas.style.height = bgHeight + "px";

//     bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
// }

// window.addEventListener("resize", resizeBgCanvas);
// resizeBgCanvas();

// /* ===== PARTICLES ===== */
// class BgParticle {
//     constructor() {
//         this.reset();
//     }

//     reset() {
//         this.x = Math.random() * bgWidth;
//         this.y = Math.random() * bgHeight;
//         this.vx = (Math.random() - 0.5) * 0.4;
//         this.vy = (Math.random() - 0.5) * 0.4;
//         this.radius = Math.random() * 2 + 0.5;
//         this.hue = Math.random() * 60 + 180;
//     }

//     update() {
//         this.x += this.vx;
//         this.y += this.vy;

//         if (this.x < 0) this.x = bgWidth;
//         if (this.x > bgWidth) this.x = 0;
//         if (this.y < 0) this.y = bgHeight;
//         if (this.y > bgHeight) this.y = 0;
//     }

//     draw() {
//         const g = bgCtx.createRadialGradient(
//             this.x, this.y, 0,
//             this.x, this.y, 15
//         );
//         g.addColorStop(0, `hsla(${this.hue},100%,60%,0.6)`);
//         g.addColorStop(1, "transparent");

//         bgCtx.fillStyle = g;
//         bgCtx.beginPath();
//         bgCtx.arc(this.x, this.y, 15, 0, Math.PI * 2);
//         bgCtx.fill();
//     }
// }

// /* ===== INIT ===== */
// const bgParticles = [];
// for (let i = 0; i < 120; i++) {
//     bgParticles.push(new BgParticle());
// }

// /* ===== ANIMATION LOOP ===== */
// function animateBackground() {
//     bgCtx.fillStyle = "rgba(10,10,15,0.15)";
//     bgCtx.fillRect(0, 0, bgWidth, bgHeight);

//     bgParticles.forEach(p => {
//         p.update();
//         p.draw();
//     });

//     for (let i = 0; i < bgParticles.length; i++) {
//         for (let j = i + 1; j < bgParticles.length; j++) {
//             const dx = bgParticles[i].x - bgParticles[j].x;
//             const dy = bgParticles[i].y - bgParticles[j].y;
//             const distSq = dx * dx + dy * dy;

//             if (distSq < 150 * 150) {
//                 bgCtx.strokeStyle = "rgba(0,200,255,0.15)";
//                 bgCtx.lineWidth = 0.5;
//                 bgCtx.beginPath();
//                 bgCtx.moveTo(bgParticles[i].x, bgParticles[i].y);
//                 bgCtx.lineTo(bgParticles[j].x, bgParticles[j].y);
//                 bgCtx.stroke();
//             }
//         }
//     }

//     requestAnimationFrame(animateBackground);
// }

// animateBackground();