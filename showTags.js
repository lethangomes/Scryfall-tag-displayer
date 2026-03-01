
// Builds tag table
function createTable(headers, content, query){
    let table = document.createElement('table')
    let thead = document.createElement('thead')
    let theadRow = document.createElement('tr')
    thead.appendChild(theadRow)
    let body = document.createElement('tbody')

    // Headers
    for(header of headers){
        let newHeader = document.createElement('th');
        let content = document.createElement('a');
        content.innerText = header;
        newHeader.appendChild(content)
        theadRow.appendChild(newHeader)
    }

    // Items
    for(item of content){
        let row = document.createElement('tr')
        let cell = document.createElement('td')
        let link = document.createElement('a')

        link.innerText = item;
        link.href = 'https://scryfall.com/search?q=' + query + ':' + item.replaceAll(' ', '-');
        
        row.appendChild(cell);
        cell.appendChild(link);
        body.appendChild(row);
    }


    table.appendChild(thead);
    table.appendChild(body);
    table.className = 'prints-table'
    return table
}

elements = document.getElementsByClassName("button-n")

// Check if this has already run
if(!document.getElementById('tag-container')){

    // Query body we will send to scryfall tagger. No, I don't know what the query property is.
    let qBody = {"query":"\n        query FetchCard(\n          $set: String!\n          $number: String!\n          $back: Boolean = false\n          $moderatorView: Boolean = false\n        ) {\n          card: cardBySet(set: $set, number: $number, back: $back) {\n            ...CardAttrs\n            backside\n            flipsideDisplayName\n            hasAlternateName\n            layout\n            scryfallUrl\n            sideNames\n            twoSided\n            rotatedLayout\n            taggings(moderatorView: $moderatorView) {\n              ...TaggingAttrs\n              tag {\n                ...TagAttrs\n                ancestorTags {\n                  ...TagAttrs\n                }\n              }\n            }\n            relationships(moderatorView: $moderatorView) {\n              ...RelationshipAttrs\n            }\n          }\n        }\n        \n  fragment CardAttrs on Card {\n    artImageUrl\n    backside\n    cardImageUrl\n    collectorNumber\n    displayName\n    id\n    illustrationId\n    name\n    oracleId\n    printingId\n    set\n  }\n\n        \n  fragment RelationshipAttrs on Relationship {\n    classifier\n    classifierInverse\n    annotation\n    subjectId\n    subjectName\n    createdAt\n    creatorId\n    foreignKey\n    id\n    name\n    pendingRevisions\n    relatedId\n    relatedName\n    status\n    type\n  }\n\n        \n  fragment TagAttrs on Tag {\n    category\n    createdAt\n    creatorId\n    id\n    name\n    namespace\n    pendingRevisions\n    slug\n    status\n    type\n    hasExemplaryTagging\n    description\n  }\n\n        \n  fragment TaggingAttrs on Tagging {\n    annotation\n    subjectId\n    createdAt\n    creatorId\n    foreignKey\n    id\n    pendingRevisions\n    type\n    status\n    weight\n  }\n\n      ","variables":{"set":"jud","number":"140","back":false,"moderatorView":false},"operationName":"FetchCard"}

    // Find scryfall tagger link
    for(element of elements){
        if(element.title === 'Tag card'){
            link = element.href
            console.log(link)

            // Fetch scryfall tagger page
            fetch(link).then((data) => {
                data.text().then((text) => {
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
                    fetch('https://tagger.scryfall.com/graphql', 
                        {
                            method:'POST', 
                            body: JSON.stringify(qBody),
                            headers: {'X-CSRF-TOKEN': token, 'Content-Type':"application/json"}
                        },).then((r) => {
                            r.json().then((json) => {
                                // Get information we care about
                                let tags = json.data.card.taggings;
                                let relationships = json.data.card.relationships;
                                tags = tags.map((t) => ({
                                    name: t.tag.name, 
                                    type: t.tag.type, 
                                    ancestors: t.tag.ancestorTags.map((atag) => atag.name)
                                }))
                                console.log(tags)
                                console.log(relationships)

                                // Create div to hold tags
                                let tagDiv = document.createElement('div');
                                tagDiv.className = 'prints';

                                let cardProfileElement; // The area with card info
                                for(child of document.getElementById('main').childNodes){
                                    if(child.className === 'card-profile'){
                                        cardProfileElement = child.firstElementChild;
                                        break;
                                    }
                                }
                                let printsDiv = cardProfileElement.lastElementChild // The element holding list of printings
                                let container = document.createElement('div') // A container for later
                                container.id = 'tag-container'

                                // Oracle tags table
                                let otags = tags.filter((t) => t.type === 'ORACLE_CARD_TAG').map((t) => t.name)
                                let oTagTable = createTable(['Oracle Tags'], otags, 'otag')
                                tagDiv.appendChild(oTagTable)

                                // Inherited oracle tags table
                                let inheritedOTags = new Set()
                                for(let tag of tags.filter((t) => t.type === 'ORACLE_CARD_TAG')){
                                    for(ancestor of tag.ancestors){
                                        inheritedOTags.add(ancestor);
                                    }
                                }
                                let iOTagTable = createTable(['Inherited Oracle Tags'], [...inheritedOTags], 'otag')
                                tagDiv.appendChild(iOTagTable)

                                // Art tags table
                                let atags = tags.filter((t) => t.type === 'ILLUSTRATION_TAG').map((t) => t.name)
                                let aTagTable = createTable(['Art Tags'], atags, 'atag')
                                tagDiv.appendChild(aTagTable)

                                // Inherited art tags table
                                let inheritedATags = new Set()
                                for(let tag of tags.filter((t) => t.type === 'ILLUSTRATION_TAG')){
                                    for(ancestor of tag.ancestors){
                                        inheritedATags.add(ancestor);
                                    }
                                }
                                let iATagTable = createTable(['Inherited Oracle Tags'], [...inheritedATags], 'atag')
                                tagDiv.appendChild(iATagTable)
                                
                                // Move print info and our tag info into the container we made
                                cardProfileElement.appendChild(container)
                                container.appendChild(printsDiv)
                                container.appendChild(tagDiv)

                                // Fix widths
                                printsDiv.style.width = '100%'
                                tagDiv.style.width = '100%'
                            })
                    })
                })
                
            })
            
        }
    }
}
