'use client';

import React, { FC, useRef, useEffect } from 'react';
import clsx from 'clsx';

import styles from './Flame.module.css';
import {type} from "node:os";

interface IFlameProps {
  className?: string;
}

const Flame:FC<IFlameProps> = ({ className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    //   canvas.width = canvas.clientWidth;
    //   canvas.height = canvas.clientHeight;

    let config = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 0.97,
      VELOCITY_DISSIPATION: 0.98,
      PRESSURE_DISSIPATION: 0.8,
      PRESSURE_ITERATIONS: 20,
      CURL: 30,
      SPLAT_RADIUS: 0.5,
      SHADING: true,
      COLORFUL: true,
      PAUSED: false,
      BACK_COLOR: { r: 12, g: 12, b: 12 },
      TRANSPARENT: false,
      BLOOM: true,
      BLOOM_ITERATIONS: 8,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: 0.8,
      BLOOM_THRESHOLD: 0.6,
      BLOOM_SOFT_KNEE: 0.7,
    };
    function pointerPrototype() {
      // @ts-ignore
      this.id = -1; // @ts-ignore
      this.x = 0; // @ts-ignore
      this.y = 0; // @ts-ignore
      this.dx = 0; // @ts-ignore
      this.dy = 0; // @ts-ignore
      this.down = true; // @ts-ignore
      this.moved = false; // @ts-ignore
      this.color = [30, 30, 30]; // @ts-ignore
    }
// @ts-ignore
    let pointers = [];
    // @ts-ignore
    let splatStack = [];// @ts-ignore
    let bloomFramebuffers = [];// @ts-ignore
    pointers.push(new pointerPrototype());// @ts-ignore

    const { gl, ext } = getWebGLContext(canvas);

    if (isMobile()) config.SHADING = false;
    if (!ext.supportLinearFiltering) {
      config.SHADING = false;
      config.BLOOM = false;
    }
// @ts-ignore
    function getWebGLContext(canvas) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };

      let gl = canvas.getContext('webgl2', params);
      const isWebGL2 = !!gl;
      if (!isWebGL2)
        gl =
          canvas.getContext('webgl', params) ||
          canvas.getContext('experimental-webgl', params);

      let halfFloat;
      let supportLinearFiltering;
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
      let formatRGBA;
      let formatRG;
      let formatR;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      };
    }
// @ts-ignore
    function getSupportedFormat(gl, internalFormat, format, type) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F:
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }

      return {
        internalFormat,
        format,
      };
    }
// @ts-ignore
    function supportRenderTextureFormat(gl, internalFormat, format, type) {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

      let fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );

      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      if (status != gl.FRAMEBUFFER_COMPLETE) return false;
      return true;
    }

    function captureScreenshot() {
      colorProgram.bind();
      // @ts-ignore
      gl.uniform4f(colorProgram.uniforms.color, 0, 0, 0, 1);
      // @ts-ignore
      blit(density.write.fbo);
// @ts-ignore
      render(density.write.fbo);
      // @ts-ignore
      gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo);
// @ts-ignore
      let length = dyeWidth * dyeHeight * 4;
      let pixels = new Float32Array(length);
      // @ts-ignore
      gl.readPixels(0, 0, dyeWidth, dyeHeight, gl.RGBA, gl.FLOAT, pixels);

      let newPixels = new Uint8Array(length);

      let id = 0;
      // @ts-ignore
      for (let i = dyeHeight - 1; i >= 0; i--) {
        // @ts-ignore
        for (let j = 0; j < dyeWidth; j++) {
          // @ts-ignore
          let nid = i * dyeWidth * 4 + j * 4;
          newPixels[nid + 0] = clamp01(pixels[id + 0]) * 255;
          newPixels[nid + 1] = clamp01(pixels[id + 1]) * 255;
          newPixels[nid + 2] = clamp01(pixels[id + 2]) * 255;
          newPixels[nid + 3] = clamp01(pixels[id + 3]) * 255;
          id += 4;
        }
      }

      let captureCanvas = document.createElement('canvas');
      let ctx = captureCanvas.getContext('2d');
      // @ts-ignore
      captureCanvas.width = dyeWidth;
      // @ts-ignore
      captureCanvas.height = dyeHeight;
