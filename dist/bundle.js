/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math */ \"./math.ts\");\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer */ \"./renderer.ts\");\n/**\r\n * This file renders some visualizations about fourier transfer.\r\n * To see the code relevant to fourier got to the `draw` function directly.\r\n * */\r\n\r\n\r\nclass App extends _renderer__WEBPACK_IMPORTED_MODULE_1__.Renderer {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.graph_anm_start = this.current_time;\r\n        this.graph_anm_t = 0;\r\n    }\r\n    update() {\r\n        const duration = 40;\r\n        this.graph_anm_t = (this.current_time - this.graph_anm_start) / duration;\r\n        while (this.graph_anm_t > 1)\r\n            this.graph_anm_t -= 1;\r\n    }\r\n    draw() {\r\n        this.ctx.fillStyle = 'black';\r\n        this.ctx.fillRect(0, 0, this.width, this.height);\r\n        // range of target function to be analyzed.\r\n        const start_t = 0;\r\n        const end_t = 6;\r\n        const hz1 = 3;\r\n        const hz2 = 2;\r\n        // target function for analysis, (sum of two frequencies hz1 and hz2).\r\n        const f = (x) => (0,_math__WEBPACK_IMPORTED_MODULE_0__.cos)(hz1 * x * _math__WEBPACK_IMPORTED_MODULE_0__.tau) + (0,_math__WEBPACK_IMPORTED_MODULE_0__.cos)(hz2 * x * _math__WEBPACK_IMPORTED_MODULE_0__.tau);\r\n        // draw the target function.\r\n        this.draw_func(f, start_t, end_t, 80, 170, 680 / (end_t - start_t), 40);\r\n        // Animate forward and backward by mapping the timer from [0 - 1] to [0 - 1 - 0].\r\n        const anm_t = 4 * (1 - (0,_math__WEBPACK_IMPORTED_MODULE_0__.abs)(2 * this.graph_anm_t - 1));\r\n        // frequency to be tried (it is animated using the timer graph_anm_t).\r\n        const cycle_per_second = anm_t;\r\n        // Draw the wave around the unit circle as inspired 3blue1brown YT channel.\r\n        // https://www.youtube.com/watch?v=spUNpyF58BY\r\n        this.draw_func_on_circle(f, start_t, end_t, 160, 400, // position\r\n        cycle_per_second, // cycles per t\r\n        60 // scale\r\n        );\r\n        // Number of samples.\r\n        const N = 100;\r\n        // Fourier Transform\r\n        // this is the real part\r\n        const ft_r = (fq) => (0,_math__WEBPACK_IMPORTED_MODULE_0__.sum)((0,_math__WEBPACK_IMPORTED_MODULE_0__.rng2)(start_t, end_t, N).map(t => f(t) * (0,_math__WEBPACK_IMPORTED_MODULE_0__.cos)(-_math__WEBPACK_IMPORTED_MODULE_0__.tau * fq * t)));\r\n        // this is the imaginary/complex part\r\n        const ft_c = (fq) => (0,_math__WEBPACK_IMPORTED_MODULE_0__.sum)((0,_math__WEBPACK_IMPORTED_MODULE_0__.rng2)(start_t, end_t, N).map(t => f(t) * (0,_math__WEBPACK_IMPORTED_MODULE_0__.sin)(-_math__WEBPACK_IMPORTED_MODULE_0__.tau * fq * t)));\r\n        // Draw the real part of fourier\r\n        this.draw_func(\r\n        // Fourier is just the sum/integration, which results large values, \r\n        // normalize them to fit on the screen.\r\n        (fq) => ft_r(fq) / N, 0, cycle_per_second, 400, 390, // position\r\n        80, 90 // scale\r\n        );\r\n    }\r\n}\r\n(new App()).run();\r\n\n\n//# sourceURL=webpack://fourier_transform/./main.ts?");

/***/ }),

