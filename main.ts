const abs = Math.abs;
const sin = Math.sin;
const cos = Math.cos;
const sqrt = Math.sqrt;
const pi = Math.PI;
const tau = 2 * pi;

class App
{
  canvas = document.createElement('canvas');
  ctx = this.canvas.getContext('2d')!;
  width = 0;
  height = 0;
  last_time = 0;
  current_time = 0;
  dt = 0;

  init(){
    this.set_dim(900, 600);

    document.body.appendChild(this.canvas);

    requestAnimationFrame((time) => {
      this.last_time = time / 1000;
      this.current_time = time / 1000;
      requestAnimationFrame(this.render_loop.bind(this));
    });
  }
  set_dim(w: number, h: number){
    this.canvas.width = this.width = w;
    this.canvas.height = this.height = h;
  }

  line(x0: number, y0: number, x1: number, y1: number){
    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
  }

  draw_func(
    f: (t: number) => number, 
    t0: number, t1: number, 
    zero_pos_x: number,
    zero_pos_y: number,
    x_scale: number,
    y_scale: number,
  ){
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'blue';
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(x_scale*t0+zero_pos_x, 0+zero_pos_y);
    this.ctx.lineTo(x_scale*t1+zero_pos_x, 0+zero_pos_y);
    for(let t = t0; t <= t1; t += 1)
    {
      this.ctx.moveTo(x_scale*t+zero_pos_x, -1*y_scale+zero_pos_y);
      this.ctx.lineTo(x_scale*t+zero_pos_x, +1*y_scale+zero_pos_y);
    }
    this.ctx.stroke();


    this.ctx.beginPath();
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(x_scale*t0+zero_pos_x, -y_scale*f(t0)+zero_pos_y);
    for(let t = t0 + 1; t <= x_scale*t1; t += 1)
    {
      this.ctx.lineTo(t+zero_pos_x, -y_scale*f(t/x_scale)+zero_pos_y);
    }
    this.ctx.stroke();
  }

  draw_func_on_circle(
    f: (v: number)=>number, 
    t0: number, t1: number,
    pos_x: number, pos_y: number,
    cycles_per_t: number,
    scale: number,
  )
  {
    this.circle(pos_x, pos_y, 2, 'green');

    this.ctx.strokeStyle = 'blue';
    this.line(pos_x-scale, pos_y, pos_x+scale, pos_y);
    this.line(pos_x, pos_y-scale, pos_x, pos_y+scale);

    if(cycles_per_t < 0.000001)cycles_per_t = 0.000001;
    let step = 1 / tau / scale / cycles_per_t;

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 1;
    let first = true;
    for(let i=0; ; i++)
    {
      const t = i * step;
      if(t0 + t > t1)break;
      const angle = t * cycles_per_t * tau;
      const amp = f(t);
      const g_scale = 1;
      let px = g_scale*scale*amp*cos(angle) + pos_x;
      let py = g_scale*scale*amp*sin(angle) + pos_y;
      if(first)this.ctx.moveTo(px, py), first = false;
      this.ctx.lineTo(px, py);
    }
    this.ctx.stroke();
  }

  graph_anm_start = this.current_time;
  graph_anm_t = 0;

  update(){
    const duration = 15;
    this.graph_anm_t = (this.current_time - this.graph_anm_start) / duration;
    while(this.graph_anm_t > 1)this.graph_anm_t -= 1;
  }
  draw(){
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const start_t = 0;
    const end_t = 4;

    const hz1 = 3;
    const hz2 = 2;
    const f = (x: number) => cos(hz1 * x*tau) + cos(hz2 * x*tau) + 2;
    this.draw_func(
      f, 
      start_t, end_t,
      80, 170,
      160, 40
    );

    const cycle_per_second = 4 *(1-abs(2*this.graph_anm_t-1));

    this.draw_func_on_circle(
      f, 
      start_t, end_t,
      200, 400, 
      cycle_per_second, 
      40
    );
    
    // let sum_px = 0;
    // let sum_py = 0;
    // let point_count = 0;
    // sum_px += px; sum_py += py;
    // point_count++;
    // this.circle(sum_px/point_count, sum_py/point_count, 5, 'yellow');
  }
  circle(x: number, y: number, radius: number, color: string){
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, radius, 0, tau);
    this.ctx.fill();
  }

  render_loop(time: number){

    time /= 1000;
    this.dt = time - this.last_time;
    this.last_time = this.current_time;
    this.current_time = time;

    this.update();

    this.ctx.clearRect(0, 0, this.width, this.height);
    // console.log();
    this.draw();

    requestAnimationFrame(this.render_loop.bind(this));
  }
}

window.addEventListener('load', () => {
  const app = new App();
  app.init();
});
