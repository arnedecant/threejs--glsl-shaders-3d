uniform vec3 u_color;
uniform vec3 u_light_position;
uniform vec3 u_rim_color;
uniform float u_rim_strength;
uniform float u_rim_width;
uniform samplerCube u_envmap_cube;
uniform float u_envmap_strength;

// Example varyings passed from the vertex shader
varying vec3 v_position;
varying vec3 v_world_normal;
varying mat4 v_model_matrix;
varying vec3 v_light_intensity;

void main() {

    vec3 world_position = (v_model_matrix * vec4(v_position, 1.0)).xyz;
    vec3 light_vector = normalize(u_light_position - world_position);
    vec3 view_vector = normalize(cameraPosition - world_position);
    float rimndotv =  max(0.0, u_rim_width - clamp(dot(v_world_normal, view_vector), 0.0, 1.0));
    vec3 rim_light = rimndotv * u_rim_color * u_rim_strength;

    vec3 reflection = reflect(-view_vector, v_world_normal);
    vec3 envmap_light = textureCube(u_envmap_cube, reflection).rgb * u_envmap_strength;

    vec3 color = v_light_intensity * u_color + envmap_light + rim_light;

    gl_FragColor = vec4(color, 1.0);

}