// @ts-ignore
      let imageData = ctx.createImageData(dyeWidth, dyeHeight);
      imageData.data.set(newPixels);
      // @ts-ignore
      ctx.putImageData(imageData, 0, 0);
      let datauri = captureCanvas.toDataURL();

      downloadURI('fluid.png', datauri);

      URL.revokeObjectURL(datauri);
    }
// @ts-ignore
    function clamp01(input) {
      return Math.min(Math.max(input, 0), 1);
    }
// @ts-ignore
    function downloadURI(filename, uri) {
      let link = document.createElement('a');
      link.download = filename;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function isMobile() {
      return /Mobi|Android/i.test(navigator.userAgent);
    }

    class GLProgram {
      // @ts-ignore
      constructor(vertexShader, fragmentShader) {
        // @ts-ignore
        this.uniforms = {};
        // @ts-ignore
        this.program = gl.createProgram();
// @ts-ignore
        gl.attachShader(this.program, vertexShader);
        // @ts-ignore
        gl.attachShader(this.program, fragmentShader);
        // @ts-ignore
        gl.linkProgram(this.program);
// @ts-ignore
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
          // @ts-ignore
          throw gl.getProgramInfoLog(this.program);

        const uniformCount = gl.getProgramParameter(
          // @ts-ignore
          this.program,
          gl.ACTIVE_UNIFORMS
        );
        for (let i = 0; i < uniformCount; i++) {
          // @ts-ignore
          const uniformName = gl.getActiveUniform(this.program, i).name;
          // @ts-ignore
          this.uniforms[uniformName] = gl.getUniformLocation(
            // @ts-ignore
            this.program,
            uniformName
          );
        }
      }

      bind() {
        // @ts-ignore
        gl.useProgram(this.program);
      }
    }
// @ts-ignore
    function compileShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw gl.getShaderInfoLog(shader);

      return shader;
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;
    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;
    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`
    );

    const colorShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    uniform vec4 color;
    void main () {
        gl_FragColor = color;
    }
`
    );

    const backgroundShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;
    #define SCALE 25.0
    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`
    );

    const displayShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    void main () {
        vec3 C = texture2D(uTexture, vUv).rgb;
        float a = max(C.r, max(C.g, C.b));
        gl_FragColor = vec4(C, a);
    }
`
    );

    const displayBloomShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    void main () {
        vec3 C = texture2D(uTexture, vUv).rgb;
        vec3 bloom = texture2D(uBloom, vUv).rgb;
        vec3 noise = texture2D(uDithering, vUv * ditherScale).rgb;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 800.0;
        bloom = pow(bloom.rgb, vec3(1.0 / 2.2));
        C += bloom;
        float a = max(C.r, max(C.g, C.b));
        gl_FragColor = vec4(C, a);
    }
`
    );

    const displayShadingShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform vec2 texelSize;
    void main () {
        vec3 L = texture2D(uTexture, vL).rgb;
        vec3 R = texture2D(uTexture, vR).rgb;
        vec3 T = texture2D(uTexture, vT).rgb;
        vec3 B = texture2D(uTexture, vB).rgb;
        vec3 C = texture2D(uTexture, vUv).rgb;
        float dx = length(R) - length(L);
        float dy = length(T) - length(B);
        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);
        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        C.rgb *= diffuse;
        float a = max(C.r, max(C.g, C.b));
        gl_FragColor = vec4(C, a);
    }
`
    );

    const displayBloomShadingShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;
    void main () {
        vec3 L = texture2D(uTexture, vL).rgb;
        vec3 R = texture2D(uTexture, vR).rgb;
        vec3 T = texture2D(uTexture, vT).rgb;
        vec3 B = texture2D(uTexture, vB).rgb;
        vec3 C = texture2D(uTexture, vUv).rgb;
        float dx = length(R) - length(L);
        float dy = length(T) - length(B);
        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);
        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        C *= diffuse;
        vec3 bloom = texture2D(uBloom, vUv).rgb;
        vec3 noise = texture2D(uDithering, vUv * ditherScale).rgb;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 800.0;
        bloom = pow(bloom.rgb, vec3(1.0 / 2.2));
        C += bloom;
        float a = max(C.r, max(C.g, C.b));
        gl_FragColor = vec4(C, a);
    }
