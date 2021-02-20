import { cos, sin, tau } from './math';

export class Renderer
{
  canvas = document.createElement('canvas');
  ctx = this.canvas.getContext('2d')!;
  width = 0;
  height = 0;
  last_time = 0;
  current_time = 0;
  dt = 0;

  run(){
    this.set_dim(900, 600);

    window.addEventListener('load', () => {
      document.body.appendChild(this.canvas);
    });
    
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
    this.ctx.strokeStyle = 'cyan';
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(x_scale*t0+zero_pos_x, 0+zero_pos_y);
    this.ctx.lineTo(x_scale*t1+zero_pos_x, 0+zero_pos_y);
    for(let t = t0; t <= t1; t += 1)
    {
      this.ctx.moveTo(x_scale*t+zero_pos_x, -10+zero_pos_y);
      this.ctx.lineTo(x_scale*t+zero_pos_x, +10+zero_pos_y);
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

  draw_2d_parametric_func(
    fx: (t: number) => number, 
    fy: (t: number) => number, 
    t0: number, t1: number, 
    zero_pos_x: number,
    zero_pos_y: number,
    x_scale: number,
    y_scale: number,
  ) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'blue';
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(x_scale*fx(t0)+zero_pos_x, y_scale*fy(t0)+zero_pos_y);
    // find a better way to determine the step than the x_scale.
    for(let t = x_scale*t0 + 1; t <= x_scale*t1; t += 1)
    {
      this.ctx.lineTo(x_scale*fx(t/x_scale)+zero_pos_x, y_scale*fy(t/x_scale)+zero_pos_y);
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
    this.draw();

    requestAnimationFrame(this.render_loop.bind(this));
  }
  update(){}
  draw(){
  }
}
// window.Renderer = Renderer;
