#include <noise>

uniform float u_time;

varying float v_noise;

void main() {	

    v_noise = turbulence( normal * 0.5 + u_time * 0.25 );
    vec3 pos = position + normal * v_noise * 10.0; 

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

}