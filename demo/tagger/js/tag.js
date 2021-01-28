var aktProb = 0.8;
var tags = [];
var onlineModels = 0;

$( document ).ready(function() {
	$(".se-pre-con").fadeOut("slow");
	test();
	checkRequiredFields();
});


$('#top3').on('change',function(){
	var id = $( "#cikk-valszto" ).val();
	updateTags();
});

$('#probRange').on('change',function(){
	var prob = $(this).val();
	var newProb = parseFloat(prob);
	aktProb = newProb;
	$("#probValue").text(prob);
	updateTags();
});

function tagging(){
	$(".se-pre-con").show();
	var szoveg = $('#cikk-szoveg').val().trim();
	if (szoveg == "") {
		alert('Töltse ki a szöveg mezőt!');
		$(".se-pre-con").fadeOut("slow");
		return;
	}
	
	var objectToSend = new Object();
	objectToSend.data = szoveg;
	
	var jsonToSend = JSON.stringify(objectToSend);
	//alert(jsonToSend);
	$.ajax({
	   type: "POST",
	   url: "https://juniper.nytud.hu/demo/tag",
	   data: jsonToSend,
	   contentType: 'application/json; charset=utf-8',
	   dataType: 'json',
	   success: function(result) {
			loadTags(result);
	   }
	});
	$(".se-pre-con").fadeOut("slow");
}

function loadTags(result) {
	tags = result['tags'];
    //alert(JSON.stringify(tags));
	updateTags();
}

function updateTags() {
	var predikalt = $('#cimke-predikalt');
	
	predikalt.empty();
	
	var re = new RegExp('@@', 'g');
	
	var top3Checked = $("#top3").is(':checked');
	
	for (i in tags){
		var tag = tags[i][0];
		var num = parseFloat(tags[i][1]).toFixed(4);
		if (!(tag.includes("ner__") || tag.includes("geography__") || tag.includes("geo__") || tag.includes("person__") || tag.includes("pers__") || tag.includes("organization__") || tag.includes("org__"))) {
			if(num >= aktProb) {
				predikalt.append(
					'<li>' +
					tag.replace("__label__", "").replace(re," ") +
					' (' + num + ')' +
					'</li>'
				);
			}
		}
	}
	var predictTagsAdded = 0;	
	if ( top3Checked && $('#cimke-predikalt li').length < 5 ) {
		predikalt.empty();
		for (i in tags) {
			var tag = tags[i][0];
			var num = parseFloat(tags[i][1]).toFixed(4);
			if (!(tag.includes("ner__") || tag.includes("geography__") || tag.includes("geo__") || tag.includes("person__") || tag.includes("pers__") || tag.includes("organization__") || tag.includes("org__"))) {
				if(predictTagsAdded < 5) {
					predikalt.append(
						'<li>' +
						tag.replace("__label__", "").replace(re," ") +
						' (' + num + ')' +
						'</li>'
					);
					predictTagsAdded++;
				}		
			}			
		}
	}
}

function checkRequiredFields(){
	var szoveg = $('#cikk-szoveg').val().trim();
	if(szoveg == "") {
		if(!$('#button-tag').hasClass("disabled")) {
			$('#button-tag').addClass("disabled").removeClass('btn-primary').addClass('btn-secondary');
		}
	} else {
		$('#button-tag').removeClass("disabled").removeClass('btn-secondary').addClass('btn-primary');
	}
}



$('#cikk-szoveg').on('keyup paste',function(){
	checkRequiredFields();
});


