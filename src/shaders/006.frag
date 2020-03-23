varying vec2 v_uv;
varying vec3 v_normal;
varying mat4 v_model_matrix;

uniform vec3 u_light;
uniform vec2 u_resolution;
uniform vec3 u_color;
uniform sampler2D u_diffuse_map;
uniform sampler2D u_normal_map;

void main() {

    vec3 light_vector = normalize(u_light);
    vec4 normal = texture2D(u_normal_map, v_uv);
    vec3 normal_vector = normalize((v_model_matrix * (normal + vec4(v_normal, 1.0))).xyz);
    float light_intensity = clamp(0.0, 1.0, dot(light_vector, normal_vector)) + 0.2;
    vec3 texel = texture2D(u_diffuse_map, v_uv).rgb;
    vec3 color = light_intensity * texel;

    gl_FragColor = vec4(color, 1.0);
}