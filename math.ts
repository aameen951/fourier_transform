
export const abs = Math.abs;
export const sin = Math.sin;
export const cos = Math.cos;
export const sqrt = Math.sqrt;
export const pi = Math.PI;
export const tau = 2 * pi;
export const rng = (n: number) => {const r=new Array(n);for(let i=0;i<n;i++)r[i]=i;return r;};
export const rng2 = (s:number, e:number, steps:number) => rng(steps).map(i => lerp(i/steps, s, e));
export const sum = (arr: number[]) => arr.reduce((p, i) => p+i,0);
export const avg = (arr: number[]) => sum(arr) / arr.length;
export const lerp = (t: number, t0: number, t1: number) => t0 + t*(t1-t0);
