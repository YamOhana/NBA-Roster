
const render = new Renderer()


const fetchTeamData = function () {
    let input = $("#Team-Input").val()

    $.get(`teams/${input}`, function (teamData) {
    render.render(teamData)
    })
}