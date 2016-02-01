/* globals $, document */

$(document).ready(function () {
	$('.delete').click(function (e) {
		e.preventDefault()
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
		})
	})

	$('#link').click(function (e) {
		e.preventDefault()
		$('.new').show()
	})

	$('.newTweet-cancel').click(function (e) {
		e.preventDefault()
		$('.new').hide()
	})

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
      $('.tweet-button').before('<p class="error">The tweet must be < of 140 characters</>');
    }
  })
})
