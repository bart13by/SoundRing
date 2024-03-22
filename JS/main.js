//main.js

const domParser = new DOMParser();
const RUNTIME = { current_month: 0, 
				  interval_id: 0, 
				  app_started: false, 
				  audio_playing: false,
				  is_seeking: false };
var JSONBIRDDATA = `
{
	"0":{"id":2841,"universalSpeciesId":"2","name":"Bald Eagle","scientificName":"Haliaeetus leucocephalus","presence":"3, 4","arrival":"3","departure":"4","bodymass":"4130","appearance":"Rare","migratoryStatus":null},"1":{"id":2842,"universalSpeciesId":"3","name":"Sharp-shinned Hawk","scientificName":"Accipiter striatus","presence":"3, 4, 5; 9, 10","arrival":"3; 9","departure":"5; 10","bodymass":"103","appearance":"Common","migratoryStatus":null},"2":{"id":2843,"universalSpeciesId":"4","name":"Osprey","scientificName":"Pandion haliaetus","presence":"4, 5; 9, 10","arrival":"4; 9","departure":"5; 10","bodymass":"1403","appearance":"Rare","migratoryStatus":null},"3":{"id":2844,"universalSpeciesId":"5","name":"Cooper's Hawk","scientificName":"Accipiter cooperii","presence":"4, 5, 6, 7, 8, 9, 10","arrival":"4","departure":"10","bodymass":"349","appearance":"Common","migratoryStatus":null},"4":{"id":2845,"universalSpeciesId":"6","name":"Northern Goshawk","scientificName":"Accipiter gentilis","presence":"9, 10, 11","arrival":"9","departure":"11","bodymass":"912","appearance":"Common","migratoryStatus":null},"5":{"id":2846,"universalSpeciesId":"7","name":"Northern Harrier","scientificName":"Circus cyaneus","presence":"3, 4, 5, 6, 7, 8, 9, 10","arrival":"3","departure":"10","bodymass":"350","appearance":"Common","migratoryStatus":null},"6":{"id":2847,"universalSpeciesId":"8","name":"Rough-legged Hawk","scientificName":"Buteo lagopus","presence":"11, 12, 1, 2, 3","arrival":"11","departure":"3","bodymass":"847","appearance":"Common","migratoryStatus":null},"7":{"id":2848,"universalSpeciesId":"9","name":"Red-shouldered Hawk","scientificName":"Buteo lineatus","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"544","appearance":"Common","migratoryStatus":null},"8":{"id":2849,"universalSpeciesId":"10","name":"Broad-winged Hawk","scientificName":"Buteo platypterus","presence":"4, 5, 6, 7, 8, 9, 10","arrival":"4","departure":"10","bodymass":"420","appearance":"Rare","migratoryStatus":null},"9":{"id":2850,"universalSpeciesId":"11","name":"Canada Goose","scientificName":"Branta canadensis","presence":"3, 4, 5; 11","arrival":"3; 11","departure":"5; 11","bodymass":"3814","appearance":"Common","migratoryStatus":null},"11":{"id":2852,"universalSpeciesId":"13","name":"Gadwall","scientificName":"Anas strepera","presence":"10, 11","arrival":"10","departure":"11","bodymass":"968","appearance":"Rare","migratoryStatus":null},"13":{"id":2854,"universalSpeciesId":"15","name":"American Black Duck","scientificName":"Anas rubripes","presence":"3, 4, 5; 10, 11","arrival":"3; 10","departure":"5; 11","bodymass":"1400","appearance":"Rare","migratoryStatus":null},"14":{"id":2855,"universalSpeciesId":"16","name":"Wood Duck","scientificName":"Aix sponsa","presence":"4, 5, 6, 7, 8, 9, 10","arrival":"4","departure":"10","bodymass":"681","appearance":"Common","migratoryStatus":null},"15":{"id":2856,"universalSpeciesId":"17","name":"Mallard","scientificName":"Anas platyrhynchos","presence":"3, 4, 5; 8, 9, 10, 11, 12","arrival":"3; 8","departure":"5; 12","bodymass":"1246","appearance":"Rare","migratoryStatus":null},"16":{"id":2857,"universalSpeciesId":"18","name":"Green-winged Teal","scientificName":"Anas crecca","presence":"4; 9","arrival":"4; 9","departure":"4; 9","bodymass":"364","appearance":"Rare","migratoryStatus":null},"17":{"id":2858,"universalSpeciesId":"19","name":"Blue-winged Teal","scientificName":"Anas discors","presence":"4, 5; 9, 10 ","arrival":"4; 9","departure":"5; 10","bodymass":"380","appearance":"Uncommon","migratoryStatus":null},"18":{"id":2859,"universalSpeciesId":"20","name":"Northern Shoveler","scientificName":"Anas clypeata","presence":"9, 10, 11, 12","arrival":"9","departure":"12","bodymass":"636","appearance":"Rare","migratoryStatus":null},"22":{"id":2863,"universalSpeciesId":"24","name":"Common Merganser","scientificName":"Mergus merganser","presence":"4, 5; 10, 11","arrival":"4; 10","departure":"5; 11","bodymass":"1709","appearance":"Common","migratoryStatus":null},"23":{"id":2864,"universalSpeciesId":"25","name":"Red-breasted Merganser","scientificName":"Mergus serrator","presence":"3, 4, 5; 11, 12, 1, 2","arrival":"3; 11","departure":"5; 2","bodymass":"1135","appearance":"Uncommon","migratoryStatus":null},"24":{"id":2865,"universalSpeciesId":"26","name":"Hooded Merganser","scientificName":"Lophodytes cucullatus","presence":"3, 4; 10, 11","arrival":"3; 10","departure":"4; 11","bodymass":"554","appearance":"Common","migratoryStatus":null},"25":{"id":2866,"universalSpeciesId":"27","name":"Common Nighthawk","scientificName":"Chordeiles minor","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"79.3","appearance":"Common","migratoryStatus":null},"26":{"id":2867,"universalSpeciesId":"28","name":"Eastern Whip-poor-will","scientificName":"Antrostomus vociferus","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"50.3","appearance":"Common","migratoryStatus":null},"27":{"id":2868,"universalSpeciesId":"29","name":"Ruby-throated Hummingbird","scientificName":"Archilochus colubris","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"2.9","appearance":"Common","migratoryStatus":null},"28":{"id":2869,"universalSpeciesId":"30","name":"Chimney Swift","scientificName":"Chaetura pelagica","presence":"4, 5, 6, 7, 8, 9, 10","arrival":"4","departure":"10","bodymass":"23.6","appearance":"Common","migratoryStatus":null},"31":{"id":2872,"universalSpeciesId":"33","name":"Killdeer","scientificName":"Charadrius vociferus","presence":" 8, 9, 10, 11","arrival":"8","departure":"11","bodymass":"92.1","appearance":"Rare","migratoryStatus":null},"33":{"id":2874,"universalSpeciesId":"35","name":"Spotted Sandpiper","scientificName":"Actitis macularius","presence":"4, 5, 6, 7, 8, 9","arrival":"4","departure":"9","bodymass":"40.4","appearance":"Common","migratoryStatus":null},"34":{"id":2875,"universalSpeciesId":"36","name":"Upland Sandpiper","scientificName":"Bartramia longicauda","presence":"5, 6, 7, 8, 9, 10","arrival":"5","departure":"10","bodymass":"154","appearance":"Uncommon","migratoryStatus":null},"35":{"id":2876,"universalSpeciesId":"37","name":"Wilson's Snipe","scientificName":"Gallinago delicata","presence":"4, 5; 9, 10","arrival":"4; 9","departure":"5; 10","bodymass":"128","appearance":"Uncommon","migratoryStatus":null},"36":{"id":2877,"universalSpeciesId":"38","name":"American Woodcock","scientificName":"Scolopax minor","presence":"3, 4, 5, 6, 7, 8, 9, 10, 11","arrival":"3","departure":"11","bodymass":"176","appearance":"Uncommon","migratoryStatus":null},"41":{"id":2882,"universalSpeciesId":"43","name":"Mourning Dove","scientificName":"Zenaida macroura","presence":"3, 4, 5, 6, 7, 8, 9, 10","arrival":"3","departure":"10","bodymass":"123","appearance":"Common","migratoryStatus":null},"43":{"id":2884,"universalSpeciesId":"45","name":"Belted Kingfisher","scientificName":"Megaceryle alcyon","presence":"3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":"3","departure":"12","bodymass":"148","appearance":"Uncommon","migratoryStatus":null},"44":{"id":2885,"universalSpeciesId":"46","name":"Yellow-billed Cuckoo","scientificName":"Coccyzus americanus","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"64","appearance":"Uncommon","migratoryStatus":null},"45":{"id":2886,"universalSpeciesId":"47","name":"Black-billed Cuckoo","scientificName":"Coccyzus erythropthalmus","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"50.9","appearance":"Common","migratoryStatus":null},"46":{"id":2887,"universalSpeciesId":"48","name":"American Kestrel","scientificName":"Falco sparverius","presence":"3, 4, 5, 6, 7, 8, 9, 10","arrival":"3","departure":"10","bodymass":"113","appearance":"Common","migratoryStatus":null},"47":{"id":2888,"universalSpeciesId":"49","name":"Merlin","scientificName":"Falco columbarius","presence":"4; 9, 10","arrival":"4; 9","departure":"4; 10","bodymass":"163","appearance":"Rare","migratoryStatus":null},"48":{"id":2889,"universalSpeciesId":"50","name":"Ruffed Grouse","scientificName":"Bonasa umbellus","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"566","appearance":"Common","migratoryStatus":null},"51":{"id":2892,"universalSpeciesId":"53","name":"Northern Bobwhite","scientificName":"Colinus virginianus","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"178","appearance":"Uncommon","migratoryStatus":null},"52":{"id":2893,"universalSpeciesId":"54","name":"Common Loon","scientificName":"Gavia immer","presence":"3, 4, 5; 9, 10, 11","arrival":"3; 9","departure":"5; 11","bodymass":"5974","appearance":"Rare","migratoryStatus":null},"53":{"id":2894,"universalSpeciesId":"55","name":"American Coot","scientificName":"Fulica americana","presence":"4, 5; 9, 10, 11, 12","arrival":"4; 9","departure":"5; 12","bodymass":"724","appearance":"Rare","migratoryStatus":null},"55":{"id":2896,"universalSpeciesId":"57","name":"Virginia Rail","scientificName":"Rallus limicola","presence":"4, 5, 6, 7, 8, 9, 10, 11","arrival":"4","departure":"11","bodymass":"84.1","appearance":"Common","migratoryStatus":null},"56":{"id":2897,"universalSpeciesId":"58","name":"Sora","scientificName":"Porzana carolina","presence":"5, 6, 7, 8, 9, 10, 11","arrival":"5","departure":"11","bodymass":"74.8","appearance":"Uncommon","migratoryStatus":null},"57":{"id":2898,"universalSpeciesId":"59","name":"Olive-sided Flycatcher","scientificName":"Contopus borealis","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"10","appearance":"Common","migratoryStatus":null},"58":{"id":2899,"universalSpeciesId":"60","name":"Eastern Wood-Pewee","scientificName":"Contopus virens","presence":"5, 6, 7, 8. 9","arrival":"5","departure":"9","bodymass":"12.6","appearance":"Common","migratoryStatus":null},"60":{"id":2901,"universalSpeciesId":"62","name":"Least Flycatcher","scientificName":"Empidonax minimus","presence":"4, 5, 6, 7, 8, 9","arrival":"4","departure":"9","bodymass":"13.1","appearance":"Common","migratoryStatus":null},"62":{"id":2903,"universalSpeciesId":"64","name":"Alder Flycatcher","scientificName":"Empidonax traillii","presence":"5, 6, 7, 8","arrival":"5","departure":"8","bodymass":"12.7","appearance":"Uncommon","migratoryStatus":null},"63":{"id":2904,"universalSpeciesId":"65","name":"Eastern Phoebe","scientificName":"Sayornis phoebe","presence":"2, 3, 4, 5, 6, 7, 8, 9, 10, 11","arrival":"2","departure":"11","bodymass":"19.7","appearance":"Common","migratoryStatus":null},"64":{"id":2905,"universalSpeciesId":"66","name":"Great-crested Flycatcher","scientificName":"Myiarchus crinitus","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"32.1","appearance":"Uncommon","migratoryStatus":null},"65":{"id":2906,"universalSpeciesId":"67","name":"Northern Shrike","scientificName":"Lanius borealis","presence":"11, 12, 1, 2, 3, 4","arrival":"11","departure":"4","bodymass":"63.4","appearance":"Uncommon","migratoryStatus":null},"66":{"id":2907,"universalSpeciesId":"68","name":"Eastern Kingbird","scientificName":"Tyrannus tyrannus","presence":"4, 5, 6, 7, 8, 9","arrival":"4","departure":"9","bodymass":"38","appearance":"Common","migratoryStatus":null},"67":{"id":2908,"universalSpeciesId":"69","name":"White-eyed Vireo","scientificName":"Vireo griseus","presence":"5","arrival":"5","departure":"5","bodymass":"11.4","appearance":"Rare","migratoryStatus":null},"68":{"id":2909,"universalSpeciesId":"70","name":"Yellow-throated Vireo","scientificName":"Vireo flavifrons","presence":"5","arrival":"5","departure":"5","bodymass":"18","appearance":"Common","migratoryStatus":null},"69":{"id":2910,"universalSpeciesId":"71","name":"Blue-headed Vireo","scientificName":"Vireo solitarius","presence":"4, 5, 6, 7, 8, 9, 10","arrival":"4","departure":"10","bodymass":"15.3","appearance":"Common","migratoryStatus":null},"70":{"id":2911,"universalSpeciesId":"72","name":"Red-eyed Vireo","scientificName":"Vireo olivaceus","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"16.8","appearance":"Common","migratoryStatus":null},"71":{"id":2912,"universalSpeciesId":"73","name":"Warbling Vireo","scientificName":"Vireo gilvus","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"11.9","appearance":"Uncommon","migratoryStatus":null},"72":{"id":2913,"universalSpeciesId":"74","name":"Blue Jay","scientificName":"Cyanocitta cristata","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"88","appearance":"Common","migratoryStatus":null},"74":{"id":2915,"universalSpeciesId":"76","name":"American Crow","scientificName":"Corvus brachyrhynchos","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"538","appearance":"Common","migratoryStatus":null},"76":{"id":2917,"universalSpeciesId":"78","name":"Tree Swallow","scientificName":"Tachycineta bicolor","presence":"4, 5, 6, 7, 8, 9","arrival":"4","departure":"9","bodymass":"39.3","appearance":"Common","migratoryStatus":null},"77":{"id":2918,"universalSpeciesId":"79","name":"Bank Swallow","scientificName":"Riparia riparia","presence":"5, 6, 7, 8","arrival":"5","departure":"8","bodymass":"32.2","appearance":"Common","migratoryStatus":null},"78":{"id":2919,"universalSpeciesId":"80","name":"Northern Rough-winged Swallow","scientificName":"Stelgidopteryx serripennis","presence":"5","arrival":"5","departure":"5","bodymass":"15.9","appearance":"Rare","migratoryStatus":null},"79":{"id":2920,"universalSpeciesId":"81","name":"Purple Martin","scientificName":"Progne subis","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"53.5","appearance":"Rare","migratoryStatus":null},"80":{"id":2921,"universalSpeciesId":"82","name":"Barn Swallow","scientificName":"Hirundo rustica","presence":"4, 5, 6, 7, 8, 9","arrival":"4","departure":"9","bodymass":"18.1","appearance":"Common","migratoryStatus":null},"81":{"id":2922,"universalSpeciesId":"83","name":"Black-capped Chickadee","scientificName":"Poecile atricapillus","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"10.8","appearance":"Common","migratoryStatus":null},"83":{"id":2924,"universalSpeciesId":"85","name":"Red-breasted Nuthatch","scientificName":"Sitta canadensis","presence":"11, 12, 1, 2, 3, 4","arrival":"11","departure":"4","bodymass":"9.8","appearance":"Rare","migratoryStatus":null},"84":{"id":2925,"universalSpeciesId":"86","name":"Brown Creeper","scientificName":"Certhia americana","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"8.1","appearance":"Common","migratoryStatus":null},"85":{"id":2926,"universalSpeciesId":"87","name":"White-breasted Nuthatch","scientificName":"Sitta carolinensis","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"21","appearance":"Common","migratoryStatus":null},"86":{"id":2927,"universalSpeciesId":"88","name":"House Wren","scientificName":"Troglodytes aedon","presence":"4, 5, 6, 7, 8, 9","arrival":"4","departure":"9","bodymass":"10.8","appearance":"Uncommon","migratoryStatus":null},"87":{"id":2928,"universalSpeciesId":"89","name":"Winter Wren","scientificName":"Troglodytes hiemalis","presence":"4; 10","arrival":"4; 10","departure":"4; 10","bodymass":"8.9","appearance":"Rare","migratoryStatus":null},"89":{"id":2930,"universalSpeciesId":"91","name":"Marsh Wren","scientificName":"Cistothorus palustris","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"11.9","appearance":"Common","migratoryStatus":null},"91":{"id":2932,"universalSpeciesId":"93","name":"Ruby-crowned Kinglet","scientificName":"Regulus calendula","presence":"4, 5; 10, 11","arrival":"4; 10","departure":"5; 11","bodymass":"6.5","appearance":"Common","migratoryStatus":null},"92":{"id":2933,"universalSpeciesId":"94","name":"Golden-crowned Kinglet","scientificName":"Regulus satrapa","presence":"10, 11, 12, 1, 2, 3, 4","arrival":"10","departure":"4","bodymass":"6.3","appearance":"Common","migratoryStatus":null},"93":{"id":2934,"universalSpeciesId":"95","name":"Bluebird","scientificName":"Sialia sialis","presence":"3, 4, 5, 6,  7, 8, 9, 10","arrival":"3","departure":"10","bodymass":"27.5","appearance":"Common","migratoryStatus":null},"95":{"id":2936,"universalSpeciesId":"97","name":"Swainson's Thrush","scientificName":"Catharus ustulatus","presence":"5; 9","arrival":"5; 9","departure":"5; 9","bodymass":"30.3","appearance":"Rare","migratoryStatus":null},"96":{"id":2937,"universalSpeciesId":"98","name":"Veery","scientificName":"Catharus fuscescens","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"31.9","appearance":"Common","migratoryStatus":null},"97":{"id":2938,"universalSpeciesId":"99","name":"Hermit Thrush","scientificName":"Catharus guttatus","presence":"4, 5; 10","arrival":"4; 10","departure":"5; 10","bodymass":"30.1","appearance":"Common","migratoryStatus":null},"98":{"id":2939,"universalSpeciesId":"100","name":"American Robin","scientificName":"Turdus migratorius","presence":"2, 3, 4, 5, 6, 7, 8, 9, 10, 11","arrival":"2","departure":"11","bodymass":"78.5","appearance":"Common","migratoryStatus":null},"99":{"id":2940,"universalSpeciesId":"101","name":"Wood Thrush","scientificName":"Hylocichla mustelina","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"47.8","appearance":"Uncommon","migratoryStatus":null},"100":{"id":2941,"universalSpeciesId":"102","name":"Brown Thrasher","scientificName":"Toxostoma rufum","presence":"4, 5, 6, 7, 8, 9, 10","arrival":"4","departure":"10","bodymass":"68.8","appearance":"Common","migratoryStatus":null},"101":{"id":2942,"universalSpeciesId":"103","name":"Gray Catbird","scientificName":"Dumetella carolinensis","presence":"5, 6, 7, 8, 9, 10, 11","arrival":"5","departure":"11","bodymass":"35.3","appearance":"Common","migratoryStatus":null},"102":{"id":2943,"universalSpeciesId":"104","name":"Northern Mockingbird","scientificName":"Mimus polyglottos","presence":"4; 6; 12","arrival":"4; 6; 12","departure":"4; 6; 12","bodymass":"48.5","appearance":"Rare","migratoryStatus":null},"103":{"id":2944,"universalSpeciesId":"105","name":"Cedar Waxwing","scientificName":"Bombycilla cedrorum","presence":"2, 3, 4, 5, 6, 7, 8, 9, 10","arrival":"2","departure":"10","bodymass":"30.6","appearance":"Common","migratoryStatus":null},"105":{"id":2946,"universalSpeciesId":"107","name":"Golden-winged Warbler","scientificName":"Vermivora chrysoptera","presence":"5","arrival":"5","departure":"5","bodymass":"8.9","appearance":"Rare","migratoryStatus":null},"107":{"id":2948,"universalSpeciesId":"109","name":"Tennessee Warbler","scientificName":"Oreothlypis peregrina","presence":"5, 6; 8, 9, 10","arrival":"5; 8","departure":"6; 10","bodymass":"9.6","appearance":"Rare","migratoryStatus":null},"108":{"id":2949,"universalSpeciesId":"110","name":"Nashville Warbler","scientificName":"Oreothlypis ruficapilla","presence":"5; 9","arrival":"5; 9","departure":"5; 9","bodymass":"8.3","appearance":"Common","migratoryStatus":null},"109":{"id":2950,"universalSpeciesId":"111","name":"Northern Parula","scientificName":"Setophaga americana","presence":"5; 9, 10","arrival":"5; 9","departure":"5; 10","bodymass":"8.6","appearance":"Common","migratoryStatus":null},"110":{"id":2951,"universalSpeciesId":"112","name":"Yellow Warbler","scientificName":"Setophaga petechia","presence":"4, 5, 6, 7, 8, 9","arrival":"4","departure":"9","bodymass":"9.6","appearance":"Common","migratoryStatus":null},"111":{"id":2952,"universalSpeciesId":"113","name":"Chestnut-sided Warbler","scientificName":"Setophaga pensylvanica","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"9.5","appearance":"Common","migratoryStatus":null},"112":{"id":2953,"universalSpeciesId":"114","name":"Magnolia Warbler","scientificName":"Setophaga magnolia","presence":"5; 9","arrival":"5; 9","departure":"5; 9","bodymass":"8.4","appearance":"Uncommon","migratoryStatus":null},"113":{"id":2954,"universalSpeciesId":"115","name":"Black-throated Blue Warbler","scientificName":"Setophaga caerulescens","presence":"5; 9","arrival":"5; 9","departure":"5; 9","bodymass":"10.5","appearance":"Common","migratoryStatus":null},"114":{"id":2955,"universalSpeciesId":"116","name":"Yellow-rumped Warbler","scientificName":"Setophaga coronata","presence":"4, 5; 9, 10","arrival":"4; 9","departure":"5; 10","bodymass":"12.2","appearance":"Common","migratoryStatus":null},"115":{"id":2956,"universalSpeciesId":"117","name":"Black-throated Green Warbler","scientificName":"Setophaga virens","presence":"5, 6; 9, 10","arrival":"5; 9","departure":"6; 10","bodymass":"8.9","appearance":"Common","migratoryStatus":null},"116":{"id":2957,"universalSpeciesId":"118","name":"Blackburnian Warbler","scientificName":"Setophaga fusca","presence":"5; 9","arrival":"5; 9","departure":"5; 9","bodymass":"10","appearance":"Uncommon","migratoryStatus":null},"117":{"id":2958,"universalSpeciesId":"119","name":"Pine Warbler","scientificName":"Setophaga pinus","presence":"4, 5","arrival":"4","departure":"5","bodymass":"11.9","appearance":"Common","migratoryStatus":null},"118":{"id":2959,"universalSpeciesId":"120","name":"Palm Warbler","scientificName":"Setophaga palmarum","presence":"4, 5; 9","arrival":"4; 9","departure":"5; 9","bodymass":"10.3","appearance":"Common","migratoryStatus":null},"119":{"id":2960,"universalSpeciesId":"121","name":"Prairie Warbler","scientificName":"Setophaga discolor","presence":"5","arrival":"5","departure":"5","bodymass":"8","appearance":"Uncommon","migratoryStatus":null},"121":{"id":2962,"universalSpeciesId":"123","name":"American Redstart","scientificName":"Setophaga ruticilla","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"8.4","appearance":"Common","migratoryStatus":null},"122":{"id":2963,"universalSpeciesId":"124","name":"Black-and-White Warbler","scientificName":"Mniotilta varia","presence":"4, 5, 6, 7, 8, 9 ","arrival":"4","departure":"9","bodymass":"10.9","appearance":"Common","migratoryStatus":null},"123":{"id":2964,"universalSpeciesId":"125","name":"Cerulean Warbler","scientificName":"Dendroica cerulea","presence":"5","arrival":"5","departure":"5","bodymass":"9.3","appearance":"Rare","migratoryStatus":null},"125":{"id":2966,"universalSpeciesId":"127","name":"Ovenbird","scientificName":"Seiurus aurocapilla","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"18.8","appearance":"Common","migratoryStatus":null},"126":{"id":2967,"universalSpeciesId":"128","name":"Louisiana Waterthrush","scientificName":"Parkesia motacilla","presence":"5; 7","arrival":"5; 7","departure":"5; 7","bodymass":"19.9","appearance":"Rare","migratoryStatus":null},"127":{"id":2968,"universalSpeciesId":"129","name":"Northern Waterthrush","scientificName":"Parkesia noveboracensis","presence":"4, 5","arrival":"4","departure":"5","bodymass":"16.3","appearance":"Rare","migratoryStatus":null},"128":{"id":2969,"universalSpeciesId":"130","name":"Prothonotary Warbler","scientificName":"Protonotaria citrea","presence":"5","arrival":"5","departure":"5","bodymass":"13.9","appearance":"Rare","migratoryStatus":null},"130":{"id":2971,"universalSpeciesId":"132","name":"Mourning Warbler","scientificName":"Geothlypis philadelphia","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"12","appearance":"Rare","migratoryStatus":null},"131":{"id":2972,"universalSpeciesId":"133","name":"Common Yellowthroat","scientificName":"Geothlypis trichas","presence":"5, 6, 7, 8, 9, 10","arrival":"5","departure":"10","bodymass":"9.7","appearance":"Common","migratoryStatus":null},"133":{"id":2974,"universalSpeciesId":"135","name":"Canada Warbler","scientificName":"Cardellina canadensis","presence":"5; 9","arrival":"5; 9","departure":"5; 9","bodymass":"10.3","appearance":"Uncommon","migratoryStatus":null},"134":{"id":2975,"universalSpeciesId":"136","name":"Scarlet Tanager","scientificName":"Piranga olivacea","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"28.2","appearance":"Common","migratoryStatus":null},"135":{"id":2976,"universalSpeciesId":"137","name":"Eastern Towhee","scientificName":"Pipilo erythrophthalmus","presence":"4, 5, 6, 7, 8, 9, 10","arrival":"4","departure":"10","bodymass":"41.3","appearance":"Common","migratoryStatus":null},"136":{"id":2977,"universalSpeciesId":"138","name":"American Tree Sparrow","scientificName":"Spizelloides arborea","presence":"11, 12, 1, 2, 3, 4","arrival":"11","departure":"4","bodymass":"18.6","appearance":"Common","migratoryStatus":null},"137":{"id":2978,"universalSpeciesId":"139","name":"Chipping Sparrow","scientificName":"Spizella passerina","presence":"3, 4, 5, 6, 7, 8, 9, 10, 11","arrival":"3","departure":"11","bodymass":"12.2","appearance":"Common","migratoryStatus":null},"138":{"id":2979,"universalSpeciesId":"140","name":"Field Sparrow","scientificName":"Spizella pusilla","presence":"4, 5, 6, 7, 8, 9, 10","arrival":"4","departure":"10","bodymass":"12.5","appearance":"Common","migratoryStatus":null},"139":{"id":2980,"universalSpeciesId":"141","name":"Swamp Sparrow","scientificName":"Melospiza georgiana","presence":"4, 5, 6, 7, 8, 9, 10","arrival":"4","departure":"10","bodymass":"16.1","appearance":"Common","migratoryStatus":null},"140":{"id":2981,"universalSpeciesId":"142","name":"Savannah Sparrow","scientificName":"Passerculus sandwichensis","presence":"4, 5; 10","arrival":"4; 10","departure":"5; 10","bodymass":"20.6","appearance":"Uncommon","migratoryStatus":null},"142":{"id":2983,"universalSpeciesId":"144","name":"Vesper Sparrow","scientificName":"Pooecetes gramineus","presence":"4, 5, 6, 7, 8, 9, 10, 11","arrival":"4","departure":"11","bodymass":"26.5","appearance":"Common","migratoryStatus":null},"143":{"id":2984,"universalSpeciesId":"145","name":"Song Sparrow","scientificName":"Melospiza melodia","presence":"3, 4, 5, 6, 7, 8, 9, 10, 11","arrival":"3","departure":"11","bodymass":"20.5","appearance":"Common","migratoryStatus":null},"144":{"id":2985,"universalSpeciesId":"146","name":"White-throated Sparrow","scientificName":"Zonotrichia albicollis","presence":"4; 9, 10, 11","arrival":"4; 9","departure":"4; 11","bodymass":"24.4","appearance":"Common","migratoryStatus":null},"145":{"id":2986,"universalSpeciesId":"147","name":"Dark-eyed Junco","scientificName":"Junco hyemalis","presence":"9, 10, 11, 12, 1, 2, 3, 4, 5","arrival":"9","departure":"5","bodymass":"19.3","appearance":"Common","migratoryStatus":null},"146":{"id":2987,"universalSpeciesId":"148","name":"Snow Bunting","scientificName":"Plectrophenax nivalis","presence":"12, 1, 2","arrival":"12","departure":"2","bodymass":"42.2","appearance":"Rare","migratoryStatus":null},"148":{"id":2989,"universalSpeciesId":"150","name":"Rose-breasted Grosbeak","scientificName":"Pheucticus ludovicianus","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"42","appearance":"Uncommon","migratoryStatus":null},"150":{"id":2991,"universalSpeciesId":"152","name":"Indigo Bunting","scientificName":"Passerina cyanea","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"15","appearance":"Common","migratoryStatus":null},"151":{"id":2992,"universalSpeciesId":"153","name":"Bobolink","scientificName":"Dolichonyx oryzivorus","presence":"4, 5, 6, 7, 8, 9","arrival":"4","departure":"9","bodymass":"29.2","appearance":"Common","migratoryStatus":null},"152":{"id":2993,"universalSpeciesId":"154","name":"House Sparrow","scientificName":"Passer domesticus","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"28","appearance":"Common","migratoryStatus":null},"153":{"id":2994,"universalSpeciesId":"155","name":"Eastern Meadowlark","scientificName":"Sturnella magna","presence":"3, 4, 5, 6, 7, 8, 9, 10, 11","arrival":"3","departure":"11","bodymass":"112","appearance":"Common","migratoryStatus":null},"154":{"id":2995,"universalSpeciesId":"156","name":"Red-winged Blackbird","scientificName":"Agelaius phoeniceus","presence":"3, 4, 5, 6, 7, 8, 9, 10","arrival":"3","departure":"10","bodymass":"65.3","appearance":"Common","migratoryStatus":null},"155":{"id":2996,"universalSpeciesId":"157","name":"Common Grackle","scientificName":"Quiscalus quiscula","presence":"3, 4, 5, 6, 7, 8, 9, 10, 11","arrival":"3","departure":"11","bodymass":"120","appearance":"Common","migratoryStatus":null},"156":{"id":2997,"universalSpeciesId":"158","name":"Rusty Blackbird","scientificName":"Euphagus carolinus","presence":"3, 4; 9, 10","arrival":"3; 9","departure":"4; 10","bodymass":"64.3","appearance":"Rare","migratoryStatus":null},"157":{"id":2998,"universalSpeciesId":"159","name":"Brown-headed Cowbird","scientificName":"Molothrus ater","presence":"3, 4, 5, 6, 7, 8, 9, 10","arrival":"3","departure":"10","bodymass":"48.7","appearance":"Common","migratoryStatus":null},"158":{"id":2999,"universalSpeciesId":"160","name":"Baltimore Oriole","scientificName":"Icterus galbula","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"33.9","appearance":"Common","migratoryStatus":null},"159":{"id":3000,"universalSpeciesId":"161","name":"Orchard Oriole","scientificName":"Icterus spurius","presence":"5, 6, 7, 8","arrival":"5","departure":"8","bodymass":"19.9","appearance":"Rare","migratoryStatus":null},"160":{"id":3001,"universalSpeciesId":"162","name":"Red Crossbill","scientificName":"Loxia curvirostra","presence":"12, 1, 2, 3, 4, 5","arrival":"12","departure":"5","bodymass":"36.4","appearance":"Uncommon","migratoryStatus":null},"161":{"id":3002,"universalSpeciesId":"163","name":"White-winged Crossbill","scientificName":"Loxia leucoptera","presence":"12, 1, 2","arrival":"12","departure":"2","bodymass":"26","appearance":"Rare","migratoryStatus":null},"162":{"id":3003,"universalSpeciesId":"164","name":"Purple Finch. Linnet.","scientificName":"Haemorhous purpureus","presence":"3, 4, 5, 6, 7, 8, 9, 10","arrival":"3","departure":"10","bodymass":"23.3","appearance":"Common","migratoryStatus":null},"163":{"id":3005,"universalSpeciesId":"166","name":"Common Redpoll","scientificName":"Acanthis flammea","presence":"11, 12, 1, 2, 3","arrival":"11","departure":"3","bodymass":"13","appearance":"Uncommon","migratoryStatus":null},"164":{"id":3006,"universalSpeciesId":"167","name":"American Goldfinch","scientificName":"Spinus tristis","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"13.1","appearance":"Common","migratoryStatus":null},"165":{"id":3007,"universalSpeciesId":"168","name":"Pine Siskin","scientificName":"Spinus pinus","presence":"12, 1, 2, 3, 4","arrival":"12","departure":"4","bodymass":"12.7","appearance":"Rare","migratoryStatus":null},"166":{"id":3008,"universalSpeciesId":"169","name":"Evening Grosbeak","scientificName":"Coccothraustes vespertinus","presence":"1, 2, 3, 4","arrival":"1","departure":"4","bodymass":"60.1","appearance":"Rare","migratoryStatus":"arriving"},"167":{"id":3009,"universalSpeciesId":"170","name":"Great Blue Heron","scientificName":"Ardea herodias","presence":"7, 8","arrival":"7","departure":"8","bodymass":"2480","appearance":"Rare","migratoryStatus":null},"170":{"id":3012,"universalSpeciesId":"173","name":"Black-crowned Night Heron","scientificName":"Nycticorax nycticorax","presence":"3, 4, 5, 6, 7, 8, 9, 10","arrival":"3","departure":"10","bodymass":"810","appearance":"Uncommon","migratoryStatus":null},"172":{"id":3014,"universalSpeciesId":"176","name":"Least Bittern","scientificName":"Ixobrychus exilis","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"86.3","appearance":"Rare","migratoryStatus":null},"173":{"id":3015,"universalSpeciesId":"177","name":"American Bittern","scientificName":"Botaurus lentiginosus","presence":"6, 7, 8","arrival":"6","departure":"8","bodymass":"706","appearance":"Uncommon","migratoryStatus":null},"174":{"id":3016,"universalSpeciesId":"178","name":"Red-headed Woodpecker","scientificName":"Melanerpes erythrocephalus","presence":"6, 7, 8, 9, 10, 11","arrival":"6","departure":"11","bodymass":"71.6","appearance":"Rare","migratoryStatus":null},"175":{"id":3017,"universalSpeciesId":"179","name":"Yellow-bellied Sapsucker","scientificName":"Sphyrapicus varius","presence":"4; 10","arrival":"4; 10","departure":"4; 10","bodymass":"50.3","appearance":"Rare","migratoryStatus":null},"176":{"id":3018,"universalSpeciesId":"180","name":"Downy Woodpecker","scientificName":"Picoides pubescens","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"27.5","appearance":"Common","migratoryStatus":null},"178":{"id":3020,"universalSpeciesId":"182","name":"Hairy Woodpecker","scientificName":"Picoides villosus","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"70","appearance":"Uncommon","migratoryStatus":null},"179":{"id":3021,"universalSpeciesId":"183","name":"Northern Flicker","scientificName":"Colaptes auratus","presence":"3, 4, 5, 6, 7, 8, 9, 10, 11","arrival":"3","departure":"11","bodymass":"142","appearance":"Common","migratoryStatus":null},"181":{"id":3023,"universalSpeciesId":"185","name":"Pileated Woodpecker","scientificName":"Dryocopus pileatus","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"308","appearance":"Rare","migratoryStatus":null},"183":{"id":3025,"universalSpeciesId":"187","name":"Short-eared Owl","scientificName":"Asio flammeus","presence":"11, 12, 1, 2","arrival":"11","departure":"2","bodymass":"315","appearance":"Rare","migratoryStatus":null},"184":{"id":3026,"universalSpeciesId":"188","name":"Long-eared Owl","scientificName":"Asio otus","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"261","appearance":"Uncommon","migratoryStatus":null},"185":{"id":3027,"universalSpeciesId":"189","name":"Eastern Screech Owl","scientificName":"Megascops asio","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"167","appearance":"Common","migratoryStatus":null},"186":{"id":3028,"universalSpeciesId":"190","name":"Great Horned Owl","scientificName":"Bubo virginianus","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"1154","appearance":"Common","migratoryStatus":null},"187":{"id":3029,"universalSpeciesId":"191","name":"Barred Owl","scientificName":"Strix varia","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"632","appearance":"Uncommon","migratoryStatus":null},"188":{"id":3030,"universalSpeciesId":"192","name":"Barn Owl","scientificName":"Tyto alba","presence":"5, 6, 7, 8, 9; 12, 1, 2","arrival":"5; 12","departure":"9; 2","bodymass":"434","appearance":"Common","migratoryStatus":null},"189":{"id":3031,"universalSpeciesId":"193","name":"Northern Saw-whet Owl","scientificName":"Aegolius acadicus","presence":"10","arrival":"10","departure":"10","bodymass":"77.4","appearance":"Rare","migratoryStatus":null},"190":{"id":3032,"universalSpeciesId":"194","name":"Snow Goose","scientificName":"Anser caerulescens","presence":"4; 10","arrival":"4; 10","departure":"4; 10","bodymass":"2744","appearance":"Rare","migratoryStatus":null},"191":{"id":3033,"universalSpeciesId":"195","name":"Brant","scientificName":"Branta bernicla","presence":"4","arrival":"4","departure":"4","bodymass":"1370","appearance":"Rare","migratoryStatus":null},"193":{"id":3035,"universalSpeciesId":"197","name":"American Wigeon","scientificName":"Anas americana","presence":"9, 10, 11","arrival":"9","departure":"11","bodymass":"792","appearance":"Uncommon","migratoryStatus":null},"206":{"id":3048,"universalSpeciesId":"210","name":"Red-necked Grebe","scientificName":"Podiceps grisegena","presence":"3","arrival":"3","departure":"3","bodymass":"1023","appearance":"Rare","migratoryStatus":null},"215":{"id":3057,"universalSpeciesId":"219","name":"Green Heron","scientificName":"Butorides virescens","presence":"4, 5, 6, 7, 8, 9, 10","arrival":"4","departure":"10","bodymass":"212","appearance":"Common","migratoryStatus":null},"216":{"id":3058,"universalSpeciesId":"220","name":"Glossy Ibis","scientificName":"Plegadis falcinellus","presence":"4; 5; 7","arrival":"4; 5; 7","departure":"4; 5; 7","bodymass":"662","appearance":"Rare","migratoryStatus":null},"217":{"id":3059,"universalSpeciesId":"221","name":"Red-tailed Hawk","scientificName":"Buteo jamaicensis","presence":"1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":null,"departure":null,"bodymass":"1028","appearance":"Common","migratoryStatus":null},"219":{"id":3061,"universalSpeciesId":"223","name":"Black-bellied Plover","scientificName":"Pluvialis squatarola","presence":"8, 9, 10, 11","arrival":"8","departure":"11","bodymass":"218","appearance":"Uncommon","migratoryStatus":null},"220":{"id":3062,"universalSpeciesId":"224","name":"American Golden Plover","scientificName":"Pluvialis dominica","presence":"4, 5; 9, 10","arrival":"4; 9","departure":"5; 10","bodymass":"151","appearance":"Uncommon","migratoryStatus":null},"221":{"id":3063,"universalSpeciesId":"225","name":"Semipalmated Plover","scientificName":"Chardrius semipalmatus","presence":"4, 5; 9, 10","arrival":"4; 9","departure":"5; 10","bodymass":"47.4","appearance":"Uncommon","migratoryStatus":null},"222":{"id":3064,"universalSpeciesId":"226","name":"Piping Plover","scientificName":"Chardrius melodus","presence":"5","arrival":"5","departure":"5","bodymass":"55.2","appearance":"Rare","migratoryStatus":null},"224":{"id":3066,"universalSpeciesId":"228","name":"Solitary Sandpiper","scientificName":"Tringa solitaria","presence":"5; 8, 9","arrival":"5; 8","departure":"5; 9","bodymass":"48.4","appearance":"Uncommon","migratoryStatus":null},"225":{"id":3067,"universalSpeciesId":"229","name":"Greater Yellowlegs","scientificName":"Tringa melanoleuca","presence":"5; 9, 10","arrival":"5; 9","departure":"5; 10","bodymass":"171","appearance":"Uncommon","migratoryStatus":null},"226":{"id":3068,"universalSpeciesId":"230","name":"Lesser Yellowlegs","scientificName":"Tringa flavipes","presence":"5, 6; 8, 9, 10","arrival":"5; 8","departure":"6; 10","bodymass":"77.5","appearance":"Uncommon","migratoryStatus":null},"231":{"id":3073,"universalSpeciesId":"235","name":"Least Sandpiper","scientificName":"Calidris minutilla","presence":"5","arrival":null,"departure":null,"bodymass":"22","appearance":"Rare","migratoryStatus":null},"232":{"id":3074,"universalSpeciesId":"236","name":"Semipalmated Sandpiper","scientificName":"Calidris pusilla","presence":"5; 8, 9","arrival":"5; 8","departure":"5; 9","bodymass":"27.5","appearance":"Uncommon","migratoryStatus":null},"234":{"id":3076,"universalSpeciesId":"238","name":"Pectoral Sandpiper","scientificName":"Calidris melanotos","presence":"4, 5; 7, 8, 9, 10, 11","arrival":"4; 7","departure":"5; 11","bodymass":"97.8","appearance":"Common","migratoryStatus":null},"244":{"id":3086,"universalSpeciesId":"248","name":"Black Tern","scientificName":"Chlidonias niger","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"65.3","appearance":"Rare","migratoryStatus":null},"249":{"id":3091,"universalSpeciesId":"253","name":"Snowy Owl","scientificName":"Bubo scandiacus","presence":"11, 12, 1, 2","arrival":"11","departure":"2","bodymass":"1806","appearance":"Rare","migratoryStatus":null},"250":{"id":3092,"universalSpeciesId":"254","name":"Peregrine Falcon","scientificName":"Falco peregrinus","presence":"4, 5, 6, 7, 8, 9, 10, 11","arrival":"4","departure":"11","bodymass":"894","appearance":"Rare","migratoryStatus":null},"252":{"id":3094,"universalSpeciesId":"256","name":"Cliff Swallow","scientificName":"Petrochelidon pyrrhonota","presence":"5, 6, 7, 8, 9","arrival":"5","departure":"9","bodymass":"21.6","appearance":"Common","migratoryStatus":null},"253":{"id":3095,"universalSpeciesId":"257","name":"American Pipit","scientificName":"Anthus rubescens","presence":"5; 10","arrival":"5; 10","departure":"5; 10","bodymass":"21.6","appearance":"Rare","migratoryStatus":null},"254":{"id":3096,"universalSpeciesId":"258","name":"Orange-crowned Warbler","scientificName":"Leiothlypis celata","presence":"5","arrival":"5","departure":"5","bodymass":"9","appearance":"Rare","migratoryStatus":null},"255":{"id":3097,"universalSpeciesId":"259","name":"Cape May Warbler","scientificName":"Setophaga tigrina","presence":"5","arrival":"5","departure":"5","bodymass":"10.3","appearance":"Rare","migratoryStatus":null},"256":{"id":3098,"universalSpeciesId":"260","name":"Bay-breasted Warbler","scientificName":"Setophaga castanea","presence":"5; 9","arrival":"5; 9","departure":"5; 9","bodymass":"11.8","appearance":"Rare","migratoryStatus":null},"257":{"id":3099,"universalSpeciesId":"261","name":"Blackpoll Warbler","scientificName":"Setophaga striata","presence":"5; 10","arrival":"5; 10","departure":"5; 10","bodymass":"12.3","appearance":"Uncommon","migratoryStatus":null},"258":{"id":3100,"universalSpeciesId":"262","name":"Wilson's Warbler","scientificName":"Cardellina pusilla","presence":"5","arrival":"5","departure":"5","bodymass":"7.2","appearance":"Rare","migratoryStatus":null},"259":{"id":3101,"universalSpeciesId":"263","name":"Yellow-breasted Chat","scientificName":"Icteria virens","presence":"5, 6","arrival":"5","departure":"6","bodymass":"24.4","appearance":"Rare","migratoryStatus":null},"263":{"id":3105,"universalSpeciesId":"267","name":"Fox Sparrow","scientificName":"Passerella iliaca","presence":"3, 4; 10, 11","arrival":"3; 10","departure":"4; 11","bodymass":"32.3","appearance":"Common","migratoryStatus":null},"264":{"id":3106,"universalSpeciesId":"268","name":"Lincoln's Sparrow","scientificName":"Melospiza lincolnii","presence":"5; 9, 10","arrival":"5; 9","departure":"5; 10","bodymass":"16.6","appearance":"Rare","migratoryStatus":null},"265":{"id":3107,"universalSpeciesId":"269","name":"White-crowned Sparrow","scientificName":"Zonotrichia leucophrys","presence":"5","arrival":"5","departure":"5","bodymass":"29.4","appearance":"Rare","migratoryStatus":null},"268":{"id":3110,"universalSpeciesId":"272","name":"Yellow-bellied Flycatcher","scientificName":"Empidonax flaviventris","presence":"5","arrival":"5","departure":"5","bodymass":"11.8","appearance":"Uncommon","migratoryStatus":null},"269":{"id":3111,"universalSpeciesId":"273","name":"Bohemian Waxwing","scientificName":"Bombycilla garrulus","presence":"2, 3","arrival":"2","departure":"3","bodymass":"56.4","appearance":"Rare","migratoryStatus":null},"271":{"id":3113,"universalSpeciesId":"275","name":"Pine Grosbeak","scientificName":"Pinicola enucleator","presence":"11, 12, 1, 2","arrival":"11","departure":"2","bodymass":"56.4","appearance":"Uncommon","migratoryStatus":null},"272":{"id":3114,"universalSpeciesId":"276","name":"Henslow's Sparrow","scientificName":"Centronyx henslowii","presence":"5, 6, 7, 8, 9, 10","arrival":"5","departure":"10","bodymass":"12.8","appearance":"Uncommon","migratoryStatus":null},"275":{"id":3117,"universalSpeciesId":"279","name":"Dovekie","scientificName":"Alle alle","presence":"11, 12, 1, 2, 3","arrival":"11","departure":"3","bodymass":"175","appearance":"Rare","migratoryStatus":null},"276":{"id":3118,"universalSpeciesId":"281","name":"Connecticut Warbler","scientificName":"Oporornis agilis","presence":"5, 6; 8, 9, 10","arrival":"5; 8","departure":"6; 10","bodymass":"13.3","appearance":"Rare","migratoryStatus":null},"277":{"id":3119,"universalSpeciesId":"282","name":"Loggerhead Shrike","scientificName":"Lanius ludovicianus","presence":"4","arrival":"4","departure":"4","bodymass":"47.7","appearance":"Rare","migratoryStatus":null},"278":{"id":3120,"universalSpeciesId":"283","name":"Gyrfalcon","scientificName":"Falco rusticolus","presence":"12, 1, 2","arrival":"12","departure":"2","bodymass":"1170","appearance":"Rare","migratoryStatus":null},"279":{"id":3121,"universalSpeciesId":"284","name":"Yellow Rail","scientificName":"Coturnicops noveboracensis","presence":"8, 9, 10","arrival":"8","departure":"10","bodymass":"60.9","appearance":"Rare","migratoryStatus":null},"280":{"id":3122,"universalSpeciesId":"285","name":"American Hawk Owl","scientificName":"Surnia ulula","presence":"12, 1, 2, 3","arrival":"12","departure":"3","bodymass":"301","appearance":"Rare","migratoryStatus":null},"281":{"id":3123,"universalSpeciesId":"286","name":"Golden Eagle","scientificName":"Aquila chrysaetos","presence":"11","arrival":"11","departure":"11","bodymass":"3900","appearance":"Rare","migratoryStatus":null},"282":{"id":3124,"universalSpeciesId":"287","name":"Great Gray Owl","scientificName":"Strix nebulosa","presence":"11, 12, 1, 2 ","arrival":"11","departure":"2","bodymass":"890","appearance":"Rare","migratoryStatus":null},"289":{"id":3132,"universalSpeciesId":"297","name":"Hudsonian Godwit","scientificName":"Limosa haemastica","presence":"7, 8, 9, 10, 11","arrival":"7","departure":"11","bodymass":"222","appearance":"Rare","migratoryStatus":null},"299":{"id":3144,"universalSpeciesId":"Extinct 1","name":"Passenger Pigeon","scientificName":"Ectopistes migratorius","presence":"3, 4, 5, 6, 7, 8, 9","arrival":"3","departure":"9","bodymass":"300","appearance":null,"migratoryStatus":null},"302":{"id":3147,"universalSpeciesId":"311","name":"King Rail","scientificName":"Rallus elegans","presence":"5; 8, 9, 10, 11","arrival":"5; 8","departure":"5; 11","bodymass":"415","appearance":"Rare","migratoryStatus":null},"317":{"id":3162,"universalSpeciesId":"327","name":"American Three-toed Woodpecker","scientificName":"Picoides dorsalis","presence":"12, 1, 2, 3","arrival":"12","departure":"3","bodymass":"72","appearance":"Rare","migratoryStatus":null},"346":{"id":4915,"universalSpeciesId":"349","name":"Dipper Duck. Common Grebe.","scientificName":"Cinclus mexicanus","presence":"3, 4, 5, 6, 7, 8, 9, 10, 11, 12","arrival":"3","departure":"12","bodymass":"46","appearance":"Common","migratoryStatus":null}
}
`;
const PROPERTIES = {preload_seconds: 5}
const ALL_BIRDS_BY_ID = {};
const RESIDENT_BIRD_IDS = new Array();
const MIGRANT_IDS_BY_MONTH_AND_STATUS = {};
for (let i = 1; i <= 12; i++){
	MIGRANT_IDS_BY_MONTH_AND_STATUS[i] = {
		arriving: new Array(), 
		staying: new Array(), 
		departing: new Array()
	}
}
const BIRDCOORDS = {/* id: {left: ,top: }*/};
const MONTHSARRAY = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const MONTHNAMES = {
	1: 'January',
	2: 'February',
	3: 'March',
	4: 'April',
	5: 'May',
	6: 'June',
	7: 'July',
	8: 'August',
	9: 'September',
	10: 'October',
	11: 'November',
	12: 'December'
};



