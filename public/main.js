// GESTION MENU BURGER
const burgerButton = document.getElementById('burger-button');
const mainMenu = document.getElementById('main-menu');
const emplacementMenuBurger = document.getElementById('emplacement-menu-burger');


// Masquer l'élément emplacementMenuBurger par défaut
emplacementMenuBurger.style.display = 'none';

burgerButton.addEventListener('click', function () {
  mainMenu.classList.toggle('menu-active');
  emplacementMenuBurger.style.display = emplacementMenuBurger.style.display === 'none' ? 'flex' : 'none';

  // Sélectionnez le menu et les emplacements
  const menuItems = document.querySelectorAll('#main-menu-ul li');
  const e1 = document.getElementById('e1');
  const e2 = document.getElementById('e2');
  const e3 = document.getElementById('e3');

  // Supprimez les anciens éléments du menu principal
  menuItems.forEach((menuItem) => {
    menuItem.remove();
  });

  // Parcourez chaque élément du menu
  menuItems.forEach((menuItem, index) => {
    if (index === 0) {
      e1.appendChild(cloneE1 = menuItem.cloneNode(true));
    } else if (index === 1) {
      e2.appendChild(cloneE2 = menuItem.cloneNode(true));
    } else if (index === 2) {
      e3.appendChild(cloneE3 = menuItem.cloneNode(true));
    }
  });
});

// FORCER FERMETURE MENU BURGER 
const mediaQuery = window.matchMedia('(min-width: 768px)');

function handleMenuDisplay(mediaQuery) {
  if (mediaQuery.matches) {
    mainMenu.classList.remove('menu-active');
    emplacementMenuBurger.style.display = 'none';
  }
}

mediaQuery.addEventListener('change', handleMenuDisplay);
handleMenuDisplay(mediaQuery);


//  THREE JS +  .GLTF LOADER

// Créez un gestionnaire de chargement
const loader = new THREE.GLTFLoader();

// Obtenez une référence au conteneur HTML
const container = document.getElementById('threeD');

// Déclarez une variable pour la position horizontale de la caméra
let cameraHorizontalPosition = 0;

// Chargez le fichier .gltf
loader.load('/assets/img/robot3d/scene.gltf', function (gltf) {
  // Obtenez le modèle de la scène chargée
  const model = gltf.scene;

  // Ajustez la position et l'échelle du modèle
  model.position.set(0, 0, 0); // Ajustez les valeurs de position selon vos besoins
  model.scale.set(1.2, 1.2, 1.2); // Ajustez les valeurs de l'échelle selon vos besoins

  // Obtenez l'animation de la flamme
  const mixer = new THREE.AnimationMixer(model);
  const clip = gltf.animations[0];

  // Créez une action pour l'animation
  const action = mixer.clipAction(clip);
  action.play(); // Jouez l'animation

  // Créez une scène Three.js
  const scene = new THREE.Scene();

  // Ajoutez le modèle à la scène
  scene.add(model);

  // Ajoutez de la lumière
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 10, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(0, 0, 10);
  scene.add(dirLight);

  // Créez une caméra
  const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  camera.position.set(0, 1, 5); // Ajustez la valeur de la coordonnée Y pour positionner la caméra plus haut

  // Créez un moteur de rendu
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);

  // Définissez la couleur de fond comme complètement transparente
  renderer.setClearColor(0x00000000, 0);

  // Ajoutez le moteur de rendu au conteneur HTML
  container.appendChild(renderer.domElement);

  // Définissez la propriété transparente du conteneur HTML sur true
  container.style.background = 'transparent';

  // Mettez à jour la logique d'animation du mixer et la position de la caméra
  function update() {
    mixer.update(clock.getDelta());

    // Mettez à jour la position horizontale de la caméra
    cameraHorizontalPosition += 0.0075; // Ajustez la vitesse de balayage selon vos besoins
    camera.position.x = Math.sin(cameraHorizontalPosition) * 2.5; // Ajustez l'amplitude du balayage selon vos besoins
  }

  // Animez le modèle si nécessaire
  function animate() {
    requestAnimationFrame(animate);

    update();

    renderer.render(scene, camera);
  }

  // Créez une instance de Clock pour la gestion du temps d'animation
  const clock = new THREE.Clock();

// Appelez la fonction animate pour démarrer l'animation
animate();
});