/***/ "./math.ts":
/*!*****************!*\
  !*** ./math.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"abs\": () => (/* binding */ abs),\n/* harmony export */   \"sin\": () => (/* binding */ sin),\n/* harmony export */   \"cos\": () => (/* binding */ cos),\n/* harmony export */   \"sqrt\": () => (/* binding */ sqrt),\n/* harmony export */   \"pi\": () => (/* binding */ pi),\n/* harmony export */   \"tau\": () => (/* binding */ tau),\n/* harmony export */   \"rng\": () => (/* binding */ rng),\n/* harmony export */   \"rng2\": () => (/* binding */ rng2),\n/* harmony export */   \"sum\": () => (/* binding */ sum),\n/* harmony export */   \"avg\": () => (/* binding */ avg),\n/* harmony export */   \"lerp\": () => (/* binding */ lerp)\n/* harmony export */ });\nconst abs = Math.abs;\r\nconst sin = Math.sin;\r\nconst cos = Math.cos;\r\nconst sqrt = Math.sqrt;\r\nconst pi = Math.PI;\r\nconst tau = 2 * pi;\r\nconst rng = (n) => { const r = new Array(n); for (let i = 0; i < n; i++)\r\n    r[i] = i; return r; };\r\nconst rng2 = (s, e, steps) => rng(steps).map(i => lerp(i / steps, s, e));\r\nconst sum = (arr) => arr.reduce((p, i) => p + i, 0);\r\nconst avg = (arr) => sum(arr) / arr.length;\r\nconst lerp = (t, t0, t1) => t0 + t * (t1 - t0);\r\n\n\n//# sourceURL=webpack://fourier_transform/./math.ts?");

/***/ }),

