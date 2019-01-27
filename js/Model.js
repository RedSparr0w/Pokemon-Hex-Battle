
const addModel = function(settings, pokemon = 'Bulbasaur', shiny){
	var config = {
		material: null,
		url: null,
		container: null,
		texture: null,
		scale: 3,
		highlight: 'rgb(0, 168, 228)',
		heightOffset: 0.5, // how high off the board this object sits
		obstacle: false
	};
	// attribute override
	config = {...config, ...settings};

	this.material = config.material;
	this.geo = config.geo;
	this.url = config.url;
	this.container = config.container;
	this.texture = config.texture;
	this.scale = config.scale;
	this.highlight = config.highlight;
	this.heightOffset = config.heightOffset;
	this.obstacle = config.obstacle;

	return new Promise(resolve => {
		shiny = !!( shiny != undefined ? shiny : Math.random() < 0.1 );
    new THREE.MTLLoader()
      .setPath( `obj/${pokemon.toLowerCase()}/` )
      .load( `${allPokemon[pokemon].dex} - ${pokemon}${shiny ? ' - Shiny' : ''}.mtl`, function ( materials ) {
        materials.preload();
				new THREE.OBJLoader()
					.setMaterials( materials )
          .setPath( `obj/${pokemon.toLowerCase()}/` )
          .load( `${allPokemon[pokemon].dex} - ${pokemon}${shiny ? ' - Shiny' : ''}.obj`, function(obj){
            obj.scale.set(scale, scale, scale);
						obj.heightOffset = this.heightOffset;
            obj.select = function(){
								obj = this;
								obj.traverse(function(child) {
								    if (child instanceof THREE.Mesh){
											child.material.color.set(this.highlight);
								    }
								});
							};
						obj.deselect = function() {
								obj = this;
								obj.traverse(function(child) {
								    if (child instanceof THREE.Mesh){
											child.material.color.set('rgb(255, 255, 255)');
								    }
								});
							};
          	this.container.add(obj);
						board.setEntityOnTile(obj, board.getRandomTile());
						objects.push(obj);
						resolve(obj);
					});
      });
	});
}
