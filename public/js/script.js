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
		measurements: $('#measurement').val(),
		ingredients: $('#ingredient').val(),
		instructions: $('#instructions').val(),
		image: $('#img_url').val()
	}
	$.ajax('/tasks/', {
		method: 'POST', 
		data: newData,
		success: data => {
			location.href = `/tasks/${data.id}`
		},
		 error: err => console.log(err)
	})
})	

























});