$(() => {
console.log('JS OKAY!');

function refreshIt() {
	window.location.reload();
}
 $('#refresh').click(refreshIt);
	

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
	})
})	

























});