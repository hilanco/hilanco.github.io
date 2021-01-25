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
    /*if(onlineModels == 0) {
        $(".model-error").fadeIn("slow").delay( 2000 ).fadeOut("slow");
        return;
    }*/
	$(".se-pre-con").show();
	var szoveg = $('#cikk-szoveg').val().trim();
	if (szoveg == "") {
		alert('Töltse ki a szöveg mezőt!');
	}
	
	var objectToSend = new Object();
	var data = new Object();
	data.cleanedBody = szoveg;
	objectToSend.data = data;
	
	var jsonToSend = JSON.stringify(objectToSend);
	//alert(jsonToSend);
	$.ajax({
	   type: "POST",
	   url: "https://juniper.nytud.hu/demo/tag",
	   data: jsonToSend,
	   //username: 'hvg',
	   //password: 'nlpg',
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
    alert(JSON.stringify(tags));
	updateTags();
}

function updateTags() {
	var predikalt = $('#cimke-predikalt');
	
	predikalt.empty();
	
	var re = new RegExp('@@', 'g');
	
	var top3Checked = $("#top3").is(':checked');
	
	for (i in tags){
		var tag = tags[i]['tag'];
		var num = parseFloat(tags[i]['score']).toFixed(3);

		if(num >= aktProb) {
			predikalt.append(
				'<li>' +
				tag.replace("__label__", "").replace(re," ") +
				' (' + num + ')' +
				'</li>'
			);
		}
	}
	var predictTagsAdded = 0;	
	if ( top3Checked && $('#cimke-predikalt li').length < 3 ) {
		predikalt.empty();
		for (i in tags) {
			var tag = tags[i]['tag'];
			var num = parseFloat(tags[i]['score']).toFixed(3);
			if(predictTagsAdded < 3) {
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
	var szoveg = 'Minden egyes zöldpaprikában ott rejtőzik a C-vitamin, csak elő kellett csalogatni, és amikor eljött az idő, valaki elő is csalogatta. Egy lehulló alma csak egy közönséges gyümölcs, másnak a gravitáció. A fekete lyuk mindig ott volt, ahol jelenleg Ste­phen Hawking tartózkodik, pont ez a bizonyíték mindkettő létezésére. Ha nincs Harry Potter, nincs több millió, Hermionenak öltözött vidám gyerek, de a borsodi Voldemort sem. A coke a drogbáró Pablo Escobar hívószava. Ha nincs a Beatles, a zaj mást jelentene, az Oasis nem egy zenekar, hanem a hely a sivatagban, ahová minden szomjazó vágyik. Ha nincs a Beatles, más oka lenne a szex, drog & rock and rollnak.\n\nA popuniverzum keletkezésének legújabb magyarázata az egész bolygóra kiterjedő 12 másodperces áramszünettel kezdődik. Egy kicsit szerényebb a koncepció, mint a nagy bumm, de azért így is elég messzire hallatszik. A héten mozikba kerülő játékfilm, a Yesterday készítői szívesen vállaltak néhány logikai bukfencet annak érdekében, hogy szórakoztatóan bizonyítsák egy olyan alternatív idővonal létezését, amelyen nem lelhető fel a modern zene legnagyobb hatású zenekara. Néhány pillanat alatt eltűnt a Földön eladott másfél milliárd album, az összes Penny Lane utcatábla, valamennyi liverpooli hűtőmágnes, a sárga tenger­alattjárók rajzfilmestül, az Abbey Road zebrája a „rossz oldalon” parkoló VW-val együtt.\n\nA kerékpárján hazafelé tartó Jack, akit a párhuzamos univerzumban a teremtő arra ítélt, hogy egész életében sikerületlen dalát, a Summer Songot pengesse, összeütközik egy busszal. Néhány nappal később haverjaival az újjászületését ünneplik, valaki a kezébe nyom egy gitárt, pont egy olyan Epiphone Texan modellt, amelyet Paul McCartney a komponáláskor használt, és arra kérik, játsszon valamit. Belekezd a Yesterdaybe, majd miután mindenki magához tért az első döbbenetből, megkérdezik tőle, mikor írta ezt a dalt? Azt válaszolja, nem ő írta, hanem a Beatles. Néhány kattintás után kiderül, hogy a Beatles nem létezik, dalaik egyszerűen átszálltak Jack fejébe és szívébe. A világ ugyan­olyan izgalomba jön, mint a hatvanas évek elején.\n\nA címadó dal minden idők talán legkedveltebb Beatles-slágere. Megjelenése óta olyan mágikus hatást kelt, mint az égből a földre pottyant dolgok. Milliókat érdekelt a csodálatos melódia keletkezéstörténete, de még Ian McDonald, aki 188 Beatles-dalt elemzett, dokumentált és lábjegyzetelt A fejek forradalma című könyvében, sem tud sokkal többet a misztériumról, mint bárki más. Az biztos, hogy 1965. június 14-én vették fel az Abbey Road 2-es stúdiójában, F-dúrban szól, McCartney gitárjátékát vonósok kísérik.\n\nA Help! című album B oldalán a 6. dalként rögzített Yesterday szerzőjeként a Lennon–McCartney-­kettős szerepel, de teljes egészében McCartney írta, John Lennon, Ringo Starr és George Harrison nem volt jelen a felvételkor. Egy alkalommal McCartney azt állította, akkor született, amikor a barátnője londoni lakásában lógott, máskor azt, hogy a párizsi George V luxushotelben.\n\n„Úgy érzem, évtizedek óta a fejemben volt. Nem írtam, hanem megálmodtam, egyszer csak kipottyant, mint egy tojás. Semmi egyenetlenség, sehol egy karcolás.”\n\nA Yesterday első szövegváltozata még a Scrambled Eggs címet viselte, emléket állítva annak, hogy a világon kevés vonzóbb dolog van, mint egy reggeli tojásrántotta és a paplan alól kilátszó két formás női láb. A végleges változat a Guinness Rekordok Könyve szerint minden idők legtöbbször feldolgozott dala: 3000 interpretációja ismert, a rádióállomások 7 millió alkalommal játszották, és játsszák ma is.\n\nA produkció legjobban fizetett sztárjai a Beatles-dalok voltak. Az angol gyártó cég, a filmjeivel 1992 óta hétmilliárd dollár bevételre szert tett Working Title Films tízmillió dollár jogdíjat fizetett, hogy az angol mozi két sikerembere elkészíthesse a Beatles repertoárjának legtündöklőbb darabjaira épülő meséjét. Richard Curtis korábban olyan filmek forgatókönyvét írta, mint a Négy esküvő és egy temetés, az Igazából szerelem, a Sztárom a párom és a Bridget Jones naplója. A Sekély sírhanttal feltűnést keltett, a Trainspottinggal befutott, majd a Gettómilliomossal Oscar-díjat nyert Danny Boyle rendező most annak a bemutatására vállalkozott, hogy a levitáció akár meg is történhet.\n\nA popkultúra nagy teljesítményeinek emléket állító filozofikus filmek általában tönkreteszik az emberek szórakozását. A Yesterday meg sem kísérli, hogy választ adjon egy alternatív keletkezéstörténettel kapcsolatos kérdésre, helyette azt állítja: a zsenialitás nem szorul magyarázatra.\n\n„A világóra rugóit még Isten húzta fel” – idézi az időről elmélkedve szabadon Newtont a Beatles-biblia szerzője, Ungvári Tamás –, tehát világos: istennek kell lennie annak, aki meg akarja állítani.';
	upload(szoveg,);
}

function test2() {
	var szoveg = 'A világ 19 legnagyobb fejlett és felzárkózó gazdaságát, valamint az Európai Uniót összefogó G20 csoport oszakai csúcstalálkozóján derült ki, hogy az Egyesült Államok és Kína újraindítja a kereskedelmi tárgyalásokat. Ezzel még csak keretet biztosítottak egy későbbi, lehetséges megállapodáshoz, az viszont már konkrétum, hogy Donald Trump sajtótájékoztatóján bejelentette: a kormányzat ismét lehetővé az amerikai cégek beszállítsanak a Huaweinek.\n\nAz Egyesült Államok elnöke május közepén rendelt el szükségállapotot annak érdekében, hogy "megvédje az amerikai informatikai hálózatokat a külföldi ellenségektől". Néhány nappal később teljesen egyértelművé vált, hogy az intézkedés a Huawei ellen szól. A Google kénytelen volt megvonni az Android legfontosabb részeinek használati jogát a második legnagyobb mobilgyártótól, majd több amerikai nagyvállalat, többek között az Intel és a Qualcomm is leállította a kereskedést a Huawei-jel. Ez a három cég azért érdemel külön említést, mert később éppen a két processzorgyártó és a Google kezdett erős lobbizásba annak érdekében, hogy a Trump-adminisztráció oldja fel a tiltást.\nDonald Trump a kínai-amerikai viszonyokról tartott szombati G20-as sajtótájékoztatón\n\nHogy végül miért kerülhetett erre sor, azt egyelőre nem tudni. Az biztos, hogy Trump tőle szokatlan engedékenységet mutat: a G20-találkozó előtt még – az eddig alkalmazottakon felül – 300 milliárd dollárnyi értékben emelte volna a kínai importra vonatkozó vámokat. A BBC tudósítása szerint a oszakai csúcson előbb azt mondta, hogy lekerült a napirendről a kérdés, majd egy következő sajtótájékozatón jelentette be a Huawei-embargó feloldását.\nDobja a Huawei az Androidot?\n\nAz biztos, hogy a jelenleg a Huawei telefonjait használók teljesen megnyugodhatnak, készülékeik ugyanúgy megkapnak majd mindenféle Android-frissítést és a Google által kidolgozott új funkciót, mintha mi sem történt volna. A már a boltokba került telefonok vásárlása szintén veszélytelenné vált, az amerikai tiltás feloldásának értelmében nem fordulhat elő, hogy néhány hónap múlva lekapcsolnak rajtuk ezt-azt.\n\nMás téren viszont nehéz megjósolni, hogy mi történik ezután. Az elmúlt hetek sokszor drámainak tűnő eseményei minden bizonnyal emlékezetesek maradnak a Huawei minden vezetője és munkatársa számára. Nem kizárt, hogy alapító és a menedzsment arra a következtetésre jut, hogy még egyszer nem szeretnék ilyen veszélynek kitenni a vállalatot, ezért hiába is használhatnák tovább a korábbi feltételekkel az Androidot, végül nem így tesznek majd. Reális lehetőségről van szó, hiszen a Huawei – éppen az évek óta lebegtetett amerikai intézkedések miatt – régóta munkálkodik egy saját platformon, melyen ezekben a hetekben már az utolsó simításokat végezték. A platform állítólag 60 százalékkal gyorsabb az Androidnál, ráadásul már más kínai mobilgyártók is elgondolkodtak azon, hogy a Huawei rendszerére cserélik le az Androidot.\n\nPersze akármilyen gyors is a Huawei saját rendszere és akárhány kisebb kínai gyártó áll is mögé, akkor sem lenne egyszerű bevezetni. Ahogy az embargó elrendelése utáni elemzésünkben megírtuk, hasonló próbálkozásba már maga a Microsoft is belebukott.\n\nA vállalat ikonikus társalapítója, Bill Gates épp a minap fogalmazta meg véleményét, miszerint az okostelefonok világában az Apple mellett egyetlen hely kiadó, ezt birtokolja a Google-féle Android. Gates élete legnagyobb hibájának tartja, hogy a Microsoft anno lecsúszott a hely megszerzéséről. Kérdés, hogy a Huawei-alapító Zsen Cseng-fej – aki szerint az USA alábecsüli vállalata erejét – reális lehetőségként tekint-e arra, hogy megpróbálja azt, ami Gatesnek és Microsoftnak anno nem sikerült.';
	upload(szoveg);
}

function test3() {
	var szoveg = 'A kongresszust azt követően szervezték meg, hogy május végén Liviu Dragnea volt pártelnököt jogerősen letöltendő börtönbüntetésre ítélték egy korrupciós perben, ezért börtönbe kellett vonulnia. Azóta Dancila volt a párt ideiglenes elnöke, akinek három kihívója volt a szombati megmérettetésen.\n\nA pártelnököt egy körben választották, így az nyert, aki a legtöbb szavazatot kapta. A szavazás ily módon való lebonyolításáról pénteken határozott a párt országos ügyvezető testülete és megfigyelők szerint ez Dancilának kedvezett. A kormányfő a román média értesülései szerint 2828 szavazatot kapott, második helyen Liviu Plesoianu parlamenti képviselő végzett 715 vokssal.';
	upload(szoveg);
}

function test4() {
	var szoveg = 'Az úszó tíz évvel ezelőtt, 2009-ben szerezte meg első világbajnoki címét, most összegezte az elmúlt évtizedét a Nemzeti Sportnak adott interjújában. Csúcsok, lejtők, hegymenet és pofonok is előkerülnek.\n\nHosszú Katinka azt mondta a beszélgetésben, hogy a vagányság már akkor is, tíz évvel ezelőtt is benne volt, „az, hogy álljunk fel a rajtkőre, és nézzük meg, ki mit tud! Enélkül nem is lehet világbajnokságot nyerni.” De az akkori úszóban nem volt fegyelmezettség és tudatosság, ezt maga vallja be. Felidéz egy történetet, a 2008-as olimpiát megelőző edzőtábort Dél-Afrikából, amikor nem volt hajlandó úszószemüveget felvenni, hogy egyenletesen barnuljon le.\n\n„Ezt a történetet mindenki szereti. Egyébként igaz. Lázadás volt. Amikor a nagypapámmal készültem, és országos csúcsokat úsztam a korosztályomban, megvolt a célom, mégpedig hogy tizenöt évesen olimpiai bajnok leszek. Tizenhét-tizennyolc évesen úgy éreztem, hogy kudarcot vallottam, hiszen nem jöttek úgy az eredmények, ahogy szerettem volna, ezért azt éreztem, nem az vagyok, aki lenni szeretnék. Ráadásul tini is voltam – így lázadtam vagy védtem magam a kudarctól: közöltem mindenkivel, hogy engem senki se szólítson úszónak! Én nem vagyok úszó, az úszás a hobbim, csak az, amit csinálok, de nem én magam.”\n\nMa is makacs még, mondja, de akkor még nem tudtak vele mit kezdeni. Szokta is mondani szüleinek, reméli, gyermekei majd kevéssé lesznek nehéz természet. Ma már egyébként eszébe jut az anyaság, három vagy több gyermeket szeretne. Az elmúlt tíz évben voltak kisebb és nagyobb pofonok is, vallja, a legrosszabb és legnehezebb, ha „olyan pofont kapsz, amelyről nem tudod, mit is kellene belőle tanulnod.”\n\nKorábban akkor is elpirult, amikor valaki egy családi ebéden szólt hozzá, annyira szégyellős volt, ma pedig már motivációs előadásokat tart. „Sokszor szándékoson lavírozom magam kellemetlen helyzetbe azért, hogy tanuljak. Ha kényelmes vagy, sosem fejlődsz. Ezért is lesz más a tokiói Katinka – érettebb, tapasztaltabb vagyok.”\n\nNem tudja, kívülről látni-e ebből valamit, ő belül lett teljesen más. „Kívülről tök egyszerűnek és könnyűnek tűnik az elmúlt egy évem is, hiszen volt egy üresjárat, magánéleti és szakmai válság, edzőváltás, most meg itt vagyok, és megint nyerek. Ennyi. És közben minden más. Másként megyek oda egy versenyszám rajtjához, más a technikám, másként kerülök a zónába, másra gondolok úszás közben. Igen, azon a szinten vagyok vagy még magasabban, mint voltam korábban, csakhogy teljesen más utat jártam be, mint azt megelőzően.”\n\nHegyet mászott az elmúlt évben, de sokkal erősebb lett – szögezi le.\n\nNem viselte meg, hogy májusban 30 éves lett. „Most érzem magam a legjobban, már tudom, ki vagyok. Eddig ez nem így volt, huszonévesen azt sem tudja az ember, kicsoda, mit képvisel, rángatnak ide-oda mások, ezt mondd, azt csináld... Ma már ez nem így van. Már tudom, ki vagyok, mit szeretnék és hogyan.” Most kezdte el tisztelni és szeretni önmagát.\n\nVégül az újságíró rákérdez, bánt-e meg valamit az elmúlt 10 évben:\n\nHosszan sorolhatnám, rengeteg ilyen van – annyi hülyeséget csináltam! A mostani fejemmel sok mindent másként csinálnék, és nyilván akkor a pályafutásom is másként alakult volna. Viszont az már a múlt, nem is lehet rajta változtatni, de nem is kell. Ezek a hülyeségek, rossz döntések, hibás lépések mind kellettek ahhoz, hogy most az legyek, aki.';
	upload(szoveg);
}

function test5() {
	var szoveg = 'Évtizedek kutatásai bizonyítják a mai napon ünnepelt apák központi szerepét az egészséges önértékelésben. Főleg a lányok önvédését alapozhatja meg.\n\n„Te egy alma vagy” – mondja Erlend Loe norvég író Doppler hazatér című, 2017-es könyvében az apa a furcsa alakokkal randizgató kamaszlányának, csak úgy, tévénézés közben. A párbeszéd apa és lánya között így folytatódik:\n\n„Miért mondod ezt?”; „Azért. Csak úgy mondom. Mert alma vagy. Valakinek meg kell mondania. Egy csodás, piros, fényes alma vagy. De amikor valaki beleharap egy almába, elkezdődik a rothadás. Akkor megbarnul, fonnyadt lesz. És kicsivel később már nem is ízlik annyira.”\n\nÍrói túlzás vagy tudományos értékű megfigyelés? Olvassuk el a magyar felnőtt nő, Anna történetét: „Apám nagyon szeretett, de amikor kamasz lettem, ostobán viselkedett. Nem akart elengedni otthonról, csak hazudozva találkozhattam férfiakkal. Az eredmény? Még felnőttkoromban is görcsbe rándult a gyomrom, amikor a leendő férjemmel találkozgattunk. Az önbizalmam nulla volt, pedig csinos nő voltam. Azt gondolom, hogy az apám rosszallása elég volt ahhoz, hogy évekre elbizonytalanodjak.”\n\nAnna példája nem egyedi. Caroline Payne-Purvisnek, a Floridai Egyetem munkatársának 2014-es beszámolója mintha csak Annáról és a sorstársairól szólna. Kutatásában tizenéves lányok szexuális életét, ezen belül is rizikómagatartását vizsgálta. Eredményei egyértelművé tették, hogy ha egy tinédzserlány jó kapcsolatot ápol az apjával, kisebb a kockázata annak, hogy nem megfelelő partnerekkel randevúzik. Úgy is fogalmazhatunk, hogy egészséges önbizalmuk és stabil nemi identitásuk megvédi őket attól, hogy „bárkinek” odaadják magukat.\n\nHölgyek hormonjai\n\nDe hogyan is működhet ez a titokzatos apai hatás? Lehetséges lenne, hogy önmagában az apa viselkedése megerősítheti vagy tönkre teheti egy fiatal lány önértékelését? Jennifer Byrd-Craven amerikai pszichológus és munkatársai elhatározták, hogy kicsit jobban utánanéznek ennek az apa-lány dolognak. Kutatásukat nem bízták a véletlenre, egyenesen fiatal hölgyek hormonváltozásait vették górcső alá.\n\nAz eredmények a kutatók igyekezetét igazolták. 2012-ben publikált írásukban kiemelték, hogy azok a lányok, akiknek az apjukkal jó kapcsolatuk volt, bizony már a reggeli ébredést követően is alacsonyabb stresszhormonszintet mutattak. A kutatók megjegyzik: a jó apai kapcsolatú lányok stresszes helyzetben, illetve probléma megvitatása közben is megőrizték nyugalmukat. A rossz apai kapcsolatúak stresszhormonszintje a konfliktusok esetén megemelkedett, stresszhelyzetben pedig gyakrabban magukba zárkóztak.\n\nSzeretet és etetés\n\nSzámos kutatás utal arra, hogy a korai apai jelenlét csökkenti a kamaszlányok szorongását, növeli önérzetüket és általában véve szociális készségeiket. Melissa Home, a Georgetowni Egyetem pszichológusa 2011-ben kamaszlányok társkapcsolati boldogulását vizsgálva fogalmazta meg, hogy a lányok önbizalma, a párkapcsolaton belüli alárendelődése elsősorban az apjukhoz fűződő kapcsolat minőségétől függ.\n\nÉs ha már az almával kezdtük, folytassuk az étkezéssel. A Rutgers Egyetem 2014-ben megjelent kutatása szerint még a gyermeküktől külön élő apák is jelentősen befolyásolják gyermekeik étkezési szokásait, ha több időt töltenek gyermekeikkel, illetve a szeretetüket gyakrabban kifejezik. Az apai törődés stabilizálta a gyerekek étkezési szokásait, akkor is, ha az apa nem volt jelen.';
	upload(szoveg);
}

function torol() {
	upload("");
}


function upload(szoveg) {
	$('#cikk-szoveg').val(szoveg);
}
