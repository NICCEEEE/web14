// 导航栏鼠标移入移出事件
var singleHeader = function(element) {
  var item = element
  // 鼠标移入
  item.addEventListener('mouseenter', function() {
    toggleStatus(item, 'active')
    var id = item.dataset.li
    activeDots(id, 'active')
  })
  // 鼠标移出
  item.addEventListener('mouseleave', function() {
    toggleStatus(item, 'active')
    var dotlist = document.querySelector('.dots')
    var dots = dotlist.querySelectorAll('li')
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active')
    }
  })
  // 鼠标点击
  item.addEventListener('click', function() {
    toggleStatus(item, 'visited')
    var id = item.dataset.li
    activeDots(id, 'visited')
  })
}

// 导航栏小圆点状态更改
var activeDots = function(itemid, status) {
  var dotlist = document.querySelector('.dots')
  var dots = dotlist.querySelectorAll('li')
  for (var i = 0; i < dots.length; i++) {
    if (dots[i].dataset.dot === itemid) {
      dots[i].classList.add(status)
    } else {
      dots[i].classList.remove(status)
    }
  }
}

// 绑定整个导航栏
var bindAllHeader = function() {
  var header = document.querySelector('.pages')
  var items = header.querySelectorAll('li')
  for (var i = 0; i < items.length; i++) {
    singleHeader(items[i])
  }

}

// 爱心按钮
var bindLike = function(l) {
  var like = l
  like.addEventListener('click', function() {
    toggleStatus(like, 'love')
  })
}

var bindAllLike = function() {
  var likes = document.querySelectorAll('.like')
  for (var i = 0; i < likes.length; i++) {
    bindLike(likes[i])
  }
}

// 播放状态
var playStatus = function(play, songid) {
  var span = play.querySelector('span')
  if (span.innerHTML === '►') {
    span.innerHTML = '| |'
    var s = a.src.split('/')
    console.log('src:', s[s.length - 1]);
    if (a.currentTime > 0 && s[s.length - 1] === songid + '.mp3') {
      console.log('continue');
      a.play()
      play.classList.remove('pause')
      toggleStatus(play, 'active')
    } else if (a.currentTime > 0) {
      a.src = '/static/musicplayer/' + songid + '.mp3'
      a.play()
      toggleStatus(play, 'active')
    } else {
      a.src = '/static/musicplayer/' + songid + '.mp3'
      a.play()
      toggleStatus(play, 'active')
    }
  } else {
    span.innerHTML = '►'
    a.pause()
    play.classList.add('pause')
    toggleStatus(play, 'active')
  }
}

// 清空播放按钮
var clearPlay = function(songid) {
  var plays = document.querySelectorAll('.play')
  for (var i = 0; i < plays.length; i++) {
    if (plays[i].closest('.songcell').dataset.song != songid) {
      plays[i].classList.remove('active')
      plays[i].classList.remove('pause')
      var span = plays[i].querySelector('span')
      span.innerHTML = '►'
    }
  }
}

// 更新音乐信息
var updateInfo = function(play) {
  var cell = play.closest('.songcell')
  var info = cell.querySelector('.songsname')
  var singner = info.dataset.singner
  var songname = info.innerHTML
  var t1 = document.querySelector('.singner')
  t1.innerHTML = singner
  var t2 = document.querySelector('.name')
  t2.innerHTML = songname
}

// 点击播放按钮更换播放图片
var changePlayImg = function(songid) {
  var back = document.querySelector('.back')
  var backimg = back.querySelector('img')
  var another = document.querySelector('.another')
  var anotherimg = another.querySelector('img')
  backimg.setAttribute('src', '/static/musicplayer/' + songid + '.jpg')
  var path = backimg.getAttribute('src').split('.')[0]
  var imgid = path[path.length - 1]
  nextid = (parseInt(imgid) + 1) % 4
  anotherimg.setAttribute('src', '/static/musicplayer/' + nextid + '.jpg')
}

// 播放按钮
var bindSinglePlay = function(p) {
  var play = p
  play.addEventListener('click', function() {
    var songs = play.closest('.songcell')
    var songid = songs.dataset.song
    clearPlay(songid)
    playStatus(play, songid)
    updateInfo(play)
    changePlayImg(songid)
  })
}

