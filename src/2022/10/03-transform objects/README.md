-   There are 4 properties to transform objects

1. position(위치)
2. scale(크기)
3. rotation(회전)
4. quaternion(?)

renderer <= 여기서 설명하기로는 take a picutre 사진을 찍는 느낌으로 설명한다.

그래서 사진찍기 전에(즉 rednerer.render()하기 전에) 얼마든지 크기 위치를 바꾸어도(소스의 순서에 상관이 없다는 얘기다. render전에만 써준다면) 상관이 없다.

--- position

-   mesh.position.distanceTo : Object와 카메라 사이의 거리를 구할 수 있다. 이거는 mesh.position.length()와 같다.
-   mesh.position.normalize : 이거는 natrue of code에서 공부한거네! 벡터의 크기를 1로 만들어 준다.
-   mesh.position.set(x, y, z) 이렇게도 위치 수정이 가능하다.

-   AxesHelper축을 보여줄 수 있는 메서드이다
-   AxesHelper(축의 길이: number);

--- scale

-   mesh.scale.set();

--- rotation

-   mesh.rotation.y = positive : 반시계반향, negative : 시계방향
-   rotation할때 주의할 점은?
    만약 x축 기준으로 방향을 돌렸을때 나머지 y,z축이 바뀌어서 x를 돌리고 난뒤 y를 돌렸을때 예상 과는 다른 방향으로 돌아 갈수 있다.
    그래서 그때는 mesh.rotation.reorder('YXZ'); 대문자로 원하는 축을 순서대로 적어주면 그 순서대로 랜더링 되어 그려 줄 수가 있다.

--- quaternion

-   이것 역시 회전이다.

--- lookAt();
카메라의 시점을 이동할 수 있다.

--- group
여러 object들을 묶을 수 있다.

const group = new THREE.Group();

그룹은 반드시 scene에 추가를 해주어야 한다.
scene.add(group);

그리고 object들을 add시켜서 그룹으로 만들어 준다.
group.add(object);
