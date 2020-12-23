#include <noise>

varying vec2 v_uv;
varying float v_noise;

uniform float u_time;

void main() {

    v_uv = uv;
    v_noise = -2.0 * turbulence(0.2 * normal + u_time * 0.1);

    float b = 1.0 * pnoise(0.05 * position, vec3(5.0));
    float displacement = b - 10.0 * v_noise;
    vec3 pos = position + normal * displacement;	

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.6);

}