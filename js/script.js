
$(function() {
	const btn = document.querySelector('.content__submit');


	btn.addEventListener('click', showWikipedia);

	document.onkeypress = (e) => {
		if(e.keyCode == 13) {
			showWikipedia();
		}
	}

	function showWikipedia() {
		let resultAmount = $(".content__amount :selected").val();

		var searchTerm = $('.content__search').val();
		searchTerm = searchTerm.replace(/^\w/, function (chr) {
			return chr.toUpperCase();
		});

		var result = $('.result');
		result.empty();
		searchTerm = searchTerm.replace(/\s/g, '%20')

		var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&prop=revisions&prop=pageimages&rvprop=content&format=json&limit=' + resultAmount;
		$.ajax( {
			url: url,
			dataType: 'json',
			type: 'GET',
			contentType: "application/json; charset=utf-8",
			async: true,
			data: function(data, status, jqXHR) {
			},
			success: function(data) {
				console.log(data);
				//10 resultaten
				if(data[1]) {
				for(t = 0; t < data[1].length; t++) {
					if(data[2][t] != searchTerm.replace(/%20/g, " ") + " may refer to:") {
						result.append("<div class='result__item'><h1><strong>" + data[1][t] + "</strong></h1><br><p class='result__item--text'>" + data[2][t] + "<br></p><a class='result__item--link' target='_blank'href='"+data[3][t]+"'>Wikipedia</a></div>");
					}
				}
					if(data[1].length == 0) {
						searchTerm = searchTerm.replace(/%20/g, " ");
						result.text("No results found for " + searchTerm);
						
					}
				}
			},
			error: function(data) {
				document.write("Something went wrong..");
			},
		} );

	}

	// function dictionary() {
	// 	var url = 'https://api.pearson.com/v2/dictionaries/entries?headword=troll';
	// 	$.ajax( {
	// 		url: url,
	// 		dataType: 'json',
	// 		type: 'GET',
	// 		contentType: "application/json; charset=utf-8",
	// 		async: true,
	// 		data: function(data, status, jqXHR) {
	// 		},
	// 		success: function(data) {
	// 			console.log(data);
	// 			//10 resultaten
	// 		},
	// 		error: function(data) {
	// 			document.write("Something went wrong..");
	// 		},
	// 	} );
	// }

	// dictionary();
});