varying vec3 v_normal;
varying vec2 v_uv;
varying mat4 v_model_matrix;

void main() {
  v_uv = uv;
  v_normal = normal;
  v_model_matrix = modelMatrix;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);  
}