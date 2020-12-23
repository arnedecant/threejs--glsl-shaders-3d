#include <noise>

varying vec2 v_uv;

uniform float u_time;

void main() {

    v_uv = uv;
    vec3 pos = position + normal * 0.5;	

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

}