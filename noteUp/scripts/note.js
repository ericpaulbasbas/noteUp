$(document).ready(function () {
    loadAll();

    $('#searchButton').on('click', function () {
        findById();
    });

    $('#addNote').on('click', function () {
        var newNoteObj = {
            Title: $('#noteSubject').val(),
            Body: $('#noteBody').val(),
        };
        addNote(newNoteObj);
    });

    $('#saveEdit').on('click', function () {
        var currentId = $(this).attr('data-noteid');
        var newNoteObj = {
            Id: currentId,
            Title: $('#noteSubjectEdit').val(),
            Body: $('#noteBodyEdit').val()
        };

        var oldNoteObj = {
            Title: $('#tableBody').find('tr[data-noteid="' + currentId + '"] .itemSubj').html(),
            Body: $('#tableBody').find('tr[data-noteid="' + currentId + '"] .itemBody').html()
        };

        if (newNoteObj.Title != "" && newNoteObj.Body != "") {
            if (newNoteObj.Title != oldNoteObj.Title || newNoteObj.Body != oldNoteObj.Body) {
                saveEdit(newNoteObj);
            } else {
                $('#myModal').modal('toggle');
            }
        } else {
            messageAlert("Please complete the fields!");
        }
    });

    $('#cancelNote').on('click', function () {
        clearFields();
    });
});

var loadAll = function () {
    $('#tableBody').empty();
    $('#noteId').val("");

    getNotes('api/notes');
}

var findById = function () {
    $('#tableBody').empty();

    var id = $('#noteId').val();
    getNotes('api/notes'+id);
}

var addNote = function (noteObj) {
    if (noteObj.Title != "" && noteObj.Body != "") {
        $.ajax({
            type: "POST",
            url: 'api/notes',
            data: noteObj,
            success: function (item) {
                messageAlert('note added');
                loadAll();
            },
            error: function (error, message) {
                console.log(error);
            }
        });
    }
    else {
        messageAlert("Please complete the fields!");
    }
}

var saveEdit = function (noteObj) {
    if (noteObj.Title != "" && noteObj.Body != "") {
        $.ajax({
            type: "PUT",
            url: 'api/notes/' + noteObj.Id,
            data: noteObj,
            success: function (item) {
                messageAlert('note edited');
                $('#myModal').modal('toggle');
                loadAll();
            },
            error: function (error, message) {
                console.log(error);
            }
        });
    }
    else {
        messageAlert("Please complete the fields!");
    }
}

var deleteNote = function (id) {
    $.ajax({
        type: "DELETE",
        url: 'api/notes/'+id,
        success: function (item) {
            messageAlert('note deleted');
            loadAll();
        },
        error: function (error, message) {
            console.log(error);
        }
    });
}

var getNotes = function (url) {
    $.ajax({
        type: "GET",
        url: url,//'api/notes',
        success: function (data) {
            $.each(data, function (key, item) {
                var row = $('<tr class="test" data-noteid="' + item.Id + '">'+//<td id="itemId">' + item.Id + '</td>' +
                    '<td class="itemSubj">' + item.Title + '</td>' +
                    '<td class="itemBody">' + item.Body + '</td>' +
                    '<td><span class="deleteButton glyphicon glyphicon-remove" data-noteid="' + item.Id + '"></span></td>' +
                    '</tr>').on('click', function () {
                        loadModal(item);
                    });

                row.appendTo('#tableBody');
            });

            clearFields();

            $('.deleteButton').on('click', function (e) {
                e.stopPropagation();
                deleteNote($(this).data('noteid'));
            });
        },
        error: function (error, message) {
            console.log(message, error);
        }
    });
}

var clearFields = function () {
    $('#noteSubject').val("");
    $('#noteBody').val("");
    $('#noteSubjectEdit').val("");
    $('#noteBodyEdit').val("");
}

var messageAlert = function (message) {
    $('#alertSpan').html(message);
    $('.messageAlert').fadeIn(function () {
        setTimeout(function () {
            $('.messageAlert').fadeOut();
        }, 2000);
    });
};

var loadModal = function (item) {
    $('#saveEdit').attr('data-noteid', item.Id);
    $('#noteSubjectEdit').val(item.Title);
    $('#noteBodyEdit').val(item.Body);
    $("#myModal").modal();
}