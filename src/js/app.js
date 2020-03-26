// -------------------------------------------------------------------
// :: App
// -------------------------------------------------------------------

import Engine from './engine'

class App {

	constructor() {

		// create new engine: setup scene, camera & lighting
		// and load vertex and fragment shaders in memory

		window.ENGINE = new Engine({ container: document.body, assetsPath: 'assets/' })
		window.APP = this
		window.SHADERS = {
			vertex: [],
			fragment: []
		}

		// elements

		this.$interface = document.querySelector('.interface')
		this.$index = this.$interface.querySelector('input[name="index"]')

		// properties

		// events

		window.addEventListener('resize', this.resize.bind(this), false)
		window.addEventListener('mousemove', this.mousemove.bind(this))
		window.addEventListener('touchmove', this.mousemove.bind(this))
		document.body.addEventListener('click', this.click.bind(this))
		document.body.addEventListener('submit', this.submit.bind(this))

		// init

		const vertexShaders = [...document.querySelectorAll('[data-shader^="vertex"]')] // .textContent
		const fragmentShaders = [...document.querySelectorAll('[data-shader^="fragment"]')] // .textContent

		vertexShaders.forEach((s) => SHADERS.vertex.push(s.textContent))
		fragmentShaders.forEach((s) => SHADERS.fragment.push(s.textContent))

		this.setup()

	}

	setup() {

		this.clock = new THREE.Clock()

		this.url = new URL(window.location.href)
		const index = this.url.searchParams.get('index') || 0
		this.index = parseInt(index) || 0
		this.$index.value = this.index

		const uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib['common'], THREE.UniformsLib['lights']])
		const skybox = ENGINE.load(['skybox_px.jpg', 'skybox_nx.jpg', 'skybox_py.jpg', 'skybox_ny.jpg', 'skybox_pz.jpg', 'skybox_nz.jpg'])

		this.uniforms = {
			u_time: { value: 0.0 },
			u_mouse: { value: { x: 0.0, y: 0.0 } },
			u_resolution: { value: { x: 0.0, y: 0.0 } },
			u_radius: { value: 20.0 },
			u_color: { value: new THREE.Color(0xa6e4fa) },
			u_tex_lava: { value: ENGINE.load('explosion.png') },
			u_light_position: { value: ENGINE.directionalLight.position.clone() },
			u_rim_color: { value: new THREE.Color(0xffffff) },
			u_rim_strength: { value: 1.6 },
			u_rim_width: { value: 0.6 },
			u_envmap_cube: { value: skybox },
			u_envmap_strength: { value: 0.7 },
			u_normal_map: { value: ENGINE.load('bricks-normal.png') },
			u_diffuse_map: { value: ENGINE.load('bricks-diffuse.png') },
			...uniforms
		}

		if (this.index == 5) ENGINE.scene.background = skybox
		else ENGINE.scene.background = new THREE.Color(0x333333)
		
		this.resize()
		this.init()

	}

	init() {
		
		ENGINE.clear()

		this.addMesh(this.index)
		
		this.render()

	}

	addMesh(index = this.index) {

		let geometry = new THREE.BoxGeometry(30, 30, 30, 10, 10, 10)
		let material = new THREE.ShaderMaterial({ 
			uniforms: this.uniforms,
			vertexShader: SHADERS.vertex[this.index],
			fragmentShader: SHADERS.fragment[this.index],
			lights: true
		})
		
		const config = {
			wireframe: [0, 2],
			icosahedron: [2, 3, 4],
			torus: [5, 6]
		}

		if (config.wireframe.includes(index)) material.wireframe = true
		if (config.icosahedron.includes(index)) geometry = new THREE.IcosahedronGeometry(20, 4)
		if (config.torus.includes(index)) geometry = new THREE.TorusKnotGeometry(10, 5, 100, 16)

		const mesh = new THREE.Mesh(geometry, material)

		ENGINE.add(mesh)

	}

	resize(e) {

		ENGINE.resize(this.fill)
		
		if (!this.uniforms.u_resolution) return

		this.uniforms.u_resolution.value.x = window.innerWidth
		this.uniforms.u_resolution.value.y = window.innerHeight

	}

	mousemove(e) {

		if (!this.uniforms || this.uniforms.u_mouse) return

		this.uniforms.u_mouse.value.x = (e.touches) ? e.touches[0].clientX : e.clientX
		this.uniforms.u_mouse.value.y = (e.touches) ? e.touches[1].clientY : e.clientY

	}

	click(e) {

		// skip click for labels

		if (e.target.tagName === 'LABEL') return

		// store temporary values

		const name = e.target.getAttribute('name')
		const tempIndex = this.index

		// handle logic

		switch (name) {
			case 'prev': this.index--
				break
			case 'next': this.index++
				break
			default: return
		}

		// reload page

		const reload = this.reload()
		if (reload) return

		// reset if reload failed
		
		this.index = tempIndex

	}

	submit(e) {

		e.preventDefault()

		const tempIndex = this.index
		this.index = parseInt(this.$index.value)

		const reload = this.reload()
		if (!reload) this.index = tempIndex

	}

	reload() {

		let reload = true

		if (!SHADERS.vertex[this.index]) reload = false
		if (!SHADERS.fragment[this.index]) reload = false

		if (reload) {
			this.url.searchParams.set('index', this.index)
		} else {
			alert('Index unreachable')
			return false
		}

		window.location.href = this.url
		return true

	}

	render(timestamp) {

		if (window.STOP) return

		const delta = this.clock.getDelta();

		this.uniforms.u_time.value += delta

		window.requestAnimationFrame(this.render.bind(this))

		ENGINE.render(timestamp)

	}

}

export default new App()

// debugging helpers

window.onError = (error) => console.error(JSON.stringify(error))
window.stop = () => window.STOP = true
window.start = (once = false) => {
	if (!once) window.STOP = false
	APP.render()
}