function test() {
	var szoveg = 'Az élet tehát ismétli önmagát, de ahhoz, hogy ez megtörténhessen, földrengésszerű változásoknak kellett bekövetkeznie Berlinben. Mindenekelőtt annak, hogy a Hertha sportigazgatói tisztét 12 éve, azaz 2009 óta betöltő Michael Preetzet is kirúgják. Ez vasárnap megtörtént, így Dárdai Pál visszatérhetett. A magyar szakember ismételt kinevezésének egyik alapfeltétele az volt, hogy leváltsák a berlini sportigazgatót, Michael Preetzet, akivel Dárdainak nem volt jó viszonya. Michael Preetz sportigazgató kirúgása volt az egyik felétele Dárdai Pál. Pedig Preetz volt az, aki 2015-ben felkérte Dárdait, hogy üljön le a kispadra és vezesse a Herthát. Ez a munkakapcsolat 2019 áprilisáig tartott, amikor Preetz bejelentette, hogy nem hosszabbítja meg Dárdainak a szezon végén lejáró szerződését. A magyar edző könnyek között vett búcsút a Hertha kispadjától, de a klub kötelékében maradt. Előbb hosszabb pihenőt tartott, majd az U16-os csapat vezetését vette át. Amikor a Hertha szombaton hazai pályán 4-1-es vereséget szenvedett a Werder Brementől, már lehetett tudni, hogy a változások elkerülhetetlenek. A meccs előtt 250 berlini szurkoló tüntetett az Olimpiai Stadion mellett, követelve az azonnali változásokat. Bruno Labbadia tehát megbukott és magával rántotta a sportigazgatót, Michael Preetzet is. A Hertha vezetésének most a legkézenfekvőbb megoldása volt Dárdai Pál ismételt kinevezése. A berlini klub legendája ezer szállal kötődik a kék-fehér csapathoz, szakértelme pedig megkérdőjelezhetetlen. A mostani vészhelyzeteben az egyedüli megoldás az ő kinevezése - ezt valamennyi német újság hangsúlyozta a vasárnap folyamán. A Hertha vezetésének sok ideje nem volt gondolkodni, mert a Bundesliga küzdelmei erőltetett menetben zajlanak. A következő fordulóban a Herthának a jól szereplő és a bajnokságban jelenleg 6. helyen álló Eintracht Frankfurt otthonában kell pályára lépnie. A Frankfurt jelenleg 30 pontos, a bajnokságban harmadik Leverkusen pedig 32 pontot gyűjtött, tehát rendkívül szoros az élmezőny. Ennél is nehezebb feladat lesz a február 5-i mérkőzés, amelyen a Hertha hazai pályán fogadja a rekordbajnokot, a listavezető Bayern Münchent. Utána egy stuttgarti fellépés következik, majd Berlinbe érkezik a tabella második helyén álló Lipcse, amelyben addigra már Szoboszlai Domimik is pályára léphet. Ennél nehezebb első négy mérkőzése aligha lehetne Dárdainak, de a sorsolást látva a Hertha vezetése az utolsó pillanatban lépte meg a váltást. A szakértők arra is emlékeztetnek, hogy a Hertha az elmúlt időszakban soha nem látott lehetőségekhez jutott. Amíg Dárdai volt az edző (2015-2019 között) alig költöttek a berlini csapatra. A magyar szakember távozása után azonban 374 millió eurót pumpáltak a klubba, de az eredményeken ez egyáltalán nem látszott. Egy ekkora befektetéssel a Herthának az Európa-liga csoportkörébe kellett volna jutnia, ehelyett most a kiesés ellen küzd. Dárdai 2020 karácsonyán adott hosszabb interjút a Nemzeti Sportnak. Ebből a nyilatkozatból az a következtetés vonható le, hogy Dárdai jól érezte magát az U16-os csapat mellett és nem vágyott nagyobb reflektorfényre. Ugyanakkor az is biztos, hogy a 2019-es távozása benne is mély nyomokat hagyott, hiszen - bár akkor negatív spirálba került a Hertha - Michael Preetz sportigazgatónak nem volt különösebb oka arra, hogy ne hosszabbítson a Hertha legendájával. Úgy is fogalmazhatunk, hogy Dárdai munkája akkor torzó maradt, a befejezés lehetősége most jön el, amely valaminek a kezdete is lehet. Mert ha Dárdai Pál összekapja a Herthát és eltávolítja a csapatot a jelenlegi kieső zónából, akkor nem kétséges, hogy 2022 nyarán újabb szerződést kínálhatnak neki.';
	upload(szoveg,);
}