`
    );

    const bloomPrefilterShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;
    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`
    );

    const bloomBlurShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`
    );

    const bloomFinalShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`
    );

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;
    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`
    );

    const advectionManualFilteringShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;
    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;
        vec2 iuv = floor(st);
        vec2 fuv = fract(st);
        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }
    void main () {
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        gl_FragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);
        gl_FragColor.a = 1.0;
    }
`
    );

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float dissipation;
    void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
        gl_FragColor.a = 1.0;
    }
`
    );

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`
    );

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`
    );

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;
    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
    }
`
    );

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    vec2 boundary (vec2 uv) {
        return uv;
        // uncomment if you use wrap or repeat texture mode
        // uv = min(max(uv, 0.0), 1.0);
        // return uv;
    }
    void main () {
        float L = texture2D(uPressure, boundary(vL)).x;
        float R = texture2D(uPressure, boundary(vR)).x;
        float T = texture2D(uPressure, boundary(vT)).x;
        float B = texture2D(uPressure, boundary(vB)).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`
    );

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    vec2 boundary (vec2 uv) {
        return uv;
        // uv = min(max(uv, 0.0), 1.0);
        // return uv;
    }
    void main () {
        float L = texture2D(uPressure, boundary(vL)).x;
        float R = texture2D(uPressure, boundary(vR)).x;
        float T = texture2D(uPressure, boundary(vT)).x;
        float B = texture2D(uPressure, boundary(vB)).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`
    );

    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
        gl.STATIC_DRAW
      );
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2, 0, 2, 3]),
        gl.STATIC_DRAW
      );
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
// @ts-ignore
      return (destination) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();
