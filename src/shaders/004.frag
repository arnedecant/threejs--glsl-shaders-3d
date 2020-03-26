uniform sampler2D u_tex_lava;

varying float v_noise;

void main() {

    vec2 uv = vec2( 0.0, abs(fract(v_noise * 2.2)));
    vec3 color = texture2D(u_tex_lava, uv).rbb;

    gl_FragColor = vec4(color, 1.0);

}