// All rights reserved authors https://telegra.ph/07-05authors
// Strange.js no copyright ® 2021.08.07  registered
// version 1.0 by www.instagram.com/qosimov_rahmatullo
if (window === undefined) {
  console.log("Strangejs requires window and document");
} {
  function err(error_name, error_count) {
    return `Uncaught TypeError: Failed to execute ${error_name} on document: ${error_count} arguments required`;
  }

  function $(a, b) {
    var elem = document.querySelectorAll(a)[b];
    if (a !== undefined && b !== undefined) {
      return elem;
    } else if (a !== undefined && b == undefined) {
      return document.querySelector(a);
    } else {
      console.error(err("$", 2));
    }
  }

  function arrayContains(arr, val) {
    return arr.some(function (a) {
      return a === val;
    });
  }

  function getUnit(val) {
    var split =
      /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
        val
      );
    if (split) {
      return split[1];
    }
  }

  function convertPxToUnit(el, value, unit) {
    var valueUnit = getUnit(value);
    if (arrayContains([unit, "deg", "rad", "turn"], valueUnit)) {
      return value;
    }
    var cached = cache.CSS[value + unit];
    if (!is.und(cached)) {
      return cached;
    }
    var baseline = 100;
    var tempEl = document.createElement(el.tagName);
    var parentEl =
      el.parentNode && el.parentNode !== document ?
      el.parentNode :
      document.body;
    parentEl.appendChild(tempEl);
    tempEl.style.position = "absolute";
    tempEl.style.width = baseline + unit;
    var factor = baseline / tempEl.offsetWidth;
    parentEl.removeChild(tempEl);
    var convertedUnit = factor * parseFloat(value);
    cache.CSS[value + unit] = convertedUnit;
    return convertedUnit;
  }

  function rgba(r, g, b, a) {
    var rgba = `rgba(${r},${g},${b},${a})`;
    if (r == undefined || g == undefined || b == undefined || a == undefined) {
      console.error(err("rgba", 4));
    } else if (a > 1) {
      console.error("alpha must be less than 1");
    } else {
      return rgba;
    }
  }

  function hexTorgba(hexValue) {
    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var hex = hexValue.replace(rgx, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(rgb[1], 16);
    var g = parseInt(rgb[2], 16);
    var b = parseInt(rgb[3], 16);
    return "rgba(" + r + "," + g + "," + b + ",1)";
  }

  function hslToRgba(hslValue) {
    var hsl =
      /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) ||
      /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
    var h = parseInt(hsl[1], 10) / 360;
    var s = parseInt(hsl[2], 10) / 100;
    var l = parseInt(hsl[3], 10) / 100;
    var a = hsl[4] || 1;

    function hue2rgb(p, q, t) {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    }
    var r, g, b;
    if (s == 0) {
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return "rgba(" + r * 255 + "," + g * 255 + "," + b * 255 + "," + a + ")";
  }

  function len(a) {
    if (
      this instanceof HTMLInputElement ||
      this instanceof HTMLTextAreaElement
    ) {
      return this.value.length;
    } else {
      return this.length;
    }
  }
  window.onload = function () {
    var comment = document.createComment("Code injected by Strange");
    document.body.appendChild(comment);
  };

  function setVariable() {
    var string = document.documentElement.innerHTML;
    var length = string.length;
    var regex = new RegExp(
      "[\\s\\r\\t\\n]*([a-z0-9\\-_]+)[\\s\\r\\t\\n]*=[\\s\\r\\t\\n]*(['\"])((?:\\\\\\2|(?!\\2).)*)\\2",
      "gi"
    );
    var attributes = {};
    while ((match = regex.exec(string))) {
      attributes[match[1]] += match[3] + ",";
    }
    if (attributes.id) {
      var id = attributes.id;
      id = id.replace("undefined", "");
      id = id.split(",");
      id = id.filter((m) => m);
      for (let s = 0; s < id.length; s++) {
        window[`$${id[s]}`] = document.querySelector(`#${id[s]}`);
        window[`$${id[s]}s`] = document.querySelectorAll(`#${id[s]}`);
      }
    }
    if (attributes.class) {
      var className = attributes.class;
      className = className.replace("undefined", "");
      className = className.split(",");
      className = className.filter((f) => f);
      for (let c = 0; c < className.length; c++) {
        window[`$_${className[c]}`] = document.querySelector(
          `.${className[c]}`
        );
        window[`$_${className[c]}s`] = document.querySelectorAll(
          `.${className[c]}`
        );
      }
    }
  }
  setVariable();

  var is = {
    arr: function (a) {
      return Array.isArray(a);
    },
    obj: function (a) {
      return a.constructor.toString().indexOf("Object") > -1;
    },
    pth: function (a) {
      return is.obj(a) && a.hasOwnProperty("totalLength");
    },
    svg: function (a) {
      return a instanceof SVGElement;
    },
    inp: function (a) {
      return a instanceof HTMLInputElement;
    },
    dom: function (a) {
      return a.nodeType || is.svg(a);
    },
    str: function (a) {
      return typeof a === "string";
    },
    num: function (a) {
      return typeof a === "number";
    },
    fnc: function (a) {
      return typeof a === "function";
    },
    und: function (a) {
      return typeof a === "undefined";
    },
    nil: function (a) {
      return is.und(a) || a === null;
    },
    hex: function (a) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
    },
    rgb: function (a) {
      return /^rgb/.test(a);
    },
    hsl: function (a) {
      return /^hsl/.test(a);
    },
    col: function (a) {
      return is.hex(a) || is.rgb(a) || is.hsl(a);
    },
    key: function (a) {
      return (
        !defaultInstanceSettings.hasOwnProperty(a) &&
        !defaultTweenSettings.hasOwnProperty(a) &&
        a !== "targets" &&
        a !== "keyframes"
      );
    },
    email: function (a) {
      return /[a-z0-9][@][a-z0-9].[a-z]/.test(a);
    },
  };

  function floor(a) {
    if (a !== undefined) {
      return Math.floor(a);
    } else {
      console.error(err("floor", 1));
    }
  }

  function round(i) {
    if (i !== undefined) {
      return Math.round(i);
    } else {
      console.error(err("round", 1));
    }
  }

  function ceil(x) {
    if (x !== undefined) {
      return Math.ceil(x);
    } else {
      console.error(err("ceil", 1));
    }
  }

  function log(a) {
    if (a !== undefined) {
      console.log(a);
    } else {
      console.error(err("log", 1));
    }
  }

  function pow(a, b) {
    if (a !== undefined && b !== undefined) {
      return Math.pow(a, b);
    } else if (a !== undefined || b !== undefined) {
      console.error(err("pow", 2));
    } else {
      return false || undefined || null;
    }
  }

  function random(max, min) {
    if (max == undefined && min == undefined) {
      console.error(err("random", 1));
    } else if (min == undefined && max !== undefined) {
      return Math.random() * max;
    } else {
      return Math.random() * (max - min + 1) + min;
    }
  }

  function log(x) {
    console.log(x);
  }

  function error(a) {
    console.error(a);
  }

  function warn(s) {
    console.warn(s);
  }

  function kns(s) {
    c = "";
    for (as of s) {
      c += as;
    }
    return c;
  }
  HTMLElement.prototype.css = function css(s, v = 0) {
    if (s && v) {
      this.style[s] = v;
    } else if (s.constructor.toString().indexOf("Object") > -1) {
      for (i in s) {
        this.style[i] = s[i];
      }
    } else if (s && v == 0) {
      st = window.getComputedStyle(this);
      return st[s];
    } else {
      console.error(err("css", "1"));
    }
  };
  HTMLElement.prototype.add = function add(className) {
    if (this !== null && className !== undefined) {
      this.classList.add(className);
    } else {
      console.error(err("add", 2));
    }
  };
  HTMLElement.prototype.remov = function remove(className) {
    if (this !== null && className !== undefined) {
      this.classList.remove(className);
    } else {
      console.error(err("remove", 2));
    }
  };
  HTMLElement.prototype.toggle = function toggle(className) {
    if (this !== null && className !== undefined) {
      this.classList.toggle(className);
    } else {
      console.error(err("toggle", "2"));
    }
  };
  HTMLElement.prototype.len = len;
  HTMLElement.prototype.attr = function attr(attr) {
    for (a in attr) {
      this.setAttribute(a, attr[a]);
    }
  };
  HTMLElement.prototype.width = function () {
    return this.getBoundingClientRect().width;
  };
  HTMLElement.prototype.width = function () {
    return this.getBoundingClientRect().height;
  };
  HTMLElement.prototype.replace = function replace(tg) {
    this.innerHTML = this.textContent.replace(/[a-zA-z]/g, `<${tg}>$&</${tg}>`);
  };
  HTMLElement.prototype.on = function (op, cx) {
    try {
      if (is.fnc(op.click)) {
        this.onclick = op.click;
      }
      if (is.fnc(op.keyup)) {
        this.onkeyup = op.keyup;
      }
      if (is.fnc(op.keydown)) {
        this.onkeydown = op.keydown;
      }
      if (is.fnc(op.mousemove)) {
        this.onmousemove = op.mousemove;
      }
      if (is.fnc(op.mousedown)) {
        this.onmousedown = op.mousedown;
      }
      if (is.fnc(op.mouseup)) {
        this.onmouseup = op.mouseup;
      }
      if (is.fnc(op.input)) {
        this.oninput = op.input;
      }
      if (is.fnc(op.change)) {
        this.onchange = op.change;
      }
      if (is.fnc(op.contextmenu)) {
        this.oncontextmenu = op.contextmenu;
      }
      if (is.fnc(op.mouseenter)) {
        this.onmouseenter = op.mouseenter;
      }
      if (is.fnc(op.mouseleave)) {
        this.onmouseleave = op.mouseleave;
      }
      if (is.fnc(op.keypress)) {
        this.onkeypress = op.keypress;
      }
      if (is.fnc(op.load)) {
        this.onload = op.keypress;
      }
      if (is.str(op)) {
        this[`on${op}`] = cx;
      }
      if (is.arr(op)) {
        var b = "";
        for (i = 0; i < op.length; i++) {
          b += op[i].replace(op[i], `on${op[i]}`) + ",";
        }
        ls = b.split(",");
        ls.pop();
        for (var c = 0; c < ls.length; c++) {
          this[ls[c]] = cx;
        }
      } else if (is.num(op) || is.num(cx) || is.str(cx) || is.arr(cx)) {
        error(
          "First argument should be event and second one must be function "
        );
      }
      if (this == null || op == undefined) {
        warn(
          "Cannot use events for null elements. DOM Error Not Found Element"
        );
      }
    } catch (e) {}
  };
  //   function createApp(app, el) {
  //     if (is.obj(app)) {
  //       if ($(`${el}`) instanceof HTMLElement) {
  //         let template = $(`${el}`).html();
  //         let result = template.replace(
  //           /\{\{[ ]{0,}([\w\_-]{1,})[ ]{0,}\}\}/gi,
  //           function (...match) {
  //             return typeof app[match[1]] !== "undefined" ? app[match[1]] : "";
  //           }
  //         );
  //         $(`${el}`).innerHTML = result;
  //       } else {
  //         warn("Your second argument is not type of html element");
  //       }
  //     } else {
  //       error("Your data must be Object");
  //     }
  //   }
  function createApp(app, el) {
    if (is.obj(app)) {
      if ($(`${el}`) instanceof HTMLElement) {
        let template = $(`${el}`).html();
        let result = template.replace(
          /\{\{[ ]{0,}([a-zA-Z0-9.]{1,})[ ]{0,}\}\}/gi,
          function (...match) {
            match = (match[1].split('.'));
            res = ''
            if (match.length == 1) {
              res = match[0];
              return app[res]
            } else {
              for (let me = 0; me < match.length; me++) {
                res += `${match[me]}` + ','
              }
              let stage = res.split(',');
              if (stage.length == 3) {
                return (app[stage[0]][stage[1]])
              }
              if (stage.length == 4) {
                return (app[stage[0]][stage[1]][stage[2]])
              }
              if (stage.length == 5) {
                return (app[stage[0]][stage[1]][stage[2]][stage[3]])
              }
            }
          }
        );
        $(`${el}`).innerHTML = result;
      } else {
        warn("Your second argument is not type of html element");
      }
    } else {
      error("Your data must be Object");
    }
  }
  Array.prototype.mix = function () {
    let currentIndex = this.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this[currentIndex], this[randomIndex]] = [
        this[randomIndex],
        this[currentIndex],
      ];
    }
    return this;
  };
  HTMLInputElement.prototype.readFile = function readFile() {
    /*readOnly*/
    if (this instanceof HTMLInputElement && /file/i.test(this.type)) {
      try {
        r = new FileReader();
        f = this.files[0];
        r.readAsText(f);
        r.onload = function () {
          console.log(r.result);
        };
        r.onerror = function () {
          console.log("Error");
        };
        return r;
      } catch (e) {
        warn("In first You have to choose at least one file");
      }
    } else if (!(this instanceof HTMLInputElement)) {
      console.warn("Element Must be input  element");
    } else if (/file/i.test(this.type)) {
      console.warn(`Input's type must be 'file'`);
    } else {
      console.warn(
        `Element must be Input Element and it's type must be 'file'`
      );
    }
  };
  HTMLInputElement.prototype.len = len;
  HTMLElement.prototype.html = function html(html, o) {
    if (html && !o) {
      this.innerHTML = html;
    } else if (o) {
      this.innerHTML += html;
    } else return this.innerHTML;
  };
  HTMLElement.prototype.text = function text(text, o) {
    if (text && !o) {
      this.innerText = text;
    } else if (o) {
      this.innerText += text;
    } else {
      return this.innerText;
    }
  };
  HTMLElement.prototype.backdelete = function backdelete() {
    if (
      this instanceof HTMLInputElement ||
      this instanceof HTMLTextAreaElement
    ) {
      this.value = this.value.slice(0, this.value.length - 1);
    } else {
      this.innerText = this.textContent.slice(0, this.textContent.length - 1);
    }
  };
  HTMLElement.prototype.frontdelete = function frontdelete() {
    if (
      this instanceof HTMLInputElement ||
      this instanceof HTMLTextAreaElement
    ) {
      this.value = this.value.slice(
        this.value.length - this.value.length + 1,
        this.value.length
      );
    } else {
      this.innerText = this.textContent.slice(
        this.textContent.length - this.textContent.length + 1,
        this.textContent.length
      );
    }
  };

  Window.prototype.on = function event(op, cx) {
    if (is.fnc(op.click)) {
      this.onclick = op.click;
    }
    if (is.fnc(op.keyup)) {
      this.onkeyup = op.keyup;
    }
    if (is.fnc(op.keydown)) {
      this.onkeydown = op.keydown;
    }
    if (is.fnc(op.mousemove)) {
      this.onmousemove = op.mousemove;
    }
    if (is.fnc(op.mousedown)) {
      this.onmousedown = op.mousedown;
    }
    if (is.fnc(op.mouseup)) {
      this.onmouseup = op.mouseup;
    }
    if (is.fnc(op.input)) {
      this.oninput = op.input;
    }
    if (is.fnc(op.change)) {
      this.onchange = op.change;
    }
    if (is.fnc(op.contextmenu)) {
      this.oncontextmenu = op.contextmenu;
    }
    if (is.str(op)) {
      this[`on${op}`] = cx;
    }
    if (is.arr(op)) {
      var b = "";
      for (i = 0; i < op.length; i++) {
        b += op[i].replace(op[i], `on${op[i]}`) + ",";
      }
      ls = b.split(",");
      ls.pop();
      for (var c = 0; c < ls.length; c++) {
        this[ls[c]] = cx;
      }
    } else if (
      is.num(op) ||
      is.num(cx) ||
      is.str(cx) ||
      is.arr(cx) ||
      is.obj(cx)
    ) {
      error("First argument should be event and second one must be function ");
    }
    if (this == null || op == undefined) {
      console.error(err("event", 2));
    }
  };
  Array.prototype.len = len;
  String.prototype.mix = function mix(n) {
    c = "";
    for (as of this) {
      c += as;
    }
    chars = c;
    if (n) {
      var passWordLength = n;
    } else passWordLength = c.length;
    var b = "";
    for (var i = 0; i < passWordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      b += chars.substring(randomNumber, randomNumber - 1);
    }
    if (b.length < n) {
      f = n - b.length;
      for (r = 0; r < f; r++) {
        b += c.charAt(Math.round(Math.random() * n.length - 1));
      }
      return b;
    } else {
      return b;
    }
  };
  if (window.hasOwnProperty('$rippleBtns')) {
    $rippleBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        btn.css({
          overflow: 'hidden'
        })
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;

        let ripples = document.createElement('span');
        ripples.add('ripple')
        ripples.css({
          top: y + 'px',
          left: x + 'px'
        })
        btn.appendChild(ripples);
        setTimeout(function () {
          ripples.remove()
        }, 500)
      })
    })
  }
  String.prototype.reverse = function () {
    return kns(this).split("").reverse().join("");
  };
  Object.prototype.templ = function (safe = false) {
    var temp = this;
    if (safe) {
      customElements.define(
        temp.name,
        class extends HTMLElement {
          connectedCallback() {
            const shadow = this.attachShadow({
              mode: "closed",
            });
            shadow.innerHTML = temp.template;
          }
        }
      );
    } else {
      customElements.define(
        temp.name,
        class extends HTMLElement {
          connectedCallback() {
            const shadow = this;
            shadow.innerHTML = temp.template;
          }
        }
      );
    }
  };
}
console.log('Hello world')