if (document.title == "Section Information") {
    var profFullName = document.getElementById("LIST_VAR7_1").innerHTML;
    if (profFullName != "Staff") {
        var profNameParts = profFullName.split(' ');
        var profFirstName = profNameParts[0];
        var profLastName = profNameParts[profNameParts.length - 1];
        var searchURL = "https://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=North+Central+College&schoolID=688&query=" + profFirstName + "+" + profLastName;
        chrome.runtime.sendMessage({
            url: searchURL
        }, function(response) {
            var respdiv = document.createElement('div');
            respdiv.innerHTML = response;
            if (respdiv.getElementsByClassName("listing PROFESSOR").length > 0) {
                var profurl = "https://www.ratemyprofessors.com/" +
                    respdiv.getElementsByClassName("listing PROFESSOR")[0]
                    .getElementsByTagName('a')[0].href.slice(26);

                chrome.runtime.sendMessage({
                    url: profurl
                }, function(response) {
                    respdiv.innerHTML = response;
                    var grades = respdiv.getElementsByClassName("grade");
                    var overallQuality = grades[0].innerHTML.trim();
                    var levelOfDifficulty = grades[2].innerHTML.trim();

                    var tags = respdiv.getElementsByClassName("tag-box-choosetags");

                    var ratingsdiv = document.createElement("div");
                    ratingsdiv.className = "ratings-div";

                    var header = document.createElement("H1");
                    header.innerHTML = "Faculty Rating";
                    ratingsdiv.appendChild(header);

                    var ratingsTable = document.createElement("TABLE");
                    ratingsTable.className = "ratings-table";
                    var firstRow = document.createElement("TR");
                    firstRow.innerHTML = "<th>Overall Quality</th><th>Level of Difficulty</th>";
                    var secondRow = document.createElement("TR");
                    secondRow.innerHTML = "<td>" + overallQuality + "/5</td><td>" + levelOfDifficulty + "/5</td>";
                    ratingsTable.appendChild(firstRow);
                    ratingsTable.appendChild(secondRow);
                    ratingsdiv.appendChild(ratingsTable);


                    if (tags.length > 0) {
                        tagString = "";
                        for (i = 0; i < tags.length; i++) {
                            tagString += tags[i].innerHTML + "; ";
                        }
                        var tagsElement = document.createElement("P");
                        tagsElement.innerHTML = tagString;
                        ratingsdiv.appendChild(tagsElement);
                    }
                    var rateMyProfessorLink = document.createElement("A");
                    rateMyProfessorLink.href = profurl;
                    rateMyProfessorLink.target = "_blank";
                    rateMyProfessorLink.innerHTML = "Read Student Comments-RateMyProfessors";
                    ratingsdiv.appendChild(rateMyProfessorLink);

                    var facultySection = document.getElementsByClassName("Grp_VAR_LIST1 left")[0];
                    facultySection.insertBefore(ratingsdiv, facultySection.childNodes[0]);
                });

            } else {
                var ratingsdiv = document.createElement("div");
                ratingsdiv.className = "ratings-div";

                var header = document.createElement("H1");
                header.innerHTML = "Faculty Rating";
                ratingsdiv.appendChild(header);

                var text = document.createElement("P");
                text.innerHTML = "No ratings found for " + profFirstName + " " + profLastName + " at North Central College.";
                ratingsdiv.appendChild(text);

                var rateMyProfessorLink = document.createElement("A");
                rateMyProfessorLink.href = "http://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=&schoolID=&query=" + profFirstName + "+" + profLastName;
                rateMyProfessorLink.target = "_blank";
                rateMyProfessorLink.innerHTML = "Search Other Schools-RateMyProfessors";
                ratingsdiv.appendChild(rateMyProfessorLink);

                var facultySection = document.getElementsByClassName("Grp_VAR_LIST1 left")[0];
                facultySection.insertBefore(ratingsdiv, facultySection.childNodes[0]);
            }
        });
    }
}
