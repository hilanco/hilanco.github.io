var data = {};
var aktId = '';
var aktModel = '';

$( document ).ready(function() {
	load(0);
	$(".se-pre-con").fadeOut("slow");
});

function load(num) {
	loadData(num);
    //alert(Object.keys(data).length);
	loadForm();
	aktId = $('#cikk-valszto').val();
	changeForm(aktId);
}


function next() {
    $("#cikk-valszto > option:selected")
        .prop("selected", false)
        .next()
        .prop("selected", true);
	var id = $('#cikk-valszto').val();
	aktId = id;
	changeForm(id);
}

function prev() {
    $("#cikk-valszto > option:selected")
        .prop("selected", false)
        .prev()
        .prop("selected", true);
	var id = $('#cikk-valszto').val();
	aktId = id;
	changeForm(id);
}

function loadnext() {
	$(".se-pre-con").show();
	var num = parseInt(aktModel.split("x")[1]);
	num++;
	if (num == 14) {
		num = 0;
	}
	/*var newModel = aktModel.split(".")[0];*/
	load(num);
	$(".se-pre-con").fadeOut("slow");
}

function loadprev() {
	$(".se-pre-con").show();
	var num = parseInt(aktModel.split("x")[1]);
	num--;
	if (num == -1) {
		num = 13;
	}
	/*var newModel = aktModel.split(".")[0];*/
	load(num);
	$(".se-pre-con").fadeOut("slow");
}


function convertNum (num) {
	var strNum = num;
	if(num < 10) {
		strNum = '0' + num;
	}
	return strNum;
}

function loadData(num) {
	aktModel = 'x' + convertNum(num);
	var rawFile = new XMLHttpRequest();
    //rawFile.open("GET", 'data/' + model + '/merged.predict.test.shuf', false);
	
    rawFile.open("GET", 'data/abs/' + aktModel, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
				//var dataObj = {};
                var allText = rawFile.responseText;
                var splittedText = allText.trim().split("\n");
				var i = 0;
				for (line in splittedText) {
					var segments = splittedText[line].split('\t');
					var obj = {};
                    obj = {
                        'id': i,
                        'title': segments[0].trim(),
                        'text': segments[1].trim(),
                        'lead': segments[2].trim(),
                        'multi': segments[3].trim(),
                        'hubertwiki': segments[4].trim(),
                        'hubertweb': segments[5].trim()
                    };
					data[i] = obj;
					i++;
				}
				//data[aktLang] = dataObj;
            }
        }
    }
    rawFile.send(null);
}

function loadForm() {
	//var dataObj = data[aktLang];
	var cikkValaszto = $('#cikk-valszto');
	cikkValaszto.empty();
	for (objI in data) {
		var aktObj = data[objI];
		var id = aktObj['id'];
		var title = aktObj['title'];

		cikkValaszto.append(
			'<option value="' + id + '">' + title + '</option>'
		);
	}

	$("#cikk-valszto option:first").attr('selected','selected');
}

function changeForm(id) {
	var dataObj = data[id];
	$('#cikk-lead').text(dataObj['lead']);
	$('#cikk-szoveg').text(dataObj['text']);
    
	$('#cikk-hubertweb').html(dataObj['hubertweb']);

	$('#cikk-hubertwiki').html(dataObj['hubertwiki']);

	$('#cikk-multi').html(dataObj['multi']);
}

$('#cikk-valszto').on('change',function(){
	var id = $(this).val();
	aktId = id;
	changeForm(aktId);
});
