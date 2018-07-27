
$(function() {

	let url = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=f2807a93894344c6a7458a87ef647bd4&lang=en&pageSize=100';
	const searchSubmit = $('.search__submit');
	const article = $('.article');
	const searchInp = $('.search__input');
	const scrollUpBtn = $('.scrollup');
	const navbar = document.querySelector('.navbar');

	scrollUpBtn.fadeOut(0);

	$(window).scroll( () => {

		if(window.scrollY >= 47) {
			scrollUpBtn.stop().fadeIn(500);
		}
		else {
			scrollUpBtn.stop().fadeOut(500);;
			
		}
	})

	scrollUpBtn.on("click", () => {
		navbar.scrollIntoView({behavior: "smooth", block: "start", inline: "end"});
	})

	$('body').on('mousedown', showSubmit)

	searchSubmit.fadeTo(0, 0, () => {
		searchSubmit.css("visibility", "hidden")
	});

	searchInp.on('mousedown', showSubmit);

	searchSubmit.on('click', searchNews);

	document.onkeypress = (e) => {
		if(e.keyCode == 13) {
			searchNews();
		}
	}

	function showSubmit(e) {
		let target = $(e.target)

		//If input is focused then
		if(target.is('.search__input')) {
			searchInp.css("color", "black");
			searchSubmit.css("visibility", "visible")
			searchSubmit.fadeTo(500, 1)
		}
		else {
			searchInp.css("color", "white");
			searchSubmit.fadeTo(500, 0, function() {
				searchSubmit.css("visibility", "hidden")
			});
			
		}
	}


	$.ajax ( {
			url: url,
			dataType: 'json',
			type: 'GET',
			contentType: "application/json; charset=utf-8",
			async: true,
			success: function(data) {
				console.log(data);
				if(data) {
					for(i=0; i < data.totalResults; i++) {
						if(data.articles[i].urlToImage != null) {
							console.log(data.articles[2].description);
							$img = "<img src='" + data.articles[i].urlToImage + "' width='250' height='250'>";
						}
						else 
							$img = "<img src='https://i.imgur.com/c7fky9L.png' width='250' height='250'>";

						if(data.articles[i].description !== null)
							$desc = data.articles[i].description;
						else 
							$desc = "";

						if($desc !== "")
						article.append("<div class='article__item'><div class='article__item-title'><h3>" + data.articles[i].title + "</h3>" + $img + "</div><div class='article__item-content'>" + $desc + "</div><div class='article__item-content--date'>" +  data.articles[i].publishedAt.substring(0,10) + "</div><div class='article__item-content--source'>Source: <a href='" + data.articles[i].url + "' target='_blank'>" + data.articles[i].source.name + "</a></div></div>");
					} 
				}
			},
			error: function() {
				document.write("Something went wrong..");
			}
	 });

	function searchNews() {
		article.empty();
		var searchTerm = document.querySelector('.search__input').value;
		url = 'https://newsapi.org/v2/everything?q=' + searchTerm + '&sortBy=publishedAt&apiKey=f2807a93894344c6a7458a87ef647bd4';
		$.ajax ( {
				url: url,
				dataType: 'json',
				type: 'GET',
				contentType: "application/json; charset=utf-8",
				async: true,
				success: function(data) {
					console.log(data);
					if(data.totalResults > 0) {
						for(i=0; i < data.articles.length; i++) {
							if(data.articles[i].urlToImage !== null)
								$img = "<img src='" + data.articles[i].urlToImage + "' width='250' height='250'>";
							else 
								$img = "";

							if(data.articles[i].description !== null)
								$desc = data.articles[i].description;
							else {
								$desc = "";
							}
							if(data.articles[i].urlToImage !== null)
							article.append("<div class='article__item'><div class='article__item-title'><h3>" + data.articles[i].title + "</h3>" + $img + "</div><div class='article__item-content'>" + $desc + "</div><div class='article__item-content--date'>" +  data.articles[i].publishedAt.substring(0,10) + "</div><div class='article__item-content--source'>Source: <a href='" + data.articles[i].url + "' target='_blank'>" + data.articles[i].source.name + "</a></div></div>");
						}
					}
					else {
						article.append("There are no results for " + searchTerm);
					}
				},
		});
	}
});