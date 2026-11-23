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

    // 同源代理：由本地 server.js 调用翻译服务，密钥保存在服务端
    fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text,
        source: srcSel.value,
        target: tgtSel.value
      })
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        if (!result.ok || !result.data || !result.data.text) {
          throw new Error((result.data && result.data.error) || "翻译失败");
        }
        output.textContent = result.data.text.trim();
      })
      .catch(function (err) {
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
