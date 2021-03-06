#include <common>
#include <lights_pars_begin>

uniform float u_time;
uniform float u_radius;

varying vec3 v_position;
varying vec3 v_light_intensity;

float getDelta() {

    return ((sin(u_time) + 1.0) / 2.0);

}

void main() {

    float delta = getDelta();
    vec3 vIndirectFront;
    vec3 vLightFront;
    vec3 objectNormal = delta * normal + (1.0 - delta) * normalize(position);

    #include <defaultnormal_vertex>
    #include <begin_vertex>
    #include <project_vertex>
    #include <lights_lambert_vertex>

    v_light_intensity = vLightFront + ambientLightColor;
    v_position = position;

    vec3 v = normalize(position) * u_radius;
    vec3 pos = delta * position + (1.0 - delta) * v;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    
}