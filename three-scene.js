document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hero-3d-canvas');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Geometry & Material (Sleek, luxury tech appearance)
    const geometry = new THREE.TorusKnotGeometry(0.9, 0.35, 128, 32);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x002458, // Vernexa Brand Navy
        roughness: 0.25,
        metalness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Lighting setup for high-tech depth and electric cyan rim highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xf0f7ff, 1.4);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0x00b4c4, 1.6); // Vernexa Electric Cyan
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    // Mouse Interaction Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Base slow organic rotation
        torusKnot.rotation.z = elapsedTime * 0.1;
        
        // Gentle floating motion
        torusKnot.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

        // Subtle mouse interaction (parallax tilt)
        targetRotationY = mouseX * 0.0005;
        targetRotationX = mouseY * 0.0005;

        torusKnot.rotation.y += 0.05 * (targetRotationY - torusKnot.rotation.y) + 0.002; 
        torusKnot.rotation.x += 0.05 * (targetRotationX - torusKnot.rotation.x);

        renderer.render(scene, camera);
    }

    animate();

    // Window Resize Handler
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});
