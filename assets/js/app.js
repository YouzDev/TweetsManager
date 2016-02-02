/* globals $, document */

$(document).ready(function () {
  $('.text').each(function () {
    parseString($(this))
  })

  if ($('.tweet').length === 0) {
    $('h1').html('You have 0 tweets')
  }

  $('.delete').click(function (e) {
    e.preventDefault()
    $('.ask').show()

    $('.no').click(function (e) {
      e.preventDefault()
      $('.layer').hide()
    })

    $('.yes').click(function (e) {
      e.preventDefault()
      $('.layer').hide()
      $.ajax({
        url: '/delete',
        type: 'POST',
        data: {
          id: $('.delete').parent().html().split('id="')[1].split('"')[0]
        }
      })
      setTimeout(function () {
        window.location = '/'
      }, 1000)
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
    var status = $('.tweet-status').val()
    if (status.length <= 140) {
      $.ajax({
        url: '/tweet',
        type: 'POST',
        data: {
          status: status
        }
      })
      setTimeout(function () {
        window.location = '/'
      }, 1000)
    } else {
      $('.tweet-button').before('<p class="error">Status is over 140 characters.</>')
    }
  })
})

function parseString (text) {
  var hashtagRegex = /^#\w+|#\w+|#\w+$/
  var atRegex = /^@\w+|@\w+|@\w+$/
  var id
  var textStart
  var textEnd

  if (hashtagRegex.test(text.html())) {
    var hashtag = hashtagRegex.exec(text.html())[0]
    id = text.attr('id')
    textStart = text.html().split(hashtag)[0]
    textEnd = text.html().split(hashtag)[1]
    $('#' + id).html(textStart + '<span class="colored">' + hashtag + '</span>' + textEnd)
  }

  if (atRegex.test(text.html())) {
    var at = atRegex.exec(text.html())[0]
    id = text.attr('id')
    textStart = text.html().split(at)[0]
    textEnd = text.html().split(at)[1]
    $('#' + id).html(textStart + '<span class="colored">' + at + '</span>' + textEnd)
  }
}
