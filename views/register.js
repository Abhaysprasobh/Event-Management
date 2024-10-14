$("#register").submit((e) => {
    e.preventDefault();

    const formData = new FormData($("#register")[0]);

    $.ajax({
        url: 'http://localhost:3000/add-user',
        data: formData,
        method: "POST",
        contentType: false, // Tell jQuery not to set contentType
        processData: false, // Tell jQuery not to process the data
        success: function (response) {
            console.log(response);

            if (response.result === "success") {
                alert("Successful");
            } else {
                alert("Failed");
            }
        },
        error: function (err) {
            console.error("Error:", err);
            alert("An error occurred while submitting the form.");
        },
    });
});