// @ts-ignore
    let simWidth;
    // @ts-ignore
    let simHeight;// @ts-ignore
    let dyeWidth;// @ts-ignore
    let dyeHeight;// @ts-ignore
    let density;// @ts-ignore
    let velocity;// @ts-ignore
    let divergence;// @ts-ignore
    let curl;// @ts-ignore
    let pressure;// @ts-ignore
    let bloom;// @ts-ignore

    let ditheringTexture = createTextureAsync('LDR_RGB1_0.png');

    const clearProgram = new GLProgram(baseVertexShader, clearShader);
    const colorProgram = new GLProgram(baseVertexShader, colorShader);
    const backgroundProgram = new GLProgram(baseVertexShader, backgroundShader);
    const displayProgram = new GLProgram(baseVertexShader, displayShader);
    const displayBloomProgram = new GLProgram(baseVertexShader, displayBloomShader);
    const displayShadingProgram = new GLProgram(
      baseVertexShader,
      displayShadingShader
    );
    const displayBloomShadingProgram = new GLProgram(
      baseVertexShader,
      displayBloomShadingShader
    );
    const bloomPrefilterProgram = new GLProgram(
      baseVertexShader,
      bloomPrefilterShader
    );
    const bloomBlurProgram = new GLProgram(baseVertexShader, bloomBlurShader);
    const bloomFinalProgram = new GLProgram(baseVertexShader, bloomFinalShader);
    const splatProgram = new GLProgram(baseVertexShader, splatShader);
    const advectionProgram = new GLProgram(
      baseVertexShader,
      ext.supportLinearFiltering ? advectionShader : advectionManualFilteringShader
    );
    const divergenceProgram = new GLProgram(baseVertexShader, divergenceShader);
    const curlProgram = new GLProgram(baseVertexShader, curlShader);
    const vorticityProgram = new GLProgram(baseVertexShader, vorticityShader);
    const pressureProgram = new GLProgram(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new GLProgram(
      baseVertexShader,
      gradientSubtractShader
    );

    function initFramebuffers() {
      let simRes = getResolution(config.SIM_RESOLUTION);
      let dyeRes = getResolution(config.DYE_RESOLUTION);

      simWidth = simRes.width;
      simHeight = simRes.height;
      dyeWidth = dyeRes.width;
      dyeHeight = dyeRes.height;

      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
// @ts-ignore
      if (density == null)
        density = createDoubleFBO(
          dyeWidth,
          dyeHeight,
          // @ts-ignore
          rgba.internalFormat,
          // @ts-ignore
          rgba.format,
          texType,
          filtering
        );
      else
        density = resizeDoubleFBO(
          // @ts-ignore
          density,
          dyeWidth,
          dyeHeight,
          // @ts-ignore
          rgba.internalFormat,
          // @ts-ignore
          rgba.format,
          texType,
          filtering
        );
// @ts-ignore
      if (velocity == null)
        velocity = createDoubleFBO(
          simWidth,
          simHeight,
          // @ts-ignore
          rg.internalFormat,
          // @ts-ignore
          rg.format,
          texType,
          filtering
        );
      else
        velocity = resizeDoubleFBO(
          // @ts-ignore
          velocity,
          simWidth,
          simHeight,
          // @ts-ignore
          rg.internalFormat,
          // @ts-ignore
          rg.format,
          texType,
          filtering
        );

      divergence = createFBO(
        simWidth,
        simHeight,
        // @ts-ignore
        r.internalFormat,
        // @ts-ignore
        r.format,
        texType,
        gl.NEAREST
      );
      curl = createFBO(
        simWidth,
        simHeight,
        // @ts-ignore
        r.internalFormat,
        // @ts-ignore
        r.format,
        texType,
        gl.NEAREST
      );
      pressure = createDoubleFBO(
        simWidth,
        simHeight,
        // @ts-ignore
        r.internalFormat,
        // @ts-ignore
        r.format,
        texType,
        gl.NEAREST
      );

      initBloomFramebuffers();
    }

    function initBloomFramebuffers() {
      let res = getResolution(config.BLOOM_RESOLUTION);

      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      bloom = createFBO(
        res.width,
        res.height,
        // @ts-ignore
        rgba.internalFormat,
        // @ts-ignore
        rgba.format,
        texType,
        filtering
      );

      bloomFramebuffers.length = 0;
      for (let i = 0; i < config.BLOOM_ITERATIONS; i++) {
        let width = res.width >> (i + 1);
        let height = res.height >> (i + 1);

        if (width < 2 || height < 2) break;

        let fbo = createFBO(
          width,
          height,
          // @ts-ignore
          rgba.internalFormat,
          // @ts-ignore
          rgba.format,
          texType,
          filtering
        );
        bloomFramebuffers.push(fbo);
      }
    }
// @ts-ignore
    function createFBO(w, h, internalFormat, format, type, param) {
      gl.activeTexture(gl.TEXTURE0);
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      let fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return {
        texture,
        fbo,
        width: w,
        height: h,
        // @ts-ignore
        attach(id) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }
// @ts-ignore
    function createDoubleFBO(w, h, internalFormat, format, type, param) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);

      return {
        get read() {
          return fbo1;
        },
        set read(value) {
          fbo1 = value;
        },
        get write() {
          return fbo2;
        },
        set write(value) {
          fbo2 = value;
        },
        swap() {
          let temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }
// @ts-ignore
    function resizeFBO(target, w, h, internalFormat, format, type, param) {
      let newFBO = createFBO(w, h, internalFormat, format, type, param);
      clearProgram.bind();
      // @ts-ignore
      gl.uniform1i(clearProgram.uniforms.uTexture, target.attach(0));
      // @ts-ignore
      gl.uniform1f(clearProgram.uniforms.value, 1);
      blit(newFBO.fbo);
      return newFBO;
    }
// @ts-ignore
    function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
      target.read = resizeFBO(
        target.read,
        w,
        h,
        internalFormat,
        format,
        type,
        param
      );
      target.write = createFBO(w, h, internalFormat, format, type, param);
      return target;
    }
// @ts-ignore
    function createTextureAsync(url) {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGB,
        1,
        1,
        0,
        gl.RGB,
        gl.UNSIGNED_BYTE,
        new Uint8Array([255, 255, 255])
      );

      let obj = {
        texture,
        width: 1,
        height: 1,
        // @ts-ignore
        attach(id) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };

      let image = new Image();
      image.onload = () => {
        obj.width = image.width;
        obj.height = image.height;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      };
      image.src = url;

      return obj;
    }

    initFramebuffers();
    // @ts-ignore
    multipleSplats(parseInt(Math.random() * 20) + 5);

    let lastColorChangeTime = Date.now();

    update();

    function update() {
      resizeCanvas();
      input();
      if (!config.PAUSED) step(0.016);
      render(null);
      requestAnimationFrame(update);
    }

    function input() {
      // @ts-ignore
      if (splatStack.length > 0) multipleSplats(splatStack.pop());

      for (let i = 0; i < pointers.length; i++) {
        // @ts-ignore
        const p = pointers[i];
        if (p.moved) {
          splat(p.x, p.y, p.dx, p.dy, p.color);
          p.moved = false;
        }
      }

      if (!config.COLORFUL) return;

      if (lastColorChangeTime + 100 < Date.now()) {
        lastColorChangeTime = Date.now();
        for (let i = 0; i < pointers.length; i++) {
          // @ts-ignore
          const p = pointers[i];
          p.color = generateColor();
        }
      }
    }
