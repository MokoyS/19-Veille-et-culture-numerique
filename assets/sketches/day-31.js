/* JAN.31 — GLSL day. Every pixel computed on the GPU by a hand-written fragment shader. */
window.GENUARY_SKETCHES = window.GENUARY_SKETCHES || {};
window.GENUARY_SKETCHES["day-31"] = function (p) {
  var W = 560, H = 560, shader;

  var vert = "attribute vec3 aPosition;\n" +
    "void main(){\n" +
    "  vec4 pos = vec4(aPosition, 1.0);\n" +
    "  pos.xy = pos.xy * 2.0 - 1.0;\n" +
    "  gl_Position = pos;\n" +
    "}";

  var frag = "precision mediump float;\n" +
    "uniform vec2 uRes;\n" +
    "uniform float uTime;\n" +
    "uniform vec3 uColor;\n" +
    "void main(){\n" +
    "  vec2 uv = gl_FragCoord.xy / uRes.xy;\n" +
    "  float v = sin(uv.x*10.0+uTime) + sin(uv.y*10.0+uTime*1.3) + sin((uv.x+uv.y)*10.0+uTime*0.7);\n" +
    "  v += sin(distance(uv, vec2(0.5)) * 20.0 - uTime*2.0);\n" +
    "  v = v*0.25 + 0.5;\n" +
    "  vec3 base = vec3(0.04,0.04,0.05);\n" +
    "  vec3 col = mix(base, uColor, clamp(v,0.0,1.0));\n" +
    "  gl_FragColor = vec4(col,1.0);\n" +
    "}";

  p.setup = function () {
    p.createCanvas(W, H, p.WEBGL);
    shader = p.createShader(vert, frag);
  };

  p.draw = function () {
    p.shader(shader);
    var c = p.color(p.myColor);
    shader.setUniform('uRes', [W, H]);
    shader.setUniform('uTime', p.millis() / 1000);
    shader.setUniform('uColor', [p.red(c) / 255, p.green(c) / 255, p.blue(c) / 255]);
    p.noStroke();
    p.rect(-W / 2, -H / 2, W, H);
  };
};