const runBirdApp = () => {
	if (RUNTIME.app_started) return;
	RUNTIME.app_started = true;
	console.log(`runBirdApp called`);
	_populateDataFromJSON()
		.then(response => {
			if (!response.ok) {
				throw new Error(`Failed to populate data. ${response.error}`);
			}
			
			
			const birdDiv = document.getElementById('birds');
			birdDiv.innerHTML = new String();
			for (const id of getAllBirdIds()){
				birdDiv.appendChild(getBirdById(id).asDOM.firstElementChild);
			}
	
			startApp();
			
		})
		.catch(error => {
			console.error('Error:', error);
	});
}
function startApp(){
	if (RUNTIME.interval_id > 0){
		clearInterval(RUNTIME.interval_id);
	}
	checkTimeToMoveBirds();
	
	if (RUNTIME.audio_playing){ // necessary to prevent the app burning cycles before play or during pause
		RUNTIME.interval_id = setInterval(checkTimeToMoveBirds, 1000);		
	}
	
}
function pauseApp(){
	clearInterval(RUNTIME.interval_id);
	RUNTIME.audio_playing = false;
}

function getCurrentTime(){
	return document.getElementById('audio').currentTime;
}

function doDrift(){
	const seconds = Math.floor(getCurrentTime());
	if (seconds % 3 != 0) return;
	console.log(`time is ${seconds}; drifting`);
	const currentlyVisibleBirds = Array.from(document.getElementsByClassName("showing"))
		.concat(Array.from(document.getElementsByClassName("residence-Resident")));
	if (currentlyVisibleBirds.length == 0) return;
	for (let i = 0; i < 3; i++){
		const random = Math.floor(Math.random() * currentlyVisibleBirds.length);
		const driftBird = currentlyVisibleBirds[random];
		if (driftBird.classList.contains("drift")) return;
		driftBird.style.transition = "transform 5s linear";
		setTimeout(() => {
				driftBird.classList.add("drift");
				setTimeout(() => {driftBird.classList.remove("drift")}, 5500);
			}, Math.random() * 4000);	
	}
	
}
function checkTimeToMoveBirds(){
	/* Called every second and on any time change */
	doDrift();
	// using currentTime + 5 seconds makes each month start five seconds early, so we get the arriving
	// birds 5 secs early for "free" . . . 
	const actualTime = getCurrentTime();
	
	const shiftedTime = actualTime + PROPERTIES.preload_seconds;
	const currentMonth = MONTHSARRAY[Math.floor(shiftedTime / 120)];
	if (currentMonth != RUNTIME.current_month) {
		//updateMigrantBirdsForMonth(currentMonth);
		showBirdsForMonth(currentMonth);
		RUNTIME.current_month = currentMonth;	
	} 
	// ... However, we still need to calculate when to depart based on 1:45 from actualTime/120
	// And we will have to figure out some magic to make it work when seeking.
	// prolly do time >= departureTime (1:45) AND NOT "areDeparting"
	// we means we will also have to unset that (as yet to be created) flag
	// when departing time is over. Prolly can do that with the actual transition events.
	const monthElapsedTime = Math.floor(actualTime % 120);
	if (monthElapsedTime == 105) doDeparting(currentMonth);
	
}