// @ts-ignore
    function step(dt) {
      gl.disable(gl.BLEND);
      // @ts-ignore
      gl.viewport(0, 0, simWidth, simHeight);

      curlProgram.bind();
      // @ts-ignore
      gl.uniform2f(curlProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      // @ts-ignore
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      // @ts-ignore
      blit(curl.fbo);

      vorticityProgram.bind();
      gl.uniform2f(
        // @ts-ignore
        vorticityProgram.uniforms.texelSize,
        // @ts-ignore
        1.0 / simWidth,
        // @ts-ignore
        1.0 / simHeight
      );
      // @ts-ignore
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      // @ts-ignore
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      // @ts-ignore
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      // @ts-ignore
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      // @ts-ignore
      blit(velocity.write.fbo);
      // @ts-ignore
      velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(
        // @ts-ignore
        divergenceProgram.uniforms.texelSize,
        // @ts-ignore
        1.0 / simWidth,
        // @ts-ignore
        1.0 / simHeight
      );
      // @ts-ignore
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      // @ts-ignore
      blit(divergence.fbo);

      clearProgram.bind();
      // @ts-ignore
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      // @ts-ignore
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);
      // @ts-ignore
      blit(pressure.write.fbo);
      // @ts-ignore
      pressure.swap();

      pressureProgram.bind();
      gl.uniform2f(
        // @ts-ignore
        pressureProgram.uniforms.texelSize,
        // @ts-ignore
        1.0 / simWidth,
        // @ts-ignore
        1.0 / simHeight
      );
      // @ts-ignore
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        // @ts-ignore
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        // @ts-ignore
        blit(pressure.write.fbo);
        // @ts-ignore
        pressure.swap();
      }

      gradienSubtractProgram.bind();
      gl.uniform2f(
        // @ts-ignore
        gradienSubtractProgram.uniforms.texelSize,
        // @ts-ignore
        1.0 / simWidth,
        // @ts-ignore
        1.0 / simHeight
      );
      gl.uniform1i(
        // @ts-ignore
        gradienSubtractProgram.uniforms.uPressure,
        // @ts-ignore
        pressure.read.attach(0)
      );
      gl.uniform1i(
        // @ts-ignore
        gradienSubtractProgram.uniforms.uVelocity,
        // @ts-ignore
        velocity.read.attach(1)
      );
      // @ts-ignore
      blit(velocity.write.fbo);
      // @ts-ignore
      velocity.swap();

      advectionProgram.bind();
      gl.uniform2f(
        // @ts-ignore
        advectionProgram.uniforms.texelSize,
        // @ts-ignore
        1.0 / simWidth,
        // @ts-ignore
        1.0 / simHeight
      );
      if (!ext.supportLinearFiltering)
        gl.uniform2f(
          // @ts-ignore
          advectionProgram.uniforms.dyeTexelSize,
          // @ts-ignore
          1.0 / simWidth,
          // @ts-ignore
          1.0 / simHeight
        );
      // @ts-ignore
      let velocityId = velocity.read.attach(0);
      // @ts-ignore
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      // @ts-ignore
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      // @ts-ignore
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(
        // @ts-ignore
        advectionProgram.uniforms.dissipation,
        config.VELOCITY_DISSIPATION
      );
      // @ts-ignore
      blit(velocity.write.fbo);
      // @ts-ignore
      velocity.swap();
