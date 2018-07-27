<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link href="https://fonts.googleapis.com/css?family=Amatic+SC|Fjalla+One|Spirax|Playfair+Display+SC|PT+Sans" rel="stylesheet">
		<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	</head>
	<body>
		<div class="wrapper">
			<ul class="navbar">
				<li class="navbar__item"><a class="navbar__active" href="index.php">Wiki</a></li>
				<li class="navbar__item"><a href="news.html">News</a></li>
				<li class="navbar__item"><a href="contact.html">Contact</a></li>
				<li class="navbar__item"><a href="blackjack.php">Blackjack</a></li>
			</ul>

			<div class="title">
				<img src="img/wikipedia.png" width="250" height="250">
				<h1>Wikipedia API</h1>
			</div>
			<div class="content">
				<div class="content__intro">
					<h2>What do you wanna know?</h2>
						<input type="text" class="content__search" placeholder="Artists? Machinary?">
							<select class="content__amount">
								<option value="10">10</option>
								<option value="20">20</option>.
								<option value="50">50</option>
								<option value="100">100</option>
							</select>
						<input type="submit" class="content__submit" value="Search">
				</div>
				<div class="result"></div>

	</body>




	<script type="text/javascript" src="js/script.js"></script>
<!-- 	<script id="__bs_script__">//<![CDATA[
		document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.24.5'><\/script>".replace("HOST", location.hostname));
	//]]></script> -->
	</body>
	</html>