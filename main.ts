/**
 * This file renders some visualizations about fourier transfer.
 * To see the code relevant to fourier got to the `draw` function directly.
 * */

import { abs, cos, rng2, sin, sum, tau } from './math';
import { Renderer } from './renderer';

class App extends Renderer
{
  graph_anm_start = this.current_time;
  graph_anm_t = 0;

  update(){
    const duration = 40;
    this.graph_anm_t = (this.current_time - this.graph_anm_start) / duration;
    while(this.graph_anm_t > 1)this.graph_anm_t -= 1;
  }
  draw(){
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // range of target function to be analyzed.
    const start_t = 0;
    const end_t = 6;

    const hz1 = 3;
    const hz2 = 2;
    // target function for analysis, (sum of two frequencies hz1 and hz2).
    const f = (x: number) => cos(hz1 * x*tau) + cos(hz2 * x*tau);

    // draw the target function.
    this.draw_func(
      f, 
      start_t, end_t,
      80, 170,
      680/(end_t-start_t), 40
    );

    // Animate forward and backward by mapping the timer from [0 - 1] to [0 - 1 - 0].
    const anm_t = 4 * (1-abs(2*this.graph_anm_t-1));

    // frequency to be tried (it is animated using the timer graph_anm_t).
    const cycle_per_second = anm_t;

    // Draw the wave around the unit circle as inspired 3blue1brown YT channel.
    // https://www.youtube.com/watch?v=spUNpyF58BY
    this.draw_func_on_circle(
      f, 
      start_t, end_t,
      160, 400, // position
      cycle_per_second, // cycles per t
      60 // scale
    );

    // Number of samples.
    const N = 100;
      
    // Fourier Transform
    // this is the real part
    const ft_r = (fq: number) => sum(rng2(start_t, end_t, N).map(t => f(t) * cos(-tau*fq*t)));
    // this is the imaginary/complex part
    const ft_c = (fq: number) => sum(rng2(start_t, end_t, N).map(t => f(t) * sin(-tau*fq*t)));
    
    // Draw the real part of fourier
    this.draw_func(
      // Fourier is just the sum/integration, which results large values, 
      // normalize them to fit on the screen.
      (fq) => ft_r(fq)/N,
      0, cycle_per_second,
      400, 390, // position
      80, 90 // scale
    );
  }
}

(new App()).run();
