"use strict";
var abs = Math.abs;
var sin = Math.sin;
var cos = Math.cos;
var sqrt = Math.sqrt;
var pi = Math.PI;
var tau = 2 * pi;
var App = /** @class */ (function () {
    function App() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = 0;
        this.height = 0;
        this.last_time = 0;
        this.current_time = 0;
        this.dt = 0;
        this.graph_anm_start = this.current_time;
        this.graph_anm_t = 0;
    }
    App.prototype.init = function () {
        var _this = this;
        this.set_dim(900, 600);
        document.body.appendChild(this.canvas);
        requestAnimationFrame(function (time) {
            _this.last_time = time / 1000;
            _this.current_time = time / 1000;
            requestAnimationFrame(_this.render_loop.bind(_this));
        });
    };
    App.prototype.set_dim = function (w, h) {
        this.canvas.width = this.width = w;
        this.canvas.height = this.height = h;
    };
    App.prototype.line = function (x0, y0, x1, y1) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
    };
    App.prototype.draw_func = function (f, t0, t1, zero_pos_x, zero_pos_y, x_scale, y_scale) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(x_scale * t0 + zero_pos_x, 0 + zero_pos_y);
        this.ctx.lineTo(x_scale * t1 + zero_pos_x, 0 + zero_pos_y);
        for (var t = t0; t <= t1; t += 1) {
            this.ctx.moveTo(x_scale * t + zero_pos_x, -1 * y_scale + zero_pos_y);
            this.ctx.lineTo(x_scale * t + zero_pos_x, +1 * y_scale + zero_pos_y);
        }
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(x_scale * t0 + zero_pos_x, -y_scale * f(t0) + zero_pos_y);
        for (var t = t0 + 1; t <= x_scale * t1; t += 1) {
            this.ctx.lineTo(t + zero_pos_x, -y_scale * f(t / x_scale) + zero_pos_y);
        }
        this.ctx.stroke();
    };
    App.prototype.draw_func_on_circle = function (f, t0, t1, pos_x, pos_y, cycles_per_t, scale) {
        this.circle(pos_x, pos_y, 2, 'green');
        this.ctx.strokeStyle = 'blue';
        this.line(pos_x - scale, pos_y, pos_x + scale, pos_y);
        this.line(pos_x, pos_y - scale, pos_x, pos_y + scale);
        if (cycles_per_t < 0.000001)
            cycles_per_t = 0.000001;
        var step = 1 / tau / scale / cycles_per_t;
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 1;
        var first = true;
        for (var i = 0;; i++) {
            var t = i * step;
            if (t0 + t > t1)
                break;
            var angle = t * cycles_per_t * tau;
            var amp = f(t);
            var g_scale = 1;
            var px = g_scale * scale * amp * cos(angle) + pos_x;
            var py = g_scale * scale * amp * sin(angle) + pos_y;
            if (first)
                this.ctx.moveTo(px, py), first = false;
            this.ctx.lineTo(px, py);
        }
        this.ctx.stroke();
    };
    App.prototype.update = function () {
        var duration = 15;
        this.graph_anm_t = (this.current_time - this.graph_anm_start) / duration;
        while (this.graph_anm_t > 1)
            this.graph_anm_t -= 1;
    };
    App.prototype.draw = function () {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        var start_t = 0;
        var end_t = 4;
        var hz1 = 3;
        var hz2 = 2;
        var f = function (x) { return cos(hz1 * x * tau) + cos(hz2 * x * tau) + 2; };
        this.draw_func(f, start_t, end_t, 80, 170, 160, 40);
        var cycle_per_second = 4 * (1 - abs(2 * this.graph_anm_t - 1));
        this.draw_func_on_circle(f, start_t, end_t, 200, 400, cycle_per_second, 40);
        // let sum_px = 0;
        // let sum_py = 0;
        // let point_count = 0;
        // sum_px += px; sum_py += py;
        // point_count++;
        // this.circle(sum_px/point_count, sum_py/point_count, 5, 'yellow');
    };
    App.prototype.circle = function (x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.arc(x, y, radius, 0, tau);
        this.ctx.fill();
    };
    App.prototype.render_loop = function (time) {
        time /= 1000;
        this.dt = time - this.last_time;
        this.last_time = this.current_time;
        this.current_time = time;
        this.update();
        this.ctx.clearRect(0, 0, this.width, this.height);
        // console.log();
        this.draw();
        requestAnimationFrame(this.render_loop.bind(this));
    };
    return App;
}());
window.addEventListener('load', function () {
    var app = new App();
    app.init();
});
