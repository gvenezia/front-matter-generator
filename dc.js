// Each time you run build-final and zip-files, the bannerSize
// variable needs to be updated for the size you are updating/uploading (scroll down to see more)

var feed;
var item = 0;

window.onload = function() {

  feed = {
    g_suite_2: {
      copy: 'Get[[[300x600,160x600]]]G Suite.[[[300x600,160x600,300x250,970x250]]]Forget[[[300x600]]][[[160x600]]][[[468x60]]][[[728x90]]]version[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]control.'
    },
    g_suite_1: {
      copy: 'Get[[[300x600]]][[[160x600]]]G Suite.[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]Simplify[[[300x600]]][[[160x600]]][[[728x90]]][[[468x60]]]your[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]workday.'
    },
    calendar: {
      copy: 'Get[[[300x600]]][[[160x600]]]G Suite.[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]Know[[[160x600]]][[[468x60]]]when[[[300x600]]][[[160x600]]][[[728x90]]]the[[[160x600]]][[[300x250]]][[[970x250]]]team[[[300x600]]]is[[[160x600]]]free.'
    },
    docs: {
      copy: 'Get[[[300x600]]][[[160x600]]]G Suite.[[[300x600]]][[[160x600]]][[[728x90]]][[[300x250]]][[[468x60]]][[[970x250]]]Work[[[300x600]]][[[160x600]]]better[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]together.'
    },
    drive: {
      copy: 'Get[[[300x600]]][[[160x600]]]G Suite.[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]Save time[[[300x600]]][[[160x600]]][[[728x90]]][[[468x60]]]with[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]suggested[[[300x600]]][[[160x600]]]files.'
    },
    gmail: {
      copy: 'Get[[[300x600]]][[[160x600]]]G Suite.[[[300x600]]][[[160x600]]][[[728x90]]][[[300x250]]][[[970x250]]]Choose[[[300x600]]][[[160x600]]][[[468x60]]]your[[[160x600]]][[[300x250]]][[[970x250]]]own[[[300x600]]][[[160x600]]]domain.'
    },
    drive_security: {
      copy: 'Get[[[300x600]]][[[160x600]]]G Suite.[[[300x600]]][[[160x600]]][[[300x250]]][[[728x90]]][[[468x60]]][[[970x250]]]Simply[[[300x600]]][[[160x600]]]Secure.'
    }
  };
  console.log(feed);
  let Theme = document.getElementById("ad-inner").className;
  let copy = feed[Theme].copy;

  var size = document.getElementById("ad-inner").dataset.unit;

  // Replaces [[[widthxheight]]]
  // Run production-level[[[468x60]]]Kubernetes clusters[[[160x600,300x250,468x60,728x90]]]minus operational burdens.
  copy = copy.replace(/\[\[\[(.*?)\]\]\]/g, function(a, b) {
    return b.indexOf(size) >= 0 ? '<br/>' : ' ';
  });

  //////// BEGINNING OF ---PARSING THE BREAKPOINTS FOR DIFFERENT BANNER SIZES AND CAMPAIGNS ///////
  var copyArr = copy.split('<br/>');
  var getGSuiteArr
  var brandClass = "brand-blue";
  if (feed[Theme] === "drive" || feed[Theme] === "drive security") {
    brandClass = "brand-green";
  }

  if (size === '300x600') {
    item = 1;
    var extra = [];

    copyArr.forEach(function(copy, index) {
      if (index === 0) {
        copyArr[index] = "<span class='copy-" + index + "'>" + copy + "</span>";
      } else if (index === 1) {
        copyArr[index] = "<span class='copy-" + index + " " + brandClass + "'>" + copyArr[index] + "</span>";
      } else {
        if (feed[Theme] === "Calendar"){
          var checkSpace = copyArr[index].split(/\s/);
          checkSpace.forEach(function(c, index) {
            if (c !== '') {extra.push(c);}
          });
        } else {
          copyArr[index] = "<span class='copy-" + index + "'>" + copy + "</span>";
        }
      }
    });

    if (feed[Theme] === "calendar"){
      copyArr.splice(2, 3);

      extra.forEach(function(e, index) {
        if (index % 2 !== 0) {
          extra[index] = '<span class="copy-' + (index + 2) + '">' + e + '</span></br>';
        } else {
          extra[index] = '<span class="copy-' + (index + 2) + '">' + e + '&nbsp;</span>';
        }
      });
      copyArr[2] = extra.join('');
    }

  } else if (size === '160x600') {
    item = 1;

    copyArr.forEach(function(copy, index) {
      if (index === 1) {
        copyArr[1] = "<span class='copy-" + index + " " + brandClass + "'>" + copyArr[1].trim() + "</span>";
      } else {
        copyArr[index] = "<span class='copy-" + index + "'>" + copy.trim() + "</span>";
      }
    });

  } else if (size === '300x250' || size === '970x250'){
    item = 0;
    getGSuiteArr = copyArr[item].split(/\s/);
    var getGSuiteArrClean = [];

    getGSuiteArr.forEach(function(gg) {
      if (gg !== '') {getGSuiteArrClean.push(gg);}
    });

    getGSuiteArrClean.forEach(function(g, index) {
      if (index === 0) {
        getGSuiteArrClean[index] =  '<span class="copy-' + index + '">' + g + '</span>';
      } else if (index === 1) {
        getGSuiteArrClean[index] = '<span class="copy-1 ' + brandClass + '">' + g;
      } else if (index === 2) {
        getGSuiteArrClean[index] = g + '</span>';
      } else if (index >= 3) {
        getGSuiteArrClean[index] =  '<span class="copy-' + (index - 1) + '">' + g + '</span>';
      }
    });

    var colorAdded = getGSuiteArrClean.join(' ');
    var copyNum = 2;

    copyArr.forEach(function(hl, index){
      var cleanSecondLine = [];
      if (index === 0) {
        copyArr[index] = colorAdded;
      }

      // set number of span for each word after "Get G Suite"
      if (index === 2) {
        if (feed[Theme] === "calendar" || index === 2 && feed[Theme] === "drive") {
          copyNum = 5;
        } else {
          copyNum = 4;
        }
      }

      if (index >= 1) {
        var secondLine = copyArr[index].split(/\s/);
        secondLine.forEach(function(sl) {
          if (sl !== '') {cleanSecondLine.push(sl);}
        });
        cleanSecondLine.forEach(function(cleanLine, index) {
          cleanSecondLine[index] = '<span class="copy-' + (index + copyNum) + '">' + cleanLine +'</span>';
        });

        copyArr[index] = cleanSecondLine.join(' ');
      }
    });

  } else if (size === '728x90' || size === '468x60') {
    item = 0;
    getGSuiteArr = copyArr[item].split(/\s/);
    var getGSuiteArrClean = [];

    getGSuiteArr.forEach(function(gg) {
      if (gg !== '') {getGSuiteArrClean.push(gg);}
    });
    getGSuiteArrClean.forEach(function(g, index) {
      if (index === 0) {
        getGSuiteArrClean[index] =  '<span class="copy-' + index + '">' + g + '</span>';
      } else if (index === 1) {
        getGSuiteArrClean[index] = '<span class="copy-1 ' + brandClass + '">' + g;
      } else if (index === 2) {
        getGSuiteArrClean[index] = g + '</span>';
      } else if (index >= 3) {
        getGSuiteArrClean[index] =  '<span class="copy-' + (index - 1) + '">' + g + '</span>';
      }
    });

    var colorAdded = getGSuiteArrClean.join(' ');
    var copyNum = 2;

    // set number of span for each word after "Get G Suite"
    if (getGSuiteArrClean.length > 3) {
      copyNum = 3
    } else if (getGSuiteArrClean.length > 4) {
      copyNum = 4
    }

    copyArr.forEach(function(hl, index){
      var cleanSecondLine = [];
      if (index === 0) {
        copyArr[index] = colorAdded;
      }

      if (index === 1) {
        var secondLine = copyArr[index].split(/\s/);
        secondLine.forEach(function(sl) {
          if (sl !== '') {cleanSecondLine.push(sl);}
        });
        cleanSecondLine.forEach(function(cleanLine, index) {
          cleanSecondLine[index] = '<span class="copy-' + (index + copyNum) + '">' + cleanLine +'</span>';
        });

        copyArr[index] = cleanSecondLine.join(' ');
      }
    });
  } else if (size === "320x100") {
    // line one
    var lineOne = copyArr[0].split(/\s/);
    lineOne.forEach(function(one, index) {
      lineOne[index] = '<span class="copy-' + index + '">' + one + '</span>';
    });
    copyArr[0] = lineOne.join(' ');

    // line two
    copyArr[1] = '<span class="copy-2">' + copyArr[1] + '</span>';

    // line three
    var lineThree = copyArr[2].split(/\s/);
    lineThree.forEach(function(three, index) {
      if (index === 1) {
        lineThree[index] = '<span class="copy-' + (index + 2) + '">' + three + '&nbsp;</span>';
      } else if (index === 2) {
        lineThree[index] = '<span class="copy-' + (index + 2) + ' ' + brandClass + '">' + three + '&nbsp;';
      } else if (index === 3) {
        lineThree[index] = three + '</span>';
      }
      copyArr[2] = lineThree.join('');
    });
  } else if (size === "320x50") {
    // line one
    var lineOne = copyArr[0].split(/\s/);
    lineOne.forEach(function(one, index) {
      if (one !== ""){
        lineOne[index] = '<span class="copy-' + index + '">' + one + '</span>';
      }
    });
    copyArr[0] = lineOne.join(' ');

    // line two
    var lineTwo = copyArr[1].split(/\s/);
    lineTwo.forEach(function(two, index) {
      if (index === 0){
        lineTwo[index] = '<span class="copy-' + (index + 3) + '">' + two + '&nbsp;</span>';
      } else if (index === 1) {
        lineTwo[index] = '<span class="copy-' + (index + 3) + ' ' + brandClass + '">' + two + '&nbsp;';
      } else if (index === 2) {
        lineTwo[index] = two + '</span>';
      }
    });
    copyArr[1] = lineTwo.join('');
  }
  //////// END OF ---PARSING THE BREAKPOINTS FOR DIFFERENT BANNER SIZES AND CAMPAIGNS ///////

  // Set Copy 
  document.getElementById('headline').innerHTML = copyArr.join("<br/>");

  // Create an image tag
  var feedImage = feed["Image_" + size];
  if (feedImage){
    document.getElementById('icon').src = feed["Image_" + size].Url;
  }

  //////// BEGINNING OF ---MAKE SURE THESE ARE SHOWING CORRECT SIZE BEFORE BUILD-FINAL AND ZIP-FILES--- //////////
  ///// *** When viewing 320x50 or 320x100 on localhost, make sure to change the Copy_Line, CTA and Theme in dc-data.js to Mobile
  ///// and correct copy based the spreadsheet to avoid errors.
  ///// 320x50 or 320x100 do not have GIF animation.
  ///// When viewing other campaigns in these two sizes you will only see white background.

  ///// *** CHANGE YOUR BANNER SIZE HERE *** /////
  ///// If you want to view 300x600, change it so...
  var bannerSize = "160x600";

  // Set Copy's Font Size
  var typeSize = feed["Font_" + bannerSize];
  if (typeSize) {
    document.getElementById('headline').style.fontSize = (typeSize + "px");
  }

  // Set Copy's Line Height
  var lineHeight = feed["Line_height_" + bannerSize];
  if (lineHeight) {
    document.getElementById('headline').style.lineHeight = (lineHeight + "px");
  }

  // Set Copy's Letter Spacing
  var letterSpacing = feed["Spacing_" + bannerSize];
  if (letterSpacing) {
    document.getElementById('headline').style.letterSpacing = (letterSpacing + "px");
  }

  //  Set Copy's Top Position
  if (size === '160x600' || size === '300x600') {
    var topPos = feed["Top_" + bannerSize];
    if (topPos) {
      document.getElementById('headline').style.top = (topPos + "px");
    }
  } else if (size === '970x250' && feed[Theme] === 'drive security') {
    document.getElementById('headline').style.top = "60px";
  }

  // Set Copy's Left Position
  if (size === '468x60' || size === '728x90' || size === '970x250') {
    var leftPos = feed["Left_" + bannerSize];
    if (leftPos) {
      document.getElementById('headline').style.left = (leftPos + "px");
    }
  }
//////// END OF ---MAKE SURE THESE ARE SHOWING CORRECT SIZE BEFORE BUILD-FINAL AND ZIP-FILES--- //////////

  // Set Theme
  var theme = Theme.toLowerCase();
  if (theme == "blue") {
    // set background
    document.getElementById("ad-wrapper").style.backgroundColor = "#0D0D32";

    // set border color
    document.getElementById("ad-wrapper").style.borderColor = "#9AA0A6";

    // set copy color
     document.getElementById("headline").style.color = "#FFFFFF";

    // set gcp image
    document.getElementById("logo").src = "img/dynamic_logo.png";

    // set group icons
    document.getElementById("group_icons").src = "img/group_icons.svg";

    // set google cloud image
    // document.getElementById('google_cloud').src = "images/google_cloud.png";
  }

  // kick off animation
  init();

}
