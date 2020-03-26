uniform vec3 u_color;
uniform vec3 u_light_position;
uniform vec3 u_rim_color;
uniform float u_rim_strength;
uniform float u_rim_width;

// Example varyings passed from the vertex shader
varying vec3 v_position;
varying vec3 v_world_normal;
varying mat4 v_model_matrix;
varying vec3 v_light_intensity;

void main() {

    vec3 world_position = (v_model_matrix * vec4(v_position, 1.0)).xyz;
    vec3 lightVector = normalize(u_light_position - world_position);
    vec3 viewVector = normalize(cameraPosition - world_position);
    float rimndotv =  max(0.0, u_rim_width - clamp(dot(v_world_normal, viewVector), 0.0, 1.0));
    vec3 rimLight = rimndotv * u_rim_color * u_rim_strength;
    vec3 color = v_light_intensity * u_color + rimLight;

    gl_FragColor = vec4(color, 1.0);

}