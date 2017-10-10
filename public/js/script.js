$(() => {
	console.log('JS OKAY!');

	function refreshIt() {
		window.location.reload();
	}
	$('#refresh').click(refreshIt);

	/**
	 * when user clicks "mix it up" button, take form data
	 * and POST it to the api with the data found in the form.
	 */
	$('#new-task').on('submit', (event) => {
		event.preventDefault();

		const newData = {
			name: $('#title').val(),
			measurements: $('#measurements').val(),
			ingredients: $('#ingredients').val(),
			instructions: $('#instructions').val(),
			beverageType: $('#beverageType').val(),
			image: $('#img_url').val()
		}

		$.ajax('/tasks/', {
			method: 'POST',
			data: newData,
			success: data => {
				window.location.href = `/recipes/${data.id}`;
			},
			error: err => console.log(err)
		});
	});

	/**
	 * When user clicks submit to edit an existing recipe,
	 * take current form data and make a PUT call.
	 */
	$('#beverageEdit').on('submit', (event) => {
		event.preventDefault();

		const newData = {
			name: $('#edit-title').val(),
			measurements: $('#edit-measurements').val(),
			ingredients: $('#edit-ingredients').val(),
			instructions: $('#edit-instructions').val(),
			beverageType: $('#edit-beverageType').val(),
			image: $('#edit-image').val()
		};

		$.ajax(window.location.pathname, {
			method: 'PUT',
			data: newData,
			success: data => {
				window.location.href = `/recipes/${data.id}`;
			},
			error: err => console.log(err)
		});
	});

	/**
	 * GET THE CURRENT DRINK DISPLAYED AND MAKE AN API CALL TO POST
	 * IT TO THE DATABASE
	 * 
	 * When user clicks on the save button, scrap current drink data from
	 * the page and make an ajax call with the data.
	 */
	$('#save').on('click', (event) => {
		event.preventDefault();
		let ingredients = [];
		let measurements = [];

		/**
		 * I had to update the home.html page to include a hyphen
		 * so i can separate measurements from ingredient. I just split
		 * them and push each in it's own comma separated list.
		 */
		$('#ingredients > li').each(function(index) {
			let split = $(this).text().split('-');
			measurements.push(split[0]);
			ingredients.push(split[1]);
		});

		const newData = {
			name: $('#recipeName').text(),
			measurements: measurements.join(','),
			ingredients: ingredients.join(','),
			instructions: $('#instructions').text(),
			beverageType: $('#alcoholPref').text(),
			image: $('#img').attr('src')
		};

		debugger

		$.ajax(window.location.pathname, {
			method: 'POST',
			data: newData,
			success: data => {
				window.location.href = `/recipes/${data.id}`;
			},
			error: err => console.log(err)
		});
	});
});