function doDeparting(monthIndex){
	/* Called when monthElapsedTime for monthIndex is 105 seconds (1:45) */	
	// Need to figure out how to restore them on rewind in same month?
	
	// get the list of birds departing this month
	const departingBirdIds = getMigrantBirdIdsByMonthAndStatus(monthIndex, "departing");
	for (const id of departingBirdIds){
		// A random integer between 0 and 19 seconds tells us how long to wait
		const tTime = getRandom(0, 19);
		const birdDOMObject = document.getElementById(id);
		birdDOMObject.classList.add('isDeparting');
		birdDOMObject.firstElementChild.style.transition = `opacity 2s linear`;	
		setTimeout(()=> { // outer timeout is tTime seconds
			birdDOMObject.firstElementChild.style.opacity = '0%';	
			setTimeout(()=>{ // inner fires a few seconds after outer to fully remove bird from DOM
				birdDOMObject.classList.remove('isDeparting');
				birdDOMObject.classList.remove('showing');
				birdDOMObject.classList.add('hidden');	
			}, 3000);
		}, tTime * 1000);
	}
	
}
/* NEW REQS
 * [x] 1. Distribute birds randomly, no arrive left depart right
 * [x] 2. Arriving birds "flicker" on randomly from -5 to +20 (vis-a-vis realTime % 120)
 * [x] 3. Departing birds flicker off randomly from +1:45 to -5 next month.
 * 4. Still need to figure out "drift zones" (see zoom.html)
 */

