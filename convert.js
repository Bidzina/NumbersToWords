$(document).ready(function () {

    var ArrOnes = ['', 'ერთი', 'ორი', 'სამი', 'ოთხი', 'ხუთი', 'ექვსი', 'შვიდი', 'რვა', 'ცხრა', 'ათი', 'თერთმეტი', 'თორმეტი', 'ცამეტი', 'თოთხმეტი', 'თხუთმეტი', 'თექვსმეტი', 'ჩვიდმეტი', 'თვრამეტი', 'ცხრამეტი']
    var ArrTens = [' ', ' ', 'ოცი', 'ოცდაათი', 'ორმოცი', 'ორმოცდაათი', 'სამოცი', 'სამოცდაათი', 'ოთხმოცი', 'ოთხმოცდაათი', 'ასი'];
    var ArrOnesAndTens = ['', '', 'ოცდა', '', 'ორმოცდა', '', 'სამოცდა', '', 'ოთხმოცდა'];
    var Hundreds = ['', '', 'ორ', 'სამ', 'ოთხ', 'ხუთ', 'ექვს', 'შვიდ', 'რვა', 'ცხრა'];

    function onedigit(input) {
        var result;
        result = ArrOnes[input];
        return result;
    }

    function doubledigit(input) {
        var result;
        if (input % 10 == 0) {
            var firstnum = parseInt(input.charAt(0));
            result = ArrTens[firstnum];
        } else {
            var firstnum = parseInt(input.charAt(0));
            var secondnum = parseInt(input.charAt(1));
            if (firstnum % 2 == 0) {
                result = ArrOnesAndTens[firstnum] + ArrOnes[secondnum];
            } else {
                result = ArrOnesAndTens[firstnum - 1] + ArrOnes[secondnum + 10];
            }
        }
        return result;
    }

    function trippledigit(input) {
        var result;
        if (input % 100 == 0) {
            var firstnum = parseInt(input.charAt(0));
            result = Hundreds[firstnum] + "ასი"
        } else {
            var firstnum = parseInt(input.charAt(0));
            var lasttwo = input.substr(1, 2);
            var lasttworesult = doubledigit(lasttwo);
            if (firstnum == 0) {
                result = lasttworesult;
            } else {
                result = Hundreds[firstnum] + "ას " + lasttworesult;
            }

        }
        return result;
    }

    function fourdigit(input) {
        var result;
        if (input % 1000 == 0) {
            if (input.length == 4) {
                var firstnum = parseInt(input.charAt(0));
                if (firstnum != 1) {
                    result = Hundreds[firstnum] + " ათასი";
                } else {
                    result = "ათასი";
                }
            }
            if (input.length == 5) {
                var firstnum = doubledigit(input.substr(0, 2));
                result = firstnum + " ათასი";
            }
            if (input.length == 6) {
                var firstnum = trippledigit(input.substr(0, 3));
                result = firstnum + " ათასი";
            }
        } else {
            if (input.length == 4) {
                var firstnum = parseInt(input.charAt(0));
                var lastthree = input.substr(1, 3);
                var lastthreeresult = trippledigit(lastthree);
                if (firstnum != 1) {
                    result = ArrOnes[firstnum] + "ათას " + lastthreeresult;
                } else {
                    result = "ათას " + lastthreeresult;
                }
            }
            if (input.length == 5) {
                var firstnum = doubledigit(input.substr(0, 2));
                var lastthree = trippledigit(input.substr(2, 3));
                result = firstnum + "ათას " + lastthree;
            }
            if (input.length == 6) {
                var firstnum = trippledigit(input.substr(0, 3));
                var lastthree = trippledigit(input.substr(3, 3));
                result = firstnum + " ათას " + lastthree;
            }
        }
        return result;
    }

    $("#input").keyup(function () {
        var num = $("#input").val();
        if(num==""){
            $("#output").text("");
        }
        var lastresult;
        if (num > 0 && num < 20) {
            lastresult = onedigit(num);
            $("#output").text(lastresult);
        }
        if (num >= 20 && num < 100) {
            lastresult = doubledigit(num);
            $("#output").text(lastresult);
        }

        if (num >= 100 && num < 1000) {
            lastresult = trippledigit(num);
            $("#output").text(lastresult);
        }

        if (num >= 1000 && num < 1000000) {
            lastresult = fourdigit(num);
            $("#output").text(lastresult);

        }

        if(num>1000000){
            alert("Input must be under Million");
            $("#input").text("");
            $("#output").text("");
        }


    })


})