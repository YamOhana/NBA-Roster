
class Renderer {
    _renderPlayers(players) {
        console.log(players)
        let source = $('#players-template').html()
        let template = Handlebars.compile(source)
        let newHTML = template({ players })
        $('.players-container').empty().append(newHTML)
    }
    render(data) {
       this._renderPlayers(data)
    }
}