function showBirdsForMonth(monthIndex){
	/* CAlled whenever the time dispatcher decides the month has changed */
	
	// We want to remove all visible birds first . . .
	const currentlyVisibleBirds = Array.from(document.getElementsByClassName("showing"));
	for (domBird of currentlyVisibleBirds){
		if (domBird.classList.contains('isDeparting')){
			// ... unless they're actively departing
			continue;
		} 
		domBird.classList.remove('showing');
		domBird.classList.add('hidden');
		domBird.style.top = null;
		domBird.style.left = null;
	}	

	// Now turn on the birds for this month	 
	for (const id of getMigrantBirdIdsByMonthAndStatus(monthIndex, "arriving")){
		const birdDOMObject = document.getElementById(id);
	    setVisibleStyle(birdDOMObject, "arriving");
	}
	for (const id of getMigrantBirdIdsByMonthAndStatus(monthIndex, "staying")){
		const birdDOMObject = document.getElementById(id);
		setVisibleStyle(birdDOMObject, "staying");
	}
	for (const id of getMigrantBirdIdsByMonthAndStatus(monthIndex, "departing")){
		// the "isDeparting" birds we skipped were departing from the last month
		// Departing birds for this month are treated the same as "staying"
		const birdDOMObject = document.getElementById(id);
		setVisibleStyle(birdDOMObject, "departing");
	}
	function setVisibleStyle(birdDOMObject, status){
		/* private to enclosing function. */
		// We need the JS bird object to get the x,y coordinates
		const birdObject = getBirdById(birdDOMObject.id);
		birdDOMObject.style.left = `${birdObject.left}vw`;
		birdDOMObject.style.top = `${birdObject.top}vh`;
		birdDOMObject.classList.remove("hidden");
	    birdDOMObject.classList.add("showing");
	    if (status != 'arriving'){
		    birdDOMObject.firstElementChild.style.opacity = '70%'
		    return;	
	    }// treat arriving separately, cause we need to do the animation
	    const tTime = getRandom(1, 20); // delay time before "turning on" 
		const bImage = birdDOMObject.firstElementChild;
		bImage.style.transition = `opacity .75s ease-out`;	
		setTimeout(() => {
			bImage.style.opacity = "70%";
		},  tTime * 1000); // wait tTime seconds before transitioning
	}
}
	

