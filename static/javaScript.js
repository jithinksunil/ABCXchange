class TrieNode {
    constructor(value) {
        this.value = value
        this.children = {}
        this.end = false
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode(true)
    }

    insertWord(string) {

        let current = this.root
        for (let i = 0; i < string.length; i++) {

            let character = string[i]
            if (!current.children[character]) {
                let newNode = new TrieNode(character)
                current.children[character] = newNode
            }
            current = current.children[character]
        }
        current.end = true
    }

    suggestions(prefix) {
        let wordArray = []
        let currentNode = this.root
        let word=''
        for (let i = 0; i < prefix.length; i++) {
            if (currentNode.children[prefix[i]]) {
                currentNode = currentNode.children[prefix[i]]
                word=word+currentNode.value
            }
            else {
                break;
            }
        }
        if (word===prefix) {
            wordArray = this.dfs(currentNode)
        }
        return wordArray.map((element) => [prefix , element])
    }

    dfs(currentNode) {
        let suffixArray = []
        this.dfsHelper(currentNode, '', suffixArray)
        return suffixArray
    }
    dfsHelper(currentNode, word, suffixArray) {

        if (currentNode.end) {
            suffixArray.push(word)
        }

        for (let key in currentNode.children) {
            let newWord = word + currentNode.children[key].value
            this.dfsHelper(currentNode.children[key], newWord, suffixArray)
        }

    }
}


const mySuggestionTrie = new Trie()
const wordsArray = ["apple", "anjana", "banana", "cherry", "mango", "orange", "strawberry", "watermelon"];
wordsArray.map((element) => {
    mySuggestionTrie.insertWord(element)
})

let autoSuggestion = (element,event) => {
    let prefixLength = element.value.length

    const suggestions = mySuggestionTrie.suggestions(element.value)
    
    if (suggestions.length && event?.inputType !== "deleteContentBackward") {
        element.value = suggestions[0][0]+suggestions[0][1]
        selectAutoComplete(element, prefixLength)
    }

    let suggestionBanner=document.getElementById('suggestionBanner')
    suggestionBanner.innerHTML=""

    if(suggestions.length && element.value){

        const unOrderedList=document.createElement('ul')

        suggestions.map((item,index)=>{

            const list=document.createElement('li')
            list.setAttribute('id','list'+index)
            list.setAttribute('tabindex',index)

            const prefixLength=document.createElement('span')
            prefixLength.setAttribute('class','prefix')
            prefixLength.innerHTML=item[0]
            const suffixLength=document.createElement('span')
            suffixLength.setAttribute('class','sufix')
            suffixLength.innerHTML=item[1]

            list.appendChild(prefixLength)
            list.appendChild(suffixLength)
            unOrderedList.appendChild(list)
            suggestionBanner.appendChild(unOrderedList)

            list.onclick=()=>{
                element.value=''
                element.value=item[0]+item[1]
                element.focus()
                autoSuggestion(element)
            };

            list.onkeydown=(event)=>{
                event.preventDefault()
                if(event.key==='ArrowDown'&&index<suggestions.length-1){
                    let nextList=document.getElementById('list'+(index+1))
                    nextList.focus()
                }
                if(event.key==='ArrowUp'&&index>0){
                    let previousList=document.getElementById('list'+(index-1))
                    previousList.focus()
                }
                if(event.key==="Enter"){
                    element.value=''
                    element.value=item[0]+item[1]
                    element.focus()
                    autoSuggestion(element)
                }
            }

            list.onfocus=()=>{
                element.value=item[0]+item[1]
            }

        })
    }
}

function selectAutoComplete(element, prefixLength) {
    element.setSelectionRange(prefixLength, element.value.length);
}
