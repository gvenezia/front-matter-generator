const fs = require('fs');

let yamlText = '';
let concepts = ['g_suite_2_','g_suite_1_','calendar_','docs_','drive_','gmail_','drive_security_'];
let sizes    = ['160x600','300x600','300x250','468x60','728x90','970x250'];
// Copy in the same order as concepts to access with the same index
let copy     = ['Get[[[300x600,160x600]]]G Suite.[[[300x600,160x600,300x250,970x250]]]Forget[[[300x600]]][[[160x600]]][[[468x60]]][[[728x90]]]version[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]control.',
                'Get[[[300x600]]][[[160x600]]]G Suite.[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]Simplify[[[300x600]]][[[160x600]]][[[728x90]]][[[468x60]]]your[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]workday.',
                'Get[[[300x600]]][[[160x600]]]G Suite.[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]Know[[[160x600]]][[[468x60]]]when[[[300x600]]][[[160x600]]][[[728x90]]]the[[[160x600]]][[[300x250]]][[[970x250]]]team[[[300x600]]]is[[[160x600]]]free.',
                'Get[[[300x600]]][[[160x600]]]G Suite.[[[300x600]]][[[160x600]]][[[728x90]]][[[300x250]]][[[468x60]]][[[970x250]]]Work[[[300x600]]][[[160x600]]]better[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]together.',
                'Get[[[300x600]]][[[160x600]]]G Suite.[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]Save[[[]]]time[[[300x600]]][[[160x600]]][[[728x90]]][[[468x60]]]with[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]suggested[[[300x600]]][[[160x600]]]files.',
                'Get[[[300x600]]][[[160x600]]]G Suite.[[[300x600]]][[[160x600]]][[[728x90]]][[[300x250]]][[[970x250]]]Choose[[[300x600]]][[[160x600]]][[[468x60]]]your[[[160x600]]][[[300x250]]][[[970x250]]]own[[[300x600]]][[[160x600]]]domain.',
                'Get[[[300x600]]][[[160x600]]]G Suite.[[[300x600]]][[[160x600]]][[[300x250]]][[[728x90]]][[[468x60]]][[[970x250]]]Simply[[[300x600]]][[[160x600]]]Secure.'
                ];
let copyLength = [5, 5, 8, 5, 7, 6, 4];

// Cycle through each concept
for (let c = 0; c < concepts.length; c++){
  yamlText += `${concepts[c].toUpperCase()}==============\n`;

  // Format copy (Collapses all size breakpoints by eliminating ']]][[[')
  let conceptCopy = copy[c].replace(/\]\]\]\[\[\[/g, ',');

  // Create copy for all sizes
  for (let i = 0; i < sizes.length; i++){
    let formattedCopy = '';

    if (conceptCopy.split(sizes[i]).length !== copyLength[c] ) {
      formattedCopy += '\n-\n  - ';

      // Replaces [[[widthxheight]]]
      formattedCopy += conceptCopy.replace(/\[\[\[(.*?)\]\]\]/g, (match, pGroup1) => {
        return pGroup1.indexOf(sizes[i]) >= 0 ? '\n-\n  - ' : '\n  - ';
      });
    } else {
      formattedCopy += formattedCopy += '\n- ';

      formattedCopy += conceptCopy.replace(/\[\[\[(.*?)\]\]\]/g, (match, pGroup1) => {
        return pGroup1.indexOf(sizes[i]) >= 0 ? '\n- ' : '\n- ';
      });
    }

    yamlText += `${concepts[c]}${sizes[i]} ${formattedCopy}\n\n`;  
  }
}

fs.writeFile('yaml-arr.txt', yamlText, (err) => {
  if (err) throw err;
  console.log(`The formatted copy for all concepts was appended to file!`);
});