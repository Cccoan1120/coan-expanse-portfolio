import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const fragmentShader = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 a0 = x - floor(x + 0.5);
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float starField(vec2 fragCoord, float cellSize, float threshold, float intensity) {
  vec2 cell = floor(fragCoord / cellSize);
  vec2 local = fract(fragCoord / cellSize);
  float presence = step(threshold, hash(cell + 17.31));
  vec2 position = vec2(hash(cell + 2.17), hash(cell + 8.73));
  float luminosity = pow(hash(cell + 31.47), 2.4);
  float distanceToStar = length((local - position) * cellSize);
  float radius = mix(0.24, 0.72, luminosity);
  float core = 1.0 - smoothstep(radius, radius + 0.75, distanceToStar);
  float halo = exp(-distanceToStar * distanceToStar / mix(1.4, 4.8, luminosity)) * luminosity * 0.07;
  float pulse = mix(0.72, 1.0, 0.5 + 0.5 * sin(u_time * mix(0.7, 1.8, luminosity) + hash(cell + 4.2) * 6.2831));
  return presence * (core * mix(0.26, intensity, luminosity) + halo) * pulse;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
  vec2 mouse = (u_mouse / u_resolution - 0.5) * 2.0;
  uv += mouse * 0.018;
  vec3 color = vec3(0.018, 0.022, 0.055);
  float n1 = snoise(uv * 0.72 + vec2(u_time * 0.018, -u_time * 0.012));
  float n2 = snoise(uv * 1.36 - vec2(u_time * 0.014, u_time * 0.02));
  float n3 = snoise(uv * 2.1 + vec2(-u_time * 0.01, u_time * 0.016));
  color += vec3(0.07, 0.12, 0.33) * smoothstep(0.04, 0.92, n1) * 0.72;
  color += vec3(0.24, 0.10, 0.44) * smoothstep(0.18, 0.88, n2) * 0.48;
  color += vec3(0.08, 0.22, 0.40) * smoothstep(0.32, 0.86, n3) * 0.22;
  vec2 dustDrift = vec2(u_time * 3.2, u_time * 1.15);
  vec2 fineDrift = vec2(u_time * 1.7, u_time * 0.55);
  vec2 brightDrift = vec2(-u_time * 0.72, u_time * 0.36);
  float dustStars = starField(gl_FragCoord.xy + dustDrift, 24.0, 0.82, 0.42);
  float fineStars = starField(gl_FragCoord.xy + fineDrift, 42.0, 0.73, 0.72);
  float brightStars = starField(gl_FragCoord.xy + vec2(19.0) + brightDrift, 104.0, 0.9, 1.0);
  color += vec3(0.45, 0.58, 0.95) * dustStars;
  color += vec3(0.67, 0.76, 1.0) * fineStars;
  color += vec3(0.96, 0.94, 1.0) * brightStars;
  color *= (1.18 - length(uv) * 0.5);
  gl_FragColor = vec4(color, 1.0);
}`;

export function ObservatoryShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) {
      canvas.dataset.webgl = "fallback";
      return;
    }
    canvas.dataset.webgl = "active";
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      canvas.dataset.webgl = "fallback";
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.dataset.webgl = "fallback";
      return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    const pointer = { x: 0, y: 0 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    canvas.dataset.motion = reducedMotion ? "static" : "animated";
    let frame = 0;
    let visible = !document.hidden;

    const resize = () => {
      const ratio = window.innerWidth < 768 ? 0.85 : Math.min(window.devicePixelRatio || 1, 1.1);
      const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      if (!pointer.x) {
        pointer.x = width / 2;
        pointer.y = height / 2;
      }
    };
    const draw = (time: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const render = (time: number) => {
      draw(time);
      if (visible && !reducedMotion) frame = window.requestAnimationFrame(render);
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * canvas.width;
      pointer.y = (1 - (event.clientY - rect.top) / rect.height) * canvas.height;
    };
    const onVisibilityChange = () => {
      visible = !document.hidden;
      window.cancelAnimationFrame(frame);
      if (visible && !reducedMotion) frame = window.requestAnimationFrame(render);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    draw(0);
    const startTimer = reducedMotion ? 0 : window.setTimeout(() => {
      frame = window.requestAnimationFrame(render);
    }, 700);
    return () => {
      window.clearTimeout(startTimer);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      if (buffer) gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas className="observatory-shader" ref={canvasRef} data-background="starfield" aria-hidden="true" />;
}
