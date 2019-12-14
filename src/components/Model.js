import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class Model {
  options = {};
  constructor(base, parent, options) {
    console.log('Model', this);
    this.options = {...this.options, ...options};
    this.loader = new GLTFLoader();
    if (options.decoder) {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(options.decoder);
      this.loader.setDRACOLoader(dracoLoader);
    }
    this.load(base, parent, options.path, options.scale, options.name, options.offset, options.selectable);
  }

  load(base, parent, path, scale, name, offset = 0, selectable = false) {
    this.loader.load(path, (gltf) => {
      console.log('gltf', gltf);
      gltf.scene.scale.set(scale, scale, scale);
      parent.addModel(gltf.scene, name, offset);
      if (selectable && base.addSelectable) {
        base.addSelectable(gltf.scene);
      }
      if (gltf.animations && base.addAnimation) {
        base.addAnimation(gltf.scene, gltf);
      }
      // if (gltf.cameras) {
      //   base.addCamera(gltf.cameras[0]);
      // }
    });
  }
}
