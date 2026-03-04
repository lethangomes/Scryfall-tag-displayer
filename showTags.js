function buildTagTableCell(query){
    return (item, parent) =>{
        let cell = document.createElement('td')
        let link = document.createElement('a')

        link.innerText = item.name;
        link.href = 'https://scryfall.com/search?q=' + query + ':' + item.name.replaceAll(' ', '-');

        if(item.desc){
            let infoIcon = document.createElement('span');
            infoIcon.innerHTML = '<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="M15 0c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15zm0 28c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zm-1-4h2v-4h-2v4zm1-18c-2.958 0-5.2 1.834-5.2 5h2c0-2.041 1.389-3 3.2-3 1.598 0 3 .935 3 2 0 3.281-4 2.656-4 8h2c-.146-4.063 4-3.646 4-8 0-2.209-2.238-4-5-4z"></path></svg>'
            link.appendChild(infoIcon);
            parent.title = item.desc;
        };

        cell.appendChild(link)
        parent.appendChild(cell)
    }
}

let classifierTypes = {
    'DEPICTS': {name: 'Depicts', html: '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.502 7.046h-2.5v-.928a2.122 2.122 0 0 0-1.199-1.954 1.827 1.827 0 0 0-1.984.311L3.71 8.965a2.2 2.2 0 0 0 0 3.24L8.82 16.7a1.829 1.829 0 0 0 1.985.31 2.121 2.121 0 0 0 1.199-1.959v-.928h1a2.025 2.025 0 0 1 1.999 2.047V19a1 1 0 0 0 1.275.961 6.59 6.59 0 0 0 4.662-7.22 6.593 6.593 0 0 0-6.437-5.695Z"/></svg>'},
    'DEPICTED_IN': {name: 'Depicted in', html: '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M5.027 10.9a8.729 8.729 0 0 1 6.422-3.62v-1.2A2.061 2.061 0 0 1 12.61 4.2a1.986 1.986 0 0 1 2.104.23l5.491 4.308a2.11 2.11 0 0 1 .588 2.566 2.109 2.109 0 0 1-.588.734l-5.489 4.308a1.983 1.983 0 0 1-2.104.228 2.065 2.065 0 0 1-1.16-1.876v-.942c-5.33 1.284-6.212 5.251-6.25 5.441a1 1 0 0 1-.923.806h-.06a1.003 1.003 0 0 1-.955-.7A10.221 10.221 0 0 1 5.027 10.9Z"/></svg>'},
    'COMES_BEFORE': {name: 'Comes before', html: '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5"/></svg>'},
    'COMES_AFTER': {name: 'Comes after', html: '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5"/></svg>'},
    'BETTER_THAN': {name: 'Better than', html: '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>'},
    'WORSE_THAN': {name: 'Worse than', html: '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/></svg>'},
    'MIRRORS': {name: 'Mirrors', html: '<svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;} .st2{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:6,6;} .st3{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:4,4;} .st4{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;} .st5{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-dasharray:3.1081,3.1081;} .st6{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:4,3;} </style> <polygon class="st0" points="12,22 3,27 3,5 12,10 "></polygon> <polygon class="st0" points="20,10 29,5 29,27 20,22 "></polygon> <line class="st0" x1="16" y1="3" x2="16" y2="6"></line> <line class="st0" x1="16" y1="27" x2="16" y2="30"></line> <line class="st0" x1="16" y1="15" x2="16" y2="18"></line> <line class="st0" x1="16" y1="9" x2="16" y2="12"></line> <line class="st0" x1="16" y1="21" x2="16" y2="24"></line> </g></svg>'},
    'COLORSHIFTED': {name: 'Colorshifted', html: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="#080341"></path> </g></svg>'},
    'SIMILAR_TO': {name: 'Similar to', html: '<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 142.853 142.853" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M44.789,61.217c40.687-8.595,77.064-5.533,83.256-0.514c-0.636,3.552,1.439,7.111,4.971,8.241 c0.74,0.236,1.49,0.351,2.229,0.351c3.094,0,5.965-1.979,6.959-5.082c1.457-4.555,0.438-9.228-2.807-12.814 c-12.994-14.382-65.938-11.177-97.629-4.479c-17.028,3.596-22.953,2.146-24.583,1.469c0.056-0.178,0.126-0.36,0.2-0.502 c1.939-3.474,0.741-7.874-2.714-9.881c-3.491-2.027-7.963-0.84-9.99,2.65c-2.349,4.046-3.686,10.712,0.275,16.188 C10.435,64.41,23.088,65.801,44.789,61.217z"></path> <path d="M42.353,97.759c40.683-8.594,77.066-5.53,83.257-0.516c-0.637,3.554,1.438,7.111,4.969,8.242 c0.74,0.236,1.491,0.352,2.229,0.352c3.094,0,5.966-1.979,6.96-5.082c1.457-4.557,0.436-9.229-2.808-12.813 c-12.991-14.383-65.936-11.175-97.629-4.479c-17.028,3.596-22.953,2.146-24.583,1.469c0.056-0.178,0.126-0.36,0.2-0.502 c1.939-3.474,0.741-7.873-2.714-9.881c-3.488-2.026-7.961-0.838-9.99,2.649c-2.349,4.047-3.686,10.712,0.275,16.188 C7.996,100.951,20.652,102.344,42.353,97.759z"></path> </g> </g> </g></svg>'},
    'REFERENCES_TO': {name: 'References', html: '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.502 7.046h-2.5v-.928a2.122 2.122 0 0 0-1.199-1.954 1.827 1.827 0 0 0-1.984.311L3.71 8.965a2.2 2.2 0 0 0 0 3.24L8.82 16.7a1.829 1.829 0 0 0 1.985.31 2.121 2.121 0 0 0 1.199-1.959v-.928h1a2.025 2.025 0 0 1 1.999 2.047V19a1 1 0 0 0 1.275.961 6.59 6.59 0 0 0 4.662-7.22 6.593 6.593 0 0 0-6.437-5.695Z"/></svg>'},
    'REFERENCED_BY': {name: 'Referenced by', html: '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M5.027 10.9a8.729 8.729 0 0 1 6.422-3.62v-1.2A2.061 2.061 0 0 1 12.61 4.2a1.986 1.986 0 0 1 2.104.23l5.491 4.308a2.11 2.11 0 0 1 .588 2.566 2.109 2.109 0 0 1-.588.734l-5.489 4.308a1.983 1.983 0 0 1-2.104.228 2.065 2.065 0 0 1-1.16-1.876v-.942c-5.33 1.284-6.212 5.251-6.25 5.441a1 1 0 0 1-.923.806h-.06a1.003 1.003 0 0 1-.955-.7A10.221 10.221 0 0 1 5.027 10.9Z"/></svg>'},
    'WITH_BODY': {name: 'With body', html: '<svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2.514,17.874l9,5c.021.011.043.016.064.026s.051.021.078.031a.892.892,0,0,0,.688,0c.027-.01.052-.019.078-.031s.043-.015.064-.026l9-5A1,1,0,0,0,22,16.9L21,7V2a1,1,0,0,0-1.625-.781L14.649,5h-5.3L4.625,1.219A1,1,0,0,0,3,2l0,4.9-1,10A1,1,0,0,0,2.514,17.874ZM5,7V4.081l3.375,2.7A1,1,0,0,0,9,7h6a1,1,0,0,0,.625-.219L19,4.079l0,3.021.934,9.345L13,20.3V17.333l1.42-.946A1.3,1.3,0,0,0,15,15.3h0A1.3,1.3,0,0,0,13.7,14H10.3A1.3,1.3,0,0,0,9,15.3H9a1.3,1.3,0,0,0,.58,1.084l1.42.946V20.3L4.06,16.445Zm3.5,6a2,2,0,1,1,2-2A2,2,0,0,1,8.5,13Zm5-2a2,2,0,1,1,2,2A2,2,0,0,1,13.5,11Z"></path></g></svg>'},
    'WITHOUT_BODY': {name: 'Without body', html: '<svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2.514,17.874l9,5c.021.011.043.016.064.026s.051.021.078.031a.892.892,0,0,0,.688,0c.027-.01.052-.019.078-.031s.043-.015.064-.026l9-5A1,1,0,0,0,22,16.9L21,7V2a1,1,0,0,0-1.625-.781L14.649,5h-5.3L4.625,1.219A1,1,0,0,0,3,2l0,4.9-1,10A1,1,0,0,0,2.514,17.874ZM5,7V4.081l3.375,2.7A1,1,0,0,0,9,7h6a1,1,0,0,0,.625-.219L19,4.079l0,3.021.934,9.345L13,20.3V17.333l1.42-.946A1.3,1.3,0,0,0,15,15.3h0A1.3,1.3,0,0,0,13.7,14H10.3A1.3,1.3,0,0,0,9,15.3H9a1.3,1.3,0,0,0,.58,1.084l1.42.946V20.3L4.06,16.445Zm3.5,6a2,2,0,1,1,2-2A2,2,0,0,1,8.5,13Zm5-2a2,2,0,1,1,2,2A2,2,0,0,1,13.5,11Z"></path></g></svg>'}
}

function buildRelationshipCell(name){
    return (item, parent) => {
        // Specific card
        let cardCell = document.createElement('td');
        let card = document.createElement('a');
        if(item.name === name){
            card.innerText = item.subjectName;
            card.href = 'https://scryfall.com/search?q=' + item.foreignKey + ':' + item.subjectId;
        } else{
            card.innerText = item.name;
            card.href = 'https://scryfall.com/search?q=' + item.foreignKey + ':' + item.relatedId;
        }

        cardCell.appendChild(card);
        parent.appendChild(cardCell);

        // Type of relationship
        // let classifierCell = document.createElement('td');
        // let classifier = document.createElement('span');

        // classifier.innerHTML = classifierTypes[item.classifier]?.html;
        // classifierCell.appendChild(classifier);
        // parent.appendChild(classifierCell);
        let classifier = document.createElement('span');

        let classToUse = item.classifier;
        if(name === item.name){
            classToUse = item.classifierInverse;
        }
        classifier.innerHTML = classifierTypes[classToUse]?.html;
        classifier.title = classifierTypes[classToUse]?.name
        card.appendChild(classifier)
    }
}


// Builds tag table
// headers:         list of header names
// content:         list of items you want displayed
// cell builder:    (item, parent) => {code that populates parent(the table row)}
function createTable(headers, content, cellBuilder){
    let table = document.createElement('table')
    let thead = document.createElement('thead')
    let theadRow = document.createElement('tr')
    thead.appendChild(theadRow)
    let body = document.createElement('tbody')

    // Headers
    for(header of headers){
        let newHeader = document.createElement('th');
        let headerContent = document.createElement('a');
        headerContent.innerText = header;
        newHeader.appendChild(headerContent)
        theadRow.appendChild(newHeader)
    }

    // Items
    for(item of content){
        let row = document.createElement('tr');
        cellBuilder(item, row);
        body.appendChild(row);
    }


    table.appendChild(thead);
    table.appendChild(body);
    table.className = 'prints-table'
    table.style.width = '480px'
    table.style.margin = '10px'
    table.style.height = 'fit-content'
    return table
}

elements = document.getElementsByClassName("button-n")

async function addTags(){
    // Query body we will send to scryfall tagger. No, I don't know what the query property is.
    let qBody = {"query":"\n        query FetchCard(\n          $set: String!\n          $number: String!\n          $back: Boolean = false\n          $moderatorView: Boolean = false\n        ) {\n          card: cardBySet(set: $set, number: $number, back: $back) {\n            ...CardAttrs\n            backside\n            flipsideDisplayName\n            hasAlternateName\n            layout\n            scryfallUrl\n            sideNames\n            twoSided\n            rotatedLayout\n            taggings(moderatorView: $moderatorView) {\n              ...TaggingAttrs\n              tag {\n                ...TagAttrs\n                ancestorTags {\n                  ...TagAttrs\n                }\n              }\n            }\n            relationships(moderatorView: $moderatorView) {\n              ...RelationshipAttrs\n            }\n          }\n        }\n        \n  fragment CardAttrs on Card {\n    artImageUrl\n    backside\n    cardImageUrl\n    collectorNumber\n    displayName\n    id\n    illustrationId\n    name\n    oracleId\n    printingId\n    set\n  }\n\n        \n  fragment RelationshipAttrs on Relationship {\n    classifier\n    classifierInverse\n    annotation\n    subjectId\n    subjectName\n    createdAt\n    creatorId\n    foreignKey\n    id\n    name\n    pendingRevisions\n    relatedId\n    relatedName\n    status\n    type\n  }\n\n        \n  fragment TagAttrs on Tag {\n    category\n    createdAt\n    creatorId\n    id\n    name\n    namespace\n    pendingRevisions\n    slug\n    status\n    type\n    hasExemplaryTagging\n    description\n  }\n\n        \n  fragment TaggingAttrs on Tagging {\n    annotation\n    subjectId\n    createdAt\n    creatorId\n    foreignKey\n    id\n    pendingRevisions\n    type\n    status\n    weight\n  }\n\n      ","variables":{"set":"jud","number":"140","back":false,"moderatorView":false},"operationName":"FetchCard"}

    // Find scryfall tagger link
    for(element of elements){
        if(element.title === 'Tag card'){
            link = element.href
            console.log(link)

            // Fetch scryfall tagger page
            let data = await fetch(link)    
            let text = await data.text()

            // Find the csrf token
            let idx = text.indexOf('<meta name=\"csrf-token\" content=\"')
            idx += 33;
            let token = '';
            while(text[idx] != '\"'){
                token = token + text[idx];
                idx++;
            }

            // Get set and card number from tagger link
            let linkpath = link.split('/')
            qBody.variables.number = linkpath[linkpath.length - 1]
            qBody.variables.set = linkpath[linkpath.length - 2]
            
            // Query scryfall tagger
            let r = await fetch('https://tagger.scryfall.com/graphql', 
                {
                    method:'POST', 
                    body: JSON.stringify(qBody),
                    headers: {'X-CSRF-TOKEN': token, 'Content-Type':"application/json"}
                },) 
            let json = await r.json()

            // Get information we care about
            console.log(json.data)
            let tags = json.data.card.taggings;
            let relationships = json.data.card.relationships;
            tags = tags.map((t) => ({
                name: t.tag.name, 
                type: t.tag.type, 
                description: t.tag.description,
                ancestors: t.tag.ancestorTags.map((atag) => ({name: atag.name, desc: atag.description}))
            }))
            console.log(tags)
            console.log(relationships)

            // Create div to hold tags
            let tagDiv = document.createElement('div');

            let cardProfileElement; // The area with card info
            for(child of document.getElementById('main').childNodes){
                if(child.className === 'card-profile'){
                    cardProfileElement = child;
                    break;
                }
            }

            // Oracle tags table
            let otagBox = document.createElement('div')
            let otags = tags.filter((t) => t.type === 'ORACLE_CARD_TAG').map((t) => ({name: t.name, desc: t.description}))
            if(otags.length > 0){
                let oTagTable = createTable(['Oracle Tags'], otags, buildTagTableCell('otag'))
                otagBox.appendChild(oTagTable)
                tagDiv.appendChild(otagBox)
            }

            // Inherited oracle tags table
            let inheritedOTags = new Map()
            for(let tag of tags.filter((t) => t.type === 'ORACLE_CARD_TAG')){
                for(ancestor of tag.ancestors){
                    inheritedOTags.set(ancestor.name, ancestor);
                }
            }
            if([...inheritedOTags.values()].length > 0){
                let iOTagTable = createTable(['Inherited Oracle Tags'], [...inheritedOTags.values()], buildTagTableCell('otag'))
                otagBox.appendChild(iOTagTable)
                tagDiv.appendChild(otagBox)
            }
            

            // Art tags table
            let atagBox = document.createElement('div')
            let atags = tags.filter((t) => t.type === 'ILLUSTRATION_TAG').map((t) => ({name: t.name, desc: t.description}))
            if(atags.length > 0){
                let aTagTable = createTable(['Art Tags'], atags, buildTagTableCell('atag'))
                atagBox.appendChild(aTagTable)
                tagDiv.appendChild(atagBox)
            }

            // Inherited art tags table
            let inheritedATags = new Map()
            for(let tag of tags.filter((t) => t.type === 'ILLUSTRATION_TAG')){
                for(ancestor of tag.ancestors){
                    inheritedATags.set(ancestor.name, ancestor);
                }
            }
            if([...inheritedATags.values()].length > 0 ){
                let iATagTable = createTable(['Inherited Art Tags'], [...inheritedATags.values()], buildTagTableCell('atag'))
                atagBox.appendChild(iATagTable)
                tagDiv.appendChild(atagBox)
            }

            // Relationships
            if(relationships.length > 0){
                let relTable = createTable(['Related Cards'], relationships, buildRelationshipCell(json.data.card.name))
                tagDiv.appendChild(relTable);
            }

            // let divider = document.createElement('div');
            // divider.style.height = '0';
            // divider.style.flexBasis = '100%';
            // tagDiv.appendChild(divider);
            
            // Move print info and our tag info into the container we made
            cardProfileElement.appendChild(tagDiv)

            // Fix widths
            tagDiv.style.width = '100%'
            tagDiv.style.margin = '30px auto'
            tagDiv.style.flexFlow = 'row wrap'
            tagDiv.style.display = 'flex'
            //tagDiv.style.maxWidth = '1000px'
            tagDiv.id = 'tag-container'
            tagDiv.style.marginTop = '30px'
            tagDiv.style.justifyContent= "center";
            tagDiv.style.borderTop = '1px dashed #CDCDCD'
            
        }
    }
}

// Check if this has already run
if(!document.getElementById('tag-container')){
    addTags()
}
