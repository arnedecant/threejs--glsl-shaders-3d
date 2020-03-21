#include <noise>

uniform float u_time;

varying vec2 v_uv;
varying float v_noise;

void main() {	

    float time = u_time * 1.0;
    float displacement;
    float b;

    v_uv = uv;

    // add time to the noise parameters so it's animated

    v_noise = 10.0 *  -.10 * turbulence( .5 * normal + time );
    b = 5.0 * pnoise( 0.05 * position + vec3( 2.0 * time ), vec3( 100.0 ) );
    displacement = - 10. * v_noise + b;

    // move the position along the normal and transform it

    vec3 pos = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);


}