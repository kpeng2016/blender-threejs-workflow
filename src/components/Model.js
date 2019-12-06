import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class Model {
  options = {};
  constructor(base, globe, options) {
    console.log('Model', this);
    this.options = {...this.options, ...options};
    this.loader = new GLTFLoader();
    if (options.decoder) {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(options.decoder);
      this.loader.setDRACOLoader(dracoLoader);
    }
    this.load(base, globe, options.path, options.scale, options.offset);
  }

  load(base, globe, path, scale, offset = 0) {
    this.loader.load(path, (gltf) => {
      gltf.scene.scale.set(scale, scale, scale);
      globe.addModel(gltf.scene, offset);
      if (gltf.animations) {
        base.addAnimation(gltf.scene, gltf);
      }
    });
  }
}
