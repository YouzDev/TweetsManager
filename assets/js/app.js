$(document).ready(function() {
	var id
	var textValue
	
	$('.edit').click(function (e) {
		e.preventDefault();
		
		// id = $(this).parent().html().split('id="')[1].split('"')[0]
		// var elementAtId = $('#' + id)
		// textValue = elementAtId.html()
		
		// elementAtId.after('<textarea type="text" class="edit">' + textValue + '</textarea>')
		// elementAtId.remove()
		
		// $(this).after('<a href="#" class="save"><i class="fa fa-check"></i></a>')
		// $(this).remove()

		// $('.delete').after('<a href="#" class="cancel"><i class="fa fa-times"></i></a>')
		// $('.delete').remove()

		// $('.save').click(function (e) {
		// 	e.preventDefault();

		// 	if ($('.edit').length <= 140) {			
		// 		$.ajax({
		// 			url: '/edit',
		// 			type: 'POST',
		// 			data: {status: $('.edit').val()},
		// 		})
		// 		.done(function() {
					
		// 		})
		// 	} else {
		// 		console.log("must be < 140");
		// 	}
		// });

		// $('.cancel').click(function (e) {
		// 	e.preventDefault()

		// 	if ($('.edit').val() != "") {			
		// 		$('.edit').before('<p class="text" id="#' + id + '">' + $('.edit').val() + '</p>');
		// 		$('.edit').remove()
		// 	}
		// });
	})

	$('.delete').click(function (e) {
		e.preventDefault();
		$('.ask').show()

		$('.no').click(function (e) {
			e.preventDefault()
			$('.layer').hide()
		});

		$('.yes').click(function (e) {
			e.preventDefault()
			$('.layer').hide()
			$.ajax({
				url: '/delete',
				type: 'POST',
				data: {id: $('.delete').parent().html().split('id="')[1].split('"')[0]},
			})
			$('.delete').parent().remove()
		});
	})

	$('#link').click(function (e) {
		e.preventDefault();
		$('.new').show()
	});

	$('.newTweet-cancel').click(function (e) {
		e.preventDefault();
		$('.new').hide()
	});

	$('.newTweet').submit(function (e) {
		e.preventDefault()
		if ($('.edit-input').length <= 140) {			
			$.ajax({
				url: '/tweet',
				type: 'POST',
				data: {status: $('.tweet-status').val()},
			})
			$('.new').hide()
			window.location = '/'
		} else {
			console.log("must be < 140");
		}
	});
});
