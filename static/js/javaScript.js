import { Trie } from "./TrieDS.js";

const searchBox = document.getElementById('searchBox')

searchBox.oninput = (event) => {
    autoSuggestion(event)
}
searchBox.onkeydown = (event) => {

    if (event.key == "ArrowDown") {
        event.preventDefault();
        document.getElementById('row0')?.focus()
    }
    if (event.key == 'Enter' && searchBox.value) {
        let value = searchBox.value
        searchBox.value = ''
        searchBox.value = value
        searchBox.focus()
        autoSuggestion(searchBox)
    }
};

const mySuggestionTrie = new Trie()
const wordsArray = ["apple", "anjana", "banana", "cherry", "mango", "orange", "strawberry", "watermelon"];
wordsArray.map((item) => {
    mySuggestionTrie.insertWord(item)
})

function autoSuggestion(event) {
    const prefixLength = searchBox.value.length

    const suggestions = mySuggestionTrie.suggestions(searchBox.value)

    if (suggestions.length && event?.inputType !== "deleteContentBackward") {
        searchBox.value = suggestions[0][0] + suggestions[0][1]
        selectSufix(prefixLength)
    }

    const suggestionBanner = document.getElementById('suggestionBanner')
    suggestionBanner.innerHTML = ""

    if (suggestions.length && searchBox.value) {

        const unOrderedList = document.createElement('ul')

        suggestions.map((item, index) => {

            const row = document.createElement('li')
            row.setAttribute('id', 'row' + index)
            row.setAttribute('tabindex', index)

            const prefix = document.createElement('span')
            prefix.setAttribute('class', 'prefix')
            prefix.innerHTML = item[0]
            const sufix = document.createElement('span')
            sufix.setAttribute('class', 'sufix')
            sufix.innerHTML = item[1]

            row.appendChild(prefix)
            row.appendChild(sufix)
            unOrderedList.appendChild(row)
            suggestionBanner.appendChild(unOrderedList)

            row.onclick = () => {
                searchBox.value = ''
                searchBox.value = item[0] + item[1]
                searchBox.focus()
                autoSuggestion()
            };

            row.onkeydown = (e) => {
                event.preventDefault()

                if (e.key === 'ArrowDown' && index < suggestions.length - 1) {
                    const nextRow = document.getElementById('row' + (index + 1))
                    nextRow.focus()
                }
                if (e.key === 'ArrowUp' && index > 0) {
                    const previousRow = document.getElementById('row' + (index - 1))
                    previousRow.focus()
                }
                if (e.key === "Enter") {
                    searchBox.value = ''
                    searchBox.value = item[0] + item[1]
                    searchBox.focus()
                    autoSuggestion()
                }
            }

            row.onfocus = () => {
                searchBox.value = item[0] + item[1]
            }

        })
    }
}

function selectSufix(prefix) {
    searchBox.setSelectionRange(prefix, searchBox.value.length);
}