var bindAllPlay = function() {
  var plays = document.querySelectorAll('.play')
  for (var i = 0; i < plays.length; i++) {
    bindSinglePlay(plays[i])
  }
}


// 点击上/下一首图片切换
var changeImg = function(button, img) {
  var path = img.getAttribute('src').split('.')[0]
  var imgid = path[path.length - 1]
  if (button.classList.contains('next')) {
    nextid = (parseInt(imgid) + 1) % 4
    anotherid = (nextid + 1) % 4
  } else {
    nextid = (parseInt(imgid) + 3) % 4
    anotherid = (nextid + 3) % 4
  }
  img.setAttribute('src', '/static/musicplayer/' + nextid + '.jpg')
  var another = document.querySelector('.another')
  var anotherimg = another.querySelector('img')
  anotherimg.setAttribute('src', '/static/musicplayer/' + anotherid + '.jpg')
}

// 播放上/下一首
var nextSong = function(img) {
  var path = img.getAttribute('src').split('.')[0]
  var currentid = path[path.length - 1]
  console.log('currentid1:', currentid);
  var cells = document.querySelectorAll('.songcell')
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].dataset.song === currentid) {
      var play = cells[i].querySelector('.play')
      clearPlay(currentid)
      playStatus(play, currentid)
      updateInfo(play)
    }
  }
}

// 下一首
var bindNextButton = function() {
  var button = document.querySelector('.next')
  button.addEventListener('click', function() {
    var background = document.querySelector('.back')
    var img = document.querySelector('.back img')
    changeImg(button, img)
    nextSong(img)
  })
}

// 上一首
var bindPrevButton = function() {
  var button = document.querySelector('.prev')
  button.addEventListener('click', function() {
    var background = document.querySelector('.back')
    var img = background.querySelector('img')
    changeImg(button, img)
    nextSong(img)
  })
}

// 清空当前正在播放的按钮的状态
var clearCurrentPlay = function() {
  var plays = document.querySelectorAll('.play')
  for (var i = 0; i < plays.length; i++) {
    if (plays[i].classList.contains(['active'])) {
      plays[i].classList.remove('active')
      var span = plays[i].querySelector('span')
      console.log(span);
      span.innerHTML = '►'
    }
  }
}

// 播放结束清空状态
var clearStatus = function() {
  a.addEventListener('ended', function() {
    a.src = ''
    clearCurrentPlay()
  })
}

// 克隆音乐列表
var clone = function() {
  var s = []
  for (var i = 0; i < songs.length; i++) {
    s.push(songs[i])
  }
  return s.reverse()
}

// 播放全部
var PlayAll = function() {
  var allbutton = document.querySelector('.playall')
  allbutton.addEventListener('click', function() {
    Songs = clone()
    var playEndedHandler = function() {
      var s = Songs.pop()
      a.src = s
      var path = s.split('.')[0]
      var id = path[path.length - 1]
      console.log('id-end', id);
      changePlayImg(id)
      findPlay(id)
      if (Songs.length === 0) {
        a.removeEventListener('ended', playEndedHandler)
        Songs = clone()
      }
    }
    clearCurrentPlay()
    var s = Songs.pop()
    console.log('s-start', s);
    a.src = s
    var path = s.split('.')[0]
    var id = path[path.length - 1]
    console.log('id-start', id);
    a.addEventListener('ended', playEndedHandler)
    changePlayImg(id)
    findPlay(id)
  })
}

// 找到并更新play
var findPlay = function(id) {
  var plays = document.querySelectorAll('.play')
  for (var i = 0; i < plays.length; i++) {
    if (plays[i].closest('.songcell').dataset.song === id) {
      playStatus(plays[i], id)
      updateInfo(plays[i])
    }
  }
}

a = document.querySelector('audio')
songs = [
  '/static/musicplayer/0.mp3',
  '/static/musicplayer/1.mp3',
  '/static/musicplayer/2.mp3',
  '/static/musicplayer/3.mp3',
]
var main = function() {
  bindAllHeader()
  bindAllLike()
  bindAllPlay()
  bindNextButton()
  bindPrevButton()
  clearStatus()
  PlayAll()
}

main()
console.log('music.js 引入成功');