function test2() {
	var szoveg = 'A bitcoin egy olyan kriptovaluta, aminek az árfolyamát ide-oda rángatják, mégsem sikerült térdre kényszeríteni egy évekkel korábbi nagy beszakadás után sem. Van, aki úgy tud pénzhez jutni a bitcoin által, hogy kihagyhatatlan befektetési lehetőséggel csalja csapdába áldozatait, sőt van, aki ehhez Tinderen és más párkereső oldalon regisztrálva, álprofilokon keresztül magát csinos nőnek adja ki, hogy a flörtölésből pénzügyi tanácsadásra váltson, és így hálózzon be gyanútlanokat. Most nem a szerencselovagokról lesz szó, hanem azokról, akik jókor vettek kriptovalutát. A bitcoin árfolyama több mint négyszeresére nőtt az idei mélypontjához képest, és most átlépte a 20 ezer dolláros lélektani határt is. Korábban már megírtuk, hogy mi is az a bitcoin. De a kalandos történetű kriptovaluta ára egész érdekesen alakult az elmúlt pár évben, amit érdemes feleleveníteni. A nyílt forráskódú digitális pénzt 2009 januárjában bocsátották ki, kezdetben még nem volt túl ismert, kellett 8 év, hogy berobbanjon. 2017 áprilisában ment nagyot igazán, de akkor is még – a mostanihoz képest jóval barátibb – 1000 dollár környékén lehetett kereskedni vele. Még abban az évben a bitcoin ára megközelítette a 20 ezres határt. Ekkor megindult egy lejtmenet, jöttek a hírek, hogy „kidurrant a bitcoinlufi”, mivel egy év alatt egészen 3000 dollárig gyengült. Amikor már elkezdte volna mindenki temetni, újra megerősödött: 2019 nyarán 10 ezer dollár körül vásárolták. Ezt követően megint meggyengült picit, 2020. márciusban 5000 dollár alatt is járt, majd ismét kilőtt, de úgy, mint még soha. Egyes elemzők azt jósolták, hogy a bitcoin nem fogja áttörni a 20 ezer dolláros lélektani határt – ehhez képest ez 2020 decemberében megtörtént. Sőt! 2021 januárjában már volt 40 ezer dollár felett is. A legutóbbi héten is óriási kilengéseket produkált a bitcoin árfolyama: a kriptodevizával az elmúlt napokban 29 ezer és 38 ezer dollár között kereskedtek. Akik időben kapcsoltak, azok alaposan meg tudtak gazdagodni ebből. Íme néhány példa, hogy csalás nélkül hogy sikerült őrülten nagy vagyont szerezniük azoknak, akik jókor találkoztak ezzel a kriptovalutával. Mielőtt elkezdene keresgélni a nevek után, hogy kiderítse, kik is a szerencsések, nos civilek, ami mutatja, hogy a történet bármelyikünkkel megtörténhet. John Ratcliff például ajándékba kapott egy kis bitcoint még 2012-ben. Amikor ránézett, akkor azt látta, hogy jó, ha 13 dollárt ér az egész. Kicsit meg is feledkezett róla. Egy évvel később, amikor újra ránézett az egyenlegére, akkor látta, hogy már 72 dollár értékű kriptovalutája van. Akkor Ratcliff úgy döntött, hogy ebből a pénzből elviszi a feleségét vacsorázni. Természetesen itt nem állt meg a történet, különben nem írnánk róla. Ratcliff még abban az évben befektetett 15 ezer dollárt, amiből pont 100 darab bitcoinra futotta. Ebből a befektetésből tud most venni magának egy 1,4 millió dolláros házat, és várja, hogy elkezdjék gyártani, és megérkezzen a 250 ezer dolláros Teslája. Közben ebből a pénzből vett az unokaöccsének egy házat, és kifizette a gyerekeinek a diákhitelét is. Eddy Zillan a bar micvójára kapott a szüleitől 5 ezer dollárt, hogy indítson egy befektetési alapot. A fiú úgy döntött, hogy nem kezd el egyből tőzsdézni, inkább keresett még 7000 dollárt a nyári munkáival. Fogta ezt a 12 ezer dollárt, és bitcoint és ethereumot vett belőle. Ez volt 2012-ben. 5 év alatt elég jól fialt a befektetése, mivel 2017-re már 500 ezer dollárt értek a megvásárolt kriptovalutái.';
	upload(szoveg);
}

