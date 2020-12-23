#define PI 3.141592653589
#define PI2 6.28318530718

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;

varying vec2 v_uv;
varying float v_noise;

//https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/

void main() {

    float a = abs(v_uv.x - 0.5) * 2.0;
    float b = abs(v_uv.y - 0.5) * 2.0;
    vec3 color = vec3(a * v_noise, b * v_noise, v_noise);
    gl_FragColor = vec4(color, 0.2);

}