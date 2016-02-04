(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* globals $, document */
$(document).ready(function () {
  $('.text').each(function (index, el) {
    parseString($(this))
  })

  $(window).scroll(function (e) {
    $('.layer').css('top', $(window).scrollTop())
  })

  if ($('.tweet').length === 0) {
    $('.title').html('You have 0 tweets')
  } else {
    setInterval(function () {
      $.ajax({
        url: '/tweets',
        type: 'GET',
        success: function (data) {
          if (data[0].id_str !== $('.tweet .text').first().attr('id')) {
            window.location = '/'
          }
        }
      })
    }, 10000)
  }

  $('.delete').click(function (e) {
    e.preventDefault()
    var id = $(this).parent().html().split('id="')[1].split('"')[0]

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
          id: id
        }
      })
      setTimeout(function () {
        window.location = '/'
      }, 300)
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
      }, 300)
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

},{}],2:[function(require,module,exports){
function parseString(t){var e,n,l,i=/^#\w+|#\w+|#\w+$/,a=/^@\w+|@\w+|@\w+$/;if(i.test(t.html())){var s=i.exec(t.html())[0];e=t.attr("id"),n=t.html().split(s)[0],l=t.html().split(s)[1],$("#"+e).html(n+'<span class="colored">'+s+"</span>"+l)}if(a.test(t.html())){var c=a.exec(t.html())[0];e=t.attr("id"),n=t.html().split(c)[0],l=t.html().split(c)[1],$("#"+e).html(n+'<span class="colored">'+c+"</span>"+l)}}$(document).ready(function(){$(".text").each(function(t,e){parseString($(this))}),$(window).scroll(function(t){$(".layer").css("top",$(window).scrollTop())}),0===$(".tweet").length?$(".title").html("You have 0 tweets"):setInterval(function(){$.ajax({url:"/tweets",type:"GET",success:function(t){t[0].id_str!==$(".tweet .text").first().attr("id")&&(window.location="/")}})},1e4),$(".delete").click(function(t){t.preventDefault();var e=$(this).parent().html().split('id="')[1].split('"')[0];$(".ask").show(),$(".no").click(function(t){t.preventDefault(),$(".layer").hide()}),$(".yes").click(function(t){t.preventDefault(),$(".layer").hide(),$.ajax({url:"/delete",type:"POST",data:{id:e}}),setTimeout(function(){window.location="/"},300)})}),$("#link").click(function(t){t.preventDefault(),$(".new").show()}),$(".newTweet-cancel").click(function(t){t.preventDefault(),$(".new").hide()}),$(".newTweet").submit(function(t){t.preventDefault();var e=$(".tweet-status").val();e.length<=140?($.ajax({url:"/tweet",type:"POST",data:{status:e}}),setTimeout(function(){window.location="/"},300)):$(".tweet-button").before('<p class="error">Status is over 140 characters.</>')})});
},{}],3:[function(require,module,exports){
if ("production" === 'development') {
  module.exports = require('./app.js')
} else {
  module.exports = require('./app.min.js')
}

},{"./app.js":1,"./app.min.js":2}]},{},[3]);
