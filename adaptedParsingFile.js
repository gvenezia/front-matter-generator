function parseBreakpoints(concept, copy, size) {
  
  var item = 0;

  // Format copy (Collapses all size breakpoints by eliminating ']]][[[')
  copy = copy.replace(/\]\]\]\[\[\[/g, ',');

  // Replaces [[[widthxheight]]]
  // Run production-level[[[468x60]]]Kubernetes clusters[[[160x600,300x250,468x60,728x90]]]minus operational burdens.
  copy = copy.replace(/\[\[\[(.*?)\]\]\]/g, function(a, b) {
    return b.indexOf(size) >= 0 ? '<br/>' : ' ';
  });

  //////// BEGINNING OF ---PARSING THE BREAKPOINTS FOR DIFFERENT BANNER SIZES AND CAMPAIGNS ///////
  var copyArr = copy.split('<br/>');
  var getGSuiteArr
  var brandClass = "brand-blue";
  if (concept === "cloud" || concept === "cloud security") {
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
        if (concept === "Calendar"){
          var checkSpace = copyArr[index].split(/\s/);
          checkSpace.forEach(function(c, index) {
            if (c !== '') {extra.push(c);}
          });
        } else {
          copyArr[index] = "<span class='copy-" + index + "'>" + copy + "</span>";
        }
      }
    });

    if (concept === "calendar"){
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
        if (concept === "calendar" || index === 2 && concept === "cloud") {
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
  return copyArr.join("<br/>");

};

module.exports = {parseBreakpoints: parseBreakpoints};