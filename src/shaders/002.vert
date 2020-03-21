#include <noise>

varying vec2 v_uv;
varying float v_noise;

uniform float u_time;

void main() {

    v_uv = uv;
    v_noise = 10.0 * -0.1 * turbulence(0.5 * normal + u_time * 0.2);

    float b = 5.0 * pnoise(0.05 * position, vec3(100.0));
    float displacement = b - 10.0 * v_noise;
    vec3 pos = position + normal * displacement;	

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

}