// @ts-ignore
      gl.viewport(0, 0, dyeWidth, dyeHeight);

      if (!ext.supportLinearFiltering)
        gl.uniform2f(
          // @ts-ignore
          advectionProgram.uniforms.dyeTexelSize,
          // @ts-ignore
          1.0 / dyeWidth,
          // @ts-ignore
          1.0 / dyeHeight
        );
      // @ts-ignore
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      // @ts-ignore
      gl.uniform1i(advectionProgram.uniforms.uSource, density.read.attach(1));
      gl.uniform1f(
        // @ts-ignore
        advectionProgram.uniforms.dissipation,
        config.DENSITY_DISSIPATION
      );
      // @ts-ignore
      blit(density.write.fbo);
      // @ts-ignore
      density.swap();
    }
// @ts-ignore
    function render(target) {
      // @ts-ignore
      if (config.BLOOM) applyBloom(density.read, bloom);

      if (target == null || !config.TRANSPARENT) {
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
      } else {
        gl.disable(gl.BLEND);
      }
// @ts-ignore
      let width = target == null ? gl.drawingBufferWidth : dyeWidth;
      // @ts-ignore
      let height = target == null ? gl.drawingBufferHeight : dyeHeight;

      gl.viewport(0, 0, width, height);

      if (!config.TRANSPARENT) {
        colorProgram.bind();
        let bc = config.BACK_COLOR;
        gl.uniform4f(
          // @ts-ignore
          colorProgram.uniforms.color,
          bc.r / 255,
          bc.g / 255,
          bc.b / 255,
          1
        );
        blit(target);
      }

      if (target == null && config.TRANSPARENT) {
        backgroundProgram.bind();
        gl.uniform1f(
          // @ts-ignore
          backgroundProgram.uniforms.aspectRatio,
          // @ts-ignore
          canvas.width / canvas.height
        );
        blit(null);
      }

      if (config.SHADING) {
        let program = config.BLOOM
          ? displayBloomShadingProgram
          : displayShadingProgram;
        program.bind();
        // @ts-ignore
        gl.uniform2f(program.uniforms.texelSize, 1.0 / width, 1.0 / height);
        // @ts-ignore
        gl.uniform1i(program.uniforms.uTexture, density.read.attach(0));
        if (config.BLOOM) {
          // @ts-ignore
          gl.uniform1i(program.uniforms.uBloom, bloom.attach(1));
          // @ts-ignore
          gl.uniform1i(program.uniforms.uDithering, ditheringTexture.attach(2));
          let scale = getTextureScale(ditheringTexture, width, height);
          // @ts-ignore
          gl.uniform2f(program.uniforms.ditherScale, scale.x, scale.y);
        }
      } else {
        let program = config.BLOOM ? displayBloomProgram : displayProgram;
        program.bind();
        // @ts-ignore
        gl.uniform1i(program.uniforms.uTexture, density.read.attach(0));
        if (config.BLOOM) {
          // @ts-ignore
          gl.uniform1i(program.uniforms.uBloom, bloom.attach(1));
          // @ts-ignore
          gl.uniform1i(program.uniforms.uDithering, ditheringTexture.attach(2));
          let scale = getTextureScale(ditheringTexture, width, height);
          // @ts-ignore
          gl.uniform2f(program.uniforms.ditherScale, scale.x, scale.y);
        }
      }

      blit(target);
    }
