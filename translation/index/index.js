(function () {
  "use strict";

  // 背景气泡
  var bubbleLayer = document.getElementById("bubbles");
  for (var i = 0; i < 12; i++) {
    var size = 40 + Math.random() * 110;
    var duration = 18 + Math.random() * 16;
    var bubble = document.createElement("span");
    bubble.className = "bubble";
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.animationDuration = duration + "s";
    bubble.style.animationDelay = -(Math.random() * duration) + "s";
    bubbleLayer.appendChild(bubble);
  }

  var LANGS = [
    { value: "zh-CN", name: "中文" },
    { value: "en", name: "英语" },
    { value: "ja", name: "日语" },
    { value: "fr", name: "法语" },
    { value: "es", name: "西班牙语" },
    { value: "de", name: "德语" }
  ];

  var srcSel = document.getElementById("src-lang");
  var tgtSel = document.getElementById("tgt-lang");
  var input = document.getElementById("input");
  var output = document.getElementById("output");
  var charCount = document.getElementById("char-count");
  var copyBtn = document.getElementById("copy");
  var swapBtn = document.getElementById("swap");
  var translateBtn = document.getElementById("translateBtn");

  function fillSelect(sel, selected) {
    LANGS.forEach(function (lang) {
      var opt = document.createElement("option");
      opt.value = lang.value;
      opt.textContent = lang.name;
      opt.selected = lang.value === selected;
      sel.appendChild(opt);
    });
  }

  fillSelect(srcSel, "zh-CN");
  fillSelect(tgtSel, "en");

  function updateCount() {
    charCount.textContent = input.value.trim().length;
  }

  function langName(value) {
    for (var i = 0; i < LANGS.length; i++) {
      if (LANGS[i].value === value) return LANGS[i].name;
    }
    return value;
  }

  function renderOutput() {
    var text = input.value;
    updateCount();
    output.innerHTML = "";

    if (!text.trim()) {
      var empty = document.createElement("span");
      empty.className = "empty";
      empty.textContent = "译文将显示在这里";
      output.appendChild(empty);
      return;
    }

    // 源语言与目标语言一致时直接显示原文
    if (srcSel.value === tgtSel.value) {
      output.textContent = text;
    }
  }

  function translate() {
    var text = input.value;
    renderOutput();
    console.log("成功点击");
    console.log("用户输入内容：", text);

    if (!text.trim()) return;

    output.innerHTML = "";
    var loading = document.createElement("span");
    loading.className = "empty";
    loading.textContent = "正在翻译…";
    output.appendChild(loading);

    // 同源代理：由本地 server.js 把 /api/chat 转发给 Ollama
    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen3.5:9b",
        stream: false,
        messages: [
          {
            role: "system",
            content: `你是一个专业的翻译，只返回最简单的翻译内容，将${langName(srcSel.value)}翻译成${langName(tgtSel.value)}`
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    })
      .then(function (res) {
        return res.json();
      })
      .then( (data) => {
        console.log(data);
        var result = data && data.message && data.message.content;
        if (!result) throw new Error("模型没有返回内容");
        output.textContent = result.trim();
      })
      .catch( (err) => {
        output.textContent = "翻译失败：" + err.message;
        console.error(err);
      });
  }

  input.addEventListener("input", updateCount);
  srcSel.addEventListener("change", renderOutput);
  tgtSel.addEventListener("change", renderOutput);
  translateBtn.addEventListener("click", translate);

  // Ctrl/Cmd + Enter 快捷翻译
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      translate();
    }
  });

  // 交换源语言和目标语言
  swapBtn.addEventListener("click", function () {
    var translated = input.value.trim() ? output.textContent : "";
    var previousSrc = srcSel.value;
    srcSel.value = tgtSel.value;
    tgtSel.value = previousSrc;
    input.value = translated || input.value;
    renderOutput();
  });

  copyBtn.addEventListener("click", function () {
    var text = output.textContent;
    if (!text || text === "译文将显示在这里") return;
    if (!navigator.clipboard || !navigator.clipboard.writeText) return;

    navigator.clipboard.writeText(text).then(function () {
      copyBtn.textContent = "已复制";
      setTimeout(function () {
        copyBtn.textContent = "复制";
      }, 1500);
    }, function () {});
  });

  renderOutput();
})();
