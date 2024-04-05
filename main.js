const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF} from "./libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './assets/targets/targets.mind',
        });

        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const fly = await loadGLTF("./assets/models/fly/scene.gltf");
        fly.scene.scale.set(10, 10, 10);
        fly.scene.position.set(0, 0, 0);

        const flyAnchor = mindarThree.addAnchor(0);
        flyAnchor.group.add(fly.scene);

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }
    start();
});