function test3() {
	var szoveg = 'Tagadta Vlagyimir Putyin orosz elnök, hogy az övé lenne az a titkos palota a Fekete-tenger partján, amelyet Alekszej Navalnij orosz ellenzéki politikus állítása szerint ő birtokol, írja az MTI. Semmi, amire ott (a filmben) rámutattak, nem a tulajdonom, és nem volt sem az én tulajdonom, sem a rokonaim tulajdona. Soha – mondta Putyin hétfőn, egy diákokkal megtartott találkozón. A legismertebb orosz ellenzéki politikus, Navalnij által alapította Korrupcióellenes Küzdelem Alapítvány (FBK) január 19-én tett közzé egy kétórás dokumentumfilmet, amelyben azt állította, hogy Putyin egy 100 milliárd rubelt (mintegy 400 milliárd forintot) érő titkos uradalmat építtetett magának a Fekete-tenger partján, Gelendzsik üdülőváros közelében. Az angol feliratos anyagot hétfő kora délutánig már több mint 86 milliószor nézték meg a YouTube-on. A filmben Navalnij bemutatja Putyin titkosszolgálati kapcsolatait és a drezdai KGB-s szolgálata idején kiépített hálózatát, amelynek tagjai Putyin hatalomra kerülése óta kulcspozíciókat foglaltak el az orosz gazdasági életben, és az ország legvagyonosabb oligarchái lettek. A palota helyén, Gelendzsikben még gyermekrekreációs központot akartak létrehozni 2005-ben, amire 1 milliárd dollárt szántak – Navalnij szerint pedig ebből az 1 milliárd dollárból épült Putyin kastélya, ami Navalnij videója szerint most Putyin beosztottainak a tulajdonában van – ahogyan az a borászat is, amelynek borait a Kreml bankettjein szokták felszolgálni. Az 17691 négyzetméteres rezidenciát az FSZB több kilométeres sugarú körben, a szárazföldön, vízen és levegőben is védi. Navalnij állítása szerint egy építési vállalkozótól szerzete meg az épület alaprajzát. A tavalyi novicsokos merényletet túlélő Navalnij egy hete tért vissza Németországból Moszkvába. Az ellenzéki politikust még a repülőtéren őrizetbe vették január 17-én este, bíróságra sem vitték, hanem a Moszkva melletti Himki rendőrségén rendezték meg az ülést, ahová csak két sajtótermék újságíróját engedték be. A rögtönzött bíróságon 30 napos elzárásra ítélték. A hatóság azzal magyarázták a szokatlan eljárást, hogy Navalnijnak nem volt friss negatív koronavírustesztje.';
	upload(szoveg);
}

function test4() {
	var szoveg = 'Kis Zoltán virológus úgy látja: a brit koronavírus-mutáció sok előnyhöz jutott a már ismert kórokozóhoz képest. Például valószínűleg kevesebb mennyiséggel is képes fertőzést okozni. A vakcinafejlesztés szempontjából fontos lehet a brit vírusmutáció vizsgálata a Nemzeti Népegészségügyi Központban (NNK) – mondta a kutatás laborvezetője hétfőn az M1-en. Kis Zoltán virológus szerint a mutáns vírust már izolálták, most a „felszaporításán” dolgoznak. A tervek szerint megvizsgálják, hogy az eredeti vírussal fertőzött betegek savója miként viszonyul a mutációhoz. Azt is mondta: ha azt tapasztalják, hogy az immunrendszer hasonló mértékben semlegesíti az új vírust, akkor egyelőre nem kell módosítani a vakcinát. Ha azonban a vírusokban bekövetkezik annyi és olyan szintű mutáció, hogy azzal az immunrendszer már nem tud mit kezdeni, akkor a vakcinán változtatásokat kell majd végrehajtani. A Nemzeti Biztonsági Laboratóriumban most vizsgált N501Y (brit) variánsról úgy tűnik, hogy a mutációja során „előnyhöz jutott” a már ismert koronavírushoz képest. Valószínűleg jobban tud kötődni az emberi receptorokhoz, vagyis kevesebb vírus is képes valakit megfertőzni. Ugyanez a mutációs pont megtalálható az új dél-afrikai és az új brazil vírusban is – tette hozzá a virológus, megjegyezve, hogy az utóbbiaknak további mutációik is vannak. Dél-Afrikában már egyre jelentősebb a mutáns vírus térnyerése, Dánia és Hollandia pedig már arra készül, hogy pár hónapon belül új mutáns vírus veszi át a mostani helyét – közölte Kis Zoltán.';
	upload(szoveg);
}

