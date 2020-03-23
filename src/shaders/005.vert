#include <common>
#include <lights_pars_begin>

varying vec3 v_position;
varying mat4 v_model_matrix;
varying vec3 v_world_normal;
varying vec3 v_light_intensity;

void main() {

    #include <simple_lambert_vertex>

    v_light_intensity = vLightFront + ambientLightColor;

    v_world_normal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    v_position = position;
    v_model_matrix = modelMatrix;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}