/***/ "./renderer.ts":
/*!*********************!*\
  !*** ./renderer.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Renderer\": () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math */ \"./math.ts\");\n\r\nclass Renderer {\r\n    constructor() {\r\n        this.canvas = document.createElement('canvas');\r\n        this.ctx = this.canvas.getContext('2d');\r\n        this.width = 0;\r\n        this.height = 0;\r\n        this.last_time = 0;\r\n        this.current_time = 0;\r\n        this.dt = 0;\r\n    }\r\n    run() {\r\n        this.set_dim(900, 600);\r\n        window.addEventListener('load', () => {\r\n            document.body.appendChild(this.canvas);\r\n        });\r\n        requestAnimationFrame((time) => {\r\n            this.last_time = time / 1000;\r\n            this.current_time = time / 1000;\r\n            requestAnimationFrame(this.render_loop.bind(this));\r\n        });\r\n    }\r\n    set_dim(w, h) {\r\n        this.canvas.width = this.width = w;\r\n        this.canvas.height = this.height = h;\r\n    }\r\n    line(x0, y0, x1, y1) {\r\n        this.ctx.beginPath();\r\n        this.ctx.moveTo(x0, y0);\r\n        this.ctx.lineTo(x1, y1);\r\n        this.ctx.stroke();\r\n    }\r\n    draw_func(f, t0, t1, zero_pos_x, zero_pos_y, x_scale, y_scale) {\r\n        this.ctx.beginPath();\r\n        this.ctx.strokeStyle = 'cyan';\r\n        this.ctx.lineWidth = 1;\r\n        this.ctx.moveTo(x_scale * t0 + zero_pos_x, 0 + zero_pos_y);\r\n        this.ctx.lineTo(x_scale * t1 + zero_pos_x, 0 + zero_pos_y);\r\n        for (let t = t0; t <= t1; t += 1) {\r\n            this.ctx.moveTo(x_scale * t + zero_pos_x, -10 + zero_pos_y);\r\n            this.ctx.lineTo(x_scale * t + zero_pos_x, +10 + zero_pos_y);\r\n        }\r\n        this.ctx.stroke();\r\n        this.ctx.beginPath();\r\n        this.ctx.strokeStyle = 'white';\r\n        this.ctx.lineWidth = 2;\r\n        this.ctx.moveTo(x_scale * t0 + zero_pos_x, -y_scale * f(t0) + zero_pos_y);\r\n        for (let t = t0 + 1; t <= x_scale * t1; t += 1) {\r\n            this.ctx.lineTo(t + zero_pos_x, -y_scale * f(t / x_scale) + zero_pos_y);\r\n        }\r\n        this.ctx.stroke();\r\n    }\r\n    draw_2d_parametric_func(fx, fy, t0, t1, zero_pos_x, zero_pos_y, x_scale, y_scale) {\r\n        this.ctx.beginPath();\r\n        this.ctx.strokeStyle = 'blue';\r\n        this.ctx.lineWidth = 1;\r\n        this.ctx.beginPath();\r\n        this.ctx.strokeStyle = 'white';\r\n        this.ctx.lineWidth = 2;\r\n        this.ctx.moveTo(x_scale * fx(t0) + zero_pos_x, y_scale * fy(t0) + zero_pos_y);\r\n        // find a better way to determine the step than the x_scale.\r\n        for (let t = x_scale * t0 + 1; t <= x_scale * t1; t += 1) {\r\n            this.ctx.lineTo(x_scale * fx(t / x_scale) + zero_pos_x, y_scale * fy(t / x_scale) + zero_pos_y);\r\n        }\r\n        this.ctx.stroke();\r\n    }\r\n    draw_func_on_circle(f, t0, t1, pos_x, pos_y, cycles_per_t, scale) {\r\n        this.circle(pos_x, pos_y, 2, 'green');\r\n        this.ctx.strokeStyle = 'blue';\r\n        this.line(pos_x - scale, pos_y, pos_x + scale, pos_y);\r\n        this.line(pos_x, pos_y - scale, pos_x, pos_y + scale);\r\n        if (cycles_per_t < 0.000001)\r\n            cycles_per_t = 0.000001;\r\n        let step = 1 / _math__WEBPACK_IMPORTED_MODULE_0__.tau / scale / cycles_per_t;\r\n        this.ctx.beginPath();\r\n        this.ctx.strokeStyle = 'red';\r\n        this.ctx.lineWidth = 1;\r\n        let first = true;\r\n        for (let i = 0;; i++) {\r\n            const t = i * step;\r\n            if (t0 + t > t1)\r\n                break;\r\n            const angle = t * cycles_per_t * _math__WEBPACK_IMPORTED_MODULE_0__.tau;\r\n            const amp = f(t);\r\n            const g_scale = 1;\r\n            let px = g_scale * scale * amp * (0,_math__WEBPACK_IMPORTED_MODULE_0__.cos)(angle) + pos_x;\r\n            let py = g_scale * scale * amp * (0,_math__WEBPACK_IMPORTED_MODULE_0__.sin)(angle) + pos_y;\r\n            if (first)\r\n                this.ctx.moveTo(px, py), first = false;\r\n            this.ctx.lineTo(px, py);\r\n        }\r\n        this.ctx.stroke();\r\n    }\r\n    circle(x, y, radius, color) {\r\n        this.ctx.beginPath();\r\n        this.ctx.strokeStyle = color;\r\n        this.ctx.fillStyle = color;\r\n        this.ctx.arc(x, y, radius, 0, _math__WEBPACK_IMPORTED_MODULE_0__.tau);\r\n        this.ctx.fill();\r\n    }\r\n    render_loop(time) {\r\n        time /= 1000;\r\n        this.dt = time - this.last_time;\r\n        this.last_time = this.current_time;\r\n        this.current_time = time;\r\n        this.update();\r\n        this.ctx.clearRect(0, 0, this.width, this.height);\r\n        this.draw();\r\n        requestAnimationFrame(this.render_loop.bind(this));\r\n    }\r\n    update() { }\r\n    draw() {\r\n    }\r\n}\r\n// window.Renderer = Renderer;\r\n\n\n//# sourceURL=webpack://fourier_transform/./renderer.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.ts");
/******/ 	
/******/ })()
;