// @ts-ignore
    function applyBloom(source, destination) {
      if (bloomFramebuffers.length < 2) return;

      let last = destination;

      gl.disable(gl.BLEND);
      bloomPrefilterProgram.bind();
      let knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 0.0001;
      let curve0 = config.BLOOM_THRESHOLD - knee;
      let curve1 = knee * 2;
      let curve2 = 0.25 / knee;
      // @ts-ignore
      gl.uniform3f(bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2);
      gl.uniform1f(
        // @ts-ignore
        bloomPrefilterProgram.uniforms.threshold,
        config.BLOOM_THRESHOLD
      );
      // @ts-ignore
      gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
      gl.viewport(0, 0, last.width, last.height);
      blit(last.fbo);

      bloomBlurProgram.bind();
      for (let i = 0; i < bloomFramebuffers.length; i++) {
        // @ts-ignore
        let dest = bloomFramebuffers[i];
        gl.uniform2f(
          // @ts-ignore// @ts-ignore
          bloomBlurProgram.uniforms.texelSize,
          1.0 / last.width,
          1.0 / last.height
        );
        // @ts-ignore
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        gl.viewport(0, 0, dest.width, dest.height);
        blit(dest.fbo);
        last = dest;
      }

      gl.blendFunc(gl.ONE, gl.ONE);
      gl.enable(gl.BLEND);

      for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
        // @ts-ignore
        let baseTex = bloomFramebuffers[i];
        gl.uniform2f(
          // @ts-ignore
          bloomBlurProgram.uniforms.texelSize,
          1.0 / last.width,
          1.0 / last.height
        );
        // @ts-ignore
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        gl.viewport(0, 0, baseTex.width, baseTex.height);
        blit(baseTex.fbo);
        last = baseTex;
      }

      gl.disable(gl.BLEND);
      bloomFinalProgram.bind();
      gl.uniform2f(
        // @ts-ignore
        bloomFinalProgram.uniforms.texelSize,
        1.0 / last.width,
        1.0 / last.height
      );
      // @ts-ignore
      gl.uniform1i(bloomFinalProgram.uniforms.uTexture, last.attach(0));
      // @ts-ignore
      gl.uniform1f(bloomFinalProgram.uniforms.intensity, config.BLOOM_INTENSITY);
      gl.viewport(0, 0, destination.width, destination.height);
      blit(destination.fbo);
    }
// @ts-ignore
    function splat(x, y, dx, dy, color) {
      // @ts-ignore
      gl.viewport(0, 0, simWidth, simHeight);
      splatProgram.bind();
      // @ts-ignore
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      // @ts-ignore
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(
        // @ts-ignore
        splatProgram.uniforms.point,
        // @ts-ignore
        x / canvas.width,
        // @ts-ignore
        1.0 - y / canvas.height
      );
      // @ts-ignore
      gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
      // @ts-ignore
      gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS / 100.0);
      // @ts-ignore
      blit(velocity.write.fbo);
      // @ts-ignore
      velocity.swap();
// @ts-ignore
      gl.viewport(0, 0, dyeWidth, dyeHeight);
      // @ts-ignore
      gl.uniform1i(splatProgram.uniforms.uTarget, density.read.attach(0));
      // @ts-ignore
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      // @ts-ignore
      blit(density.write.fbo);
      // @ts-ignore
      density.swap();
    }
// @ts-ignore
    function multipleSplats(amount) {
      for (let i = 0; i < amount; i++) {
        const color = generateColor();
        color.r *= 10.0;
        color.g *= 10.0;
        color.b *= 10.0;
        // @ts-ignore
        const x = canvas.width * Math.random();
        // @ts-ignore
        const y = canvas.height * Math.random();
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        splat(x, y, dx, dy, color);
      }
    }

    function resizeCanvas() {
      if (
        // @ts-ignore
        canvas.width != canvas.clientWidth ||
        // @ts-ignore
        canvas.height != canvas.clientHeight
      ) {
        // @ts-ignore
        canvas.width = canvas.clientWidth;
        // @ts-ignore
        canvas.height = canvas.clientHeight;
        initFramebuffers();
      }
    }
