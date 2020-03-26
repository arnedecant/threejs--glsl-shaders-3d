varying vec3 v_light_intensity;

void main() 
{
    vec3 color = vec3(0.5);
    gl_FragColor = vec4(v_light_intensity * color, 1.0);

}