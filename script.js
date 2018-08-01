const fs = require('fs'),
      adaptedParsingFile = require('./adaptedParsingFile.js');


// =========== Set up the variables for the script ===========
let yamlText = ''; 
let concepts = ['product_group_1_','product_group_2_','calendar_','text_','cloud_','mail_','cloud_security_'];
let sizes    = ['160x600','300x600','300x250','468x60','728x90','970x250'];
// Copy in the same order as concepts to access with the same index
let copy     = ['Get[[[300x600,160x600]]]Our Product.[[[300x600,160x600,300x250,970x250]]]Copy[[[300x600]]][[[160x600]]][[[468x60]]][[[728x90]]]Copy2[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]Copy3.',
                'Get[[[300x600]]][[[160x600]]]Our Product.[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]Copy1[[[300x600]]][[[160x600]]][[[728x90]]][[[468x60]]]copy2[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]copy4.',
                'Get[[[300x600]]][[[160x600]]]Our Product.[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]copy[[[160x600]]][[[468x60]]]copy2[[[300x600]]][[[160x600]]][[[728x90]]]copy3[[[160x600]]][[[300x250]]][[[970x250]]]copy4[[[300x600]]]is[[[160x600]]]free.',
                'Get[[[300x600]]][[[160x600]]]Our Product.[[[300x600]]][[[160x600]]][[[728x90]]][[[300x250]]][[[468x60]]][[[970x250]]]copy1[[[300x600]]][[[160x600]]]copy3[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]copy4.',
                'Get[[[300x600]]][[[160x600]]]Our Product.[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]copy1[[[]]]copy2[[[300x600]]][[[160x600]]][[[728x90]]][[[468x60]]]copy3[[[300x600]]][[[160x600]]][[[300x250]]][[[970x250]]]copy5[[[300x600]]][[[160x600]]]files.',
                'Get[[[300x600]]][[[160x600]]]Our Product.[[[300x600]]][[[160x600]]][[[728x90]]][[[300x250]]][[[970x250]]]copy1[[[300x600]]][[[160x600]]][[[468x60]]]copy3[[[160x600]]][[[300x250]]][[[970x250]]]copy4[[[300x600]]][[[160x600]]]copy5.',
                'Get[[[300x600]]][[[160x600]]]Our Product.[[[300x600]]][[[160x600]]][[[300x250]]][[[728x90]]][[[468x60]]][[[970x250]]]copy1[[[300x600]]][[[160x600]]]copy2.'
                ];
let exitUrls = ['link1','link2','link3','link4','link5','link6','link7'];

// =========== Cycle through each concept ===========
for (let c = 0; c < concepts.length; c++){
  // Create copy for all sizes
  for (let i = 0; i < sizes.length; i++){

    formattedCopy = adaptedParsingFile.parseBreakpoints(concepts[c], copy[c], sizes[i]);  
  
    let yamlText = 
`---
layout: default
concept: ${concepts[c].slice(0, -1)}
width: ${sizes[i].slice(0, 3)}
height: ${sizes[i].slice(4)}
title: ${sizes[i].slice(0, 3)} x ${sizes[i].slice(4)}
usejs: true
greensock: true
use_default_image: true
globalanimation: true
headline: ${formattedCopy}
image: ${concepts[c] + sizes[i] + '.gif'}
exit_url: ${exitUrls[c]}
---

<div id="ad-wrapper" class="ad-wrapper ad-{{page.width}}-{{page.height}}" width="{{ ad.width }}" height="{{ ad.height }}">
    {% include banner_body.html %}
</div>
`;

    // create ads folder
    if (!fs.existsSync(`ads/`)){
      fs.mkdirSync(`ads/`);
    }
    
    // create Concept and size folder 
    if (!fs.existsSync(`ads/${concepts[c]}${sizes[i]}`)){
      fs.mkdirSync(`ads/${concepts[c]}${sizes[i]}`);
    }

    // Write the Front Matter file
    fs.writeFile(`ads/${concepts[c]}${sizes[i]}/index.html`, yamlText, (err) => {
      if (err) throw err;
    });
  } // Complete one size for current concept, move to next size

  
} // Complete all concepts

console.log('\n√ √ √ √ √ √ Success! √ √ √ √ √ √\n');
