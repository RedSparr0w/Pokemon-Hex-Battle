function getMTL(url){
  url = url.split('/');
  file = url.pop();
  path = url.join('/');
  return new Promise(resolve => {
    new THREE.MTLLoader()
      .setPath( `${path}/` )
      .load( `${file}.mtl`, function ( materials ) {
        materials.preload();
        resolve(materials);
      });
  });
}

function getOBJ(url, material){
  return new Promise(resolve => {
    new THREE.OBJLoader()
      .setMaterials( material )
      .load( `${url}.obj`, function(obj){
        resolve(obj);
      });
  });
}

class Model {
  constructor(settings){
    // Default config options
    var config = {
      material: null,
      url: null,
      container: null,
      texture: null,
      scale: 3,
      highlight: 'rgb(0, 168, 228)',
      heightOffset: 0.5, // how high off the board this object sits
      obstacle: false,
      tile: false,
      rotation: 0,
    };
    // attribute override
    config = vg.Tools.merge(config, settings);

    this.material = config.material;
    this.geo = config.geo;
    this.url = config.url;
    this.container = config.container;
    this.texture = config.texture;
    this.scale = config.scale;
    this.highlight = config.highlight;
    this.heightOffset = config.heightOffset;
    this.obstacle = config.obstacle;
    this.tile = config.tile;
    this.rotation = config.rotation;

    // other objects like the SelectionManager expect these on all objects that are added to the scene
    this.active = false;
    this.uniqueId = vg.Tools.generateID();
    this.objectType = 'Model';


    // sanity checks
    if (!this.url) {
      console.error('[Model] Must provide a .mtl file');
    }
  }

  async init(){
    if (!this.material)
      this.material = await getMTL(this.url);
    if (!this.obj)
      this.obj = await getOBJ(this.url, this.material);
    this.obj.scale.set(this.scale, this.scale, this.scale);
    this.obj.rotation.y = this.rotation;
    this.obj.heightOffset = this.heightOffset;
    let structure = this;
    this.obj.traverse(function(child) {
      if (child instanceof THREE.Mesh){
        child.material.specular.set('#000');
        child.userData.structure = structure;
      }
    });
    let highlight = this.highlight;
    this.obj.select = ()=>{this.select()};
    this.obj.deselect = ()=>{this.deselect()};
  }

  addToScene(tile) {
    this.container.add(this.obj);
    board.setEntityOnTile(this.obj, tile || board.getRandomTile());
  }
  // When clicked/selected
  select(){
    console.debug(`You selected a model`);
  }
  deselect(){
    console.debug(`Deselected model`);
  }
}
