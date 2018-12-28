exports.homePage = (request, response) => {
    response.render('index');
}

exports.addStore = (request, response) => {
    response.render('editStore', { title: 'Add Store' });
}

exports.createStore = (request, response) => {
    response.json(request.body);
}