function test5() {
	var szoveg = 'Szerda kora reggel, Joe Biden beiktatásának napján Donald Trump egy marylandi katonai bázison fog elbúcsúzni az elnökségtől, írja a Guardian a kiküldött meghívók alapján. Korábban még arról lehetett hallani, hogy Trump egy nagyszabású katonai parádéval, vörös szőnyeggel és illusztris vendégek sorával búcsúzott volna a Fehér Háztól, de miután január 6-án felhergelte táborának egy részét, akik aztán betörtek a Capitoliumba, nem sok olyan befolyásos ember maradt Washingtonban, aki szívesen mutatkozna Trump társaságában, ahogy feltehetően a katonai vezetők sem szívesen asszisztáltak volna egy nagyobb léptékű parádéhoz. Trump ellen jelenleg is alkotmányos vádeljárás zajlik, emellett pedig jó eséllyel vizsgálatok és eljárások sorára számíthat majd távozása után. A kiküldött meghívók alapján Trump maradék szövetségesét szerda reggel nyolcra várják arra a katonai bázisra, ahol az elnöki különgépet, az Air Force One-t is tárolják. Ez négy órával Joe Biden beiktatási ceremóniája előtt lesz. Azt már lehet tudni, hogy Trump, megszakítva egy 150 éves tradíciót, nem lesz ott utódja beiktatásán, ellenben Mike Pence alelnök igen. Azt egyelőre nem tudni, hogy Pence a légibázisra szervezett eseményen is jelen lesz-e. Sokat nem tudni még Trump búcsúeseményéről, de a meghívóból annyi kiderült, hogy a meghívottaknak reggel negyed nyolcra oda kell érniük a bázisra, ahol amúgy fagypont körül alakul majd ekkor a hőmérséklet. A búcsúesemény után Trump elnöksége alatt utoljára felszáll majd az elnöki különgépre, és a floridai Mar-a-Lago-i rezidenciára utazik majd feleségével együtt, így Biden beiktatása idején több ezer kilométernyire lesz Washingtontól. Érdekesség, de ha Trump Biden beiktatása után akarta volna a géppel elhagyni Washingtont, akkor már engedélyt kellett volna kérnie az új elnöktől. Négy évvel ezelőtt Barack és Michelle Obama teával fogadta a Fehér Házban az oda megérkező Donald és Melania Trumpot. Egyelőre azt sem tudni, hogy Trump tervezi-e felhívni utódját, illetve hogy kitart-e a hagyomány mellett, mely szerint az új elnököt egy elődje által írt levél várja érkeztekor a Fehér Házban. A jelenkori történelemben pedig Melania Trump lehet az első olyan first lady, aki nem vezeti körbe az épületben az új elnök feleségét. A védelmi minisztérium magas rangú tisztviselői arról beszéltek a Defense One nevű szaklapnak, hogy a hadsereg nem tervez hivatalosan elbúcsúzni a főparancsnokától, azaz nem lesz olyan ceremónia, mint amire sor került Ronald Reagan, a két Bush, Bill Clinton vagy Barack Obama távozásakor. Trumpot a január 6-ai események óta egyszer lehetett nyilvánosság előtt látni, amikor múlt kedden a mexikói határhoz utazott. Az elmúlt hetekben nem vett részt eseményeken, a katonaságtól is Mike Pence alelnök búcsúzott el a hétvégén két helyszínen is, holott ezt jellemzően a távozó elnökök szokták megtenni.';
	upload(szoveg);
}

function torol() {
	upload("");
}


function upload(szoveg) {
	$('#cikk-szoveg').val(szoveg);
}