function getMonthsPresent(presence){
	/* Returns "presence" as a string of month names  */
		let monthSpans = [];
		const stints = presence.split(/;\s?/);
		for (const stint of stints){
			const months = stint.trim().split(/\s?[,.]\s?/);
			const last =  MONTHNAMES[months.at(-1).trim()];
			const first = MONTHNAMES[months.at(0).trim()];
			if (last === first) {
				monthSpans.push(`${first}`);
			} else {
				monthSpans.push(`${first} - ${last}`);
			}
		}
		return monthSpans.join('; ');
}
function getSizeForMass(mass){
	/* converts mass (grams) to "t-shirt" size */
	if (mass <= 9.7) return 'XS';
	if (9.8 <= mass && mass <= 27.8) return 'S';
	if (28 <= mass && mass <= 178) return 'M';
	if (212 <= mass && mass <= 5974) return 'L';
	if (11800 <= mass) return 'XL';
	return undefined;
}

function getBirdById(birdId){
	const bird = ALL_BIRDS_BY_ID[birdId];
	if (typeof bird === 'undefined'){
		throw new Error(`Cannot find ${birdId}`);
	}
	return bird;
}
function getAllBirdIds(){
	return Object.keys(ALL_BIRDS_BY_ID);
}
function getAllBirdIdsForMonth(monthIndex){
	let migrantIds = new Array();
	for (const status of ['arriving', 'staying','departing']){
		migrantIds = migrantIds.concat(getMigrantBirdIdsByMonthAndStatus(monthIndex, status));
	}
	return migrantIds;
}
function getMigrantBirdIdsByMonthAndStatus(monthIndex, status){
	try {
		return MIGRANT_IDS_BY_MONTH_AND_STATUS[monthIndex][status];
	}
	catch (ReferenceError) {
		console.error(`Either ${monthIndex} is not a month or ${status} is not a status`);
	}
	
}