// @ts-ignore
    canvas.addEventListener('mousemove', (e) => {
      // @ts-ignore
      pointers[0].down = true;
      // @ts-ignore
      pointers[0].color = generateColor();
// @ts-ignore
      pointers[0].moved = pointers[0].down;
      // @ts-ignore
      pointers[0].dx = (e.offsetX - pointers[0].x) * 5.0;
      // @ts-ignore
      pointers[0].dy = (e.offsetY - pointers[0].y) * 5.0;
      // @ts-ignore
      pointers[0].x = e.offsetX;
      // @ts-ignore
      pointers[0].y = e.offsetY;
    });
// @ts-ignore
    canvas.addEventListener(
      'touchmove',
      // @ts-ignore
      (e) => {
        e.preventDefault();
        const touches = e.targetTouches;
        for (let i = 0; i < touches.length; i++) {
          // @ts-ignore
          let pointer = pointers[i];
          pointer.moved = pointer.down;
          pointer.dx = (touches[i].pageX - pointer.x) * 8.0;
          pointer.dy = (touches[i].pageY - pointer.y) * 8.0;
          pointer.x = touches[i].pageX;
          pointer.y = touches[i].pageY;
        }
      },
      false
    );
// @ts-ignore
    canvas.addEventListener('mousedown', () => {
      // @ts-ignore
      pointers[0].down = true;
      // @ts-ignore
      pointers[0].color = generateColor();
    });
// @ts-ignore
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
        // @ts-ignore
        if (i >= pointers.length) pointers.push(new pointerPrototype());
// @ts-ignore
        pointers[i].id = touches[i].identifier;
        // @ts-ignore
        pointers[i].down = true;
        // @ts-ignore
        pointers[i].x = touches[i].pageX;
        // @ts-ignore
        pointers[i].y = touches[i].pageY;
        // @ts-ignore
        pointers[i].color = generateColor();
      }
    });

    window.addEventListener('mouseup', () => {
      // @ts-ignore
      pointers[0].down = false;
    });

    window.addEventListener('touchend', (e) => {
      const touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++)
        for (let j = 0; j < pointers.length; j++)
          // @ts-ignore
          if (touches[i].identifier == pointers[j].id) pointers[j].down = false;
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyP') config.PAUSED = !config.PAUSED;
      // @ts-ignore
      if (e.key === ' ') splatStack.push(parseInt(Math.random() * 20) + 5);
    });

    function generateColor() {
      let c = HSVtoRGB(Math.random(), 1.0, 1.0);
      c.r *= 0.15;
      c.g *= 0.15;
      c.b *= 0.15;
      return c;
    }
// @ts-ignore
    function HSVtoRGB(h, s, v) {
      let r, g, b, i, f, p, q, t;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          (r = v), (g = t), (b = p);
          break;
        case 1:
          (r = q), (g = v), (b = p);
          break;
        case 2:
          (r = p), (g = v), (b = t);
          break;
        case 3:
          (r = p), (g = q), (b = v);
          break;
        case 4:
          (r = t), (g = p), (b = v);
          break;
        case 5:
          (r = v), (g = p), (b = q);
          break;
      }

      return {
        r,
        g,
        b,
      };
    }
// @ts-ignore
    function getResolution(resolution) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

      let max = Math.round(resolution * aspectRatio);
      let min = Math.round(resolution);

      if (gl.drawingBufferWidth > gl.drawingBufferHeight)
        return { width: max, height: min };
      else return { width: min, height: max };
    }
// @ts-ignore
    function getTextureScale(texture, width, height) {
      return {
        x: width / texture.width,
        y: height / texture.height,
      };
    }
  }, []);

  return <canvas className={clsx(className, styles.root)} ref={canvasRef} width={800} height={600} />;
};

export default Flame;
