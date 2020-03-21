varying vec3 vLightIntensity;

void main() 
{
    vec3 color = vec3(0.5);
    gl_FragColor = vec4(vLightIntensity * color, 1.0);

}