function getRandom(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function Bird(birdRecord){
	/* Bird object class */
	for (const [key, value] of Object.entries(birdRecord)){
	    this[key] = value;
	  }
	this.monthsPresent = getMonthsPresent(this.presence);
	this.size = getSizeForMass(this.bodymass);
	if (this.appearance === null) this.appearance = "Common"; // do something about this!
	// If present all 12 months, it's resident; otherwise, migrant
	this.residenceStatus = this.presence.split(/[\s\n]?[;,.]\s?/).length == 12 ? "Resident" : "Migrant";

	/* Now that we don't move birds based on status, we can preset all their locations */

	this.left = this.residenceStatus == 'Resident' ? getRandom(20, 80) : getRandom(5, 95);
	let arcFloor = 28;
	if (this.left < 18 || this.left > 82) arcFloor = 50; // outside the arch, nearer the edges
	this.top =  this.residenceStatus == 'Resident' ? getRandom(45, 80) : getRandom(15, arcFloor);
	const xyStyle = this.residenceStatus == 'Resident' ?
		 `style="top: ${this.top}vh; left: ${this.left}vw"`: "";



	this.asHTML = `
		<div id="${this.id}"
		${xyStyle}
		class="tooltip object-bird hidden  size-${getSizeForMass(this.bodymass)}
		       residence-${this.residenceStatus} appearance-${this.appearance} bodymass-${this.bodymass}">
		<img src="SVG/${this.appearance}.svg" />
		<div class="tooltiptext">
		  <div class="tooltiptext-line">
		    <span class="commonName">${this.name}</span>
		    <span class="scientificName">(${this.scientificName})</span>;
		    <span class="bodymass">${this.bodymass} grams</span>
		  </div>
		  <div class="tooltiptext-line">
		  <span class="monthsPresent">${this.monthsPresent}</span>
		  </div>
		</div>
		</div>
		`;
		
	this.asDOM = domParser.parseFromString(this.asHTML, 'text/html');
		
	
	
}
async function _populateDataFromJSON(){
	try {
		const json = JSON.parse(JSONBIRDDATA);
		for (const item in json){
			const record = json[item];
			let bird = new Bird(record);
			ALL_BIRDS_BY_ID[record.id] = bird;
			// console.log(bird.id);
			/* Populate resident array OR  */
			if (bird.residenceStatus == "Resident"){
				RESIDENT_BIRD_IDS.push(bird.id);
				continue;
			}
			/* If still in loop, we are a migrant, which means we need to know status for each month
			 * "status" will be one of . . .
			    arriving -- first month present 
			    leaving -- last month present
			    staying -- still present, neither arriving nore leaving
			 *  
			 * We will iterate through all 12 months, adding this birds ID to the correct status 
			 * for each month of the year.
			 */
			for (const m of bird.presence.split(/[\s\n]?[;,.]\s?/)){
				const month = m.trim(); // month will be an int 1 -- 12.
				try {
					  let status = "staying";
					  try {
						  const arrival = bird.arrival.split(/\s?[,;]\s?/);
						  const departure = bird.departure.split(/\s?[,;]\s?/);
						  if (arrival.includes(month)) { status = "arriving"; }
						  else if (departure.includes(month)) { status = "departing"; }	
					  }
				 catch (TypeError){
						console.log(`Leaving status as ${status} for ${bird.name}`);
				 }
					  
					  // Add the ID to the array for this month and status:	  
					  MIGRANT_IDS_BY_MONTH_AND_STATUS[month][status].push(bird.id);
				}
				catch (TypeError){
					console.log(TypeError);
						console.error(`No month found for ${month} -- looking at birdID ${bird.id} and presence ${bird.presence}`);
				}
			}
			
			
		}
	return { ok: true, error: null }
	}
	catch (e) {
		return {ok: false, error: e }
	}
}



