Start three.js

we need 4 elements to get started

1. Scene(that will contain objects) : 무대
2. Some objects : 물체
3. A camera : 카메라
4. A renderer :

-   Objects

1. geometries
2. imported modules
3. Particles
4. Lights
5. etc

---

Mesh(Object)
어떤 물체의 베이스가 되는 삼각형 폴리콘 mesh를 나타내는 클래스 입니다.
그러니까 어떤 물체의 기본이(뼈대가) 되는 클래스이다.

Mesh는 geometry, material의 Combination이다. 즉 어떤 재질로 어떤 모양을 만들지를 선택한다.

1. geometry의 도형을 그리기 위한 무수한 점들(?)에 의해 모양을 얘기한다.
2. material은 How it looks 어떤 재일인지 어떻게 보일지

여러가지 Geometries가 있는데 그분에 '박스' 모양은 BoxGeometry이다.
사용법은
new THREE.BoxGeometry(width, height, depth);

---

Camera
카메라가 있어야지만 물체가 보이기 때문에 필수적으로 필요하다.
카메라에는 여러가지 카메라가 있지만

PerspectiveCamera : 가장 일반적인 3d 장면을 렌더링하는데 사용하는 모드이다.
이 투영모드는 사람의 눈이 보는 방식을 흉내내도록 디자인되어 있다.

---

Renderer

const renderer = new THREE.WebGLRenderer({canvas});
renderer.render(scene, camera);

이렇게 안보인다!
이유는 기본적으로 objects, camera둘다 위치를 지정해주지 않다. 그러면
기본적으로 scene에 중심에 기본위치가 되어 있고, objects내부에 카메라가 있기 때문에
우리는 object를 볼 수가 없다.
