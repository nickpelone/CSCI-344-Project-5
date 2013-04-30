(function () {
    "use strict";
    var $ = window.$, toDoItemsLength, i;
    $(document).ready((function () {
     //load json file for entries
        $.getJSON("data/all.json",  function(toDoData) {
            console.log(toDoData[0].description);
            toDoItemsLength = toDoData.length;
            console.log(toDoItemsLength);
            //fill up tabs
            for (i = 0; i < toDoItemsLength; i += 1) {
                $("#tabAllContent").append("<div class = 'toDoItem' id = '" + i + "'> <a>" + toDoData[i].description + "</a><button class = 'delete' id = '" + i + "'>Delete </button></div>");
            }
            //handle adding a new to-do item
            /** code here
            **/
        //handle delete button
            $(".delete").click(function () {
                var toDelete = $(this).attr("id");
                console.log(toDelete);
                $("#" + toDelete).fadeOut(1000);
            });
        //handle moving between tabs
            $("#tabEdit").click(function() {
            //hide other tabs
                console.log("Edit was clicked");
                $(".active").removeClass("active");
                $("#tabEdit").addClass("active");
                $("#tabAllContent").fadeOut(1000);
                $("#tabCategoriesContent").fadeOut(1000);
                $("#tabEditContent").fadeIn(1000);
            });
            $("#tabAll").click(function () {
                console.log("All was clicked");
                $(".active").removeClass("active");
                $("#tabAll").addClass("active");
                $("#tabEditContent").fadeOut(1000);
                $("#tabCategoriesContent").fadeOut(1000);
                $("#tabAllContent").fadeIn(1000);
            });
            $("#tabCategories").click(function () {
                console.log("Categories was clicked");
                $(".active").removeClass("active");
                $("#tabCategories").addClass("active");
                $("#tabEditContent").fadeOut(1000);
                $("#tabAllContent").fadeOut(1000);
                //re-calculate tab
                //
                //fade in re-calc'd tab
                $("#tabCategoriesContent").fadeIn(1000);
            });
        });
    }()));
}());