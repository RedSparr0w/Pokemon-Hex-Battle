var allPokemon = {Bulbasaur:{dex:"001"},Ivysaur:{dex:"002"},Venusaur:{dex:"003"},Charmander:{dex:"004"},Charmeleon:{dex:"005"},Charizard:{dex:"006"},Squirtle:{dex:"007"},Wartortle:{dex:"008"},Blastoise:{dex:"009"},Caterpie:{dex:"010"},Metapod:{dex:"011"},Butterfree:{dex:"012"},Weedle:{dex:"013"},Kakuna:{dex:"014"},Beedrill:{dex:"015"},Pidgey:{dex:"016"},Pidgeotto:{dex:"017"},Pidgeot:{dex:"018"},Rattata:{dex:"019"},Raticate:{dex:"020"},Spearow:{dex:"021"},Fearow:{dex:"022"},Ekans:{dex:"023"},Arbok:{dex:"024"},Pikachu:{dex:"025"},Raichu:{dex:"026"},Sandshrew:{dex:"027"},Sandslash:{dex:"028"},"Nidoran♀":{dex:"029"},Nidorina:{dex:"030"},Nidoqueen:{dex:"031"},"Nidoran♂":{dex:"032"},Nidorino:{dex:"033"},Nidoking:{dex:"034"},Clefairy:{dex:"035"},Clefable:{dex:"036"},Vulpix:{dex:"037"},Ninetales:{dex:"038"},Jigglypuff:{dex:"039"},Wigglytuff:{dex:"040"},Zubat:{dex:"041"},Golbat:{dex:"042"},Oddish:{dex:"043"},Gloom:{dex:"044"},Vileplume:{dex:"045"},Paras:{dex:"046"},Parasect:{dex:"047"},Venonat:{dex:"048"},Venomoth:{dex:"049"},Diglett:{dex:"050"},Dugtrio:{dex:"051"},Meowth:{dex:"052"},Persian:{dex:"053"},Psyduck:{dex:"054"},Golduck:{dex:"055"},Mankey:{dex:"056"},Primeape:{dex:"057"},Growlithe:{dex:"058"},Arcanine:{dex:"059"},Poliwag:{dex:"060"},Poliwhirl:{dex:"061"},Poliwrath:{dex:"062"},Abra:{dex:"063"},Kadabra:{dex:"064"},Alakazam:{dex:"065"},Machop:{dex:"066"},Machoke:{dex:"067"},Machamp:{dex:"068"},Bellsprout:{dex:"069"},Weepinbell:{dex:"070"},Victreebel:{dex:"071"},Tentacool:{dex:"072"},Tentacruel:{dex:"073"},Geodude:{dex:"074"},Graveler:{dex:"075"},Golem:{dex:"076"},Ponyta:{dex:"077"},Rapidash:{dex:"078"},Slowpoke:{dex:"079"},Slowbro:{dex:"080"},Magnemite:{dex:"081"},Magneton:{dex:"082"},"Farfetch'd":{dex:"083"},Doduo:{dex:"084"},Dodrio:{dex:"085"},Seel:{dex:"086"},Dewgong:{dex:"087"},Grimer:{dex:"088"},Muk:{dex:"089"},Shellder:{dex:"090"},Cloyster:{dex:"091"},Gastly:{dex:"092"},Haunter:{dex:"093"},Gengar:{dex:"094"},Onix:{dex:"095"},Drowzee:{dex:"096"},Hypno:{dex:"097"},Krabby:{dex:"098"},Kingler:{dex:"099"},Voltorb:{dex:"100"},Electrode:{dex:"101"},Exeggcute:{dex:"102"},Exeggutor:{dex:"103"},Cubone:{dex:"104"},Marowak:{dex:"105"},Hitmonlee:{dex:"106"},Hitmonchan:{dex:"107"},Lickitung:{dex:"108"},Koffing:{dex:"109"},Weezing:{dex:"110"},Rhyhorn:{dex:"111"},Rhydon:{dex:"112"},Chansey:{dex:"113"},Tangela:{dex:"114"},Kangaskhan:{dex:"115"},Horsea:{dex:"116"},Seadra:{dex:"117"},Goldeen:{dex:"118"},Seaking:{dex:"119"},Staryu:{dex:"120"},Starmie:{dex:"121"},"Mr  Mime":{dex:"122"},Scyther:{dex:"123"},Jynx:{dex:"124"},Electabuzz:{dex:"125"},Magmar:{dex:"126"},Pinsir:{dex:"127"},Tauros:{dex:"128"},Magikarp:{dex:"129"},Gyarados:{dex:"130"},Lapras:{dex:"131"},Ditto:{dex:"132"},Eevee:{dex:"133"},Vaporeon:{dex:"134"},Jolteon:{dex:"135"},Flareon:{dex:"136"},Porygon:{dex:"137"},Omanyte:{dex:"138"},Omastar:{dex:"139"},Kabuto:{dex:"140"},Kabutops:{dex:"141"},Aerodactyl:{dex:"142"},Snorlax:{dex:"143"},Articuno:{dex:"144"},Zapdos:{dex:"145"},Moltres:{dex:"146"},Dratini:{dex:"147"},Dragonair:{dex:"148"},Dragonite:{dex:"149"},Mewtwo:{dex:"150"},Mew:{dex:"151"},"Substitute Doll":{dex:"000"}};

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
